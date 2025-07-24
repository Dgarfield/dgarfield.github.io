const els = {
  body: document.body,
  lightSwitch: document.getElementById("light-switch"),
  mainHeader: document.getElementById("main-header"),
  homeSpacer: document.getElementById("home-a"),
  typing: document.getElementById("typing"),
  footer: document.getElementById("footer"),
  curYear: document.getElementById("year"),
  themeBtn: document.querySelector("[data-theme-btn]"),
  neonBorder: document.querySelectorAll('.neon-border'),
  spacers: document.querySelectorAll('.spacer'),

  toggleTheme: function(theme='none') {
    const lightOn = this.lightSwitch.classList.contains("light-on");
    
    if ((theme === 'light' && !lightOn) || (theme === 'dark' && lightOn) || (theme === 'none')) {
      this.body.classList.toggle("light-on");
      this.lightSwitch.classList.toggle("light-on");
      this.mainHeader.classList.toggle("light-on");
      this.footer.classList.toggle("light-on");
      this.neonBorder.forEach((element) => {
        element.classList.toggle("light-on");
      });
    }
  },
  styleElements: function() {
    /* Fixed position headers mess up anchors, so this fix is to make anchors jump to correct positions */
    const headerHeight = this.mainHeader.offsetHeight;
    
    els.spacers.forEach((element) => {
      element.style.height = `${headerHeight / 12}rem`;
    });
    this.homeSpacer.style.height = `${headerHeight / 10}rem`;
  }
}

let typeWriterInt = 0;
let timeoutID = {};
const typeWriter = () => {
  const typeWriterTxt = "I've been a front end web developer for over 10 years.\nPlease check out some of my skills below.";
  const typeWriterTxtLen = typeWriterTxt.length;

  if (typeWriterInt < typeWriterTxtLen) {
    els.typing.innerHTML += typeWriterTxt.charAt(typeWriterInt);
    typeWriterInt++;
    timeoutID = setTimeout (
      typeWriter, 60
    );
  } else {
    clearTimeout(timeoutID);
  }
};

const themeToggleBtn = els.themeBtn;
themeToggleBtn.addEventListener("click", () => {
  els.toggleTheme();
});

window.onload = () => {
  els.styleElements();
  typeWriter();

  const d = new Date();
  let year = d.getFullYear();
  els.curYear.innerHTML = year;
};

window.onresize = () => {
  els.styleElements();
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const theme = e.matches ? "dark" : "light";
  els.toggleTheme(theme);
});
