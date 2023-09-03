{
  'use strict';
  const bodyEl = document.body;
  const lightSwitchEl = document.getElementById("light-switch");
  const mainHeaderEl = document.getElementById("main-header");
  const footerEl = document.getElementById("footer");
  const neonBorderEl = document.querySelectorAll('.neon-border');
  const spacersEl = document.querySelectorAll('.spacer');

  const toggleTheme = (theme='none') => {
    const lightOn = lightSwitchEl.classList.contains("light-on");
    
    if ((theme === 'light' && !lightOn) || (theme === 'dark' && lightOn) || (theme === 'none')) {
      bodyEl.classList.toggle("light-on");
      lightSwitchEl.classList.toggle("light-on");
      mainHeaderEl.classList.toggle("light-on");
      footerEl.classList.toggle("light-on");
      neonBorderEl.forEach((element) => {
        element.classList.toggle("light-on");
      });
    }
  };

  const styleElements = () => {
    /* Fixed position headers mess up anchors, so this fix is to make anchors jump to correct positions */
    const headerHeight = document.getElementById('main-header').offsetHeight;
    
    spacersEl.forEach((element) => {
      element.style.height = `${headerHeight / 12}rem`;
    });
    document.getElementById("home-a").style.height = `${headerHeight / 10}rem`;
  };

  let typeWriterInt = 0;
  let timeoutID = {};
  const typeWriterTxt = "I build responsive websites.\nPlease check out my skills below.";
  const typeWriterTxtLen = typeWriterTxt.length;

  const typeWriter = () => {
    if (typeWriterInt < typeWriterTxtLen) {
      document.getElementById("typing").innerHTML += typeWriterTxt.charAt(typeWriterInt);
      typeWriterInt++;
      timeoutID = setTimeout (
        typeWriter, 60
      );
    } else {
      clearTimeout(timeoutID);
    }
  };

  const themeToggleBtn = document.querySelector("[data-theme-btn]");
  themeToggleBtn.addEventListener("click", () => {
    toggleTheme();
  });

  window.onload = () => {
    styleElements();
    typeWriter();

    const d = new Date();
    let year = d.getFullYear();
    document.getElementById("year").innerHTML = year;
  };

  window.onresize = () => {
    styleElements();
  };
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const theme = e.matches ? "dark" : "light";
    toggleTheme(theme);
  });
}