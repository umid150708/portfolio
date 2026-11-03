(() => {
  'use strict';

  /* ------------------------------------------------------------------
     Settings
     ------------------------------------------------------------------ */
  const WORDMARK = 'UMIDJON';     // falls in during the intro; its first "I" becomes the catapult
  const HERO_WORD = 'PORTFOLIO';  // the big headline the wordmark turns into
  const SPLIT_AT = 4;             // the headline pulls apart after this many letters (PORT | FOLIO)

  // Portrait as a 72 x 72 grid: 0 = empty, 1-9 = tile brightness (made from assets/photo.png).
  const PORTRAIT = `000000000000000000000000000000000000000000000000000000000000000000000000
000000000000000000000000000000000000000000000000000000000000000000000000
000000000000000000000000000000006670000000000000000000000000000000000000
000000000000000000000000000007433223356700000000000000000000000000000000
000000000000000000000000000063232333322223600000000000000000000000000000
000000000000000000000000000742223333332222240000000000000000000000000000
000000000000000000000000000522212222333233224000000000000000000000000000
000000000000000000000000005322222211222332222300000000000000000000000000
000000000000000000000000044332245544332222222240000000000000000000000000
000000000000000000000000533333677766544322222236000000000000000000000000
000000000000000000000007322346700777765443222223000000000000000000000000
000000000000000000000006322367700777766544332223500000000000000000000000
000000000000000000000005222577770777776655442222400000000000000000000000
000000000000000000000005223677780077777665543222400000000000000000000000
000000000000000000000006334677766677654433344221400000000000000000000000
000000000000000000000005344654333457544444444422500000000000000000000000
000000000000000000000006346556654467544565555532600000000000000000000000
000000000000000000000007447667755567545544455542700000000000000000000000
000000000000000000000000457665324677644544445543800000000000000000000000
000000000000000000000000557766555777655655555553000000000000000000000000
000000000000000000000000667777767778655666665554000000000000000000000000
000000000000000000000000767700800770655666665555560000000000000000000000
000000000000000000000008067777800766545566665555550000000000000000000000
000000000000000000000005667777008745544566655554550000000000000000000000
000000000000000000000006866777080766544556655555540000000000000000000000
000000000000000000000007766777777776654555555554550000000000000000000000
000000000000000000000007777777777765445555555554570000000000000000000000
000000000000000000000000787677776454444455555555500000000000000000000000
000000000000000000000000888677766666655455555666000000000000000000000000
000000000000000000000000077767766654445555555800000000000000000000000000
000000000000000000000000000066666654444555556000000000000000000000000000
000000000000000000000000000066666667655555557000000000000000000000000000
000000000000000000000000000066666776555555550000000000000000000000000000
000000000000000000000000000076556655555555550000000000000000000000000000
000000000000000000000000000076655544444455550000000000000000000000000000
000000000000000000000000000077665444444445550000000000000000000000000000
000000000000000000000000000077766554445555550000000000000000000000000000
000000000000000000000000000077766665555555550000000000000000000000000000
000000000000000000000000000077776666555555558000000000000000000000000000
000000000000000000000000073577777665555555553500000000000000000000000000
000000000000000000000000031577777766555555553170000000000000000000000000
000000000000000000000000722677777776655555554150000000000000000000000000
000000000000000000000000623677777666555555554226000000000000000000000000
000000000000000000000075323677777665555555543122257000000000000000000000
000000000000000000006332322677777766555555542111122260000000000000000000
000000000000000000733222222477777766565555442111112113700000000000000000
000000000000000074233322222257777766666555431111111111257000000000000000
000000000000006322233222222225777666677566521111111111122460000000000000
000000000000633222233322222222477767007677411111111111122223600000000000
000000000063332222233322222222236777008774111222111111122222230000000000
000000000533222222233222222222222467007631112222122221222222223000000000
000000004333322222233222222222222213465222222222122222222222222400000000
000000043322322222233222222222221111222222222221122222222222222260000000
000000533322222222232222221211111111111111222211122222222222211220000000
000008333222222222322222221111122222222221111111122222222222211226000000
000005332222222222322222222112222225322222212222222222222222211123000000
000003332222222222222222222222222222222222122222222222222222111122700000
000063322222222222222222222222222222222222122222222222222222111112500000
000053222222222222222222222222222222222221222222222222222222111111200000
000053222222222222222222222222222222222221222222222222222222111111270000
000042222222222212222222222222222222222211222222222222222222111111250000
000042222122222122222222222222222222222211222222222222212222111111130000
000852222122221122222222222222222224222112222222222222212222111111110000
006942222221111222222222222222222235222112222222222221111111111111117000
005422222221112222222222222222222222222122222222222221111111111111115000
006622222221112222222222222222222222221122222222222221111121111111113000
006522222221121224222222222222222222221122224433332221111111111111111708
075222212111111268427756532222222222221222226556654443111111111111113688
046222212111111284726554544322222222221222236766644443111111111111125588
032222211111111265656666755422222222221222248889987765111111111111111288
732222211111111144342222222222222222211222246667877774111111111111111177
522222221111111222222222222222122222212222135555555553111111111111111157`;

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const inOut = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const pad2 = n => String(n).padStart(2, '0');

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  const animated = hasGsap && !reduce;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  if (!animated) root.classList.remove('intro'); // nothing to wait for

  const hero = $('#home');
  const titleWrap = $('#titleWrap');
  const heroTitle = $('#heroTitle');
  const t1 = $('#t1');
  const t2 = $('#t2');
  const drop = $('#drop');
  const role = $('#heroRole');
  const cta = $('#heroCta');

  const setTitle = text => {
    t1.textContent = text.slice(0, SPLIT_AT);
    t2.textContent = text.slice(SPLIT_AT);
  };

  /* ------------------------------------------------------------------
     Portrait: dust drifts in the air, then tiles fly home into the face.
     Scrolling blows the tiles back into the air; the mouse pushes them aside.
     ------------------------------------------------------------------ */
  function createPortrait(canvas) {
    const ctx = canvas.getContext('2d');
    const rows = PORTRAIT.trim().split('\n');
    const N = rows.length;
    const tiles = [];
    rows.forEach((row, y) => [...row.trim()].forEach((ch, x) => {
      const level = Number(ch);
      if (!level) return;
      tiles.push({
        u: (x + .5) / N, v: (y + .5) / N, b: (level - 1) / 8,
        ax: Math.random(), ay: Math.random(), depth: Math.random(),
        delay: .1 + Math.random() * 1.2, dur: 1.1 + Math.random() * .9, phase: Math.random(),
      });
    }));
    const dust = Array.from({ length: 220 }, () => ({
      ax: Math.random(), ay: Math.random(), depth: Math.random(), delay: Math.random() * 1.4, phase: Math.random(),
    }));

    const lo = [38, 46, 66], hi = [244, 247, 255], speck = [230, 235, 255];
    const tileRgb = Array.from({ length: 64 }, (_, i) => lo.map((c, k) => c + (hi[k] - c) * (i / 63)));

    let W = 0, H = 0, S = 0, left = 0, top = 0, dpr = 1;
    let t0 = null, scatter = 0, raf = 0;
    let tmx = -1e4, tmy = -1e4, mx = -1e4, my = -1e4, mAct = 0;

    const layout = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      const mobile = W < 768;
      S = Math.min(W * .92, H * (mobile ? .55 : .84), 760);
      left = (W - S) / 2;
      top = (mobile ? H * .6 : H * .46) - S / 2;
    };

    const draw = now => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (t0 === null) return;
      const time = now / 1000;
      const reveal = (now - t0) / 1000;
      mx += (tmx - mx) * .12; my += (tmy - my) * .12;
      mAct += ((tmx > -1e3 ? 1 : 0) - mAct) * .08;
      const R = S * .14, cell = S / N;

      for (const p of tiles) {
        const appear = smoothstep(0, .8, reveal - p.delay * .35);
        if (appear <= 0) continue;
        const e = inOut(clamp((reveal - p.delay) / p.dur));
        const q = Math.pow(clamp(scatter * 1.7 - p.phase * .7), 2);
        const k = e * (1 - q);
        const dr = reduce ? 0 : 6 + 22 * (1 - p.depth);
        const airX = p.ax * W + Math.sin(time * .31 + p.phase * 6.283) * dr;
        const airY = p.ay * H + Math.cos(time * .23 + p.phase * 9.1) * dr;
        let x = lerp(airX, left + p.u * S, k);
        let y = lerp(airY, top + p.v * S, k);
        let near = 0;
        if (mAct > .01 && k > .5) {
          const dx = x - mx, dy = y - my, d = Math.hypot(dx, dy);
          if (d < R && d > .01) {
            near = 1 - d / R;
            const push = near * near * R * .45 * mAct;
            x += dx / d * push; y += dy / d * push;
          }
        }
        const size = lerp(1.2 + 1.8 * (1 - p.depth), cell * (.2 + .66 * p.b), k) * (1 + .4 * near);
        const c = tileRgb[Math.min(63, Math.round(clamp(Math.pow(p.b, 1.2) * .85 + near * .15) * 63))];
        const twinkle = reduce ? 1 : .88 + .12 * Math.sin(time * 1.6 + p.phase * 47);
        ctx.fillStyle = `rgb(${Math.round(lerp(speck[0], c[0], k))},${Math.round(lerp(speck[1], c[1], k))},${Math.round(lerp(speck[2], c[2], k))})`;
        ctx.globalAlpha = appear * twinkle * (.45 + .55 * k);
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }

      ctx.fillStyle = 'rgb(230,235,255)';
      for (const p of dust) {
        const appear = smoothstep(0, .8, reveal - p.delay * .35);
        if (appear <= 0) continue;
        const dr = reduce ? 0 : 6 + 22 * (1 - p.depth);
        const x = p.ax * W + Math.sin(time * .31 + p.phase * 6.283) * dr;
        const y = p.ay * H + Math.cos(time * .23 + p.phase * 9.1) * dr;
        const s = 1 + 1.4 * (1 - p.depth);
        ctx.globalAlpha = appear * (.12 + .4 * (1 - p.depth)) * (reduce ? 1 : .65 + .35 * Math.sin(time * 1.3 + p.phase * 31));
        ctx.fillRect(x, y, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const frame = now => { draw(now); raf = requestAnimationFrame(frame); };
    const start = () => { if (!raf && !reduce && t0 !== null) raf = requestAnimationFrame(frame); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    layout();
    new ResizeObserver(() => { layout(); if (reduce) draw(performance.now()); }).observe(canvas);
    new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())).observe(hero);
    hero.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      const r = canvas.getBoundingClientRect();
      tmx = e.clientX - r.left; tmy = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', () => { tmx = tmy = -1e4; });

    return {
      play(secondsAhead = 0) {
        t0 = performance.now() - secondsAhead * 1000;
        if (reduce) draw(performance.now()); else start();
      },
      setScatter(v) { scatter = v; },
    };
  }

  /* ------------------------------------------------------------------
     Opening animation, part 1: a ball drops, an "I" lands on it and works as a
     catapult, flinging the other letters of the wordmark into place.
     ------------------------------------------------------------------ */
  function buildDrop() {
    drop.textContent = '';
    const word = document.createElement('h2');
    word.className = 'hero-font';
    const letters = [...WORDMARK].map(ch => {
      const s = document.createElement('span');
      s.className = 'drop-letter';
      s.textContent = ch;
      word.appendChild(s);
      return s;
    });
    const ball = document.createElement('span'); ball.className = 'ball';
    const flash = document.createElement('span'); flash.className = 'flash';
    drop.append(word, ball, flash);

    // Measure the real layout so the animation lands exactly on the headline.
    const box = drop.getBoundingClientRect();
    const cs = getComputedStyle(word);
    const fs = parseFloat(cs.fontSize);
    const ls = parseFloat(cs.letterSpacing) || 0;
    const rects = letters.map(el => {
      const r = el.getBoundingClientRect();
      return { left: r.left - box.left, top: r.top - box.top, w: r.width, h: r.height,
        bx: r.left - box.left + r.width / 2, by: r.top - box.top + r.height / 2,
        gx: r.left - box.left + (r.width - ls) / 2 };
    });
    const probe = document.createElement('span');
    probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
    word.appendChild(probe);
    const baseline = probe.getBoundingClientRect().bottom - box.top;
    probe.remove();
    const mctx = document.createElement('canvas').getContext('2d');
    mctx.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
    const cap = mctx.measureText('I').actualBoundingBoxAscent || fs * .72;

    let pv = [...WORDMARK].findIndex(ch => 'Iil1'.includes(ch));
    if (pv < 0) pv = 0;
    const pole = letters[pv];
    const pr = rects[pv];
    const pivotX = pr.gx;
    const bd = fs * .24;
    const fl = fs * 2.6;
    const above = -(box.top + baseline + fs * .5) - fs; // far enough up to start off screen

    gsap.set(pole, { transformOrigin: `${pivotX - pr.left}px ${baseline - pr.top}px` });
    gsap.set(ball, { width: bd, height: bd, left: pivotX - bd / 2, top: baseline + fs * .1, transformOrigin: '50% 100%' });
    gsap.set(flash, { width: fl, height: fl });
    gsap.set(drop, { opacity: 1 });
    gsap.set(letters, { opacity: 0 });
    gsap.set(pole, { y: above });
    gsap.set(ball, { opacity: 0, y: above });

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    const glow = (line, at, x, y, peak) => {
      line.set(flash, { left: x - fl / 2, top: y - fl / 2 }, at)
        .to(flash, { opacity: peak, duration: .05, ease: 'none' }, at)
        .to(flash, { opacity: 0, duration: .34 }, at + .05);
    };
    const pulse = (at, x, y, peak) => glow(tl, at, x, y, peak);

    // 1. The ball drops, squashes, bounces twice and settles. The "I" drops onto the spot above it.
    const intro = gsap.timeline({ defaults: { ease: 'power2.out' } });
    const hop = fs * .36, hop2 = fs * .12;
    intro.set(ball, { opacity: 1 }, 0)
      .to(ball, { y: 0, duration: .42, ease: 'power2.in' }, 0)
      .to(ball, { scaleX: .84, scaleY: 1.2, duration: .28, ease: 'power1.in' }, .14)
      .to(ball, { scaleX: 1.4, scaleY: .52, duration: .06 }, .42)
      .to(ball, { y: -hop, duration: .2 }, .48)
      .to(ball, { scaleX: 1, scaleY: 1, duration: .18 }, .48)
      .to(ball, { y: 0, duration: .18, ease: 'power2.in' }, .68)
      .to(ball, { scaleX: 1.2, scaleY: .74, duration: .05 }, .86)
      .to(ball, { y: -hop2, duration: .09 }, .91)
      .to(ball, { y: 0, duration: .1, ease: 'power2.in' }, 1)
      .to(ball, { scaleX: 1, scaleY: 1, duration: .36, ease: 'elastic.out(1, 0.42)' }, 1.02);
    const pbump = fs * .12;
    intro.set(pole, { opacity: 1 }, .8)
      .to(pole, { y: 0, duration: .34, ease: 'power2.in' }, .8)
      .to(pole, { scaleX: .86, scaleY: 1.16, duration: .24, ease: 'power1.in' }, .88)
      .to(pole, { scaleX: 1.32, scaleY: .64, duration: .06 }, 1.14)
      .to(pole, { y: -pbump, duration: .1 }, 1.2)
      .to(pole, { scaleX: 1, scaleY: 1, duration: .12 }, 1.2)
      .to(pole, { y: 0, duration: .1, ease: 'power2.in' }, 1.3)
      .to(pole, { scaleX: 1.12, scaleY: .88, duration: .05 }, 1.4)
      .to(pole, { scaleX: 1, scaleY: 1, duration: .38, ease: 'elastic.out(1, 0.4)' }, 1.45)
      .fromTo(pole, { rotation: -9 }, { rotation: 0, duration: .5, ease: 'elastic.out(1, 0.36)' }, 1.19);
    const ballY = baseline + fs * .1 + bd;
    glow(intro, .42, pivotX, ballY, .4);
    glow(intro, .86, pivotX, ballY, .24);
    glow(intro, 1.14, pivotX, baseline, .6);
    glow(intro, 1.4, pivotX, baseline, .26);
    const SLOW = .62;
    intro.timeScale(SLOW);
    tl.add(intro, 0);

    // 2. The "I" tips over like a lever and flings the letters beside it, nearest first.
    const others = letters.map((_, i) => i).filter(i => i !== pv && WORDMARK[i].trim());
    const leftSide = others.filter(i => i < pv).reverse();
    const rightSide = others.filter(i => i > pv);
    const tipAt = deg => {
      const a = deg * Math.PI / 180;
      return { x: pivotX + Math.sin(a) * cap, y: baseline - Math.cos(a) * cap };
    };
    const fling = (idx, tip, at) => {
      const el = letters[idx], o = rects[idx];
      const dx = tip.x - o.bx, dy = tip.y - o.by;
      const d = .5 + Math.min(Math.abs(dx) / 900, .32);
      const peak = Math.min(dy, 0) - (Math.abs(dx) * .3 + fs * .25);
      const spin = (dx > 0 ? -1 : 1) * gsap.utils.random(170, 300);
      tl.set(el, { x: dx, y: dy, rotation: spin, scale: .3, opacity: 0, transformOrigin: '50% 50%' }, at)
        .to(el, { opacity: 1, scale: 1, duration: d * .45 }, at)
        .to(el, { x: 0, duration: d, ease: 'power1.out' }, at)
        .to(el, { y: peak, duration: d * .45, ease: 'power2.out' }, at)
        .to(el, { y: 0, duration: d * .55, ease: 'power2.in' }, at + d * .45)
        .to(el, { rotation: 0, duration: d, ease: 'power2.out' }, at)
        .to(el, { y: -fs * .05, duration: .09, ease: 'power2.out' }, at + d)
        .to(el, { y: 0, duration: .16, ease: 'power2.in' }, at + d + .09);
      return at + d;
    };
    const launch = (angle, group, at) => {
      if (!group.length) return at;
      const tip = tipAt(angle);
      tl.to(pole, { rotation: angle, duration: .4, ease: 'back.out(1.4)' }, at)
        .to(pole, { rotation: angle + (angle < 0 ? 6 : -6), duration: .08 }, at + .34)
        .to(pole, { rotation: angle, duration: .3, ease: 'elastic.out(1, 0.5)' }, at + .42);
      let end = at;
      group.forEach((idx, n) => {
        const t0 = at + .34 + n * .1;
        pulse(t0, tip.x, tip.y, Math.max(.2, .5 - n * .1));
        end = Math.max(end, fling(idx, tip, t0));
      });
      return end;
    };
    let P = intro.duration() / SLOW - .1;
    P = launch(-63, leftSide, P);
    P = launch(63, rightSide, leftSide.length ? P - .3 : P);
    tl.to(pole, { rotation: 0, duration: .5, ease: 'elastic.out(1, 0.55)' }, P - .16)
      .to(ball, { opacity: 0, scale: 0, duration: .3, ease: 'power2.in' }, P - .12);
    tl.timeScale(1.15);
    return tl;
  }

  /* ------------------------------------------------------------------
     Opening animation, part 2: the wordmark turns into the headline one letter at a time,
     the headline drops down and pulls apart, and the portrait builds itself in the gap.
     ------------------------------------------------------------------ */
  let portrait = null;
  let introDone = false;
  let dropTl = null, heroTl = null, morphTimer = 0;

  const heroLayout = () => {
    const H = hero.clientHeight;
    const mobile = innerWidth < 768;
    const fs = parseFloat(getComputedStyle(t1).fontSize);
    return {
      top: mobile ? H * .2 : Math.min(H * .74, H - fs / 2 - 120),
      gap: Math.min(300, innerWidth * .2),
    };
  };

  const applyFinalHero = () => {
    const { top, gap } = heroLayout();
    if (hasGsap) {
      gsap.set(titleWrap, { top });
      gsap.set(t1, { x: -gap / 2 });
      gsap.set(t2, { x: gap / 2 });
    } else {
      titleWrap.style.top = top + 'px';
      t1.style.transform = `translateX(${-gap / 2}px)`;
      t2.style.transform = `translateX(${gap / 2}px)`;
    }
  };

  const finishIntro = () => {
    introDone = true;
    root.classList.remove('intro');
    window.scrollTo(0, 0);
    if (hasGsap) ScrollTrigger.refresh();
    onScroll();
  };

  const heroSequence = () => {
    const { top, gap } = heroLayout();
    heroTl = gsap.timeline({ onComplete: finishIntro });
    heroTl
      .to(titleWrap, { top, duration: 1.5, ease: 'power3.inOut' }, '+=0.2')
      .fromTo([role, cta], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: .2, ease: 'power3.out' }, '-=1.0')
      .call(() => portrait.play(), null, '-=1.2')
      .to(t1, { x: -gap / 2, duration: 1.5, ease: 'power3.out' }, '<')
      .to(t2, { x: gap / 2, duration: 1.5, ease: 'power3.out' }, '<');
  };

  const morphToHeadline = done => {
    let i = 0;
    morphTimer = setInterval(() => {
      setTitle([...HERO_WORD].map((ch, r) => (r < Math.floor(i) ? ch : r < WORDMARK.length ? WORDMARK[r] : '')).join(''));
      if (i >= HERO_WORD.length) { clearInterval(morphTimer); morphTimer = 0; done(); }
      i += 1 / 3;
    }, 50);
  };

  const runIntro = () => {
    window.scrollTo(0, 0);
    setTitle(WORDMARK);
    heroTitle.style.opacity = 0;
    titleWrap.style.visibility = 'visible';
    dropTl = buildDrop();
    dropTl.eventCallback('onComplete', () => {
      heroTitle.style.opacity = 1;   // cross-fade from the falling letters to the real headline
      drop.style.opacity = 0;
      setTimeout(() => { drop.textContent = ''; }, 350);
      morphToHeadline(heroSequence);
    });
  };

  const skipIntro = () => {
    if (!root.classList.contains('intro')) return;
    if (dropTl) dropTl.kill();
    if (heroTl) heroTl.kill();
    if (morphTimer) clearInterval(morphTimer);
    drop.style.opacity = 0;
    drop.textContent = '';
    titleWrap.style.visibility = 'visible';
    heroTitle.style.opacity = 1;
    setTitle(HERO_WORD);
    applyFinalHero();
    portrait.play(3.4);
    finishIntro();
  };

  /* ------------------------------------------------------------------
     Page chrome: nav state, progress line, active link, menu, anchors
     ------------------------------------------------------------------ */
  const nav = $('.nav');
  const progressBar = $('#progress');
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY;
    nav.classList.toggle('scrolled', y > 24);
    const max = document.documentElement.scrollHeight - innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    if (portrait) portrait.setScatter(clamp(y / (innerHeight * .7)));
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  const links = $$('.links a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => (a.getAttribute('href') === '#' + e.target.id
        ? a.setAttribute('aria-current', 'true')
        : a.removeAttribute('aria-current')));
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  $$('main section[id], header[id]').forEach(s => spy.observe(s));

  const btn = $('.menu-btn');
  const menu = $('#menu');
  const setMenu = open => {
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); skipIntro(); } });
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));

  let pinST = null;
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    if (root.classList.contains('intro')) return;
    let y = id === 'home' ? 0 : target.getBoundingClientRect().top + scrollY;
    if (id === 'projects' && pinST) y = pinST.start;
    scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  }));
  $('#skip').addEventListener('click', skipIntro);

  /* ------------------------------------------------------------------
     Words of the About text, so they can light up one by one
     ------------------------------------------------------------------ */
  const scrubEl = $('[data-scrub]');
  let words = [];
  if (scrubEl) {
    words = scrubEl.textContent.trim().split(/\s+/).map(text => {
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = text;
      return span;
    });
    scrubEl.textContent = '';
    words.forEach((w, i) => scrubEl.append(w, i < words.length - 1 ? ' ' : ''));
  }

  /* ------------------------------------------------------------------
     Project shelf
     ------------------------------------------------------------------ */
  const shelf = $('#shelf');
  const shelfCards = $$('.card-p', shelf);
  const count = $('#count');
  const bar = $('#bar');
  const shelfStep = () => (shelfCards.length > 1 ? shelfCards[1].offsetLeft - shelfCards[0].offsetLeft : shelf.clientWidth);
  const showShelf = (i, fill) => {
    count.textContent = `${pad2(i + 1)} / ${pad2(shelfCards.length)}`;
    bar.style.transform = `scaleX(${fill})`;
  };
  const nativeShelfUpdate = () => {
    const i = clamp(Math.round(shelf.scrollLeft / shelfStep()), 0, shelfCards.length - 1);
    showShelf(i, (i + 1) / shelfCards.length);
  };
  shelf.addEventListener('scroll', () => { if (!pinST) nativeShelfUpdate(); }, { passive: true });
  const goShelf = dir => {
    if (pinST) {
      const n = shelfCards.length;
      const idx = clamp(Math.round(pinST.progress * (n - 1)) + dir, 0, n - 1);
      scrollTo({ top: pinST.start + (idx / (n - 1)) * (pinST.end - pinST.start), behavior: reduce ? 'auto' : 'smooth' });
    } else {
      shelf.scrollBy({ left: dir * shelfStep(), behavior: reduce ? 'auto' : 'smooth' });
    }
  };
  $('#prev').addEventListener('click', () => goShelf(-1));
  $('#next').addEventListener('click', () => goShelf(1));
  shelf.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goShelf(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goShelf(-1); }
  });
  nativeShelfUpdate();

  /* ------------------------------------------------------------------
     Scroll animations (GSAP ScrollTrigger). Only with motion allowed.
     ------------------------------------------------------------------ */
  function setupScroll() {
    const EASE = 'power3.out', DUR = .9, START = 'top 88%';
    const variants = { up: { y: 40 }, down: { y: -40 }, left: { x: -48 }, right: { x: 48 }, scale: { scale: .94 }, fade: {} };
    const once = (trigger, start = START, extra = {}) => ({ trigger, start, once: true, ...extra });

    gsap.matchMedia().add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 768px)' }, ctx => {
      const { motion, desktop } = ctx.conditions;
      if (!motion) return;
      const cleanups = [];

      // Generic reveals: data-reveal, data-reveal-group, data-reveal-lines, data-parallax
      $$('[data-reveal]').forEach(el => gsap.from(el, {
        ...(variants[el.dataset.reveal] || variants.up), opacity: 0, duration: DUR, ease: EASE,
        delay: parseFloat(el.dataset.revealDelay) || 0, clearProps: 'transform', scrollTrigger: once(el),
      }));
      $$('[data-reveal-group]').forEach(group => gsap.from([...group.children], {
        y: 32, opacity: 0, duration: DUR, ease: EASE, stagger: parseFloat(group.dataset.revealGroup) || .08,
        clearProps: 'transform', scrollTrigger: once(group),
      }));
      $$('[data-reveal-lines]').forEach(h => gsap.from($$('.line', h), {
        yPercent: 110, duration: 1.1, ease: EASE, stagger: .12, scrollTrigger: once(h, 'top 90%'),
      }));
      $$('[data-parallax]').forEach(el => {
        const amount = parseFloat(el.dataset.parallax) || 40;
        gsap.fromTo(el, { yPercent: -amount / 10 }, {
          yPercent: amount / 10, ease: 'none',
          scrollTrigger: { trigger: el.closest('[data-parallax-frame]') || el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // About: the ghost heading rises and fills like water; the text lights up word by word.
      const ghost = $('[data-intro]');
      if (ghost) gsap.from(ghost, { y: 100, opacity: 0, duration: 1, ease: EASE,
        scrollTrigger: once('#about', 'top 70%', { onEnter: () => ghost.classList.add('fill') }) });
      if (words.length) {
        if (desktop) {
          gsap.fromTo(words, { color: '#52525b', opacity: .2 }, {
            color: '#ffffff', opacity: 1, stagger: .1, ease: 'none',
            scrollTrigger: { trigger: scrubEl, start: 'top 85%', end: 'bottom 50%', scrub: true },
          });
        } else {
          gsap.from(scrubEl, { y: 24, opacity: 0, duration: DUR, ease: EASE, scrollTrigger: once(scrubEl, 'top 90%') });
        }
      }

      // Services: rows rise in one after another while their rule lines draw across.
      const rows = $$('[data-service-row]');
      if (rows.length) {
        gsap.timeline({ scrollTrigger: once(rows[0], 'top 88%') })
          .from(rows, { yPercent: 12, opacity: 0, duration: .7, ease: EASE, stagger: .08, clearProps: 'transform' })
          .from($$('.rule', rows[0].parentElement), { scaleX: 0, duration: .6, ease: 'power2.out', stagger: .08 }, 0);
      }

      // Projects: on desktop the section pins and the page scroll drives the shelf sideways.
      if (desktop && shelf.scrollWidth - shelf.clientWidth > 0) {
        const max = () => shelf.scrollWidth - shelf.clientWidth;
        const n = shelfCards.length;
        shelf.classList.add('is-pinned');
        shelf.scrollLeft = 0;
        const tween = gsap.to(shelf, {
          scrollLeft: () => max(), ease: 'none',
          scrollTrigger: {
            trigger: '#projects', start: 'top top', end: () => '+=' + max(), pin: true, scrub: 1,
            anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: self => showShelf(Math.round(self.progress * (n - 1)), lerp(1 / n, 1, self.progress)),
          },
        });
        pinST = tween.scrollTrigger;
        cleanups.push(() => { pinST = null; shelf.classList.remove('is-pinned'); shelf.scrollLeft = 0; nativeShelfUpdate(); });
      }

      // Contact: the panel floats up, its rows slide out of masks, and it drifts as you scroll.
      const panel = $('[data-contact-panel]');
      if (panel) {
        gsap.timeline({ scrollTrigger: once(panel, 'top 85%') })
          .from(panel, { y: 48, opacity: 0, duration: 1.1, ease: EASE })
          .from($$('[data-row-inner]', panel), { yPercent: 105, opacity: 0, duration: .85, ease: EASE, stagger: .08 }, '-=0.75')
          .from($$('.contact-links > *', panel), { y: 24, opacity: 0, duration: .7, ease: EASE, stagger: .08 }, '-=0.5');
        if (desktop) {
          gsap.fromTo(panel, { yPercent: 3.5 }, { yPercent: -3.5, ease: 'none',
            scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        }
      }

      // Buttons that lean towards the pointer
      if (matchMedia('(pointer: fine)').matches) {
        $$('[data-magnetic]').forEach(el => {
          const strength = parseFloat(el.dataset.magnetic) || .3;
          const qx = gsap.quickTo(el, 'x', { duration: .55, ease: 'power3.out' });
          const qy = gsap.quickTo(el, 'y', { duration: .55, ease: 'power3.out' });
          const move = e => {
            const r = el.getBoundingClientRect();
            qx((e.clientX - (r.left + r.width / 2)) * strength);
            qy((e.clientY - (r.top + r.height / 2)) * strength);
          };
          const leave = () => { qx(0); qy(0); };
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerleave', leave);
          cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
        });
      }

      return () => cleanups.forEach(fn => fn());
    });
  }

  /* ------------------------------------------------------------------
     Contact background: a fragment shader draws slow smoke (replaces a video)
     ------------------------------------------------------------------ */
  function createSmoke(canvas) {
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    const vert = 'attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }';
    const frag = `
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
      uniform vec2 uRes;
      uniform float uTime;
      float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + vec2(11.7, 5.3); a *= 0.5; }
        return v;
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / uRes;
        vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 2.4;
        float t = uTime * 0.05;
        vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
        float f = fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 1.2);
        float body = smoothstep(0.3, 0.95, f);
        float tendril = pow(clamp(1.0 - abs(f - 0.55) * 2.4, 0.0, 1.0), 5.0);
        float vig = smoothstep(1.5, 0.15, length(uv - vec2(0.5, 0.45)) * 1.5);
        vec3 col = vec3(0.012) + vec3(0.30, 0.32, 0.36) * body * 0.5 + vec3(0.85, 0.88, 0.95) * tendril * 0.14;
        gl_FragColor = vec4(col * vig, 1.0);
      }`;
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    let prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    } catch (err) { console.warn('Smoke shader disabled:', err); return; }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');

    const scale = .4; // the smoke is soft, so render small and let the browser stretch it
    const fit = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const render = now => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 12 : now / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    let raf = 0;
    const loop = now => { render(now); raf = requestAnimationFrame(loop); };
    new ResizeObserver(() => { fit(); render(performance.now()); }).observe(canvas);
    fit();
    new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf); raf = 0;
      if (e.isIntersecting) { if (reduce) render(0); else raf = requestAnimationFrame(loop); }
    }).observe(canvas);
  }

  /* ------------------------------------------------------------------
     Cursor dot (mouse devices only)
     ------------------------------------------------------------------ */
  const dot = $('.cursor');
  if (dot && matchMedia('(pointer: fine)').matches && !reduce) {
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, seen = false;
    addEventListener('pointermove', e => {
      if (!seen) { seen = true; x = tx = e.clientX; y = ty = e.clientY; dot.classList.add('on'); }
      tx = e.clientX; ty = e.clientY;
    }, { passive: true });
    const tick = () => {
      x += (tx - x) * .22; y += (ty - y) * .22;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(tick);
    };
    tick();
    document.addEventListener('pointerover', e => {
      dot.classList.toggle('big', !!(e.target.closest && e.target.closest('a, button, .card-p, .svc, .card')));
    });
  }

  /* ------------------------------------------------------------------
     Start
     ------------------------------------------------------------------ */
  portrait = createPortrait($('#portrait'));
  createSmoke($('#smoke'));

  if (animated) {
    setupScroll();
    addEventListener('load', () => ScrollTrigger.refresh());
    runIntro();
    setTimeout(skipIntro, 25000); // safety net: never leave the page locked
  } else {
    setTitle(HERO_WORD);
    applyFinalHero();
    portrait.play(100);
    introDone = true;
    onScroll();
  }

  addEventListener('resize', () => { if (introDone) applyFinalHero(); });
})();
