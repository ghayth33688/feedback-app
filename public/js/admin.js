(() => {
  const views = {
    login: document.getElementById('loginView'),
    dashboard: document.getElementById('dashboardView'),
    detail: document.getElementById('detailView')
  };

  let currentFeedbackId = null;
  let refreshInterval = null;

  function showView(name) {
    Object.values(views).forEach(v => v.classList.add('hidden'));
    views[name].classList.remove('hidden');
  }

  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    setTimeout(() => { toast.className = 'toast hidden'; }, 3000);
  }

  async function api(url, options = {}) {
    const res = await fetch(url, {
      credentials: 'include',
      ...options
    });

    if (res.status === 401) {
      showView('login');
      throw new Error('Nicht authentifiziert');
    }

    return res.json();
  }

  // Login
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        errorEl.classList.add('hidden');
        startDashboard();
      } else {
        errorEl.textContent = data.error || 'Falsche Anmeldedaten';
        errorEl.classList.remove('hidden');
      }
    } catch (err) {
      errorEl.textContent = 'Verbindungsfehler';
      errorEl.classList.remove('hidden');
    }
  });

  // Logout
  document.getElementById('btnLogout').addEventListener('click', async () => {
    await api('/api/admin/logout', { method: 'POST' });
    if (refreshInterval) clearInterval(refreshInterval);
    showView('login');
  });

  // Check auth
  async function checkAuth() {
    try {
      const data = await api('/api/admin/check');
      if (data.authenticated) {
        startDashboard();
        return;
      }
    } catch (err) {}
    showView('login');
  }

  function startDashboard() {
    showView('dashboard');
    loadTokens();
    loadFeedbacks();
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      if (!views.dashboard.classList.contains('hidden')) {
        loadTokens();
        loadFeedbacks();
      }
    }, 5000);
  }

  // Tokens
  async function loadTokens() {
    try {
      const tokens = await api('/api/admin/tokens');
      const list = document.getElementById('tokensList');
      const noTokens = document.getElementById('noTokens');

      if (!tokens.length) {
        list.innerHTML = '';
        noTokens.classList.remove('hidden');
        return;
      }

      noTokens.classList.add('hidden');
      list.innerHTML = tokens.map(t => {
        const url = `${window.location.origin}/feedback/${t.token}`;
        const statusClass = t.used ? 'used' : 'unused';
        const statusText = t.used ? 'Verwendet' : 'Offen';
        const date = new Date(t.created_at + 'Z').toLocaleString('de-DE');

        return `
          <div class="token-item">
            <div class="token-info">
              <div class="token-status ${statusClass}" title="${statusText}"></div>
              <div>
                <div class="token-link" onclick="copyToken('${url}')" title="Klicken zum Kopieren">${url}</div>
                <div class="token-date">${date}</div>
              </div>
            </div>
            <div class="token-actions">
              <button class="btn-sm btn-copy" onclick="copyToken('${url}')">Kopieren</button>
              ${!t.used ? `<button class="btn-sm btn-delete-token" onclick="deleteToken('${t.token}')">Löschen</button>` : ''}
            </div>
          </div>
        `;
      }).join('');
    } catch (err) {
      console.error('Tokens laden Fehler:', err);
    }
  }

  // Feedbacks
  async function loadFeedbacks() {
    try {
      const feedbacks = await api('/api/admin/feedbacks');
      const list = document.getElementById('feedbacksList');
      const noFeedbacks = document.getElementById('noFeedbacks');
      const countBadge = document.getElementById('feedbackCount');

      countBadge.textContent = feedbacks.length;

      if (!feedbacks.length) {
        list.innerHTML = '';
        noFeedbacks.classList.remove('hidden');
        return;
      }

      noFeedbacks.classList.add('hidden');
      list.innerHTML = feedbacks.map(f => {
        const date = new Date(f.created_at + 'Z').toLocaleString('de-DE');
        const preview = f.q1 ? f.q1.substring(0, 100) + (f.q1.length > 100 ? '...' : '') : 'Keine Antwort';

        return `
          <div class="feedback-item" onclick="showDetail(${f.id})">
            <div class="feedback-item-header">
              <span class="feedback-item-id">Feedback #${f.id}</span>
              <span class="feedback-item-date">${date}</span>
            </div>
            <div class="feedback-item-preview">${preview}</div>
          </div>
        `;
      }).join('');
    } catch (err) {
      console.error('Feedbacks laden Fehler:', err);
    }
  }

  // Detail
  window.showDetail = async function(id) {
    try {
      const f = await api(`/api/admin/feedbacks/${id}`);
      currentFeedbackId = f.id;
      showView('detail');

      const questions = [
        { key: 'q1', label: '1. ما أكثر شيء أعجبك في العمل معنا؟' },
        { key: 'q2', label: '2. ما الشيء الذي لم يعجبك أو تعتقد أنه يحتاج إلى تحسين؟' },
        { key: 'q3', label: '3. هل هناك شيء في طريقة العمل أو التعامل معنا لم يكن جيدًا؟' },
        { key: 'q4', label: '4. تقييم ساعات وأوقات العمل' },
        { key: 'q5', label: '5. تقييم التعامل والاحترام داخل العمل' },
        { key: 'q6', label: '6. هل تشعر أن التعامل معك كان عادلًا؟' },
        { key: 'q7', label: '7. هل كانت الأمور واضحة وشفافة بالنسبة لك؟' },
        { key: 'q8', label: '8. هل شعرت أن هناك شيئًا غير عادل أو غير واضح؟' },
        { key: 'q9', label: '9. ما الشيء الذي تتمنى أن يتغير أو يتحسن في المستقبل؟' },
        { key: 'q10', label: '10. ملاحظات أو اقتراحات أخرى' }
      ];

      const date = new Date(f.created_at + 'Z').toLocaleString('de-DE');

      document.getElementById('detailContent').innerHTML = `
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
          <strong>Feedback #${f.id}</strong> &mdash; ${date}
        </div>
        ${questions.map(q => `
          <div class="detail-question">
            <div class="detail-question-label">${q.label}</div>
            <div class="detail-question-answer ${!f[q.key] ? 'empty' : ''}">
              ${f[q.key] || 'Keine Antwort'}
            </div>
          </div>
        `).join('')}
      `;
    } catch (err) {
      showToast('Fehler beim Laden des Feedbacks', 'error');
    }
  };

  document.getElementById('btnBack').addEventListener('click', () => {
    showView('dashboard');
    currentFeedbackId = null;
  });

  document.getElementById('btnDeleteFeedback').addEventListener('click', async () => {
    if (!currentFeedbackId) return;
    if (!confirm('Möchten Sie dieses Feedback wirklich löschen?')) return;

    try {
      await api(`/api/admin/feedbacks/${currentFeedbackId}`, { method: 'DELETE' });
      showToast('Feedback gelöscht');
      showView('dashboard');
      loadTokens();
      loadFeedbacks();
      currentFeedbackId = null;
    } catch (err) {
      showToast('Fehler beim Löschen', 'error');
    }
  });

  // Create Token
  document.getElementById('btnNewToken').addEventListener('click', async () => {
    try {
      const data = await api('/api/admin/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (data.success) {
        const url = `${window.location.origin}/feedback/${data.token}`;
        copyToClipboard(url);
        showToast('Neuer Link erstellt und kopiert!');
        loadTokens();
      }
    } catch (err) {
      showToast('Fehler beim Erstellen des Links', 'error');
    }
  });

  // Global functions
  window.copyToken = function(url) {
    copyToClipboard(url);
    showToast('Link kopiert!');
  };

  window.deleteToken = async function(token) {
    if (!confirm('Möchten Sie diesen Link wirklich löschen?')) return;

    try {
      await api(`/api/admin/tokens/${token}`, { method: 'DELETE' });
      showToast('Link gelöscht');
      loadTokens();
    } catch (err) {
      showToast('Fehler beim Löschen', 'error');
    }
  };

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  checkAuth();
})();
