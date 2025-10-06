document.addEventListener('DOMContentLoaded', function () {
  const emailForm = document.getElementById('emailSignupForm');
  const emailInput = document.getElementById('emailInput');
  const formMessage = document.getElementById('formMessage');
  const joinButton = document.querySelector('.join-button');

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showMessage(message, type = 'success') {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    setTimeout(() => {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }, 5000);
  }

  emailForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      showMessage('Please enter your email address', 'error');
      emailInput.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address', 'error');
      emailInput.focus();
      return;
    }

    emailForm.classList.add('loading');
    joinButton.textContent = 'Joining...';

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showMessage("Thank you! You've been added to our waitlist.", 'success');
      emailInput.value = '';

      console.log('Email signup:', email);
    } catch (error) {
      console.error('Signup error:', error);
      showMessage('Something went wrong. Please try again.', 'error');
    } finally {
      emailForm.classList.remove('loading');
      joinButton.textContent = 'Join Waitlist';
    }
  });

  document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('.header');

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.illustration-container, .tagline, .email-signup'
  );
  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  emailInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      emailForm.dispatchEvent(new Event('submit'));
    }
  });

  joinButton.addEventListener('click', function () {
    if (emailInput.value.trim() === '') {
      emailInput.focus();
    }
  });
});

async function submitEmailToAPI(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Email added to waitlist' });
    }, 1000);
  });
}

window.PilatesPals = {
  submitEmailToAPI,
  isValidEmail: function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
};
