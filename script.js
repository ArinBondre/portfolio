(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const dropdownToggles = document.querySelectorAll('.nav-projects-toggle');

  if (!toggle || !links) return;
 
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('is-open');
  });

  dropdownToggles.forEach((dropdownToggle) => {
    const dropdown = dropdownToggle.closest('.nav-dropdown');
    if (!dropdown) return;

    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('is-dismissed');
    });

    dropdownToggle.addEventListener('click', () => {
      const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
      dropdownToggles.forEach((otherToggle) => {
        const otherDropdown = otherToggle.closest('.nav-dropdown');
        otherToggle.setAttribute('aria-expanded', 'false');
        if (otherDropdown) otherDropdown.classList.remove('is-open', 'is-dismissed');
      });
      dropdownToggle.setAttribute('aria-expanded', String(!expanded));
      dropdown.classList.toggle('is-open', !expanded);
    });
  });

  document.querySelectorAll('[data-clip-toggle]').forEach((clipToggle) => {
    const clip = clipToggle.closest('[data-image-clip]');
    const image = clip && clip.querySelector('[data-clip-image]');

    if (!image || !image.dataset.animatedSrc || !image.dataset.posterSrc || !clipToggle.dataset.clipName) return;

    clipToggle.addEventListener('click', () => {
      const isPlaying = clipToggle.getAttribute('aria-pressed') === 'true';
      image.src = isPlaying ? image.dataset.posterSrc : image.dataset.animatedSrc;
      clipToggle.setAttribute('aria-pressed', String(!isPlaying));
      clipToggle.textContent = isPlaying ? 'Play clip' : 'Pause clip';
      clipToggle.setAttribute('aria-label', `${isPlaying ? 'Play' : 'Pause'} ${clipToggle.dataset.clipName} clip`);
    });
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
      dropdownToggles.forEach((dropdownToggle) => {
        dropdownToggle.setAttribute('aria-expanded', 'false');
        const dropdown = dropdownToggle.closest('.nav-dropdown');
        if (dropdown) dropdown.classList.remove('is-open', 'is-dismissed');
      });
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openDropdown = Array.from(dropdownToggles).find((dropdownToggle) =>
        dropdownToggle.getAttribute('aria-expanded') === 'true'
      );
      if (openDropdown) {
        dropdownToggles.forEach((dropdownToggle) => {
          dropdownToggle.setAttribute('aria-expanded', 'false');
          const dropdown = dropdownToggle.closest('.nav-dropdown');
          if (dropdown) dropdown.classList.remove('is-open', 'is-dismissed');
        });
        const dropdown = openDropdown.closest('.nav-dropdown');
        if (dropdown) dropdown.classList.add('is-dismissed');
        openDropdown.focus();
      }
    }
  });
})();
