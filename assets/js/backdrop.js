// Plate/stage-grid backdrop: a faint coordinate grid with a few "wells" that
// pulse and a scan line easing across; an automated stage acquiring a plate.
// Deliberately quiet. Honors reduced-motion, pauses when the tab is hidden,
// and reads its colors from the current theme's CSS variables.
(function () {
  var canvas = document.getElementById("backdrop");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var w = 0, h = 0, dpr = 1, cell = 46, wells = [], t = 0, raf = null;

  function css(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  var C = {};
  function readColors() {
    C.line = css("--grid-line") || "rgba(0,0,0,.05)";
    C.dot  = css("--grid-dot")  || "rgba(163,35,27,.18)";
    C.scan = css("--scan")      || "rgba(163,35,27,.08)";
  }

  function seedWells() {
    wells = [];
    var cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
    var n = Math.min(14, Math.max(6, Math.round((cols * rows) / 26)));
    for (var i = 0; i < n; i++) {
      wells.push({
        cx: (Math.floor(Math.random() * cols) + 0.5) * cell,
        cy: (Math.floor(Math.random() * rows) + 0.5) * cell,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 0.7
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cell = w < 640 ? 38 : 46;
    readColors();
    seedWells();
    if (reduce) draw(0); // one static frame
  }

  function draw(scan) {
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var x = cell; x < w; x += cell) { ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, h); }
    for (var y = cell; y < h; y += cell) { ctx.moveTo(0, y + .5); ctx.lineTo(w, y + .5); }
    ctx.stroke();

    // Scan line (skipped under reduced motion)
    if (!reduce) {
      var sx = scan * (w + cell) - cell;
      var g = ctx.createLinearGradient(sx - 60, 0, sx + 60, 0);
      g.addColorStop(0, "transparent");
      g.addColorStop(0.5, C.scan);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(sx - 60, 0, 120, h);
    }

    // Wells
    for (var i = 0; i < wells.length; i++) {
      var wl = wells[i];
      var pulse = reduce ? 0.5 : (Math.sin(t * wl.speed + wl.phase) * 0.5 + 0.5);
      var r = 3 + pulse * 3.5;
      ctx.beginPath();
      ctx.arc(wl.cx, wl.cy, r, 0, Math.PI * 2);
      ctx.fillStyle = C.dot;
      ctx.globalAlpha = 0.35 + pulse * 0.5;
      ctx.fill();
      ctx.globalAlpha = 1;
      // ring
      ctx.beginPath();
      ctx.arc(wl.cx, wl.cy, r + 3.5, 0, Math.PI * 2);
      ctx.strokeStyle = C.dot;
      ctx.globalAlpha = 0.18 + pulse * 0.18;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  var last = 0, period = 9000; // scan sweep period (ms)
  function loop(now) {
    if (!last) last = now;
    t += (now - last) / 1000;
    last = now;
    var scan = (now % period) / period;
    draw(scan);
    raf = requestAnimationFrame(loop);
  }

  function start() { if (!reduce && raf == null) { last = 0; raf = requestAnimationFrame(loop); } }
  function stop()  { if (raf != null) { cancelAnimationFrame(raf); raf = null; } }

  window.addEventListener("resize", function () {
    clearTimeout(window.__ysrz);
    window.__ysrz = setTimeout(resize, 150);
  }, { passive: true });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  // Re-read colors when the theme flips.
  var mo = new MutationObserver(function () { readColors(); if (reduce) draw(0); });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  resize();
  start();
})();
