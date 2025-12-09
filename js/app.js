// Álbum Interativo para Aldinete
// Todas as interações e animações principais estão aqui.

(() => {
  'use strict';

  // ======= Configurações =======
  // Altere esta data para a data real do relacionamento (AAAA-MM-DD)
  const START_DATE_STR = '2023-03-26'; // ajuste aqui
  const START_DATE = new Date(START_DATE_STR + 'T00:00:00');
  let STARS_ENABLED = true; // alternância das estrelas de fundo

  // Mensagens de declarações
  const DECLARATIONS = [
    'Te amo mais a cada dia',
    'Você é meu maior presente',
    'minha alegria é você',
    'Obrigado por existir na minha vida',
    'Com você, tudo é mais colorido e feliz',
    'Meu lugar favorito é ao seu lado',
    'Você ilumina meus dias e acalma minhas noites',
    'Se a vida é um livro, com você cada página tem mais brilho e sentido',
    'Eu escolheria você em todas as versões do futuro',
    'Seu sorriso é o meu nascer do sol; sua voz, o meu abrigo',
    'Amar você é a minha certeza mais bonita',
    'Entre bilhões de batidas, meu coração aprendeu a dançar no compasso do seu',
    'Prometo cuidar de você nos dias de tempestade e celebrar você em todos os amanheceres',
    'Quando penso em casa, penso nos seus braços',
    'Você é a poesia que meu coração sempre quis escrever',
  ];

  // Legendas das fotos da galeria
  const GALLERY_CAPTIONS = [
    'Meu melhor sorriso ao seu lado - O dia em que descobri que nada faz mais sentido do que estar com você.',
    'O abraço que cura tudo - Em seus braços encontro meu refúgio, minha paz, meu mundo inteiro.',
    'Risos que ecoam no coração - Cada momento de alegria ao seu lado fica guardado para sempre.',
    'Olhares que prometem eternidade - Quando nossos olhos se encontram, o universo inteiro para.',
    'A aventura de amar você - Cada dia contigo é uma nova descoberta, um novo motivo para amar mais.',
    'Meu lugar favorito no mundo - Onde quer que você esteja, ali é meu paraíso, meu lar.'
  ];

  // Surpresas possíveis
  const SURPRISES = [
    'Você é o melhor presente que a vida me deu ❤️',
    'Seu sorriso ilumina até os dias mais cinzentos 🌟',
    'Amo você mais do que palavras podem expressar 💕',
    'Cada momento ao seu lado é pura magia ✨',
    'Você é minha pessoa favorita no mundo inteiro 🌍',
    'Meu coração bate mais forte quando perto de você 💓',
  ];

  // ======= Quiz do casal =======
  const QUIZ = [
    { q: 'Quem mandou a primeira mensagem?', a: ['Victor', 'Aldinete', 'Nós dois'], c: 0 },
    { q: 'Quem disse "eu te amo" primeiro?', a: ['Victor', 'Aldinete', 'Ao mesmo tempo'], c: 0 },
    { q: 'Quem é mais carinhoso?', a: ['Victor', 'Aldinete', 'Nós dois'], c: 1 },
    { q: 'Quem dorme mais?', a: ['Victor', 'Aldinete', 'Empate'], c: 1 },
    { q: 'Quem ama mais?', a: ['Victor', 'Aldinete', 'O amor é igual'], c: 2 },
  ];

  const initQuiz = () => {
    const card = document.getElementById('quizCard');
    const qEl = document.getElementById('quizQuestion');
    const optsEl = document.getElementById('quizOptions');
    const nextBtn = document.getElementById('quizNext');
    const prog = document.getElementById('quizProgress');
    if (!card || !qEl || !optsEl || !nextBtn || !prog) return;

    let i = 0; let score = 0; let selected = -1;

    const render = () => {
      const item = QUIZ[i];
      qEl.textContent = item.q;
      optsEl.innerHTML = '';
      selected = -1;
      item.a.forEach((txt, idx) => {
        const b = document.createElement('button');
        b.className = 'quiz-option';
        b.textContent = txt;
        b.addEventListener('click', () => {
          playClick();
          selected = idx;
          Array.from(optsEl.children).forEach(c => c.classList.remove('selected'));
          b.classList.add('selected');
          nextBtn.disabled = false; // Habilita o botão Próximo ao selecionar uma opção
        });
        optsEl.appendChild(b);
      });
      nextBtn.disabled = selected === -1;
      prog.textContent = `Pergunta ${i+1} de ${QUIZ.length}`;
    };

    const finish = () => {
      qEl.textContent = `Você acertou ${score}/${QUIZ.length} `;
      optsEl.innerHTML = '';
      nextBtn.disabled = true;
      popConfettiSlow(document.body, 200);
    };

    nextBtn.addEventListener('click', () => {
      if (selected === -1) return;
      playClick();
      if (i < QUIZ.length - 1) {
        i++;
        render();
      } else {
        finish();
      }
    });

    render();
  };

  // ======= Utilitários =======
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const playClick = () => {
    const click = $('#clickSound');
    if (!click) return;
    try { 
      click.currentTime = 0; 
      // Tenta tocar, mas ignora erro 416 (Range Not Satisfiable)
      click.play().catch(e => {
        // Ignora erros de áudio, especialmente 416
      }); 
    } catch (e) {
      // Ignora qualquer erro de áudio
    }
  };

  // ======= Evitar zoom por gesto/double-tap (fallback) =======
  const preventMobileZoom = () => {
    // Bloqueia gesto de pinça no iOS Safari
    document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
    // Bloqueia double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      // Evita cancelar interação em controles de UI
      const isControl = !!(e.target && (/** @type {Element} */(e.target)).closest && (/** @type {Element} */(e.target)).closest('button, a, input, textarea, select, label'));
      if (!isControl && now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
  };

  // Confete romântico mais suave e lento
  const popConfettiSlow = (root, count = 160) => {
    const isSmall = window.innerWidth < 480;
    const N = isSmall ? Math.max(60, Math.floor(count * 0.5)) : count;
    
    // Adicionar corações extras
    for (let i = 0; i < N/2; i++) {
      const heart = document.createElement('span');
      heart.textContent = '❤️';
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = '-28px';
      heart.style.fontSize = (Math.random()*15 + 12) + 'px';
      heart.style.zIndex = '60';
      heart.style.opacity = '.9';
      heart.style.pointerEvents = 'none';
      heart.style.transition = 'transform 4s ease-out, opacity 4s ease-out';
      heart.style.transform = `translateY(105vh) rotate(${Math.random()*720}deg) scale(${Math.random()*0.8+0.8})`;
      root.appendChild(heart);
      setTimeout(() => {
        heart.style.opacity = '0';
        setTimeout(() => heart.remove(), 4000);
      }, 100);
    }
    
    // Confete tradicional
    for (let i = 0; i < N/2; i++) {
      const c = document.createElement('i');
      c.style.position = 'fixed';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.top = '-28px';
      const w = (Math.random()*(isSmall?4:6) + (isSmall?4:6));
      const h = (Math.random()*(isSmall?8:10) + (isSmall?8:10));
      c.style.width = w + 'px';
      c.style.height = h + 'px';
      // Cores românticas: rosa, vermelho, dourado
      const romanticColors = ['#ff4f6d', '#ff6b9d', '#ffd93d', '#ff9999', '#ff69b4'];
      c.style.background = romanticColors[Math.floor(Math.random() * romanticColors.length)];
      c.style.transform = `rotate(${Math.random()*360}deg)`;
      const dur = (isSmall ? 4.5 : 5) + Math.random()* (isSmall ? 2.5 : 3);
      c.style.animation = `confFallSlow ${dur}s linear forwards`;
      c.style.zIndex = '60';
      c.style.borderRadius = '2px';
      c.style.opacity = '.95';
      root.appendChild(c);
      setTimeout(() => c.remove(), (dur+1) * 1000);
    }

    const styleId = 'confetti-style-slow';
    if (!document.getElementById(styleId)) {
      const st = document.createElement('style');
      st.id = styleId;
      st.textContent = `@keyframes confFallSlow { to { transform: translateY(105vh) rotate(1080deg); opacity: .9; } }`;
      document.head.appendChild(st);
    }
  };

  // ======= Corações ao redor de um elemento =======
  const popHeartsAround = (el, count = 24) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = Math.max(rect.width, rect.height) * 0.65;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
      const r = radius * (0.7 + Math.random() * 0.5);
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      const s = document.createElement('span');
      s.textContent = '';
      s.style.position = 'fixed';
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;
      s.style.fontSize = (Math.random() * 14 + 14) + 'px';
      s.style.opacity = '0';
      s.style.transform = 'scale(.8)';
      s.style.transition = 'transform .6s ease, opacity .6s ease';
      s.style.color = '#ff4f6d';
      s.style.pointerEvents = 'none';
      s.style.zIndex = '60';
      document.body.appendChild(s);
      // Animação de surgimento e leve fuga
      requestAnimationFrame(() => {
        s.style.opacity = '1';
        s.style.transform = `translate(${(Math.random()-0.5)*28}px, ${(Math.random()-0.5)*28}px) scale(1.2)`;
      });
      setTimeout(() => {
        s.style.opacity = '0';
        s.style.transform += ' scale(0.9)';
        setTimeout(() => s.remove(), 500);
      }, 1200 + Math.random()*400);
    }
  };

  // ======= Navegação suave =======
  const initSmoothNav = () => {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    const scrollToId = (id) => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    links.forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href') || '';
        const id = href.startsWith('#') ? href.slice(1) : '';
        if (!id) return;
        e.preventDefault();
        playClick();
        history.pushState(null, '', `#${id}`);
        scrollToId(id);
      });
    });

    // Ao carregar/recarregar: sempre começar no topo, limpando o hash
    if (location.hash) {
      history.replaceState(null, '', location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // ======= PIN Overlay & Surpresa Total =======
  const SECRET_PIN = '260323'; // PIN de acesso
  const openPinOverlay = (mode = 'gate') => {
    const overlay = document.getElementById('pinOverlay');
    const backdrop = document.getElementById('pinBackdrop');
    const form = document.getElementById('pinForm');
    const input = document.getElementById('pinInput');
    const msg = document.getElementById('pinMsg');
    if (!overlay || !form || !input) return;
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    msg.textContent = '';
    input.value = '';
    setTimeout(() => input.focus(), 50);

    const close = () => {
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      form.removeEventListener('submit', onSubmit);
    };
    // Importante: não fechar ao clicar fora. O PIN só fecha quando for correto.

    const onSubmit = (e) => {
      e.preventDefault();
      const val = (input.value || '').trim();
      if (val === SECRET_PIN) {
        msg.textContent = 'Desbloqueado!';
        // Confete com transição lenta ao acertar o PIN
        popConfettiSlow(document.body, 180);
        if (mode === 'surprise') {
          activateTotalSurprise();
        } else {
          // Gate simples: apenas rolar para a capa
          const header = document.getElementById('capa');
          if (header) header.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => close(), 400);
      } else {
        msg.textContent = 'PIN incorreto. Tente novamente.';
      }
    };

    form.addEventListener('submit', onSubmit);
  };

  const activateTotalSurprise = () => {
    // Tocar música
    const audio = /** @type {HTMLAudioElement} */ (document.getElementById('audioPlayer'));
    if (audio) {
      try { audio.play(); } catch {}
    }
    // Confetes e corações
    popConfetti(document.body, 220);
    popHearts(document.body, 80);
    // Mensagem e rolagem suave até a capa
    const out = document.getElementById('surpriseOutput');
    if (out) out.textContent = 'Mensagem secreta: Você é meu para sempre! ❤';
    const header = document.getElementById('capa');
    if (header) header.scrollIntoView({ behavior: 'smooth' });
  };
  const setYear = () => { $('#year').textContent = new Date().getFullYear(); };

  const setStartDateLabel = () => {
    const d = START_DATE;
    const label = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
    $('#startDateLabel').textContent = label;
  };

  // ======= Partículas (corações) =======
  const initParticles = () => {
    const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('particles'));
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    // Estrelas cintilantes (fundo)
    const stars = [];
    const STAR_COUNT = Math.min(160, Math.floor(W / 6));
    const starParallax = { x: 0, y: 0, tx: 0, ty: 0 };

    // Corações flutuantes (frente) - aumentado para mais romantismo
    const hearts = [];
    const HEART_COUNT = Math.min(150, Math.floor(W / 12)); // Mais corações

    const rand = (min, max) => Math.random() * (max - min) + min;

    const createHeart = () => ({
      x: rand(0, W),
      y: rand(H * 0.2, H),
      size: rand(6, 16),
      speedY: rand(0.15, 0.6),
      speedX: rand(-0.2, 0.2),
      alpha: rand(0.4, 0.9),
      hue: rand(330, 360), // rosa/verm
    });

    const createStar = () => ({
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.6, 1.8),
      baseA: rand(0.4, 0.9),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.003, 0.01),
      hue: rand(300, 360), // levemente rosado
    });

    for (let i = 0; i < STAR_COUNT; i++) stars.push(createStar());
    for (let i = 0; i < HEART_COUNT; i++) hearts.push(createHeart());

    const drawHeart = (x, y, s, a, hue) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s / 16, s / 16);
      ctx.beginPath();
      // Coração simples com Bezier
      ctx.moveTo(0, 6);
      ctx.bezierCurveTo(0, -2, -12, -2, -12, 6);
      ctx.bezierCurveTo(-12, 12, -6, 16, 0, 20);
      ctx.bezierCurveTo(6, 16, 12, 12, 12, 6);
      ctx.bezierCurveTo(12, -2, 0, -2, 0, 6);
      ctx.closePath();
      ctx.fillStyle = `hsla(${hue}, 85%, 65%, ${a})`;
      ctx.shadowColor = 'rgba(255,105,180,0.5)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (s) => {
      const alpha = s.baseA * (0.6 + 0.4 * Math.sin(s.phase));
      const px = s.x + starParallax.x * 0.06;
      const py = s.y + starParallax.y * 0.04;
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue}, 85%, 88%, ${alpha})`;
      ctx.shadowColor = 'rgba(255, 200, 240, 0.6)';
      ctx.shadowBlur = 6;
      ctx.fill();
      s.phase += s.speed;
      if (s.phase > Math.PI * 2) s.phase -= Math.PI * 2;
    };

    const step = () => {
      ctx.clearRect(0, 0, W, H);
      // Parallax lerp
      starParallax.x += (starParallax.tx - starParallax.x) * 0.06;
      starParallax.y += (starParallax.ty - starParallax.y) * 0.06;
      // Fundo: estrelas
      if (STARS_ENABLED) {
        for (const s of stars) drawStar(s);
      }
      // Frente: corações
      for (const h of hearts) {
        h.y -= h.speedY;
        h.x += h.speedX;
        if (h.y < -20 || h.x < -20 || h.x > W + 20) {
          Object.assign(h, createHeart(), { y: H + 20 });
        }
        drawHeart(h.x, h.y, h.size, h.alpha, h.hue);
      }
      requestAnimationFrame(step);
    };

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const onMouseMove = (e) => {
      starParallax.tx = (e.clientX - W / 2) / 2;
      starParallax.ty = (e.clientY - H / 2) / 2;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    step();
  };

  // ======= Controle de Estrelas =======
  const initStarsControls = () => {
    const btn = document.getElementById('btnToggleStars');
    if (!btn) return;
    const sync = () => {
      btn.setAttribute('aria-pressed', STARS_ENABLED ? 'true' : 'false');
      btn.textContent = STARS_ENABLED ? 'Estrelas ON ' : 'Estrelas OFF ';
    };
    btn.addEventListener('click', () => {
      playClick();
      STARS_ENABLED = !STARS_ENABLED;
      sync();
    });
    sync();
  };

  // ======= Reveal on Scroll =======
  const initRevealOnScroll = () => {
    const sections = Array.from(document.querySelectorAll('.section'));
    sections.forEach(s => s.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
        }
      }
    }, { threshold: 0.12 });

    sections.forEach(s => io.observe(s));
  };

  // ======= Contador de relacionamento =======
  const initCounter = () => {
    const elYears = $('#years');
    const elMonths = $('#months');
    const elDays = $('#days');
    const elTotal = $('#totalDays');
    // Se a seção de contador não existir, não inicializa
    if (!elYears || !elMonths || !elDays || !elTotal) return;

    const update = () => {
      const now = new Date();
      let years = now.getFullYear() - START_DATE.getFullYear();
      let months = now.getMonth() - START_DATE.getMonth();
      let days = now.getDate() - START_DATE.getDate();

      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonth;
        months -= 1;
      }
      if (months < 0) {
        months += 12;
        years -= 1;
      }

      const totalDays = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));

      elYears.textContent = years.toString();
      elMonths.textContent = months.toString();
      elDays.textContent = days.toString();
      elTotal.textContent = totalDays.toString();
    };

    update();
    setInterval(update, 60 * 1000); // atualiza a cada minuto
  };

  // ======= Typewriter =======
  const initTypewriter = () => {
    const box = $('#typewriter');
    const btnPrev = $('#btnPrevMsg');
    const btnNext = $('#btnNextMsg');
    const btnRandom = $('#btnShuffleMsg');

    let idx = 0;
    let typing = false;

    const type = async (text) => {
      typing = true;
      box.textContent = '';
      for (let i = 0; i < text.length; i++) {
        box.textContent += text[i];
        await new Promise(r => setTimeout(r, 22));
      }
      typing = false;
    };

    const show = (i) => {
      idx = (i + DECLARATIONS.length) % DECLARATIONS.length;
      type(DECLARATIONS[idx]);
    };

    btnPrev.addEventListener('click', () => { if (!typing) { playClick(); show(idx - 1); } });
    btnNext.addEventListener('click', () => { if (!typing) { playClick(); show(idx + 1); } });
    btnRandom.addEventListener('click', () => { if (!typing) { playClick(); show(Math.floor(Math.random()*DECLARATIONS.length)); } });

    show(0);
  };

  // ======= Galeria (modal + navegação) =======
  const initGallery = () => {
    const thumbs = $('#thumbs');
    const modal = $('#modal');
    const modalImg = $('#modalImg');
    const modalCaption = $('#modalCaption');
    const modalClose = $('#modalClose');
    const modalPrev = $('#modalPrev');
    const modalNext = $('#modalNext');
    const modalBackdrop = $('#modalBackdrop');

    const imgs = $$('img', thumbs);
    let current = 0;

    const open = (i) => {
      current = i;
      const el = imgs[current];
      modalImg.src = el.src;
      modalCaption.textContent = GALLERY_CAPTIONS[current] || '';
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    const prev = () => open((current - 1 + imgs.length) % imgs.length);
    const next = () => open((current + 1) % imgs.length);

    thumbs.addEventListener('click', (e) => {
      const t = e.target.closest('img');
      if (!t) return;
      playClick();
      open(Number(t.dataset.index || 0));
    });

    modalClose.addEventListener('click', () => { playClick(); close(); });
    modalBackdrop.addEventListener('click', () => close());
    modalPrev.addEventListener('click', () => { playClick(); prev(); });
    modalNext.addEventListener('click', () => { playClick(); next(); });
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('hidden')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  };

  // ======= Surpresas (mensagens, confetes, corações) =======
  const initSurprises = () => {
    const btn1 = $('#btnSurpresa');
    const btnTop = $('#btnSurpresaTop');
    const btnHearts = $('#btnCoracoes');
    const out = $('#surpriseOutput');

    const surpriseMsg = () => {
      playClick();
      const msg = SURPRISES[Math.floor(Math.random()*SURPRISES.length)];
      out.textContent = msg;
      popHearts(document.body, 12);
    };

    const hearts = () => {
      playClick();
      popHearts(document.body, 40);
    };

    if (btn1) btn1.addEventListener('click', surpriseMsg);
    if (btnTop) btnTop.addEventListener('click', surpriseMsg);
    if (btnHearts) btnHearts.addEventListener('click', hearts);
  };

  // ======= Clique na foto da capa =======
  const initHeroPhotoClick = () => {
    const wrapper = document.querySelector('.hero-photo-wrapper');
    if (!wrapper) return;
    wrapper.addEventListener('click', () => {
      playClick();
      popHeartsAround(wrapper, 28);
      // Efeito extra romântico - corações pulsantes
      createPulsingHearts(wrapper);
    });
  };

  // Criar corações pulsantes românticos
  const createPulsingHearts = (element) => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.textContent = '';
        heart.style.cssText = `
          position: absolute;
          font-size: ${Math.random()*20 + 20}px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulseHeart 2s ease-out forwards;
          pointer-events: none;
          z-index: 100;
        `;
        element.style.position = 'relative';
        element.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
      }, i * 200);
    }
    
    // Adicionar estilo CSS se não existir
    if (!document.getElementById('pulseHeartStyle')) {
      const style = document.createElement('style');
      style.id = 'pulseHeartStyle';
      style.textContent = `
        @keyframes pulseHeart {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) translateY(-100px) scale(0.5); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  };

  const popHearts = (root, count = 20) => {
    const romanticEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓', '🌹', '✨', '🎀', '💐'];
    const romanticColors = ['#ff4f6d', '#ff6b9d', '#ff9999', '#ff69b4', '#ff1493', '#c71585', '#db7093', '#ff69b4'];
    
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      const emoji = romanticEmojis[Math.floor(Math.random() * romanticEmojis.length)];
      s.textContent = emoji;
      s.style.position = 'fixed';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = '100vh';
      s.style.fontSize = (Math.random()*25 + 15) + 'px';
      s.style.color = romanticColors[Math.floor(Math.random() * romanticColors.length)];
      s.style.pointerEvents = 'none';
      s.style.zIndex = '60';
      s.style.opacity = '.9';
      s.style.transition = 'transform 4s ease-out, opacity 3s ease-out';
      s.style.transform = `translateY(-120vh) rotate(${Math.random()*720}deg) scale(${Math.random()*0.8+0.8})`;
      s.style.textShadow = '0 0 10px rgba(255,255,255,0.8)';
      s.style.filter = `hue-rotate(${Math.random()*30}deg)`;
      root.appendChild(s);
      
      // Animação de pulso antes de desaparecer
      setTimeout(() => {
        s.style.transform = `translateY(-120vh) rotate(${Math.random()*720}deg) scale(${Math.random()*1.2+1.2})`;
        s.style.opacity = '0';
        setTimeout(() => s.remove(), 3000);
      }, Math.random()*1000 + 500);
    }
  };

  const setup = () => {
    initTypewriter();
    initGallery();
    initSurprises();
    initHeroPhotoClick();
    initQuiz();
    initMusic();
    initTimeline();
    initHeartWall();
    initGame();
    initLoveBook();
    initStarsControls();
    initRevealOnScroll();
    initSmoothNav();
    // Solicitar PIN sempre que entrar na aplicação
    openPinOverlay('gate');
  };

  setup();
})();
