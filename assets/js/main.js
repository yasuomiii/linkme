(function __lbRuntime(PREVIEW) {
  var cfg = null, root = document.documentElement, raf = 0, lastP = '', bound = false;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function mode() {
    var m = cfg.mode, sv = null;
    
    if (cfg.toggle) { try { sv = localStorage.getItem('lb-theme'); } catch (e) { } }
    if (sv === 'dark' || sv === 'light') m = sv;
    if (m === 'auto') m = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    return m;
  }
  function applyTheme(anim) {
    if (anim && cfg.themeFx) { root.classList.add('theme-anim'); setTimeout(function () { root.classList.remove('theme-anim'); }, 800); }
    root.setAttribute('data-theme', mode());
    var tc = document.querySelector('meta[name=theme-color]');
    if (tc) { try { tc.setAttribute('content', getComputedStyle(document.body).backgroundColor); } catch (e) { } }
  }
  function toast(t) { var d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(function () { d.remove(); }, 1900); }
  /* particles */
  function stopP() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
  function startP() {
    stopP();
    var c = document.getElementById('pc');
    if (!c || !cfg.p || cfg.p.type === 'none') return;
    var ctx = c.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() { W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener('resize', size);
    var t = cfg.p.type, n = Math.round(cfg.p.count * (W < 600 ? .6 : 1)), sp = cfg.p.speed / 50, sz = cfg.p.size, op = cfg.p.op / 100;
    var col = cfg.p.color || getComputedStyle(root).getPropertyValue('--accent').trim() || '#ffffff';
    var ps = [], i;
    for (i = 0; i < n; i++) ps.push({ x: Math.random() * W, y: Math.random() * H, r: (.4 + Math.random()) * sz, vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5, ph: Math.random() * 6.28, s: .5 + Math.random() });
    function draw(ts) {
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = col; ctx.strokeStyle = col;
      var k, p, q, dx, dy, d;
      for (k = 0; k < ps.length; k++) {
        p = ps[k];
        if (t === 'dots') {
          p.x += p.vx * sp; p.y += p.vy * sp; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
          ctx.globalAlpha = op; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
          for (var j = k + 1; j < ps.length; j++) { q = ps[j]; dx = p.x - q.x; dy = p.y - q.y; d = dx * dx + dy * dy; if (d < 12000) { ctx.globalAlpha = op * .5 * (1 - d / 12000); ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } }
        } else if (t === 'snow') {
          p.y += (.4 + p.r * .35) * sp; p.x += Math.sin(ts / 1400 + p.ph) * .35 * sp; if (p.y > H + 6) { p.y = -6; p.x = Math.random() * W; }
          ctx.globalAlpha = op * (.5 + p.s * .5); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        } else if (t === 'stars') {
          ctx.globalAlpha = op * (.35 + .65 * Math.abs(Math.sin(ts / 900 * p.s * sp + p.ph))); ctx.beginPath(); ctx.arc(p.x, p.y, p.r * .7, 0, 6.283); ctx.fill();
        } else if (t === 'bubbles') {
          p.y -= (.3 + p.r * .12) * sp; p.x += Math.sin(ts / 1200 + p.ph) * .3; if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
          var rr = p.r * 3.2; ctx.globalAlpha = op * .22; ctx.beginPath(); ctx.arc(p.x, p.y, rr, 0, 6.283); ctx.fill(); ctx.globalAlpha = op; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(p.x, p.y, rr, 0, 6.283); ctx.stroke();
        } else if (t === 'fireflies') {
          p.vx += (Math.random() - .5) * .06; p.vy += (Math.random() - .5) * .06; p.vx *= .98; p.vy *= .98; p.x += p.vx * sp * 2; p.y += p.vy * sp * 2;
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
          var a = op * (.3 + .7 * Math.abs(Math.sin(ts / 1000 * p.s + p.ph))), g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 7);
          g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.globalAlpha = a; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 7, 0, 6.283); ctx.fill(); ctx.fillStyle = col;
        }
      }
      ctx.globalAlpha = 1;
    }
    if (reduced || cfg.thumb) { draw(1500); return; }
    function loop(ts) { if (!document.hidden) draw(ts); raf = requestAnimationFrame(loop); }
    raf = requestAnimationFrame(loop);
  }
  function bind() {
    if (bound) return; bound = true;
    var fine = window.matchMedia && matchMedia('(pointer:fine)').matches;
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var g = document.getElementById('cglow');
      if (g && cfg.cursorGlow && fine) { g.classList.add('on'); g.style.setProperty('--px', e.clientX + 'px'); g.style.setProperty('--py', e.clientY + 'px'); }
      var a = e.target.closest && e.target.closest('.lk');
      if (a) {
        var r = a.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        a.style.setProperty('--mx', x + 'px'); a.style.setProperty('--my', y + 'px');
        if (a.classList.contains('h-tilt')) { a.style.setProperty('--ry', ((x / r.width - .5) * 10).toFixed(2) + 'deg'); a.style.setProperty('--rx', ((.5 - y / r.height) * 8).toFixed(2) + 'deg'); }
      }
    });
    document.addEventListener('pointerleave', function () { var g = document.getElementById('cglow'); if (g) g.classList.remove('on'); });
    document.addEventListener('pointerout', function (e) { var a = e.target.closest && e.target.closest('.h-tilt'); if (a && !a.contains(e.relatedTarget)) { a.style.setProperty('--rx', '0deg'); a.style.setProperty('--ry', '0deg'); } });
    document.addEventListener('pointerdown', function (e) {
      var a = e.target.closest && e.target.closest('.lk.c-ripple');
      if (a && !reduced) { var r = a.getBoundingClientRect(), s = document.createElement('span'); s.className = 'rip'; s.style.left = (e.clientX - r.left) + 'px'; s.style.top = (e.clientY - r.top) + 'px'; a.appendChild(s); setTimeout(function () { s.remove(); }, 800); }
    });
    document.addEventListener('click', function (e) {
      var t = e.target, el;
      if ((el = t.closest('[data-grp]'))) { var g = el.closest('.grp'); g.classList.toggle('closed'); el.setAttribute('aria-expanded', g.classList.contains('closed') ? 'false' : 'true'); return; }
      if (t.closest('#tt')) {
        var nm = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        
        try { localStorage.setItem('lb-theme', nm); } catch (er) { }
        cfg.mode = cfg.mode === 'auto' || cfg.mode === nm ? cfg.mode : cfg.mode; applyTheme(true); return;
      }
      if (t.closest('#sh')) {
        
        var u = location.href;
        if (navigator.share) { navigator.share({ title: cfg.title, url: u }).catch(function () { }); }
        else if (navigator.clipboard) { navigator.clipboard.writeText(u).then(function () { toast('Link kopiert'); }, function () { toast(u); }); }
        else toast(u);
        return;
      }
      var a = t.closest('a.lk');
      if (a) {
        a.classList.remove('clk'); void a.offsetWidth; a.classList.add('clk'); setTimeout(function () { a.classList.remove('clk'); }, 600);
        
        try {
          var id = a.getAttribute('data-id');
          if (cfg.analytics === 'goatcounter' && window.goatcounter && goatcounter.count) goatcounter.count({ path: 'click-' + id, title: a.getAttribute('aria-label'), event: true });
          else if (cfg.analytics === 'umami' && window.umami && umami.track) umami.track('link-click', { id: id });
          else if (cfg.analytics === 'plausible' && window.plausible) plausible('Link', { props: { id: id } });
        } catch (er) { }
        return;
      }
      
    });
    
  }
  function start(c) { cfg = c; applyTheme(false); bind(); startP(); }
  
  var el = document.getElementById('cfg');
  if (el) { try { start(JSON.parse(el.textContent));  } catch (e) { } }
})(false);