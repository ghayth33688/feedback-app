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

  async function validateToken() {
    if (!token || token.length < 10 || token.includes('/') || token.includes(' ')) {
      showError('هذا الرابط غير صالح.');
      return;
    }

    try {
      const res = await fetch(`/api/feedback/validate/${token}`);
      const data = await res.json();

      if (data.valid) {
        showScreen('form');
      } else {
        if (res.status === 400) {
          showScreen('expired');
        } else {
          showError(data.message || 'هذا الرابط غير صالح.');
        }
      }
    } catch (err) {
      showError('حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    }
  }

  // Conditional textareas for q6 and q7
  document.querySelectorAll('.conditional-textarea').forEach(textarea => {
    const forName = textarea.dataset.for;
    const showWhen = textarea.dataset.showWhen;
    const radios = document.querySelectorAll(`input[name="${forName}"]`);

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

  // Form submission
  document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value.trim();
    }

    // Validate required fields
    const required = ['q1', 'q2', 'q4', 'q5', 'q6', 'q7'];
    let hasError = false;

    document.querySelectorAll('.question-card').forEach(card => {
      card.classList.remove('error');
      const existingError = card.querySelector('.error-msg-inline');
      if (existingError) existingError.remove();
    });

    for (const field of required) {
      if (!data[field]) {
        hasError = true;
        const input = form.querySelector(`[name="${field}"]`);
        const card = input?.closest('.question-card');
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
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Append conditional detail fields
    if (data.q6 === 'أريد أن أوضح السبب' && data.q6_detail) {
      data.q6 = 'أريد أن أوضح السبب - ' + data.q6_detail;
    }
    if (data.q7 === 'أريد أن أوضح السبب' && data.q7_detail) {
      data.q7 = 'أريد أن أوضح السبب - ' + data.q7_detail;
    }
    delete data.q6_detail;
    delete data.q7_detail;

    // Submit
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loading').classList.remove('hidden');

    try {
      const res = await fetch(`/api/feedback/submit/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok && result.success) {
        showScreen('success');
      } else {
        throw new Error(result.error || 'Fehler beim Absenden');
      }
    } catch (err) {
      alert(err.message || 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').classList.remove('hidden');
      submitBtn.querySelector('.btn-loading').classList.add('hidden');
    }
  });

  validateToken();
})();
