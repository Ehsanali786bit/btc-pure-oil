/**
 * BTC OILS - Main Application Controller
 * Handles Navigation, Mobile Drawer, Scroll Effects & DOM Initialization
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteHeader();
  initScrollProgress();
  initScrollObserver();
  initBrandMetadata();
  initFaqAccordion();
});

/**
 * Header sticky effect and mobile navigation menu
 */
function initSiteHeader() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navCloseBtn = document.querySelector('.nav-close-btn');

  // Sticky header on scroll with requestAnimationFrame throttling
  let headerTicking = false;
  window.addEventListener('scroll', () => {
    if (!headerTicking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 30) {
          header?.classList.add('scrolled');
        } else {
          header?.classList.remove('scrolled');
        }
        headerTicking = false;
      });
      headerTicking = true;
    }
  }, { passive: true });

  // Mobile menu toggle
  mobileToggle?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile drawer via close button (X)
  navCloseBtn?.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });

  // Close mobile drawer when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu?.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });
}

/**
 * Scroll Progress Bar (Throttled for 60fps mobile scrolling)
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  let progressTicking = false;
  window.addEventListener('scroll', () => {
    if (!progressTicking) {
      window.requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = (window.scrollY / totalHeight) * 100;
          progressBar.style.width = `${progress}%`;
        }
        progressTicking = false;
      });
      progressTicking = true;
    }
  }, { passive: true });
}

/**
 * Intersection Observer for Reveal Animations
 */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Dynamically binds contact data from BTC_CONFIG into all placeholders
 */
function initBrandMetadata() {
  if (typeof BTC_CONFIG === 'undefined') return;

  // Update dynamic phone text & links
  document.querySelectorAll('.btc-phone-text').forEach(el => {
    el.textContent = BTC_CONFIG.phone;
  });

  document.querySelectorAll('.btc-phone-link').forEach(el => {
    el.setAttribute('href', `tel:${BTC_CONFIG.phoneRaw}`);
  });

  // Update dynamic email text & links
  document.querySelectorAll('.btc-email-text').forEach(el => {
    el.textContent = BTC_CONFIG.email;
  });

  document.querySelectorAll('.btc-email-link').forEach(el => {
    el.setAttribute('href', `mailto:${BTC_CONFIG.email}`);
  });

  // Update WhatsApp links
  document.querySelectorAll('.btc-whatsapp-link').forEach(el => {
    const greeting = encodeURIComponent(BTC_CONFIG.whatsappDefaultGreeting);
    el.setAttribute('href', `https://wa.me/${BTC_CONFIG.whatsappNumber}?text=${greeting}`);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

/**
 * FAQ Accordion logic
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });
}

/**
 * Global Toast Notification Trigger
 */
window.showToast = function(message, duration = 4000) {
  let toast = document.getElementById('btc-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'btc-toast';
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span class="toast-text"></span>
    `;
    document.body.appendChild(toast);
  }

  const textSpan = toast.querySelector('.toast-text');
  if (textSpan) textSpan.textContent = message;

  toast.classList.add('show');
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
};

/**
 * Smooth Universal Email Dispatcher
 * On mobile devices (Android/iOS), directly invokes the native Gmail/Mail app via mailto.
 * Avoids opening blank desktop web tabs, login redirect walls, or triggering popup blockers.
 * On desktop, opens web Gmail composer in a new tab cleanly with fallback.
 */
window.launchEmailComposer = function(to, subject, body) {
  const emailTarget = to || (window.BTC_CONFIG && window.BTC_CONFIG.email) || 'btcpureoil@gmail.com';
  if (window.showToast) {
    window.showToast("Opening Email composer...");
  }
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const encSubject = encodeURIComponent(subject || '');
  const encBody = encodeURIComponent(body || '');
  const mailtoUri = `mailto:${emailTarget}?subject=${encSubject}&body=${encBody}`;

  if (isMobile) {
    // Direct native mailto link dispatch without popup blocking or blank tabs
    const link = document.createElement('a');
    link.href = mailtoUri;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (link.parentNode) link.parentNode.removeChild(link);
    }, 400);
  } else {
    // Desktop: Open clean web Gmail composer in a new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailTarget)}&su=${encSubject}&body=${encBody}`;
    const win = window.open(gmailUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = mailtoUri;
    }
  }
};

