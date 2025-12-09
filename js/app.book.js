// Álbum Interativo para Aldinete
// Versão com Livro Digital do Amor

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
    'O dia em que fomos tirar suas fotos de formatura',
    'Nós passeando',
    'experimentando comidas novas',
    'roupinha combinando',
    'Nossa risada favorita',
    'Cada momento com você vale ouro',
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
    { q: 'Quem mandou a primeira mensagem?', a: ['Victor', 'Aldinete', 'Nós dois'], c: 1 },
    { q: 'Quem disse "eu te amo" primeiro?', a: ['Victor', 'Aldinete', 'Ao mesmo tempo'], c: 0 },
    { q: 'Quem é mais carinhoso?', a: ['Victor', 'Aldinete', 'Nós dois'], c: 2 },
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

      // Efeito de fade-in suave no card do quiz
      if (card) {
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease';
          card.style.opacity = '1';
        }, 50);
      }
    };

    const finish = () => {
      qEl.textContent = `Você acertou ${score}/${QUIZ.length} ❤`;
      optsEl.innerHTML = '';
      nextBtn.textContent = 'Tentar novamente';
      nextBtn.disabled = false;
      nextBtn.onclick = () => {
        // Reinicia o quiz
        i = 0;
        score = 0;
        selected = -1;
        render();
        nextBtn.textContent = 'Próxima';
        nextBtn.onclick = handleNextClick; // Restaura o manipulador de clique original
      };
      popConfettiSlow(document.body, 200);
    };
    
    const handleNextClick = () => {
      if (selected === -1) return;
      playClick();
      
      // Verificar se a resposta está correta
      if (selected === QUIZ[i].c) {
        score++;
      }
      
      if (i < QUIZ.length - 1) {
        i++;
        render();
      } else {
        finish();
      }
    };

    nextBtn.addEventListener('click', handleNextClick);

    render();
  };

  // ======= Livro Digital do Amor =======
  const BOOK_PAGES = [
    {
      title: "Prólogo",
      image: null,
      text: `
        <div class="page-title">Prólogo</div>
        <p>Aldinete, este livro é um abraço em palavras. Ele nasceu do meu coração, que te escolhe todos os dias.</p>
        <p>Que cada linha te lembre: você é a pessoa mais especial do meu mundo.</p>
        <p>Cada página foi feita com amor, cada foto escolhida com carinho, cada palavra escrita pensando em você.</p>
      `
    },
    {
      title: "Nosso primeiro olhar",
      image: "./assets/images/13411c34-2122-4b94-8200-3654f366e0c3.jpg",
      text: `
        <div class="page-title">Nosso primeiro olhar</div>
        <p>Naquele momento mágico, quando nossos olhares se cruzaram pela primeira vez, eu soube que nada seria igual.</p>
        <p>Você sorriu e meu mundo parou. Foi o melhor sorriso que já vi, e era só para mim.</p>
      `
    },
    {
      title: "Nosso primeiro beijo",
      image: "./assets/images/21f2a252-f26b-4937-bace-9b5b20dd319f.jpg",
      text: `
        <div class="page-title">Nosso primeiro beijo</div>
        <p>Quando nossos lábios se encontraram pela primeira vez, meu coração explodiu de felicidade.</p>
        <p>Este foi nosso primeiro beijo, o começo de tudo que construímos juntos.</p>
      `
    },
    {
      title: "Nossos sonhos juntos",
      image: "./assets/images/222d8dc2-8a22-409b-8167-97401051151c.jpg",
      text: `
        <div class="page-title">Nossos sonhos juntos</div>
        <p>Nossa primeira vez juntas, escondidas, roubando momentos que o mundo não queria nos dar.</p>
        <p>Cada segundo foi precioso, cada toque foi uma promessa, cada beijo foi eternidade.</p>
      `
    },
    {
      title: "Segredos e Amor",
      image: "./assets/images/3da39d90-7432-4d9d-968d-92b8db1123f9.jpg",
      text: `
        <div class="page-title">Segredos e Amor</div>
        <p>Nos dias em que tivemos que nos esconder, nosso amor só ficou mais forte.</p>
        <p>Cada olhar dado às escondidas valia mais que mil declarações em público.</p>
      `
    },
    {
      title: "Como Eu Gosto de Você Perto",
      image: "./assets/images/4500fc69-663c-430c-861f-a2f5ca461c2d.jpg",
      text: `
        <div class="page-title">Como Eu Gosto de Você Perto</div>
        <p>Gosto de você perto em silêncio, quando nossos olhares se encontram e as palavras se tornam desnecessárias.</p>
        <p>Gosto de você perto em cada café da manhã, em cada risada compartilhada, em cada momento banal que se torna especial só por estarmos juntos.</p>
        <p>Seu cheiro, seu sorriso, seu jeito único de ser - tudo em você me faz querer ficar cada vez mais perto, para sempre.</p>
      `
    },
    {
      title: "Epílogo",
      image: null,
      text: `
        <div class="page-title">Para Sempre é Hoje</div>
        <p>Se eu pudesse resumir: eu te amo com paciência, verdade e cuidado.</p>
        <p>Obrigado por existir, por ficar e por ser você. Obrigado por me deixar te amar todos os dias.</p>
        <p>Esta é nossa história em palavras, meu amor em cada linha, nossa vida contada com todo meu carinho:</p>
        <p><strong>Eu te amo hoje, amanhã e em todos os futuros possíveis.</strong></p>
        <p style="text-align: right; margin-top: 2rem; font-style: italic;">— Com todo meu amor ❤</p>
      `
    }
  ];

  const initLoveBook = () => {
    const btnOpen = document.getElementById('openBook');
    const overlay = document.getElementById('bookOverlay');
    const btnClose = document.getElementById('bookClose');
    const page = document.getElementById('bookPage');
    const btnPrev = document.getElementById('bookPrev');
    const btnNext = document.getElementById('bookNext');
    const progress = document.getElementById('bookProgress');
    
    if (!btnOpen || !overlay || !page || !btnPrev || !btnNext || !progress) return;

    let i = 0;
    let dir = 1; // 1 = próxima, -1 = anterior
    let isAnimating = false;
    const OUT_DUR = 240;  // ms — pequena pausa antes de trocar
    const IN_DUR = 650;   // ms — já usado no render
     
    const render = () => {
      const currentPage = BOOK_PAGES[i];
      let pageContent = currentPage.text;
      
      // Se a página tem imagem, adiciona ela
      if (currentPage.image) {
        const imageHtml = `<div class="book-photos"><img class="book-photo" src="${currentPage.image}" alt="${currentPage.title}" /></div>`;
        // Insere a imagem após o título
        pageContent = pageContent.replace('</div>', '</div>' + imageHtml);
      }
      
      // Animação de saída leve (direção)
      page.style.transition = 'none';
      page.style.opacity = '0';
      page.style.transform = `translateX(${dir * 16}px) scale(.992)`;
      
      // Troca conteúdo
      page.innerHTML = pageContent;
      progress.textContent = `Página ${i + 1} de ${BOOK_PAGES.length}`;
      btnPrev.disabled = i === 0;
      btnNext.textContent = i === BOOK_PAGES.length - 1 ? 'Concluir' : 'Próxima';
      
      // Entrada suave (mais lenta)
      requestAnimationFrame(() => {
        page.style.transition = 'opacity .65s ease-in-out, transform .65s ease-in-out';
        page.style.opacity = '1';
        page.style.transform = 'translateX(0) scale(1)';
      });

      // Anima a foto da página (crossfade/slide mais suave)
      const img = page.querySelector('.book-photo');
      if (img) {
        img.style.opacity = '0';
        img.style.transform = 'translateY(12px) scale(.985)';
        requestAnimationFrame(() => {
          img.style.transition = 'opacity .7s ease-in-out, transform .7s ease-in-out';
          img.style.opacity = '1';
          img.style.transform = 'translateY(0) scale(1)';
        });
      }
    };

    const changePage = (targetIndex, direction) => {
      if (isAnimating) return;
      isAnimating = true;
      dir = direction;
      // Animação de saída do conteúdo atual
      page.style.transition = 'opacity .24s ease, transform .24s ease';
      page.style.opacity = '0';
      page.style.transform = `translateX(${dir * 18}px) scale(.988)`;
      btnPrev.disabled = true;
      btnNext.disabled = true;
      // Após pequeno atraso, troca o conteúdo e anima entrada
      setTimeout(() => {
        i = targetIndex;
        render();
        // Reabilita após a animação de entrada terminar
        setTimeout(() => {
          btnPrev.disabled = i === 0 ? true : false;
          btnNext.disabled = false;
          isAnimating = false;
        }, IN_DUR);
      }, OUT_DUR);
    };

    const open = () => {
      playClick();
      overlay.classList.remove('hidden');
      // Defensive fallback for first paint on GitHub Pages: ensure modal overlay is visible immediately
      overlay.style.display = 'grid';
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.zIndex = '90';
      // allow CSS transition class to kick in next frame
      requestAnimationFrame(() => overlay.classList.add('active'));
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      i = 0; 
      dir = 1;
      render();
      // Efeito de corações ao abrir o livro
      setTimeout(() => popHearts(document.body, 20), 300);
    };
    
    const close = () => {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // espera fim da transição p/ esconder
      const onEnd = () => {
        overlay.classList.add('hidden');
        // Clean defensive inline styles to return control to CSS
        overlay.style.display = '';
        overlay.style.position = '';
        overlay.style.inset = '';
        overlay.style.zIndex = '';
        overlay.removeEventListener('transitionend', onEnd);
      };
      overlay.addEventListener('transitionend', onEnd);
    };
    
    const next = () => {
      if (i < BOOK_PAGES.length - 1) { 
        playClick();
        changePage(i + 1, 1);
        popHearts(document.body, 8);
      } else { 
        playClick(); 
        // Grande celebração ao concluir o livro
        popConfettiSlow(document.body, 250);
        popHearts(document.body, 40);
        setTimeout(() => close(), 1200);
      }
    };
    
    const prev = () => { 
      if (i > 0) { 
        playClick();
        changePage(i - 1, -1);
        popHearts(document.body, 5);
      } 
    };

    // Suporte a gesto de swipe no mobile
    let touchStartX = 0;
    page.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    page.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) next(); else prev();
      }
    }, { passive: true });

    btnOpen.addEventListener('click', open);
    // Só fechar quando clicar no X
    btnClose && btnClose.addEventListener('click', () => { playClick(); close(); });
    btnPrev.addEventListener('click', prev);
    btnNext.addEventListener('click', next);

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
      if (overlay.classList.contains('hidden')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  };

  // ======= Utilitários =======
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const playClick = () => {
    const click = $('#clickSound');
    if (!click) return;
    try { 
      click.currentTime = 0; 
      click.play().catch(e => {
        // Ignora erros de áudio, especialmente 416
      }); 
    } catch (e) {
      // Ignora qualquer erro de áudio
    }
  };

  // ======= Evitar zoom por gesto/double-tap (fallback) =======
  const preventMobileZoom = () => {
    document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      const isControl = !!(e.target && (/** @type {Element} */(e.target)).closest && (/** @type {Element} */(e.target)).closest('button, a, input, textarea, select, label'));
      if (!isControl && now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
  };

  // Confete mais suave e lento
  const popConfettiSlow = (root, count = 160) => {
    const isSmall = window.innerWidth < 480;
    const N = isSmall ? Math.max(60, Math.floor(count * 0.5)) : count;
    for (let i = 0; i < N; i++) {
      const c = document.createElement('i');
      c.style.position = 'fixed';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.top = '-28px';
      const w = (Math.random()*(isSmall?4:6) + (isSmall?4:6));
      const h = (Math.random()*(isSmall?8:10) + (isSmall?8:10));
      c.style.width = w + 'px';
      c.style.height = h + 'px';
      c.style.background = `hsl(${Math.random()*360},85%,68%)`;
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
      s.textContent = '❤';
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

    if (location.hash) {
      history.replaceState(null, '', location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // ======= PIN Overlay & Surpresa Total =======
  const SECRET_PIN = '260323'; // data do relacionamento (26/03/23)
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
    document.body.classList.add('pin-lock');
    msg.textContent = '';
    input.value = '';
    setTimeout(() => input.focus(), 50);

    const close = () => {
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.classList.remove('pin-lock');
      form.removeEventListener('submit', onSubmit);
    };

    const onSubmit = (e) => {
      console.log('Formulário submetido');
      e.preventDefault();
      const val = (input.value || '').trim();
      console.log('Valor do PIN inserido:', val);
      console.log('PIN correto:', SECRET_PIN);
      if (val === SECRET_PIN) {
        msg.textContent = 'Desbloqueado!';
        msg.style.color = '#4CAF50'; // Verde para sucesso
        msg.style.fontWeight = 'bold';
        popConfettiSlow(document.body, 180);
        if (mode === 'surprise') {
          activateTotalSurprise();
        } else {
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
    const audio = /** @type {HTMLAudioElement} */ (document.getElementById('audioPlayer'));
    if (audio) {
      try { audio.play(); } catch {}
    }
    popConfetti(document.body, 220);
    popHearts(document.body, 80);
    const out = document.getElementById('surpriseOutput');
    if (out) out.textContent = 'Para você, meu amor: hoje e sempre. 💞';
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

    // Corações flutuantes (frente)
    const hearts = [];
    const HEART_COUNT = Math.min(100, Math.floor(W / 16));

    const rand = (min, max) => Math.random() * (max - min) + min;

    const createHeart = () => ({
      x: rand(0, W),
      y: rand(H * 0.2, H),
      size: rand(6, 16),
      speedY: rand(0.15, 0.6),
      speedX: rand(-0.2, 0.2),
      alpha: rand(0.4, 0.9),
      hue: rand(330, 360),
    });

    const createStar = () => ({
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.6, 1.8),
      baseA: rand(0.4, 0.9),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.003, 0.01),
      hue: rand(300, 360),
    });

    for (let i = 0; i < STAR_COUNT; i++) stars.push(createStar());
    for (let i = 0; i < HEART_COUNT; i++) hearts.push(createHeart());

    const drawHeart = (x, y, s, a, hue) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s / 16, s / 16);
      ctx.beginPath();
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
      starParallax.x += (starParallax.tx - starParallax.x) * 0.06;
      starParallax.y += (starParallax.ty - starParallax.y) * 0.06;
      if (STARS_ENABLED) {
        for (const s of stars) drawStar(s);
      }
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
      btn.textContent = STARS_ENABLED ? 'Estrelas ON ✨' : 'Estrelas OFF ✨';
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
    setInterval(update, 60 * 1000);
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

    const setImage = (el) => {
      // Fade out atual (um pouco mais lento)
      modalImg.style.transition = 'opacity .5s ease-in-out, transform .5s ease-in-out';
      modalImg.style.opacity = '0';
      modalImg.style.transform = 'scale(.995)';
      const src = el.src;
      const alt = el.alt || '';
      const onLoad = () => {
        modalImg.removeEventListener('load', onLoad);
        requestAnimationFrame(() => {
          modalImg.style.opacity = '1';
          modalImg.style.transform = 'scale(1)';
        });
      };
      modalImg.addEventListener('load', onLoad);
      modalImg.src = src;
      modalImg.alt = alt;
      modalCaption.textContent = GALLERY_CAPTIONS[current] || '';
    };
  };

  // ======= Surpresas (mensagens surpresa) =======
  const initSurprises = () => {
    const btnSurpresa = $('#btnSurpresa');
    const out = $('#surpriseOutput');

    if (btnSurpresa && out) {
      btnSurpresa.addEventListener('click', () => {
        playClick();
        const msg = SURPRISES[Math.floor(Math.random()*SURPRISES.length)];
        out.textContent = msg;
        popHearts(document.body, 12);
      });
    }
  };

  // ======= Clique na foto da capa =======
  const initHeroPhotoClick = () => {
    const wrapper = document.querySelector('.hero-photo-wrapper');
    if (!wrapper) return;
    wrapper.addEventListener('click', () => {
      playClick();
      popHeartsAround(wrapper, 28);
    });
  };

  const popHearts = (root, count = 20) => {
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.textContent = '❤';
      s.style.position = 'fixed';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = '100vh';
      s.style.fontSize = (Math.random()*20 + 14) + 'px';
      s.style.animation = `rise ${3 + Math.random()*2}s linear forwards`;
      s.style.pointerEvents = 'none';
      s.style.zIndex = '60';
      s.style.color = '#ff4f6d';
      root.appendChild(s);
      setTimeout(() => s.remove(), 6000);
    }
  };

  const popConfetti = (root, count = 120) => {
    for (let i = 0; i < count; i++) {
      const c = document.createElement('i');
      c.style.position = 'fixed';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.top = '-20px';
      c.style.width = '8px';
      c.style.height = '12px';
      c.style.background = `hsl(${Math.random()*360},85%,65%)`;
      c.style.transform = `rotate(${Math.random()*360}deg)`;
      c.style.animation = `confFall ${3 + Math.random()*2}s linear forwards`;
      c.style.zIndex = '60';
      c.style.borderRadius = '2px';
      root.appendChild(c);
      setTimeout(() => c.remove(), 6000);
    }

    const styleId = 'confetti-style';
    if (!document.getElementById(styleId)) {
      const st = document.createElement('style');
      st.id = styleId;
      st.textContent = `@keyframes confFall { to { transform: translateY(105vh) rotate(720deg); opacity: .9; } }`;
      document.head.appendChild(st);
    }
  };

  // ======= Música =======
  const initMusic = () => {
    const audio = /** @type {HTMLAudioElement} */ (document.getElementById('audioPlayer'));
    const btn = document.getElementById('btnToggleMusic');
    if (!audio || !btn) return;
    btn.addEventListener('click', () => {
      playClick();
      if (audio.paused) audio.play(); else audio.pause();
    });
  };

  // ======= Timeline =======
  const initTimeline = () => {
    const items = $$('#timeline .timeline-item');
    const bodies = items.map(it => $('.timeline-body', it));
    const closeAll = () => bodies.forEach(b => b && b.classList.remove('open'));

    items.forEach(item => {
      const header = $('.timeline-header', item);
      const body = $('.timeline-body', item);

      // Abre este e fecha os outros
      header.addEventListener('click', () => {
        playClick();
        const willOpen = !body.classList.contains('open');
        closeAll();
        if (willOpen) {
          body.classList.add('open');
          setTimeout(() => body.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
        }
      });

      // Clicar em qualquer imagem dentro do corpo fecha o item
      body.addEventListener('click', (e) => {
        const img = e.target && /** @type {Element} */(e.target).closest('img');
        if (img) {
          playClick();
          body.classList.remove('open');
          e.stopPropagation();
        }
      });
    });

    // Delegação global de segurança (caso o markup mude)
    document.addEventListener('click', (e) => {
      const img = e.target && /** @type {Element} */(e.target).closest('#timeline .timeline-body img');
      if (!img) return;
      const body = /** @type {Element} */(img.closest('.timeline-body'));
      if (body && body.classList.contains('open')) {
        playClick();
        body.classList.remove('open');
      }
    });
  };

  // ======= Heart Message Wall =======
  const initHeartWall = () => {
    const form = $('#heartForm');
    const input = $('#heartInput');
    const stage = $('#heartStage');

    // Verifica se os elementos existem antes de adicionar os eventos
    if (!form || !input || !stage) {
      console.log('Elementos do Heart Wall não encontrados, pulando inicialização...');
      return;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      playClick();
      const note = document.createElement('div');
      note.className = 'heart-note';
      note.textContent = '❤ ' + val;
      note.style.left = Math.random() * 70 + '%';
      note.style.bottom = '0';
      stage.appendChild(note);
      input.value = '';
      setTimeout(() => note.remove(), 6500);
    });
  };

  // ======= Mini-game =======
  const initGame = () => {
    const board = $('#gameBoard');
    const out = $('#gameOutput');

    const setup = () => {
      board.innerHTML = '';
      out.textContent = '';
      const total = 20;
      const correct = Math.floor(Math.random() * total);
      for (let i = 0; i < total; i++) {
        const cell = document.createElement('button');
        cell.className = 'game-heart';
        cell.setAttribute('aria-label', 'Coração');
        cell.textContent = '💖';
        const onTap = () => {
          playClick();
          if (i === correct) {
            out.textContent = 'Mensagem secreta: Você é meu para sempre! ❤';
            revealSecret();
          } else {
            out.textContent = 'Quase! Tente outro coração.';
          }
        };
        cell.addEventListener('pointerup', onTap);
        cell.addEventListener('click', onTap);
        board.appendChild(cell);
      }
    };

    setup();
  };

  // ======= Seção secreta =======
  const revealSecret = () => {
    const sec = $('#secreta');
    sec.classList.remove('hidden');
    sec.scrollIntoView({ behavior: 'smooth' });
    popHearts(document.body, 30);
  };

  // ======= Inicialização =======
  const init = () => {
    setYear();
    setStartDateLabel();
    preventMobileZoom();
    initParticles();
    initCounter();
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
    openPinOverlay('gate');

    // Garante PIN também ao voltar do cache do navegador (BFCache) ou reexibir a página
    window.addEventListener('pageshow', () => {
      const overlay = document.getElementById('pinOverlay');
      const hidden = overlay && overlay.classList.contains('hidden');
      // Se não estiver visível, exige PIN novamente
      if (hidden) openPinOverlay('gate');
    });
  };

  document.addEventListener('DOMContentLoaded', init);

  // ========== NOVAS FUNCIONALIDADES ==========

  // Animações fade-in ao rolar
  const initRevealAnimations = () => {
    const reveals = document.querySelectorAll('.section');
    
    const revealOnScroll = () => {
      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('in-view');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
  };

  // Toggle tema escuro/claro
  const initThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      themeToggle.textContent = isDark ? '☀️ Tema' : '🌙 Tema';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      themeToggle.textContent = '☀️ Tema';
    }
  };


  // Contador de idade e próximo aniversário
  const initCountdown = () => {
    const birthday = new Date('2000-08-26T00:00:00');
    const timer = document.getElementById('countdownTimer');
    
    const updateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const birthdayThisYear = new Date(currentYear, 7, 26); // mês 7 = agosto, dia 26
      const nextBirthday = new Date(birthdayThisYear);
      
      if (nextBirthday < now) {
        nextBirthday.setFullYear(currentYear + 1);
      }
      
      const diff = nextBirthday - now;
      const hasHadBirthdayThisYear = now >= birthdayThisYear;
      const age = currentYear - 2000 - (hasHadBirthdayThisYear ? 0 : 1);
      
      if (diff <= 172800000) { // Menos de 2 dias (véspera e dia do aniversário)
        if (diff <= 0) {
          timer.textContent = `🎉 Hoje é seu aniversário! ${age} anos! 🎂`;
          // Efeito especial no dia do aniversário
          popConfettiSlow(document.body, 300);
          popHearts(document.body, 50);
          showLoveMessage();
        } else if (diff <= 86400000) {
          timer.textContent = `🎉 Amanhã é seu aniversário! ${age} anos! 🎂`;
          // Efeito especial na véspera
          popHearts(document.body, 30);
        } else {
          timer.textContent = `🎉 Na véspera do seu aniversário! ${age} anos! 🎂`;
          // Efeito leve 2 dias antes
          popHearts(document.body, 20);
        }
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s para seus ${age} anos!`;
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  };

  // Mensagem de amor surpresa
  const showLoveMessage = () => {
    // Criar overlay especial
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 1s ease;
    `;
    
    const message = document.createElement('div');
    message.style.cssText = `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem;
      border-radius: 20px;
      max-width: 600px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      animation: slideUp 1s ease;
    `;
    
    message.innerHTML = `
      <h2 style="font-size: 2.5rem; margin: 0 0 1.5rem; font-family: 'Brush Script MT', cursive;">💝 Para Minha Eterna Amor 💝</h2>
      <p style="font-size: 1.2rem; line-height: 1.8; margin: 0 0 2rem;">
        Hoje, em seu aniversário de ${new Date().getFullYear() - 2000} primaveras, meu coração transborda de gratidão por ter você em minha vida.
        Cada segundo ao seu lado é uma bênção, cada sorriso seu é minha maior alegria.
      </p>
      <p style="font-size: 1.2rem; line-height: 1.8; margin: 0 0 2rem;">
        Você é o sonho que nunca pensei que pudesse realizar, a paz que encontrei no caos,
        a luz que guia meus dias mais escuros. Te amar é a decisão mais certa que já tomei.
      </p>
      <p style="font-size: 1.2rem; line-height: 1.8; margin: 0 0 2rem;">
        Feliz aniversário, meu amor. Que estes ${new Date().getFullYear() - 2000} anos sejam apenas o começo de uma vida inteira
        de superação, vitórias e um amor que venceu todos os obstáculos.
      </p>
      <p style="font-size: 1.4rem; font-weight: bold; margin: 0 0 2rem;">
        Eu te amo mais do que palavras podem expressar. ❤️
      </p>
      <div style="margin-top: 2rem;">
        <button id="playVoiceMessage" style="background: white; color: #667eea; border: none; padding: 1rem 2rem; border-radius: 25px; font-size: 1rem; cursor: pointer; margin: 0.5rem;">
          🎵 Ouvir Mensagem de Voz
        </button>
        <button id="closeLoveMessage" style="background: transparent; color: white; border: 2px solid white; padding: 1rem 2rem; border-radius: 25px; font-size: 1rem; cursor: pointer; margin: 0.5rem;">
          Fechar
        </button>
      </div>
    `;
    
    overlay.appendChild(message);
    document.body.appendChild(overlay);
    
    // Adicionar estilos CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    `;
    document.head.appendChild(style);
    
    // Event listeners
    document.getElementById('closeLoveMessage').addEventListener('click', () => {
      overlay.remove();
      style.remove();
    });
    
    document.getElementById('playVoiceMessage').addEventListener('click', () => {
      // Criar elemento de áudio para mensagem de voz (você pode substituir pelo seu arquivo)
      const audio = new Audio('./assets/music/love-message.mp3');
      audio.play().catch(e => {
        // Se não tiver arquivo de áudio, mostra mensagem
        alert('🎤 Grave uma mensagem de voz e adicione como ./assets/music/love-message.mp3');
      });
    });
    
    // Auto-close após 30 segundos
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        overlay.remove();
        style.remove();
      }
    }, 30000);
  };


  // Upload de fotos
  const initPhotoUpload = () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    // Verifica se os elementos existem antes de adicionar os eventos
    if (!uploadArea || !fileInput) {
      console.log('Elementos de upload de fotos não encontrados, pulando inicialização...');
      return;
    }
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });
    
    fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });
    
    const handleFiles = (files) => {
      const gallery = document.getElementById('thumbs');
      const existingImages = gallery.querySelectorAll('img');
      const startIndex = existingImages.length;
      
      Array.from(files).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            // Adicionar imagem à galeria
            const thumb = document.createElement('div');
            thumb.className = 'thumb';
            const imgIndex = startIndex + index;
            thumb.innerHTML = `<img src="${e.target.result}" alt="Nova foto" data-index="${imgIndex}" />`;
            gallery.appendChild(thumb);
            
            // Adicionar legenda padrão
            if (typeof GALLERY_CAPTIONS !== 'undefined') {
              GALLERY_CAPTIONS.push('Momento especial');
            }
            
            // Forçar re-inicialização da galeria para reconhecer novas imagens
            setTimeout(() => {
              // Re-inicializar eventos da galeria para as novas imagens
              const newImg = thumb.querySelector('img');
              if (newImg) {
                newImg.addEventListener('click', () => {
                  // Simular clique na galeria principal
                  const modal = document.getElementById('modal');
                  const modalImg = document.getElementById('modalImg');
                  const modalCaption = document.getElementById('modalCaption');
                  if (modal && modalImg && modalCaption) {
                    modalImg.src = newImg.src;
                    modalCaption.textContent = 'Momento especial';
                    modal.classList.remove('hidden');
                    modal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                  }
                });
              }
              
              // Feedback visual de sucesso
              const successMsg = document.createElement('div');
              successMsg.textContent = '✅ Foto adicionada com sucesso!';
              successMsg.style.cssText = 'position:fixed;top:20px;right:20px;background:#4CAF50;color:white;padding:10px 20px;border-radius:5px;z-index:1000;';
              document.body.appendChild(successMsg);
              setTimeout(() => successMsg.remove(), 3000);
            }, 100);
          };
          reader.readAsDataURL(file);
        }
      });
    };
  };

  // Editor de mensagens
  const initMessageEditor = () => {
    const textarea = document.getElementById('messageTextarea');
    const saveBtn = document.getElementById('saveMessageBtn');
    
    // Carregar mensagem salva
    const savedMessage = localStorage.getItem('customMessage');
    if (savedMessage) {
      textarea.value = savedMessage;
    }
    
    saveBtn.addEventListener('click', () => {
      const message = textarea.value;
      localStorage.setItem('customMessage', message);
      
      // Atualizar declarações com a nova mensagem
      if (message.trim()) {
        DECLARATIONS.push(message);
        alert('Mensagem salva com sucesso! ❤');
      }
    });
  };

  // Quebra-cabeça
  const initPuzzle = () => {
    const container = document.getElementById('puzzleContainer');
    const shuffleBtn = document.getElementById('shufflePuzzleBtn');
    
    const pieces = [];
    const imageUrl = './assets/images/13411c34-2122-4b94-8200-3654f366e0c3.jpg';
    
    // Criar peças do quebra-cabeça
    for (let i = 0; i < 9; i++) {
      const piece = document.createElement('div');
      piece.className = 'puzzle-piece';
      piece.style.backgroundImage = `url(${imageUrl})`;
      piece.style.backgroundPosition = `${(i % 3) * 33.33}% ${Math.floor(i / 3) * 33.33}%`;
      piece.dataset.correctPosition = i;
      piece.dataset.currentPosition = i;
      
      piece.addEventListener('click', () => {
        // Lógica para mover peças
      });
      
      pieces.push(piece);
      container.appendChild(piece);
    }
    
    shuffleBtn.addEventListener('click', () => {
      // Embaralhar peças
      const shuffled = pieces.sort(() => Math.random() - 0.5);
      container.innerHTML = '';
      shuffled.forEach((piece, index) => {
        piece.dataset.currentPosition = index;
        container.appendChild(piece);
      });
    });
  };


  // Lazy loading para imagens
  const initLazyLoading = () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      img.classList.add('lazy-img');
      imageObserver.observe(img);
    });
  };

  // PWA Install Prompt
  const initPWA = () => {
    const installBtn = document.getElementById('installPrompt');
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installBtn.style.display = 'block';
    });
    
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        installBtn.style.display = 'none';
      }
    });
  };

  // Inicializar todas as novas funcionalidades
  const initNewFeatures = () => {
    initRevealAnimations();
    initThemeToggle();
    initCountdown();
    initPhotoUpload();
    initMessageEditor();
    initPuzzle();
    initLazyLoading();
    initPWA();
  };

  // Adicionar ao evento DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewFeatures);
  } else {
    initNewFeatures();
  }

})();
