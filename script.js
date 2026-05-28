document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. THEME SWITCHER (TAILWIND CLASS DARK / LIGHT MODE)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');

  // Check saved theme or system theme setting
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initial Theme State
  if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    document.documentElement.classList.remove('dark');
    sunIcon.classList.add('hidden');
    sunIcon.classList.remove('block');
    moonIcon.classList.remove('hidden');
    moonIcon.classList.add('block');
  } else {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove('hidden');
    sunIcon.classList.add('block');
    moonIcon.classList.add('hidden');
    moonIcon.classList.remove('block');
  }

  // Theme Toggle Listener
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
      sunIcon.classList.add('hidden');
      sunIcon.classList.remove('block');
      moonIcon.classList.remove('hidden');
      moonIcon.classList.add('block');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
      sunIcon.classList.remove('hidden');
      sunIcon.classList.add('block');
      moonIcon.classList.add('hidden');
      moonIcon.classList.remove('block');
    }
  });


  // ==========================================================================
  // 2. MOBILE MENU DRAWER
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileDrawerLinks = mobileDrawer.querySelectorAll('.nav-link');

  const openDrawer = () => {
    mobileDrawerOverlay.classList.remove('hidden');
    setTimeout(() => {
      mobileDrawerOverlay.classList.add('opacity-100');
    }, 10);
    mobileDrawer.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawerOverlay.classList.remove('opacity-100');
    mobileDrawer.classList.add('translate-x-full');
    document.body.style.overflow = '';
    setTimeout(() => {
      mobileDrawerOverlay.classList.add('hidden');
    }, 300);
  };

  mobileMenuBtn.addEventListener('click', openDrawer);
  mobileDrawerClose.addEventListener('click', closeDrawer);
  mobileDrawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on click links
  mobileDrawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  // ==========================================================================
  // 3. SMOOTH SCROLL & ACTIVE LINK HIGHLIGHTER
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  const sections = document.querySelectorAll('section');
  const desktopLinks = document.querySelectorAll('#nav-menu-desktop .nav-link');

  window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    desktopLinks.forEach(link => {
      link.classList.remove('text-primary', 'font-bold');
      link.classList.add('text-on-surface-variant');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-primary', 'font-bold');
        link.classList.remove('text-on-surface-variant');
      }
    });
  });


  // ==========================================================================
  // 4. RESUME PREVIEW MODAL & HIGH-QUALITY PDF GENERATION/PRINTING
  // ==========================================================================
  const resumeModal = document.getElementById('resume-modal');
  const downloadResumeHero = document.getElementById('download-resume-hero');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDownloadBtn = document.getElementById('modal-download-btn');

  const openModal = () => {
    resumeModal.classList.remove('pointer-events-none');
    resumeModal.classList.add('opacity-100', 'pointer-events-auto');
    resumeModal.querySelector('.modal-card').classList.remove('translate-y-4');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    resumeModal.classList.add('pointer-events-none');
    resumeModal.classList.remove('opacity-100', 'pointer-events-auto');
    resumeModal.querySelector('.modal-card').classList.add('translate-y-4');
    document.body.style.overflow = '';
  };

  downloadResumeHero.addEventListener('click', openModal);
  modalCloseBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside card overlay
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  // Handle ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('pointer-events-auto')) {
      closeModal();
    }
  });

  // Print function matching the exact structured sheet style
  modalDownloadBtn.addEventListener('click', () => {
    const resumeContent = document.querySelector('.resume-sheet').innerHTML;
    
    // Open printable viewport window
    const printWindow = window.open('', '_blank', 'width=850,height=1100');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Mohamed Jama - Resume</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              color: #1f2937;
              background-color: #ffffff;
              padding: 40px;
              line-height: 1.5;
            }
            .resume-sheet-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              border-bottom: 2px solid #1f2937;
              padding-bottom: 16px;
              margin-bottom: 24px;
            }
            .resume-sheet-name {
              font-size: 28px;
              color: #111827;
              font-weight: 800;
              margin: 0 0 4px 0;
            }
            .resume-sheet-title {
              font-size: 15px;
              color: #4b5563;
              font-weight: 600;
              margin: 0;
            }
            .resume-sheet-contact {
              font-size: 12px;
              color: #6b7280;
              text-align: right;
              line-height: 1.4;
            }
            .resume-sheet-section {
              margin-bottom: 24px;
            }
            .resume-sheet-section-title {
              font-size: 14px;
              text-transform: uppercase;
              color: #111827;
              border-bottom: 1px solid #d1d5db;
              padding-bottom: 4px;
              margin-bottom: 12px;
              letter-spacing: 0.05em;
              font-weight: 700;
            }
            .resume-sheet-item {
              margin-bottom: 16px;
              font-size: 13px;
            }
            .resume-sheet-item-header {
              display: flex;
              justify-content: space-between;
              font-size: 13px;
              color: #111827;
              font-weight: 700;
              margin-bottom: 4px;
            }
            .resume-sheet-skills-list {
              font-size: 13px;
              color: #374151;
              line-height: 1.6;
            }
            p {
              color: #4b5563;
              margin: 4px 0 0 0;
            }
            ul {
              margin: 6px 0 0 16px;
              padding: 0;
              color: #374151;
            }
            li {
              margin-bottom: 6px;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-sheet">
            ${resumeContent}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  });


  // ==========================================================================
  // 5. CONTACT FORM INTERACTION & SUCCESS ANIMATION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const submitText = submitBtn.querySelector('span');
  const successIcon = submitBtn.querySelector('svg');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Loading State
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitBtn.style.opacity = '0.8';
    
    setTimeout(() => {
      // Success State Transitions
      submitText.textContent = 'Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      submitBtn.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.4)';
      successIcon.classList.remove('hidden');
      
      // Reset Form Fields
      contactForm.reset();
      
      // Revert Button styling back to normal after 3.5s
      setTimeout(() => {
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
        submitBtn.style.background = '';
        submitBtn.style.boxShadow = '';
        submitBtn.style.opacity = '';
        successIcon.classList.add('hidden');
      }, 3500);
      
    }, 1200);
  });
});
