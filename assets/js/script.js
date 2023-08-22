{
  'use strict';

  /* TODO: Clean up by using more arrays, objects and loops */

  const toggleClass = (el, cssClass) => {
    el.classList.toggle(cssClass);
  };
  const styleElements = () => {
    /* Fix to make anchors jump to correct position, fixed headers cause issues with this */
    const headerHeight = document.getElementById('main-header').offsetHeight;
    document.getElementById("home-a").style.height = `${headerHeight}px`;
    document.getElementById("about-a").style.height = `${headerHeight}px`;
    document.getElementById("portfolio-a").style.height = `${headerHeight}px`;

    typeWriter();

    const d = new Date();
    let year = d.getFullYear();
    document.getElementById("year").innerHTML = year;
  };

  let i = 0;
  const typeWriter = () => {
    const txt = `I build fun responsive websites!`;
    const speed = 200;
    
    if (i < txt.length) {
      document.getElementById("typing").innerHTML += txt.charAt(i);
      i++;
      var timeoutID = setTimeout (
        typeWriter, speed
      );
    } else {
      clearTimeout(timeoutID);
    }
  };

  window.onload = () => {
    styleElements();
  };
  window.onresize = () => {
    styleElements();
  };

  /* Set color scheme by user preference, if they've set it up in their browser */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const theme = e.matches ? "dark" : "light";
    const lightSwitch = document.getElementById("light-switch");
    const on = lightSwitch.classList.contains("light-on");
    const el = document.body;
    const el0 = document.getElementById("main-header");
    const el1 = document.getElementById("footer");
    const elements = document.querySelectorAll('.neon-border');
    
    if ((theme === 'light' && !on) || (theme === 'dark' && on)) {
      toggleClass(el, "light-on");
      toggleClass(lightSwitch, "light-on");
      toggleClass(el0, "light-on");
      toggleClass(el1, "light-on");

      elements.forEach((element) => {
        toggleClass(element, "light-on");
      });
    }
  });

  const themeToggleBtn = document.querySelector("[data-theme-btn]");
  themeToggleBtn.addEventListener("click", () => {
    const el = document.body;
    const el0 = document.getElementById("light-switch");
    const el1 = document.getElementById("main-header");
    const el2 = document.getElementById("footer");
    const elements = document.querySelectorAll('.neon-border');

    toggleClass(el, "light-on");
    toggleClass(el0, "light-on");
    toggleClass(el1, "light-on");
    toggleClass(el2, "light-on");
    
    elements.forEach((element) => {
      toggleClass(element, "light-on");
    });
  });
}