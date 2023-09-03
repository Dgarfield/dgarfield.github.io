{
  'use strict';

  const toggleClass = (el, cssClass) => {
    el.classList.toggle(cssClass);
  };
  const styleElements = () => {
    /* Fixed position headers mess up anchors, so this fix is to make anchors jump to correct positions */
    const headerHeight = document.getElementById('main-header').offsetHeight;
    const footerHeight = document.getElementById('footer').offsetHeight;
    const spacers = document.querySelectorAll('.spacer');
    
    spacers.forEach((element) => {
      element.style.height = `${footerHeight / 10}rem`;
    });
    document.getElementById("home-a").style.height = `${headerHeight / 11}rem`;

    typeWriter();

    const d = new Date();
    let year = d.getFullYear();
    document.getElementById("year").innerHTML = year;
  };

  let i = 0;
  const typeWriter = () => {
    const txt = "I build responsive websites.\nPlease check out my skills below.";
    const speed = 80;
    let timeoutID = null;

    if (i < txt.length) {
      document.getElementById("typing").innerHTML += txt.charAt(i);
      i++;
      timeoutID = setTimeout (
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