(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. CURSOR GLOW — ambient spotlight following the mouse
       ===================================================== */
    var glow = document.createElement("div");
    glow.id = "cursor-glow";
    document.body.insertBefore(glow, document.body.firstChild);

    document.addEventListener("mousemove", function (e) {
      document.documentElement.style.setProperty("--cx", e.clientX + "px");
      document.documentElement.style.setProperty("--cy", e.clientY + "px");
    });

    /* =====================================================
       2. HERO PARALLAX — content & image move against each other
       ===================================================== */
    var heroSection = document.getElementById("hero");
    if (heroSection) {
      var heroContent = heroSection.querySelector(".content");
      var heroImg    = heroSection.querySelector(".image");

      document.addEventListener("mousemove", function (e) {
        var w = window.innerWidth, h = window.innerHeight;
        var dx = (e.clientX / w - 0.5) * 28;
        var dy = (e.clientY / h - 0.5) * 14;

        if (heroContent) {
          heroContent.style.transform = "translate(" + (dx * 0.35) + "px, " + (dy * 0.35) + "px)";
        }
        if (heroImg) {
          heroImg.style.transform = "translate(" + (-dx * 0.55) + "px, " + (-dy * 0.55) + "px)";
        }
      });
    }

    /* =====================================================
       3. MAGNETIC EFFECT — social icons + CTA button
       ===================================================== */
    var magneticSelectors = [
      "#hero a[href]",
      "#contact a.btn",
      ".navbar-brand",
    ];
    document.querySelectorAll(magneticSelectors.join(", ")).forEach(function (el) {
      el.classList.add("magnetic");

      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var cx = rect.left + rect.width  / 2;
        var cy = rect.top  + rect.height / 2;
        var dx = (e.clientX - cx) * 0.32;
        var dy = (e.clientY - cy) * 0.32;
        el.style.transition = "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)";
        el.style.transform  = "translate(" + dx + "px, " + dy + "px)";
      });

      el.addEventListener("mouseleave", function () {
        el.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
        el.style.transform  = "";
      });
    });

    /* =====================================================
       4. AOS — Animate on Scroll
       ===================================================== */
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 650,
        easing: "ease-out-cubic",
        once: true,
        offset: 40,
      });
    }

    /* =====================================================
       5. PARTICLES.JS — Hero constellation background
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
            opacity: 0.18,
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
       6. TYPED.JS — General delivery-pedigree subtitle
          (metrics live in the stats cards, not here)
       ===================================================== */
    var heroH2 = document.querySelector("#hero h2");
    if (heroH2 && typeof Typed !== "undefined") {
      heroH2.innerHTML = '<span id="hero-typed"></span>';
      new Typed("#hero-typed", {
        strings: [
          "I engineer systems that ship &mdash;&nbsp;and&nbsp;keep&nbsp;shipping.",
          "I turn ambiguity into production&#8209;grade&nbsp;reality.",
          "I build the platforms other engineers build&nbsp;on.",
          "I lead from the whiteboard all the way to the&nbsp;war&nbsp;room.",
          "I close the gap between demo and&nbsp;deployed.",
          "I make hard problems look&nbsp;routine.",
        ],
        typeSpeed: 40,
        backSpeed: 20,
        backDelay: 3200,
        startDelay: 700,
        loop: true,
        smartBackspace: false,
        showCursor: true,
        cursorChar: "|",
      });
    }

    /* =====================================================
       7. COUNTUP — Animated impact counters
       ===================================================== */
    var statEls = document.querySelectorAll(".stat-counter");
    if (statEls.length) {
      var counterObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var endVal   = parseFloat(el.dataset.end);
            var suffix   = el.dataset.suffix   || "";
            var prefix   = el.dataset.prefix   || "";
            var decimals = el.dataset.decimals  ? parseInt(el.dataset.decimals) : 0;

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
       8. VANILLA-TILT — Stat card 3-D tilt effect
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
