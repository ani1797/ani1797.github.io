(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. AOS — Animate on Scroll
       ===================================================== */
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 750,
        easing: "ease-out-cubic",
        once: true,
        offset: 50,
      });
    }

    /* =====================================================
       2. PARTICLES.JS — Hero constellation background
       ===================================================== */
    var heroEl = document.getElementById("hero");
    if (heroEl && typeof particlesJS !== "undefined") {
      var pDiv = document.createElement("div");
      pDiv.id = "hero-particles";
      pDiv.style.cssText =
        "position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;";
      heroEl.insertBefore(pDiv, heroEl.firstChild);

      particlesJS("hero-particles", {
        particles: {
          number: { value: 70, density: { enable: true, value_area: 900 } },
          color: { value: "#a78bfa" },
          shape: { type: "circle" },
          opacity: {
            value: 0.4,
            random: true,
            anim: { enable: true, speed: 0.6, opacity_min: 0.05, sync: false },
          },
          size: { value: 2.5, random: true },
          line_linked: {
            enable: true,
            distance: 145,
            color: "#a78bfa",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.7,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: false },
            resize: true,
          },
          modes: { repulse: { distance: 90, duration: 0.4 } },
        },
        retina_detect: true,
      });
    }

    /* =====================================================
       3. TYPED.JS — Cycling hero subtitle
       ===================================================== */
    var heroH2 = document.querySelector("#hero h2");
    if (heroH2 && typeof Typed !== "undefined") {
      heroH2.innerHTML = '<span id="hero-typed"></span>';
      new Typed("#hero-typed", {
        strings: [
          "I turn cutting&#8209;edge AI into production&#8209;grade systems.",
          "I shipped GenAI that runs at&nbsp;110M+&nbsp;calls&nbsp;a&nbsp;year.",
          "I reduced policy underwriting from days to under&nbsp;2&nbsp;minutes.",
          "I build the platforms other engineers build&nbsp;on.",
          "I make AI genuinely useful in production&nbsp;&mdash;&nbsp;at&nbsp;scale.",
        ],
        typeSpeed: 42,
        backSpeed: 22,
        backDelay: 3000,
        startDelay: 700,
        loop: true,
        smartBackspace: false,
        showCursor: true,
        cursorChar: "|",
      });
    }

    /* =====================================================
       4. COUNTUP — Animated impact counters
       ===================================================== */
    var statEls = document.querySelectorAll(".stat-counter");
    if (statEls.length) {
      var counterObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var endVal = parseFloat(el.dataset.end);
            var suffix = el.dataset.suffix || "";
            var prefix = el.dataset.prefix || "";
            var decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;

            if (typeof CountUp !== "undefined") {
              var cu = new CountUp(el, endVal, {
                startVal: 0,
                duration: 2.4,
                suffix: suffix,
                prefix: prefix,
                decimalPlaces: decimals,
                useGrouping: true,
                useEasing: true,
              });
              if (!cu.error) cu.start();
              else el.textContent = prefix + endVal + suffix;
            } else {
              el.textContent = prefix + endVal + suffix;
            }
            counterObserver.unobserve(el);
          });
        },
        { threshold: 0.6 }
      );
      statEls.forEach(function (s) { counterObserver.observe(s); });
    }

    /* =====================================================
       5. VANILLA-TILT — Stat card 3-D tilt effect
       ===================================================== */
    if (typeof VanillaTilt !== "undefined") {
      VanillaTilt.init(document.querySelectorAll(".stat-card"), {
        max: 7,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        scale: 1.02,
      });
    }

  });
})();
