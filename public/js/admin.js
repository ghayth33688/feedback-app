(() => {
  const i18n = {
    de: {
      dashboard: 'Feedback Dashboard', btn_new_token: '+ Link erstellen', btn_batch: '+ Mehrere',
      btn_logout: 'Abmelden', btn_delete: 'Löschen', btn_create: 'Erstellen', btn_copy_all: 'Alle kopieren',
      section_links: 'Feedback-Links', section_feedbacks: 'Eingegangene Feedbacks',
      no_tokens: 'Noch keine Links erstellt.', no_feedbacks: 'Noch keine Feedbacks eingegangen.',
      stats: 'Statistiken', stats_toggle: 'Stats', search_placeholder: 'Suche in Feedbacks...',
      stat_total: 'Gesamt Tokens', stat_used: 'Beantwortet', stat_rate: 'Antwortquote', stat_disabled: 'Deaktiviert',
      chart_hours: 'Arbeitszeiten', chart_respect: 'Umgang', chart_fair: 'Fairness', chart_transparency: 'Transparenz',
      detail_title: 'Feedback-Details', batch_title: 'Mehrere Links erstellen', batch_count: 'Anzahl Links',
      login_title: 'Admin Login', login_sub: 'Zugang zum Feedback-Dashboard',
      login_user: 'Benutzername', login_pass: 'Passwort', login_btn: 'Anmelden',
      used: 'Verwendet', unused: 'Offen', disabled: 'Deaktiviert',
      no_answer: 'Keine Antwort', q1: '1. Was hat dir am besten gefallen?', q2: '2. Was braucht Verbesserung?',
      q3: '3. Negatives in der Arbeitsweise?', q4: '4. Bewertung der Arbeitszeiten',
      q5: '5. Bewertung des Umgangs', q6: '6. Wurdest du fair behandelt?',
      q7: '7. War alles transparent und klar?', q8: '8. Etwas Ungerechtes oder Unklares?',
      q9: '9. Was soll sich verbessern?', q10: '10. Weitere Anmerkungen',
      copied: 'Kopiert!', link_created: 'Neuer Link erstellt!', token_deleted: 'Link gelöscht.',
      feedback_deleted: 'Feedback gelöscht.', error: 'Fehler', confirm_delete: 'Dieses Feedback wirklich löschen?',
      confirm_delete_token: 'Diesen Link wirklich löschen?', copied_all: 'Alle Links kopiert!'
    },
    en: {
      dashboard: 'Feedback Dashboard', btn_new_token: '+ Create Link', btn_batch: '+ Batch',
      btn_logout: 'Logout', btn_delete: 'Delete', btn_create: 'Create', btn_copy_all: 'Copy All',
      section_links: 'Feedback Links', section_feedbacks: 'Incoming Feedbacks',
      no_tokens: 'No links created yet.', no_feedbacks: 'No feedbacks received yet.',
      stats: 'Statistics', stats_toggle: 'Stats', search_placeholder: 'Search feedbacks...',
      stat_total: 'Total Tokens', stat_used: 'Answered', stat_rate: 'Response Rate', stat_disabled: 'Disabled',
      chart_hours: 'Work Hours', chart_respect: 'Respect', chart_fair: 'Fairness', chart_transparency: 'Transparency',
      detail_title: 'Feedback Details', batch_title: 'Create Multiple Links', batch_count: 'Number of Links',
      login_title: 'Admin Login', login_sub: 'Access Feedback Dashboard',
      login_user: 'Username', login_pass: 'Password', login_btn: 'Sign In',
      used: 'Used', unused: 'Open', disabled: 'Disabled',
      no_answer: 'No answer', q1: '1. What did you like most?', q2: '2. What needs improvement?',
      q3: '3. Issues with work style?', q4: '4. Work hours rating',
      q5: '5. Treatment & respect rating', q6: '6. Were you treated fairly?',
      q7: '7. Was everything clear & transparent?', q8: '8. Anything unfair or unclear?',
      q9: '9. What should improve?', q10: '10. Other comments',
      copied: 'Copied!', link_created: 'New link created!', token_deleted: 'Link deleted.',
      feedback_deleted: 'Feedback deleted.', error: 'Error', confirm_delete: 'Really delete this feedback?',
      confirm_delete_token: 'Really delete this link?', copied_all: 'All links copied!'
    },
    ar: {
      dashboard: 'لوحة التقييمات', btn_new_token: '+ إنشاء رابط', btn_batch: '+ متعدد',
      btn_logout: 'تسجيل الخروج', btn_delete: 'حذف', btn_create: 'إنشاء', btn_copy_all: 'نسخ الكل',
      section_links: 'روابط التقييم', section_feedbacks: 'التقييمات الواردة',
      no_tokens: 'لم يتم إنشاء روابط بعد.', no_feedbacks: 'لم يتم استلام تقييمات بعد.',
      stats: 'الإحصائيات', stats_toggle: 'إحصائيات', search_placeholder: 'بحث في التقييمات...',
      stat_total: 'إجمالي الروابط', stat_used: 'تم الرد', stat_rate: 'نسبة الاستجابة', stat_disabled: 'معطل',
      chart_hours: 'ساعات العمل', chart_respect: 'المعاملة', chart_fair: 'الإنصاف', chart_transparency: 'الشفافية',
      detail_title: 'تفاصيل التقييم', batch_title: 'إنشاء عدة روابط', batch_count: 'عدد الروابط',
      login_title: 'دخول المسؤول', login_sub: 'الوصول إلى لوحة التقييمات',
      login_user: 'اسم المستخدم', login_pass: 'كلمة المرور', login_btn: 'تسجيل الدخول',
      used: 'مستخدم', unused: 'متاح', disabled: 'معطل',
      no_answer: 'لا توجد إجابة', q1: '١. ما الذي أعجبك أكثر؟', q2: '٢. ما الذي يحتاج تحسين؟',
      q3: '٣. سلبية في طريقة العمل؟', q4: '٤. تقييم ساعات العمل',
      q5: '٥. تقييم المعاملة والاحترام', q6: '٦. هل تعاملت معك بشكل عادل؟',
      q7: '٧. هل كانت الأمور واضحة وشفافة؟', q8: '٨. شيء غير عادل أو غير واضح؟',
      q9: '٩. ما الذي يجب أن يتحسن؟', q10: '١٠. ملاحظات أخرى',
      copied: 'تم النسخ!', link_created: 'تم إنشاء الرابط!', token_deleted: 'تم حذف الرابط.',
      feedback_deleted: 'تم حذف التقييم.', error: 'خطأ', confirm_delete: 'هل تريد حذف هذا التقييم فعلاً؟',
      confirm_delete_token: 'هل تريد حذف هذا الرابط فعلاً؟', copied_all: 'تم نسخ جميع الروابط!'
    }
  };

  const views = {
    login: document.getElementById('loginView'),
    dashboard: document.getElementById('dashboardView')
  };

  let currentLang = localStorage.getItem('admin_lang') || 'de';
  let currentFeedbackId = null;
  let refreshInterval = null;
  let searchTimeout = null;
  let allFeedbacks = [];
  let chartInstances = {};

  function t(key) { return i18n[currentLang]?.[key] || i18n.de[key] || key; }

  function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
    if (currentLang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', currentLang);
    }
  }

  function formatDateAr(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'Z');
    if (currentLang === 'ar') {
      const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
      const day = d.getDate();
      const arabicNums = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
      const arDay = String(day).split('').map(c => arabicNums[c]).join('');
      return `${arDay} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }
    return d.toLocaleDateString(currentLang === 'en' ? 'en-GB' : 'de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

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
    const res = await fetch(url, { credentials: 'include', ...options });
    if (res.status === 401) { showView('login'); throw new Error('Not authenticated'); }
    return res.json();
  }

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ username, password }) });
      const data = await res.json();
      if (res.ok && data.success) { errorEl.classList.add('hidden'); startDashboard(); }
      else { errorEl.textContent = data.error || 'Falsche Anmeldedaten'; errorEl.classList.remove('hidden'); }
    } catch (err) { errorEl.textContent = 'Verbindungsfehler'; errorEl.classList.remove('hidden'); }
  });

  document.getElementById('btnLogout').addEventListener('click', async () => { await api('/api/admin/logout', { method: 'POST' }); if (refreshInterval) clearInterval(refreshInterval); showView('login'); });
  document.getElementById('btnLogoutM')?.addEventListener('click', async () => { await api('/api/admin/logout', { method: 'POST' }); if (refreshInterval) clearInterval(refreshInterval); showView('login'); });

  document.getElementById('btnHamburger').addEventListener('click', () => {
    document.getElementById('mobileNav').classList.toggle('hidden');
  });

  async function checkAuth() {
    try { const data = await api('/api/admin/check'); if (data.authenticated) { startDashboard(); return; } } catch (err) {}
    showView('login');
  }

  function startDashboard() {
    showView('dashboard');
    loadTokens();
    loadFeedbacks();
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      if (!views.dashboard.classList.contains('hidden')) { loadTokens(); loadFeedbacks(); }
    }, 5000);
  }

  async function loadTokens() {
    try {
      const tokens = await api('/api/admin/tokens');
      const list = document.getElementById('tokensList');
      const skeleton = document.getElementById('tokensSkeleton');
      const noTokens = document.getElementById('noTokens');
      skeleton.classList.add('hidden');

      if (!tokens.length) { list.innerHTML = ''; noTokens.classList.remove('hidden'); return; }
      noTokens.classList.add('hidden');
      list.innerHTML = tokens.map(tk => {
        const url = `${window.location.origin}/feedback/${tk.token}`;
        const statusClass = tk.disabled ? 'disabled' : (tk.used ? 'used' : 'unused');
        const statusText = tk.disabled ? t('disabled') : (tk.used ? t('used') : t('unused'));
        return `
          <div class="token-item">
            <div class="token-info">
              <div class="token-status ${statusClass}" title="${statusText}"></div>
              <div>
                <div class="token-link" onclick="copyToken('${url}')">${url}</div>
                <div class="token-date">${formatDateAr(tk.created_at)}</div>
              </div>
            </div>
            <div class="token-actions">
              <button class="btn-sm btn-copy" onclick="copyToken('${url}')">&#128203;</button>
              ${!tk.used ? `<button class="btn-sm btn-disable-token" onclick="toggleToken('${tk.token}')" title="${tk.disabled ? 'Aktivieren' : 'Deaktivieren'}">${tk.disabled ? '&#9654;' : '&#9209;'}</button>` : ''}
              ${!tk.used ? `<button class="btn-sm btn-delete-token" onclick="deleteToken('${tk.token}')">&#128465;</button>` : ''}
            </div>
          </div>`;
      }).join('');
    } catch (err) { console.error(err); }
  }

  async function loadFeedbacks() {
    try {
      const search = document.getElementById('searchInput').value;
      const url = search ? `/api/admin/feedbacks?search=${encodeURIComponent(search)}` : '/api/admin/feedbacks';
      const feedbacks = await api(url);
      allFeedbacks = feedbacks;
      const list = document.getElementById('feedbacksList');
      const skeleton = document.getElementById('feedbacksSkeleton');
      const noFeedbacks = document.getElementById('noFeedbacks');
      skeleton.classList.add('hidden');

      document.getElementById('feedbackCount').textContent = feedbacks.length;

      if (!feedbacks.length) { list.innerHTML = ''; noFeedbacks.classList.remove('hidden'); return; }
      noFeedbacks.classList.add('hidden');
      list.innerHTML = feedbacks.map(f => {
        const preview = f.q1 ? f.q1.substring(0, 120) + (f.q1.length > 120 ? '...' : '') : t('no_answer');
        return `
          <div class="feedback-item" onclick="showDetail(${f.id})">
            <div class="feedback-item-header">
              <span class="feedback-item-id">Feedback #${f.id}</span>
              <span class="feedback-item-date">${formatDateAr(f.created_at)}</span>
            </div>
            <div class="feedback-item-preview">${preview}</div>
          </div>`;
      }).join('');
    } catch (err) { console.error(err); }
  }

  window.showDetail = async function(id) {
    try {
      const f = await api(`/api/admin/feedbacks/${id}`);
      currentFeedbackId = f.id;
      const questions = [
        { key: 'q1', label: t('q1') }, { key: 'q2', label: t('q2') },
        { key: 'q3', label: t('q3') }, { key: 'q4', label: t('q4') },
        { key: 'q5', label: t('q5') }, { key: 'q6', label: t('q6') },
        { key: 'q7', label: t('q7') }, { key: 'q8', label: t('q8') },
        { key: 'q9', label: t('q9') }, { key: 'q10', label: t('q10') }
      ];
      document.getElementById('modalContent').innerHTML = `
        <div style="margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border);font-size:0.85rem;color:var(--text-secondary)">
          Feedback #${f.id} &mdash; ${formatDateAr(f.created_at)}
        </div>
        ${questions.map(q => `
          <div class="detail-question">
            <div class="detail-question-label">${q.label}</div>
            <div class="detail-question-answer ${!f[q.key] ? 'empty' : ''}">${f[q.key] || t('no_answer')}</div>
          </div>`).join('')}`;
      document.getElementById('detailModal').classList.remove('hidden');
    } catch (err) { showToast(t('error'), 'error'); }
  };

  document.getElementById('btnCloseModal').addEventListener('click', () => { document.getElementById('detailModal').classList.add('hidden'); });
  document.getElementById('detailModal').addEventListener('click', (e) => { if (e.target === e.currentTarget) e.currentTarget.classList.add('hidden'); });

  document.getElementById('btnDeleteFeedback').addEventListener('click', async () => {
    if (!currentFeedbackId) return;
    if (!confirm(t('confirm_delete'))) return;
    try { await api(`/api/admin/feedbacks/${currentFeedbackId}`, { method: 'DELETE' }); showToast(t('feedback_deleted')); document.getElementById('detailModal').classList.add('hidden'); loadTokens(); loadFeedbacks(); currentFeedbackId = null; } catch (err) { showToast(t('error'), 'error'); }
  });

  document.getElementById('btnNewToken').addEventListener('click', createToken);
  document.getElementById('btnNewTokenM')?.addEventListener('click', createToken);

  async function createToken() {
    try {
      const data = await api('/api/admin/tokens', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      if (data.success) { copyToClipboard(`${window.location.origin}/feedback/${data.token}`); showToast(t('link_created')); loadTokens(); }
    } catch (err) { showToast(t('error'), 'error'); }
  }

  document.getElementById('btnBatchToken').addEventListener('click', () => { document.getElementById('batchModal').classList.remove('hidden'); document.getElementById('batchResult').classList.add('hidden'); document.getElementById('batchCount').value = 5; });
  document.getElementById('btnBatchTokenM')?.addEventListener('click', () => { document.getElementById('batchModal').classList.remove('hidden'); document.getElementById('batchResult').classList.add('hidden'); });
  document.getElementById('btnCloseBatch').addEventListener('click', () => { document.getElementById('batchModal').classList.add('hidden'); });
  document.getElementById('batchModal').addEventListener('click', (e) => { if (e.target === e.currentTarget) e.currentTarget.classList.add('hidden'); });

  document.getElementById('btnCreateBatch').addEventListener('click', async () => {
    const count = parseInt(document.getElementById('batchCount').value);
    if (count < 1 || count > 50) return;
    try {
      const data = await api('/api/admin/tokens/batch', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ count }) });
      if (data.success) {
        const urls = data.tokens.map(tk => `${window.location.origin}/feedback/${tk}`);
        document.getElementById('batchResult').classList.remove('hidden');
        document.getElementById('batchResultText').textContent = urls.join('\n');
        document.getElementById('btnCopyAllBatch').onclick = () => { copyToClipboard(urls.join('\n')); showToast(t('copied_all')); };
        loadTokens();
      }
    } catch (err) { showToast(t('error'), 'error'); }
  });

  document.getElementById('btnExportCsv').addEventListener('click', () => { window.open('/api/admin/feedbacks/export/csv', '_blank'); });
  document.getElementById('btnExportCsvM')?.addEventListener('click', () => { window.open('/api/admin/feedbacks/export/csv', '_blank'); });

  window.copyToken = function(url) { copyToClipboard(url); showToast(t('copied')); };

  window.deleteToken = async function(token) {
    if (!confirm(t('confirm_delete_token'))) return;
    try { await api(`/api/admin/tokens/${token}`, { method: 'DELETE' }); showToast(t('token_deleted')); loadTokens(); } catch (err) { showToast(t('error'), 'error'); }
  };

  window.toggleToken = async function(token) {
    try { await api(`/api/admin/tokens/${token}/disable`, { method: 'PUT' }); loadTokens(); } catch (err) { showToast(t('error'), 'error'); }
  };

  function copyToClipboard(text) {
    if (navigator.clipboard) { navigator.clipboard.writeText(text); }
    else { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => { currentLang = btn.dataset.lang; localStorage.setItem('admin_lang', currentLang); applyLang(); loadTokens(); loadFeedbacks(); });
  });

  document.getElementById('searchInput').addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => loadFeedbacks(), 300);
  });

  document.getElementById('btnToggleStats').addEventListener('click', toggleStats);
  document.getElementById('btnStatsM')?.addEventListener('click', toggleStats);

  async function toggleStats() {
    const section = document.getElementById('statsSection');
    if (!section.classList.contains('hidden')) { section.classList.add('hidden'); return; }
    section.classList.remove('hidden');
    try {
      const stats = await api('/api/admin/stats');
      document.getElementById('statTotal').textContent = stats.totalTokens;
      document.getElementById('statUsed').textContent = stats.usedTokens;
      document.getElementById('statRate').textContent = stats.responseRate + '%';
      document.getElementById('statDisabled').textContent = stats.disabledTokens;
      renderChart('chartQ4', stats.q4Stats, 'q4');
      renderChart('chartQ5', stats.q5Stats, 'q5');
      renderChart('chartQ6', stats.q6Stats, 'q6');
      renderChart('chartQ7', stats.q7Stats, 'q7');
    } catch (err) { showToast(t('error'), 'error'); }
  }

  const chartColors = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#a855f7', '#ec4899'];

  function renderChart(canvasId, data, key) {
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
    const labels = data.map(d => d[key] || 'N/A');
    const values = data.map(d => d.count);
    chartInstances[canvasId] = new Chart(document.getElementById(canvasId), {
      type: 'doughnut',
      data: { labels, datasets: [{ data: values, backgroundColor: chartColors.slice(0, values.length), borderWidth: 0 }] },
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } } } }
    });
  }

  checkAuth();
  applyLang();
})();
