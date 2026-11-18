// fx.js, Damon's surprise layer (built 2026-10-16).
// His rule: anything you interact with does something unexpected and fun,
// then goes back to normal. The element always does its real job too,
// a click still clicks. Nothing here is a library; it is hand-rolled,
// like the rest of the site.
(function () {
  "use strict";

  // Respect a visitor who asked their system for less motion.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var canHover = window.matchMedia("(hover: hover)").matches;

  function restart(el, className, ms) {
    el.classList.remove(className);
    void el.offsetWidth; // reflow, so the animation can play again
    el.classList.add(className);
    window.setTimeout(function () {
      el.classList.remove(className);
    }, ms);
  }

  // --- Melt -------------------------------------------------------------
  // CSS does the liquefying (see .fx-melting in styles.css, gooey SVG
  // filter #goo in index.html). JS just rings the bell.
  function melt(el) {
    restart(el, "fx-melting", 1050);
  }

  // --- Bounce -----------------------------------------------------------
  function bounce(el) {
    restart(el, "fx-bouncing", 750);
  }

  // --- Fall -------------------------------------------------------------
  // Pocket physics: gravity pulls the element down, it lands with a small
  // hop and a squash, then springs back home with an overshoot wobble.
  // Transform only, so the page layout never jumps.
  function fall(el) {
    if (el.dataset.fxBusy === "1") return;
    el.dataset.fxBusy = "1";

    var FLOOR = 150; // px of drop
    var GRAV = 3000; // px per second squared
    var y = 0;
    var v = 0;
    var hops = 0;
    var phase = "drop";
    var last = null;
    var homeAt = null;

    function easeOutBack(t) {
      var c1 = 1.70158;
      var c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    function frame(ts) {
      if (last === null) last = ts;
      var dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;

      if (phase === "drop") {
        v += GRAV * dt;
        y += v * dt;
        if (y >= FLOOR) {
          y = FLOOR;
          if (hops < 1 && v > 260) {
            v = -v * 0.32; // one small hop off the floor
            hops++;
          } else {
            phase = "home";
            homeAt = ts;
          }
        }
        var rot = Math.max(-10, Math.min(10, y / 16));
        var squash = phase === "home" ? 0.82 : 1;
        el.style.transform =
          "translateY(" + y + "px) rotate(" + rot + "deg) scaleY(" + squash + ")";
        window.requestAnimationFrame(frame);
      } else {
        var t = Math.min((ts - homeAt) / 620, 1);
        var e = easeOutBack(t);
        var yy = FLOOR * (1 - e);
        var rr = 10 * (1 - e);
        el.style.transform =
          "translateY(" + yy + "px) rotate(" + rr + "deg) scaleY(1)";
        if (t < 1) {
          window.requestAnimationFrame(frame);
        } else {
          el.style.transform = "";
          delete el.dataset.fxBusy;
        }
      }
    }
    window.requestAnimationFrame(frame);
  }

  var fx = { melt: melt, fall: fall, bounce: bounce };

  // Buttons (and anything else) carrying data-fx get their surprise on
  // click. Default behavior is NOT prevented: links still go, mail still
  // opens. The show happens alongside the job.
  document.querySelectorAll("[data-fx]").forEach(function (el) {
    el.addEventListener("click", function () {
      var fn = fx[el.getAttribute("data-fx")];
      if (fn) fn(el);
    });
  });

  // Nav links jelly-wobble when used.
  document.querySelectorAll("header nav a:not(.house)").forEach(function (a) {
    a.addEventListener("click", function () {
      restart(a, "fx-jelly", 550);
    });
  });

  // The house: poke it and the chimney puffs harder while the house hops.
  var house = document.querySelector(".house");
  if (house) {
    house.addEventListener("click", function () {
      restart(house, "fx-party", 950);
    });
  }

  // Tablet screens glitch for a beat. If the screen is a link, hold the
  // navigation just long enough to see it, then go.
  document.querySelectorAll(".tablet .screen").forEach(function (screen) {
    screen.addEventListener("click", function (ev) {
      restart(screen, "fx-glitching", 380);
      var link = screen.querySelector("a");
      if (link && !ev.defaultPrevented) {
        ev.preventDefault();
        var href = link.getAttribute("href");
        var target = link.getAttribute("target");
        window.setTimeout(function () {
          if (target === "_blank") {
            window.open(href, "_blank", "noopener");
          } else {
            window.location.href = href;
          }
        }, 340);
      }
    });
  });

  // Tablets and the portrait lean toward your cursor, then settle back.
  if (canHover) {
    document
      .querySelectorAll(".tablet, #home img.box-shadow")
      .forEach(function (el) {
        el.classList.add("fx-tilt");
        // The portrait is centered with translateX(-50%) in styles.css;
        // keep that in the composed transform or the photo would jump.
        var base = el.matches("#home img") ? "translateX(-50%) " : "";
        el.addEventListener("pointermove", function (ev) {
          var r = el.getBoundingClientRect();
          var px = (ev.clientX - r.left) / r.width - 0.5;
          var py = (ev.clientY - r.top) / r.height - 0.5;
          el.style.transform =
            base +
            "perspective(700px) rotateX(" +
            (-py * 7).toFixed(2) +
            "deg) rotateY(" +
            (px * 9).toFixed(2) +
            "deg)";
        });
        el.addEventListener("pointerleave", function () {
          el.style.transform = "";
        });
      });
  }
})();
