/**
 * PREMIUM UZBEK SUNNAT TO'Y DIGITAL INVITATION — MUHAMMADALI
 * Core JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. HERO OPENING ANIMATION SEQUENCE
  const heroSection = document.getElementById('hero-section');
  
  // Trigger opening animation sequence
  setTimeout(() => {
    if (heroSection) {
      heroSection.classList.add('hero-loaded');
    }
  }, 100);

  // 2. CTA 2-PHASE SCREEN TRANSITION ("TAKLIFNOMANI OCHISH")
  const ctaBtn = document.getElementById('hero-cta-btn');
  const heroSectionEl = document.getElementById('hero-section');

  if (ctaBtn && heroSectionEl) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // 1. Start ambient oriental audio
      if (!isAudioPlaying && typeof playAmbientAudio === 'function') {
        playAmbientAudio();
      }

      // 2. Play closing exit animation on the Hero cover screen
      document.body.classList.add('is-transitioning');
      heroSectionEl.classList.add('hero-closing');

      // 3. Smoothly switch to the unlocked full invitation site
      setTimeout(() => {
        document.body.classList.remove('is-transitioning');
        document.body.classList.add('site-unlocked');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 750);
    });
  }

  // 3. COUNTDOWN TIMER ENGINE
  // Target Event Date: August 25, 2026 07:00:00 (Tashkent Time UTC+5)
  const targetDate = new Date('2026-08-25T07:00:00+05:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 4. ADD TO CALENDAR (ICS FILE GENERATION & GOOGLE CALENDAR)
  const calendarBtn = document.getElementById('add-calendar-btn');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const title = "Muhammadalining Sunnat To'yi";
      const description = "Muhammadalining Sunnat to'yi tantanasi va dasturxoni. Versal Tantanalar Saroyi, Toshkent.";
      const location = "Versal Tantanalar Saroyi, Toshkent sh., Navoiy ko'chasi";
      const startDate = "20260825T020000Z"; // 07:00 UTC+5 is 02:00 UTC
      const endDate = "20260825T180000Z";   // 23:00 UTC+5 is 18:00 UTC

      // Google Calendar URL
      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
      
      // Open Google Calendar in new tab
      window.open(googleCalUrl, '_blank');
      showToast("Tadbir taqvimingizga qo'shilmoqda... 📅");
    });
  }

  // 5. GALLERY LIGHTBOX MODAL
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (galleryCards && lightboxModal && lightboxImg && lightboxCaption) {
    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.gallery-img');
        const title = card.querySelector('.gallery-item-title');
        const sub = card.querySelector('.gallery-item-sub');

        if (img) {
          lightboxImg.src = img.src;
          lightboxCaption.textContent = title ? title.textContent : '';
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 6. COPY ADDRESS WITH TOAST
  const copyBtn = document.getElementById('copy-address-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const addressText = "Toshkent shahri, Shayxontohur tumani, Navoiy shoh ko'chasi, 'Versal' Tantanalar Saroyi";
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(addressText).then(() => {
          showToast("Manzil nusxalandi! 📋");
        }).catch(() => {
          fallbackCopyText(addressText);
        });
      } else {
        fallbackCopyText(addressText);
      }
    });
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast("Manzil nusxalandi! 📋");
    } catch (err) {
      showToast("Nusxa olish imkoni bo'lmadi");
    }
    document.body.removeChild(textArea);
  }

  // 7. TOAST NOTIFICATION UTILITY
  function showToast(message) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 8. PHONE NUMBER AUTO-MASK (+998)
  const phoneInput = document.getElementById('rsvp-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (!x[2]) {
        e.target.value = x[1] ? `+${x[1]}` : '+998';
      } else {
        e.target.value = `+998 (${x[2]}` + (x[3] ? `) ${x[3]}` : '') + (x[4] ? `-${x[4]}` : '') + (x[5] ? `-${x[5]}` : '');
      }
    });

    phoneInput.addEventListener('focus', () => {
      if (!phoneInput.value.trim()) {
        phoneInput.value = '+998 ';
      }
    });
  }

  // 9. RSVP FORM SUBMISSION & VIP PASS MODAL
  const rsvpForm = document.getElementById('rsvp-form');
  const vipModal = document.getElementById('vip-modal');
  const vipCloseBtn = document.getElementById('vip-modal-close');
  const vipGuestNameEl = document.getElementById('vip-card-name');
  const vipStatusEl = document.getElementById('vip-card-status');
  const vipTelegramBtn = document.getElementById('vip-telegram-btn');

  // Check if RSVP is already saved in localStorage
  const savedRsvp = localStorage.getItem('sunnat_rsvp_muhammadali');
  if (savedRsvp) {
    try {
      const data = JSON.parse(savedRsvp);
      const nameInput = document.getElementById('rsvp-name');
      if (nameInput) nameInput.value = data.name || '';
      if (phoneInput) phoneInput.value = data.phone || '';
    } catch (e) {}
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvp-name').value.trim();
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'Boraman';
      const guestCount = document.querySelector('input[name="guest_count"]:checked')?.value || '1';
      const wishes = document.getElementById('rsvp-wishes')?.value.trim() || '';

      if (!name) {
        showToast("Iltimos, ismingizni kiriting ✍️");
        return;
      }

      // Save to localStorage
      const rsvpData = { name, phone, attendance, guestCount, wishes, timestamp: new Date().toISOString() };
      localStorage.setItem('sunnat_rsvp_muhammadali', JSON.stringify(rsvpData));

      // Trigger Confetti
      launchGoldenConfetti();

      // Show VIP Modal
      if (vipModal && vipGuestNameEl && vipStatusEl) {
        vipGuestNameEl.textContent = name;
        vipStatusEl.innerHTML = attendance === 'Boraman' 
          ? `✨ Tashrifingiz tasdiqlandi (${guestCount} kishi)`
          : `🕊️ Hurmat bilan qabul qilindi`;

        // Configure Telegram Send Button
        if (vipTelegramBtn) {
          const text = encodeURIComponent(
            `🌟 Sunnat To'y Taklifnomasi — Muhammadali\n\n` +
            `👤 Hurmatli: ${name}\n` +
            `📞 Tel: ${phone}\n` +
            `✅ Holat: ${attendance === 'Boraman' ? "Albatta boramiz (" + guestCount + " kishi)" : "Afsuski, bora olmaymiz"}\n` +
            (wishes ? `💌 Tilaklar: ${wishes}\n` : '') +
            `\nKatta rahmat!`
          );
          vipTelegramBtn.href = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`;
        }

        vipModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      showToast("Tashakkur! Tashrifingiz tasdiqlandi ✨");
    });
  }

  if (vipCloseBtn && vipModal) {
    vipCloseBtn.addEventListener('click', () => {
      vipModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // 10. GOLDEN CONFETTI GENERATOR (VANILLA CANVAS)
  function launchGoldenConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#C6A15B', '#DFC285', '#F5EEDC', '#9D7D43', '#0A5A45', '#FFF'];
    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 150,
        y: canvas.height / 2,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 1.2) * 16,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        gravity: 0.35
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let aliveCount = 0;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.009;

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          aliveCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    render();
  }

  // 11. AMBIENT ORIENTAL AUDIO SYNTHESIZER / PLAYER
  let isAudioPlaying = false;
  let audioContext = null;
  let synthGain = null;
  let synthInterval = null;

  const audioToggleBtn = document.getElementById('audio-toggle-btn');

  function initWebAudioSynth() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      
      audioContext = new AudioContextClass();
      synthGain = audioContext.createGain();
      synthGain.gain.setValueAtTime(0.08, audioContext.currentTime);
      synthGain.connect(audioContext.destination);

      // Traditional Pentatonic Oriental Scale Notes (A Minor / Hijaz nuance)
      const notes = [220, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 523.25];

      function playOrientalChime() {
        if (!isAudioPlaying || !audioContext) return;
        
        const osc = audioContext.createOscillator();
        const noteGain = audioContext.createGain();
        
        // Warm mellow sine/triangle tone reminiscent of traditional Uzbek Nay / Tanbur
        osc.type = Math.random() > 0.4 ? 'sine' : 'triangle';
        const note = notes[Math.floor(Math.random() * notes.length)];
        osc.frequency.setValueAtTime(note, audioContext.currentTime);

        noteGain.gain.setValueAtTime(0, audioContext.currentTime);
        noteGain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.3);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 2.8);

        osc.connect(noteGain);
        noteGain.connect(synthGain);

        osc.start();
        osc.stop(audioContext.currentTime + 3.0);
      }

      synthInterval = setInterval(playOrientalChime, 1800);
      playOrientalChime();
    } catch (e) {
      console.log('Web Audio not supported or restricted');
    }
  }

  window.playAmbientAudio = function() {
    if (!audioContext) {
      initWebAudioSynth();
    } else if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    isAudioPlaying = true;
    if (audioToggleBtn) {
      audioToggleBtn.classList.add('audio-playing');
      audioToggleBtn.setAttribute('title', "Musiqani to'xtatish");
    }
  };

  window.pauseAmbientAudio = function() {
    if (audioContext && audioContext.state === 'running') {
      audioContext.suspend();
    }
    isAudioPlaying = false;
    if (audioToggleBtn) {
      audioToggleBtn.classList.remove('audio-playing');
      audioToggleBtn.setAttribute('title', "Musiqani yoqish");
    }
  };

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (isAudioPlaying) {
        pauseAmbientAudio();
        showToast("Musiqa to'xtatildi 🔇");
      } else {
        playAmbientAudio();
        showToast("Musiqa yoqildi 🎵");
      }
    });
  }

  // 12. INVITATION SHARING
  const shareTelegramBtn = document.getElementById('share-telegram-btn');
  const shareWhatsappBtn = document.getElementById('share-whatsapp-btn');
  const shareCopyLinkBtn = document.getElementById('share-copylink-btn');

  const shareText = "Muhammadalining Sunnat To'yiga lutfan taklif etamiz! 🌟";
  const shareUrl = window.location.href;

  if (shareTelegramBtn) {
    shareTelegramBtn.href = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  }

  if (shareWhatsappBtn) {
    shareWhatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  }

  if (shareCopyLinkBtn) {
    shareCopyLinkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast("Havola nusxalandi! 🔗");
        });
      } else {
        fallbackCopyText(shareUrl);
      }
    });
  }
});
