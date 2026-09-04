/**
 * ZFlip Cover Power — Interactive Cover Simulator & Dynamic Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Cover Screen Clock
  function updateCoverClock() {
    const clockEl = document.getElementById('coverClock');
    const dateEl = document.getElementById('coverDate');
    if (!clockEl) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    clockEl.innerHTML = `${hours}:${minutes} <span style="font-size:1.1rem; color:var(--text-secondary);">${ampm}</span>`;

    if (dateEl) {
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('en-US', options);
    }
  }

  setInterval(updateCoverClock, 1000);
  updateCoverClock();

  // 2. Interactive App Simulator on Flex Window
  const appButtons = document.querySelectorAll('.cover-app-icon');
  const simViews = document.querySelectorAll('.simulated-app-view');
  const backButtons = document.querySelectorAll('.sim-back-btn');

  appButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetApp = btn.dataset.app;
      if (!targetApp) return;

      simViews.forEach(view => view.classList.remove('active'));
      const activeView = document.getElementById(`sim-${targetApp}`);
      if (activeView) {
        activeView.classList.add('active');
      }
    });
  });

  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      simViews.forEach(view => view.classList.remove('active'));
    });
  });

  // 3. Mini Spotify Player Controls in Simulator
  const playBtn = document.getElementById('simPlayBtn');
  const eqBars = document.querySelectorAll('.eq-bar');
  let isPlaying = true;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? '⏸' : '▶';
      eqBars.forEach(bar => {
        bar.style.animationPlayState = isPlaying ? 'running' : 'paused';
      });
    });
  }

  // 4. Quick Settings Toggles in Simulator
  const quickToggles = document.querySelectorAll('.sim-toggle');
  quickToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
    });
  });

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 6. Privacy Policy Modal
  const modal = document.getElementById('privacyModal');
  const openButtons = document.querySelectorAll('[data-modal="privacy"]');
  const closeBtn = document.getElementById('modalClose');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('open');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
});
