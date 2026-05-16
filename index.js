(() => {
  const sectionSelectors = ['#about', '#portfolio', '#resume', '#contact'];
  const sections = sectionSelectors
    .map((sel) => document.querySelector(sel))
    .filter((el) => el !== null);

  const progressEl = document.querySelector('.scroll-progress');
  const linkEls = Array.from(document.querySelectorAll('.scroll-links li'));

  if (!progressEl || sections.length === 0 || linkEls.length === 0) {
    return;
  }

  const updateProgress = () => {
    const scrollTop = window.scrollY || window.pageYOffset || 0;
    const doc = document.documentElement;
    const scrollHeight = doc.scrollHeight - window.innerHeight;
    const ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    const clamped = Math.min(Math.max(ratio, 0), 1);
    progressEl.style.height = `${clamped * 100}%`;
  };

  const updateActiveLink = () => {
    const scrollPos = window.scrollY || window.pageYOffset || 0;
    const offset = window.innerHeight * 0.25;

    let currentId = sections[0].id;

    sections.forEach((section) => {
      if (section.offsetTop - offset <= scrollPos) {
        currentId = section.id;
      }
    });

    const activeIndex = sections.findIndex((section) => section.id === currentId);

    linkEls.forEach((li, index) => {
      const target = li.getAttribute('data-target');
      if (target === `#${currentId}`) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }

      if (index <= activeIndex) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    });
  };

  const handleScroll = () => {
    updateProgress();
    updateActiveLink();
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', () => {
    updateProgress();
    updateActiveLink();
  });

  const cards = Array.from(document.querySelectorAll('.projects .project-card'));

  if (cards.length) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      cards.forEach((card) => observer.observe(card));
    } else {
      cards.forEach((card) => card.classList.add('is-visible'));
    }
  }

  linkEls.forEach((li) => {
    li.addEventListener('click', (e) => {
      const targetSelector = li.getAttribute('data-target');
      if (!targetSelector) return;
      const targetSection = document.querySelector(targetSelector);
      if (!targetSection) return;
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Initial state
  updateProgress();
  updateActiveLink();
})();

