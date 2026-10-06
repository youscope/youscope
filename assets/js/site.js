// Header shadow on scroll, one-time section reveal, and progressive
// enhancement of the newsletter form (AJAX POST when an endpoint is set).
(function () {
  // Sticky header border once the page moves.
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Single orchestrated reveal for sections.
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Newsletter form.
(function () {
  var embed = document.getElementById("subscribe-embed");
  if (!embed) return;

  var LABEL = "Notify me";
  function relabel() {
    var btns = embed.querySelectorAll('input[type="submit"]');
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].value !== LABEL) btns[i].value = LABEL;
    }
  }
  relabel();
  new MutationObserver(relabel).observe(embed, { childList: true, subtree: true });
  var n = 0, iv = setInterval(function () { relabel(); if (++n > 40) clearInterval(iv); }, 250);
})();

  var form = document.getElementById("subscribe-form");
  if (!form) return;
  var msg = form.querySelector(".form-msg");
  var input = form.querySelector('input[type="email"]');
  var action = form.getAttribute("action") || "";
  var isMailto = action.indexOf("mailto:") === 0;

  function say(text, ok) {
    if (!msg) return;
    msg.textContent = text;
    msg.className = "form-msg " + (ok ? "ok" : "err");
  }

  form.addEventListener("submit", function (e) {
    // No endpoint configured, or a mailto: fallback. We let the browser handle it.
    if (!action || isMailto) return;

    e.preventDefault();
    var email = (input && input.value || "").trim();
    if (!email || email.indexOf("@") < 1) { say("Enter a valid email address.", false); return; }

    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; }
    say("Signing you up…", true);

    fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" },
      mode: "no-cors" // most embed endpoints (Buttondown/listmonk) don't send CORS
    }).then(function () {
      form.reset();
      say("You're on the list. We'll email you once — when it ships.", true);
    }).catch(function () {
      say("Something went wrong. Please try again, or email us.", false);
    }).finally(function () {
      if (btn) btn.disabled = false;
    });
  });
})();
