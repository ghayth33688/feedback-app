(() => {
  const i18n = {
    de: {
      dashboard: 'Feedback Dashboard', btn_new_token: '+ Link erstellen', btn_batch: '+ Mehrere',
      btn_logout: 'Abmelden', btn_delete: 'Löschen', btn_create: 'Erstellen', btn_copy_all: 'Alle kopieren',
      section_links: 'Feedback-Links', section_feedbacks: 'Eingegangene Feedbacks',
      section_questions: 'Fragen verwalten',
      no_tokens: 'Noch keine Links erstellt.', no_feedbacks: 'Noch keine Feedbacks eingegangen.',
      stats: 'Statistiken', stats_toggle: 'Stats', search_placeholder: 'Suche in Feedbacks...',
      stat_total: 'Gesamt Tokens', stat_used: 'Beantwortet', stat_rate: 'Antwortquote', stat_disabled: 'Deaktiviert',
      detail_title: 'Feedback-Details', batch_title: 'Mehrere Links erstellen', batch_count: 'Anzahl Links',
      login_title: 'Admin Login', login_sub: 'Zugang zum Feedback-Dashboard',
      login_user: 'Benutzername', login_pass: 'Passwort', login_btn: 'Anmelden',
      used: 'Verwendet', unused: 'Offen', disabled: 'Deaktiviert',
      no_answer: 'Keine Antwort', copied: 'Kopiert!', link_created: 'Neuer Link erstellt!',
      token_deleted: 'Link gelöscht.', feedback_deleted: 'Feedback gelöscht.', error: 'Fehler',
      confirm_delete: 'Dieses Feedback wirklich löschen?', confirm_delete_token: 'Diesen Link wirklich löschen?',
      copied_all: 'Alle Links kopiert!',
      q_add: 'Neue Frage hinzufügen', q_key: 'Fragen-Key (z.B. q11)', q_label_de: 'Frage (Deutsch)',
      q_label_en: 'Frage (Englisch)', q_label_ar: 'Frage (Arabisch)', q_type: 'Typ',
      q_type_text: 'Offener Text', q_type_radio: 'Multiple Choice', q_type_radio_detail: 'MC + Detail',
      q_required: 'Pflichtfeld', q_options: 'Optionen (getrennt mit |)', q_save: 'Speichern',
      q_cancel: 'Abbrechen', q_delete_confirm: 'Diese Frage wirklich löschen?', q_edit: 'Bearbeiten',
      q_deleted: 'Frage gelöscht.', q_saved: 'Frage gespeichert.', q_moved: 'Reihenfolge geändert.',
      q_no_questions: 'Noch keine Fragen erstellt.',
      form_title_label: 'Formular-Titel', form_subtitle_label: 'Formular-Untertitel',
      settings_saved: 'Einstellungen gespeichert.'
    },
    en: {
      dashboard: 'Feedback Dashboard', btn_new_token: '+ Create Link', btn_batch: '+ Batch',
      btn_logout: 'Logout', btn_delete: 'Delete', btn_create: 'Create', btn_copy_all: 'Copy All',
      section_links: 'Feedback Links', section_feedbacks: 'Incoming Feedbacks',
      section_questions: 'Manage Questions',
      no_tokens: 'No links created yet.', no_feedbacks: 'No feedbacks received yet.',
      stats: 'Statistics', stats_toggle: 'Stats', search_placeholder: 'Search feedbacks...',
      stat_total: 'Total Tokens', stat_used: 'Answered', stat_rate: 'Response Rate', stat_disabled: 'Disabled',
      detail_title: 'Feedback Details', batch_title: 'Create Multiple Links', batch_count: 'Number of Links',
      login_title: 'Admin Login', login_sub: 'Access Feedback Dashboard',
      login_user: 'Username', login_pass: 'Password', login_btn: 'Sign In',
      used: 'Used', unused: 'Open', disabled: 'Disabled',
      no_answer: 'No answer', copied: 'Copied!', link_created: 'New link created!',
      token_deleted: 'Link deleted.', feedback_deleted: 'Feedback deleted.', error: 'Error',
      confirm_delete: 'Really delete this feedback?', confirm_delete_token: 'Really delete this link?',
      copied_all: 'All links copied!',
      q_add: 'Add New Question', q_key: 'Question Key (e.g. q11)', q_label_de: 'Question (German)',
      q_label_en: 'Question (English)', q_label_ar: 'Question (Arabic)', q_type: 'Type',
      q_type_text: 'Open Text', q_type_radio: 'Multiple Choice', q_type_radio_detail: 'MC + Detail',
      q_required: 'Required', q_options: 'Options (separated by |)', q_save: 'Save',
      q_cancel: 'Cancel', q_delete_confirm: 'Really delete this question?', q_edit: 'Edit',
      q_deleted: 'Question deleted.', q_saved: 'Question saved.', q_moved: 'Order changed.',
      q_no_questions: 'No questions created yet.',
      form_title_label: 'Form Title', form_subtitle_label: 'Form Subtitle',
      settings_saved: 'Settings saved.'
    },
    ar: {
      dashboard: 'لوحة التقييمات', btn_new_token: '+ إنشاء رابط', btn_batch: '+ متعدد',
      btn_logout: 'تسجيل الخروج', btn_delete: 'حذف', btn_create: 'إنشاء', btn_copy_all: 'نسخ الكل',
      section_links: 'روابط التقييم', section_feedbacks: 'التقييمات الواردة',
      section_questions: 'إدارة الأسئلة',
      no_tokens: 'لم يتم إنشاء روابط بعد.', no_feedbacks: 'لم يتم استلام تقييمات بعد.',
      stats: 'الإحصائيات', stats_toggle: 'إحصائيات', search_placeholder: 'بحث في التقييمات...',
      stat_total: 'إجمالي الروابط', stat_used: 'تم الرد', stat_rate: 'نسبة الاستجابة', stat_disabled: 'معطل',
      detail_title: 'تفاصيل التقييم', batch_title: 'إنشاء عدة روابط', batch_count: 'عدد الروابط',
      login_title: 'دخول المسؤول', login_sub: 'الوصول إلى لوحة التقييمات',
      login_user: 'اسم المستخدم', login_pass: 'كلمة المرور', login_btn: 'تسجيل الدخول',
      used: 'مستخدم', unused: 'متاح', disabled: 'معطل',
      no_answer: 'لا توجد إجابة', copied: 'تم النسخ!', link_created: 'تم إنشاء الرابط!',
      token_deleted: 'تم حذف الرابط.', feedback_deleted: 'تم حذف التقييم.', error: 'خطأ',
      confirm_delete: 'هل تريد حذف هذا التقييم فعلاً؟', confirm_delete_token: 'هل تريد حذف هذا الرابط فعلاً؟',
      copied_all: 'تم نسخ جميع الروابط!',
      q_add: 'إضافة سؤال جديد', q_key: 'مفتاح السؤال (مثل q11)', q_label_de: 'السؤال (الألمانية)',
      q_label_en: 'السؤال (الإنجليزية)', q_label_ar: 'السؤال (العربية)', q_type: 'النوع',
      q_type_text: 'نص مفتوح', q_type_radio: 'اختيار متعدد', q_type_radio_detail: 'اختيار + تفاصيل',
      q_required: 'مطلوب', q_options: 'الخيارات (مفصولة بـ |)', q_save: 'حفظ',
      q_cancel: 'إلغاء', q_delete_confirm: 'هل تريد حذف هذا السؤال فعلاً؟', q_edit: 'تعديل',
      q_deleted: 'تم حذف السؤال.', q_saved: 'تم حفظ السؤال.', q_moved: 'تم تغيير الترتيب.',
      q_no_questions: 'لم يتم إنشاء أسئلة بعد.',
      form_title_label: 'عنوان الاستمارة', form_subtitle_label: 'العنوان الفرعي',
      settings_saved: 'تم حفظ الإعدادات.'
    }
  };

  const views = { login: document.getElementById('loginView'), dashboard: document.getElementById('dashboardView') };
  let currentLang = localStorage.getItem('admin_lang') || 'de';
  let currentFeedbackId = null;
  let refreshInterval = null;
  let searchTimeout = null;
  let editingQuestionId = null;

  function t(key) { return i18n[currentLang]?.[key] || i18n.de[key] || key; }

  function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll('.lang-btn').forEach(btn => { btn.classList.toggle('active', btn.dataset.lang === currentLang); });
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }

  function formatDateAr(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'Z');
    if (currentLang === 'ar') {
      const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
      const arabicNums = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
      const arDay = String(d.getDate()).split('').map(c => arabicNums[c]).join('');
      return `${arDay} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }
    return d.toLocaleDateString(currentLang === 'en' ? 'en-GB' : 'de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function showView(name) { Object.values(views).forEach(v => v.classList.add('hidden')); views[name].classList.remove('hidden'); }
  function showToast(msg, type = 'success') { const toast = document.getElementById('toast'); toast.textContent = msg; toast.className = `toast ${type}`; setTimeout(() => { toast.className = 'toast hidden'; }, 3000); }

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
  document.getElementById('btnHamburger').addEventListener('click', () => { document.getElementById('mobileNav').classList.toggle('hidden'); });

  async function checkAuth() { try { const data = await api('/api/admin/check'); if (data.authenticated) { startDashboard(); return; } } catch (err) {} showView('login'); }

  function startDashboard() {
    showView('dashboard');
    loadTokens(); loadFeedbacks(); loadQuestions();
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { if (!views.dashboard.classList.contains('hidden')) { loadTokens(); loadFeedbacks(); } }, 5000);
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
        return `<div class="token-item"><div class="token-info"><div class="token-status ${statusClass}" title="${statusText}"></div><div><div class="token-link" onclick="copyToken('${url}')">${url}</div><div class="token-date">${formatDateAr(tk.created_at)}</div></div></div><div class="token-actions"><button class="btn-sm btn-copy" onclick="copyToken('${url}')">&#128203;</button>${!tk.used ? `<button class="btn-sm btn-disable-token" onclick="toggleToken('${tk.token}')" title="${tk.disabled ? 'Aktivieren' : 'Deaktivieren'}">${tk.disabled ? '&#9654;' : '&#9209;'}</button>` : ''}${!tk.used ? `<button class="btn-sm btn-delete-token" onclick="deleteToken('${tk.token}')">&#128465;</button>` : ''}</div></div>`;
      }).join('');
    } catch (err) { console.error(err); }
  }

  async function loadFeedbacks() {
    try {
      const search = document.getElementById('searchInput').value;
      const url = search ? `/api/admin/feedbacks?search=${encodeURIComponent(search)}` : '/api/admin/feedbacks';
      const feedbacks = await api(url);
      const list = document.getElementById('feedbacksList');
      const skeleton = document.getElementById('feedbacksSkeleton');
      const noFeedbacks = document.getElementById('noFeedbacks');
      skeleton.classList.add('hidden');
      document.getElementById('feedbackCount').textContent = feedbacks.length;
      if (!feedbacks.length) { list.innerHTML = ''; noFeedbacks.classList.remove('hidden'); return; }
      noFeedbacks.classList.add('hidden');
      list.innerHTML = feedbacks.map(f => {
        const answers = JSON.parse(f.answers || '{}');
        const firstAnswer = Object.values(answers)[0] || t('no_answer');
        const preview = firstAnswer.substring(0, 120) + (firstAnswer.length > 120 ? '...' : '');
        return `<div class="feedback-item" onclick="showDetail(${f.id})"><div class="feedback-item-header"><span class="feedback-item-id">Feedback #${f.id}</span><span class="feedback-item-date">${formatDateAr(f.created_at)}</span></div><div class="feedback-item-preview">${preview}</div></div>`;
      }).join('');
    } catch (err) { console.error(err); }
  }

  window.showDetail = async function(id) {
    try {
      const [f, qData] = await Promise.all([
        api(`/api/admin/feedbacks/${id}`),
        api('/api/admin/questions')
      ]);
      currentFeedbackId = f.id;
      const answers = JSON.parse(f.answers || '{}');
      const langLabel = currentLang === 'ar' ? 'label_ar' : (currentLang === 'en' ? 'label_en' : 'label');
      document.getElementById('modalContent').innerHTML = `
        <div style="margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border);font-size:0.85rem;color:var(--text-secondary)">Feedback #${f.id} &mdash; ${formatDateAr(f.created_at)}</div>
        ${qData.questions.map(q => `<div class="detail-question"><div class="detail-question-label">${q.sort_order}. ${q[langLabel] || q.label}</div><div class="detail-question-answer ${!answers[q.key] ? 'empty' : ''}">${answers[q.key] || t('no_answer')}</div></div>`).join('')}`;
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
    try { const data = await api('/api/admin/tokens', { method: 'POST', headers: { 'Content-Type': 'application/json' } }); if (data.success) { copyToClipboard(`${window.location.origin}/feedback/${data.token}`); showToast(t('link_created')); loadTokens(); } } catch (err) { showToast(t('error'), 'error'); }
  }

  document.getElementById('btnBatchToken').addEventListener('click', () => { document.getElementById('batchModal').classList.remove('hidden'); document.getElementById('batchResult').classList.add('hidden'); });
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
  window.deleteToken = async function(token) { if (!confirm(t('confirm_delete_token'))) return; try { await api(`/api/admin/tokens/${token}`, { method: 'DELETE' }); showToast(t('token_deleted')); loadTokens(); } catch (err) { showToast(t('error'), 'error'); } };
  window.toggleToken = async function(token) { try { await api(`/api/admin/tokens/${token}/disable`, { method: 'PUT' }); loadTokens(); } catch (err) { showToast(t('error'), 'error'); } };

  function copyToClipboard(text) { if (navigator.clipboard) { navigator.clipboard.writeText(text); } else { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); } }

  document.querySelectorAll('.lang-btn').forEach(btn => { btn.addEventListener('click', () => { currentLang = btn.dataset.lang; localStorage.setItem('admin_lang', currentLang); applyLang(); loadTokens(); loadFeedbacks(); loadQuestions(); }); });
  document.getElementById('searchInput').addEventListener('input', () => { clearTimeout(searchTimeout); searchTimeout = setTimeout(() => loadFeedbacks(), 300); });

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
    } catch (err) { showToast(t('error'), 'error'); }
  }

  document.getElementById('btnToggleStats').addEventListener('click', toggleStats);
  document.getElementById('btnStatsM')?.addEventListener('click', toggleStats);

  document.getElementById('btnQuestions')?.addEventListener('click', () => {
    const section = document.getElementById('questionsSection');
    section.classList.toggle('hidden');
    if (!section.classList.contains('hidden')) loadQuestions();
  });
  document.getElementById('btnQuestionsM')?.addEventListener('click', () => {
    const section = document.getElementById('questionsSection');
    section.classList.toggle('hidden');
    if (!section.classList.contains('hidden')) loadQuestions();
  });

  let allQuestions = [];

  async function loadQuestions() {
    try {
      allQuestions = await api('/api/admin/questions');
      const list = document.getElementById('questionsList');
      const noQ = document.getElementById('noQuestions');
      if (!allQuestions.length) { list.innerHTML = ''; noQ.classList.remove('hidden'); return; }
      noQ.classList.add('hidden');
      list.innerHTML = allQuestions.map(q => {
        const langLabel = currentLang === 'ar' ? (q.label_ar || q.label) : (currentLang === 'en' ? (q.label_en || q.label) : q.label);
        const typeLabel = q.type === 'radio' ? t('q_type_radio') : (q.type === 'radio_with_detail' ? t('q_type_radio_detail') : t('q_type_text'));
        return `<div class="question-item" data-id="${q.id}"><div class="question-item-header"><div class="question-item-num">${q.sort_order}</div><div class="question-item-info"><div class="question-item-label">${langLabel}</div><div class="question-item-meta">${q.key} &middot; ${typeLabel} ${q.required ? '&#9679; Pflicht' : ''}</div></div></div><div class="question-item-actions"><button class="btn-sm btn-copy" onclick="moveQuestion(${q.id}, -1)" title="Up">&#9650;</button><button class="btn-sm btn-copy" onclick="moveQuestion(${q.id}, 1)" title="Down">&#9660;</button><button class="btn-sm btn-copy" onclick="editQuestion(${q.id})">&#9998;</button><button class="btn-sm btn-delete-token" onclick="deleteQuestion(${q.id})">&#128465;</button></div></div>`;
      }).join('');
    } catch (err) { console.error(err); }
  }

  window.editQuestion = function(id) {
    const q = allQuestions.find(x => x.id === id);
    if (!q) return;
    editingQuestionId = id;
    document.getElementById('questionForm').classList.remove('hidden');
    document.getElementById('questionKey').value = q.key;
    document.getElementById('questionKey').disabled = true;
    document.getElementById('questionLabelDe').value = q.label;
    document.getElementById('questionLabelEn').value = q.label_en || '';
    document.getElementById('questionLabelAr').value = q.label_ar || '';
    document.getElementById('questionType').value = q.type;
    document.getElementById('questionRequired').checked = !!q.required;
    document.getElementById('questionOptions').value = q.options || '';
    document.getElementById('questionForm').scrollIntoView({ behavior: 'smooth' });
  };

  window.moveQuestion = async function(id, dir) {
    const idx = allQuestions.findIndex(q => q.id === id);
    if (idx < 0) return;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= allQuestions.length) return;
    [allQuestions[idx], allQuestions[newIdx]] = [allQuestions[newIdx], allQuestions[idx]];
    const order = allQuestions.map(q => q.id);
    try { await api('/api/admin/questions/reorder', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order }) }); loadQuestions(); showToast(t('q_moved')); } catch (err) { showToast(t('error'), 'error'); }
  };

  window.deleteQuestion = async function(id) {
    if (!confirm(t('q_delete_confirm'))) return;
    try { await api(`/api/admin/questions/${id}`, { method: 'DELETE' }); showToast(t('q_deleted')); loadQuestions(); } catch (err) { showToast(t('error'), 'error'); }
  };

  document.getElementById('btnAddQuestion')?.addEventListener('click', () => {
    editingQuestionId = null;
    document.getElementById('questionForm').classList.remove('hidden');
    document.getElementById('questionKey').value = '';
    document.getElementById('questionKey').disabled = false;
    document.getElementById('questionLabelDe').value = '';
    document.getElementById('questionLabelEn').value = '';
    document.getElementById('questionLabelAr').value = '';
    document.getElementById('questionType').value = 'text';
    document.getElementById('questionRequired').checked = true;
    document.getElementById('questionOptions').value = '';
    document.getElementById('questionForm').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('btnCancelQuestion')?.addEventListener('click', () => {
    document.getElementById('questionForm').classList.add('hidden');
    editingQuestionId = null;
  });

  document.getElementById('questionType')?.addEventListener('change', (e) => {
    document.getElementById('optionsGroup').style.display = (e.target.value === 'radio' || e.target.value === 'radio_with_detail') ? 'block' : 'none';
  });

  document.getElementById('questionFormEl')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      key: document.getElementById('questionKey').value.trim(),
      label: document.getElementById('questionLabelDe').value.trim(),
      label_en: document.getElementById('questionLabelEn').value.trim(),
      label_ar: document.getElementById('questionLabelAr').value.trim(),
      type: document.getElementById('questionType').value,
      required: document.getElementById('questionRequired').checked,
      options: document.getElementById('questionOptions').value.trim()
    };
    if (!data.key || !data.label) return showToast(t('error'), 'error');
    try {
      if (editingQuestionId) {
        await api(`/api/admin/questions/${editingQuestionId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      } else {
        await api('/api/admin/questions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      }
      showToast(t('q_saved'));
      document.getElementById('questionForm').classList.add('hidden');
      editingQuestionId = null;
      loadQuestions();
    } catch (err) { showToast(t('error'), 'error'); }
  });

  document.getElementById('btnSaveSettings')?.addEventListener('click', async () => {
    const data = {
      form_title: document.getElementById('settingTitleDe').value,
      form_title_en: document.getElementById('settingTitleEn').value,
      form_title_ar: document.getElementById('settingTitleAr').value,
      form_subtitle: document.getElementById('settingSubtitleDe').value,
      form_subtitle_en: document.getElementById('settingSubtitleEn').value,
      form_subtitle_ar: document.getElementById('settingSubtitleAr').value
    };
    try { await api('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); showToast(t('settings_saved')); } catch (err) { showToast(t('error'), 'error'); }
  });

  async function loadSettings() {
    try {
      const s = await api('/api/admin/settings');
      if (s.form_title) document.getElementById('settingTitleDe').value = s.form_title;
      if (s.form_title_en) document.getElementById('settingTitleEn').value = s.form_title_en;
      if (s.form_title_ar) document.getElementById('settingTitleAr').value = s.form_title_ar;
      if (s.form_subtitle) document.getElementById('settingSubtitleDe').value = s.form_subtitle;
      if (s.form_subtitle_en) document.getElementById('settingSubtitleEn').value = s.form_subtitle_en;
      if (s.form_subtitle_ar) document.getElementById('settingSubtitleAr').value = s.form_subtitle_ar;
    } catch (err) {}
  }

  checkAuth();
  applyLang();
  loadSettings();
})();
