(() => {
  const token = window.location.pathname.split('/feedback/')[1] ||
                window.location.pathname.split('/').pop();

  const screens = {
    loading: document.getElementById('loading'),
    expired: document.getElementById('expired'),
    error: document.getElementById('error-screen'),
    form: document.getElementById('feedbackForm'),
    success: document.getElementById('success')
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    screens[name].classList.remove('hidden');
  }

  function showError(message) {
    document.getElementById('error-message').textContent = message;
    showScreen('error');
  }

  function getLang() {
    const path = window.location.pathname;
    if (path.includes('/ar/')) return 'ar';
    if (path.includes('/en/')) return 'en';
    return 'ar';
  }

  function renderQuestions(questions, settings) {
    const lang = getLang();
    const container = document.getElementById('questionsContainer');

    if (settings) {
      const titleKey = lang === 'en' ? 'form_title_en' : (lang === 'ar' ? 'form_title_ar' : 'form_title');
      const subKey = lang === 'en' ? 'form_subtitle_en' : (lang === 'ar' ? 'form_subtitle_ar' : 'form_subtitle');
      if (settings[titleKey]) document.getElementById('formTitle').textContent = settings[titleKey];
      if (settings[subKey]) document.getElementById('formSubtitle').textContent = settings[subKey];
    }

    container.innerHTML = questions.map((q, idx) => {
      const qLabel = lang === 'en' ? (q.label_en || q.label) : (lang === 'ar' ? (q.label_ar || q.label) : q.label);

      if (q.type === 'radio' || q.type === 'radio_with_detail') {
        const options = (q.options || '').split('|').filter(Boolean);
        const isRTL = true;
        const showDetail = q.type === 'radio_with_detail';

        let html = `
          <div class="question-card">
            <div class="question-number">${q.sort_order}</div>
            <label>${qLabel}</label>
            <div class="options-grid">
              ${options.map(opt => `
                <label class="option-card">
                  <input type="radio" name="${q.key}" value="${opt}" ${q.required ? 'required' : ''}>
                  <span class="option-label">${opt}</span>
                </label>
              `).join('')}
            </div>`;

        if (showDetail) {
          const lastOpt = options[options.length - 1];
          html += `
            <textarea name="${q.key}_detail" rows="2" placeholder="اشرح السبب هنا... (اختياري)" class="conditional-textarea" data-show-when="${lastOpt}" data-for="${q.key}"></textarea>`;
        }

        html += '</div>';
        return html;
      }

      return `
        <div class="question-card">
          <div class="question-number">${q.sort_order}</div>
          <label>${qLabel}${!q.required ? ' (اختياري)' : ''}</label>
          <textarea name="${q.key}" rows="3" placeholder="اكتب إجابتك هنا..." ${q.required ? 'required' : ''}></textarea>
        </div>`;
    }).join('');

    container.querySelectorAll('.conditional-textarea').forEach(textarea => {
      const forName = textarea.dataset.for;
      const showWhen = textarea.dataset.showWhen;
      const radios = container.querySelectorAll(`input[name="${forName}"]`);
      radios.forEach(radio => {
        radio.addEventListener('change', () => {
          if (radio.value === showWhen && radio.checked) {
            textarea.classList.remove('hidden');
            textarea.focus();
          } else {
            textarea.classList.add('hidden');
            textarea.value = '';
          }
        });
      });
    });
  }

  async function validateToken() {
    if (!token || token.length < 10 || token.includes('/') || token.includes(' ')) {
      showError('هذا الرابط غير صالح.');
      return;
    }

    try {
      const validateRes = await fetch(`/api/feedback/validate/${token}`);
      const validateData = await validateRes.json();

      if (!validateData.valid) {
        if (validateRes.status === 400) showScreen('expired');
        else showError(validateData.message || 'هذا الرابط غير صالح.');
        return;
      }

      const qRes = await fetch('/api/feedback/questions');
      const qData = await qRes.json();

      renderQuestions(qData.questions, qData.settings);
      showScreen('form');
    } catch (err) {
      showError('حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    }
  }

  document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const answers = {};

    for (const [key, value] of formData.entries()) {
      if (!key.endsWith('_detail')) {
        answers[key] = value.trim();
      }
    }

    const detailFields = {};
    for (const [key, value] of formData.entries()) {
      if (key.endsWith('_detail')) {
        const baseKey = key.replace('_detail', '');
        if (answers[baseKey] && answers[baseKey] !== value.trim()) {
          detailFields[baseKey] = value.trim();
        }
      }
    }

    for (const [k, v] of Object.entries(detailFields)) {
      answers[k] = answers[k] + ' - ' + v;
    }

    const allRequired = form.querySelectorAll('[required]');
    let hasError = false;

    document.querySelectorAll('.question-card').forEach(card => {
      card.classList.remove('error');
      const existingError = card.querySelector('.error-msg-inline');
      if (existingError) existingError.remove();
    });

    for (const input of allRequired) {
      if (!input.value || !input.value.trim()) {
        hasError = true;
        const card = input.closest('.question-card');
        if (card) {
          card.classList.add('error');
          const msg = document.createElement('div');
          msg.className = 'error-msg-inline';
          msg.textContent = 'هذا السؤال مطلوب';
          card.appendChild(msg);
        }
      }
    }

    if (hasError) {
      const firstError = document.querySelector('.question-card.error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loading').classList.remove('hidden');

    try {
      const res = await fetch(`/api/feedback/submit/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        showScreen('success');
      } else {
        throw new Error(result.error || 'Fehler beim Absenden');
      }
    } catch (err) {
      alert(err.message || 'حدث خطأ في الاتصال.');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').classList.remove('hidden');
      submitBtn.querySelector('.btn-loading').classList.add('hidden');
    }
  });

  validateToken();
})();
