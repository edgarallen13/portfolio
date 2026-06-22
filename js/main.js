(function () {
  'use strict';

  /* =========================================
     Project Data
  ========================================= */
  const projects = [
    {
      title: 'Trackr',
      description: 'A cross-platform fitness tracking app with real-time workout logging, progress analytics, and social challenges.',
      tags: ['React Native', 'TypeScript', 'Firebase', 'Node.js'],
      github: '#',
      demo: '#',
      image: 'assets/images/project_trackr.png'
    },
    {
      title: 'PixelPerfect',
      description: 'AI-powered photo editing mobile app with filters, retouching tools, and batch processing capabilities.',
      tags: ['Flutter', 'Dart', 'TensorFlow Lite', 'AWS'],
      github: '#',
      demo: '#',
      image: 'assets/images/project_pixelperfect.png'
    },
    {
      title: 'ChatSync',
      description: 'Real-time messaging platform with end-to-end encryption, file sharing, and group collaboration features.',
      tags: ['SwiftUI', 'WebSocket', 'Supabase', 'Kotlin'],
      github: '#',
      demo: '#',
      image: 'assets/images/project_chatsync.png'
    },
  ];

  /* =========================================
     Blog Data
  ========================================= */
  const blogPosts = [
    {
      title: 'Building Performant React Native Apps',
      date: 'May 12, 2026',
      excerpt: 'Tips and patterns for optimizing React Native applications — from list virtualization to memory management.',
      url: '#',
    },
    {
      title: 'Why Flutter Won Me Over',
      date: 'Mar 28, 2026',
      excerpt: 'A deep dive into Flutter\'s architecture, widget system, and why it\'s my go-to for cross-platform development.',
      url: '#',
    },
    {
      title: 'Designing Accessible Mobile Interfaces',
      date: 'Jan 15, 2026',
      excerpt: 'Accessibility isn\'t optional. Here\'s how I approach inclusive design for mobile applications.',
      url: '#',
    },
  ];

  /* =========================================
     Typewriter Phrases
  ========================================= */
  const typewriterPhrases = [
    'cross-platform mobile experiences',
    'beautiful iOS applications',
    'performant Android apps',
    'delightful user interfaces',
    'scalable app architectures',
  ];

  /* =========================================
     DOM References
  ========================================= */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

  const html = document.documentElement;
  const header = $('.header');
  const themeToggle = $('#themeToggle');
  const menuToggle = $('#menuToggle');
  const navLinks = $('#navLinks');
  const typewriterEl = $('#typewriter');
  const projectsGrid = $('#projectsGrid');
  const blogGrid = $('#blogGrid');
  const contactForm = $('#contactForm');
  const formStatus = $('#formStatus');

  /* =========================================
     Theme Management
  ========================================= */
  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  setTheme(getPreferredTheme());

  themeToggle.addEventListener('click', toggleTheme);

  /* =========================================
     Mobile Menu
  ========================================= */
  function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    html.style.overflow = isOpen ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', function () {
    toggleMenu();
  });

  $$('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggleMenu(false);
      menuToggle.focus();
    }
  });

  /* =========================================
     Header Scroll State
  ========================================= */
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    if (y > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = y;
  }, { passive: true });

  /* =========================================
     Smooth Scroll for Anchor Links
  ========================================= */
  $$('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* =========================================
     Scroll Spy
  ========================================= */
  function updateActiveNav() {
    const sections = $$('section[id]');
    const navLinkEls = $$('.nav-link');
    let current = '';

    sections.forEach(function (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200) {
        current = section.getAttribute('id');
      }
    });

    navLinkEls.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('load', updateActiveNav);

  /* =========================================
     Typewriter Effect
  ========================================= */
  function typewriter() {
    if (!typewriterEl) return;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function tick() {
      const currentPhrase = typewriterPhrases[phraseIndex];

      if (isPaused) {
        isPaused = false;
        isDeleting = true;
        setTimeout(tick, 200);
        return;
      }

      if (!isDeleting) {
        charIndex++;
        typewriterEl.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex === currentPhrase.length) {
          isPaused = true;
          setTimeout(tick, 2500);
          return;
        }
        setTimeout(tick, 60 + Math.random() * 40);
      } else {
        charIndex--;
        typewriterEl.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 30 + Math.random() * 20);
      }
    }

    tick();
  }

  if (typewriterEl) typewriter();

  /* =========================================
     Render Projects
  ========================================= */
  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = projects.map(function (project, index) {
      return `
        <article class="project-card" data-delay="${index * 100}" role="article">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title} Interface Mockup">
          </div>
          <div class="project-body">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
              ${project.tags.map(function (tag) { return '<span class="project-tag">' + tag + '</span>'; }).join('')}
            </div>
            <div class="project-links">
              <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                Source
              </a>
              <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  renderProjects();

  /* =========================================
     Render Blog Posts
  ========================================= */
  function renderBlog() {
    if (!blogGrid) return;
    blogGrid.innerHTML = blogPosts.map(function (post, index) {
      return `
        <article class="blog-card" data-delay="${index * 100}" role="article">
          <span class="blog-date">${post.date}</span>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <a href="${post.url}" class="blog-read-more" aria-label="Read more about ${post.title}">
            Read Article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </article>
      `;
    }).join('');
  }

  renderBlog();

  /* =========================================
     Scroll Animations (IntersectionObserver)
  ========================================= */
  function setupScrollAnimations() {
    if (!window.IntersectionObserver) {
      $$('.project-card, .blog-card, .timeline-item, .skills-card, .skill-fill, .fade-in-up, .stat-number').forEach(function (el) {
        el.classList.add('visible');
        if (el.classList.contains('skill-fill')) el.classList.add('animated');
      });
      return;
    }

    // Cards and timeline items
    const animateElements = $$('.project-card, .blog-card, .timeline-item, .skills-card, .fade-in-up');

    /* Skill bars */
    const skillBars = $$('.skill-fill');

    /* Stat counters */
    const statNumbers = $$('.stat-number');

    function handleIntersection(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-delay')) || 0;

          setTimeout(function () {
            el.classList.add('visible');
          }, delay);

          // Animate skill bars within this element
          var bars = el.querySelectorAll('.skill-fill');
          bars.forEach(function (bar, i) {
            setTimeout(function () {
              bar.classList.add('animated');
            }, delay + i * 100);
          });

          // Count stats within this element
          var stats = el.querySelectorAll('.stat-number');
          stats.forEach(function (stat) {
            animateCounterEased(stat);
          });

          observer.unobserve(el);
        }
      });
    }

    var observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1,
    });

    animateElements.forEach(function (el) {
      observer.observe(el);
    });

    // Also observe skill bars directly for standalone skill section
    skillBars.forEach(function (bar) {
      var parent = bar.closest('.skill-category');
      if (!parent) return;
      if (animateElements.indexOf(parent) === -1) {
        // If parent is not being observed, observe the skill-category instead
        observer.observe(parent);
      }
    });

    // Observe stat numbers in about section
    var aboutSection = document.querySelector('.about');
    if (aboutSection) {
      statNumbers.forEach(function (stat) {
        var parentSection = stat.closest('.about');
        if (parentSection) {
          observer.observe(parentSection);
        }
      });
    }
  }

  /* =========================================
     Animated Counter
  ========================================= */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'));
    if (isNaN(target) || target === 0) {
      el.textContent = target || '0';
      return;
    }
    var current = 0;
    var increment = Math.max(1, Math.floor(target / 40));
    var duration = 1200;
    var stepTime = Math.floor(duration / (target / increment));

    if (el.dataset.animated) return;
    el.dataset.animated = 'true';

    function update() {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = current;
      setTimeout(update, stepTime);
    }

    update();
  }

  setupScrollAnimations();

  /* =========================================
     Contact Form Validation
  ========================================= */
  if (contactForm) {
    var formInputs = $$('#contactForm input, #contactForm textarea');

    function validateField(field) {
      var errorEl = field.parentElement.querySelector('.form-error');
      if (!errorEl) return true;

      var value = field.value.trim();
      var isValid = true;
      var message = '';

      if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
      } else if (field.type === 'email' && value) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          message = 'Please enter a valid email address';
        }
      }

      field.classList.toggle('error', !isValid && value !== undefined);
      errorEl.textContent = message;
      errorEl.classList.toggle('visible', !isValid);

      return isValid;
    }

    formInputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        validateField(this);
      });
      input.addEventListener('input', function () {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var allValid = true;
      formInputs.forEach(function (input) {
        if (!validateField(input)) {
          allValid = false;
        }
      });

      if (!allValid) {
        formStatus.textContent = 'Please fix the errors above.';
        formStatus.className = 'form-status error';
        return;
      }

      // Honeypot check
      var hp = $('#hp-field');
      if (hp && hp.value) {
        formStatus.textContent = 'Thank you! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
        return;
      }

      // Simulate submission
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        formStatus.textContent = 'Thank you! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 1200);
    });
  }

  /* =========================================
     Cursor Spotlight on Cards
  ========================================= */
  function setupSpotlight() {
    var cards = $$('.project-card, .skills-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = this.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        this.style.setProperty('--mx', x + '%');
        this.style.setProperty('--my', y + '%');
      });
    });
  }

  setupSpotlight();

  /* =========================================
     Scroll Progress Bar
  ========================================= */
  function setupScrollProgress() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var total = h.scrollHeight - h.clientHeight;
      var pct = (h.scrollTop || document.body.scrollTop) / total;
      bar.style.width = (pct * 100) + '%';
    }, { passive: true });
  }

  setupScrollProgress();

  /* =========================================
     Enhanced Counter with Easing
  ========================================= */
  function animateCounterEased(el) {
    var target = parseInt(el.getAttribute('data-count'));
    if (isNaN(target) || target === 0) {
      el.textContent = target || '0';
      return;
    }
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';

    var duration = 1500;
    var startTime = null;

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = easeOutExpo(progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  /* =========================================
     Parallax on Scroll
  ========================================= */
  function setupParallax() {
    var parallaxEls = $$('[data-parallax]');
    if (!parallaxEls.length) return;

    window.addEventListener('scroll', function () {
      var sy = window.scrollY;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          var offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
          el.style.transform = 'translateY(' + offset + 'px)';
        }
      });
    }, { passive: true });
  }

  setupParallax();

  /* =========================================
     Global Background Spotlight
     ========================================= */
  function setupBgSpotlight() {
    var bgVisuals = $('.bg-visuals');
    var bgGlow = $('#bgGlow');
    if (!bgVisuals || !bgGlow) return;

    var fadeTimeout = null;

    document.addEventListener('mousemove', function (e) {
      bgVisuals.style.setProperty('--mouse-x', e.clientX + 'px');
      bgVisuals.style.setProperty('--mouse-y', e.clientY + 'px');

      bgGlow.classList.add('active');

      clearTimeout(fadeTimeout);
      fadeTimeout = setTimeout(function () {
        bgGlow.classList.remove('active');
      }, 2000);
    });

    document.addEventListener('mouseleave', function () {
      bgGlow.classList.remove('active');
    });
  }

  setupBgSpotlight();

  /* =========================================
     Keyboard Accessibility
  ========================================= */
  $$('[tabindex], a, button, input, textarea').forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && this.tagName !== 'TEXTAREA') {
        this.click();
      }
    });
  });

})();
