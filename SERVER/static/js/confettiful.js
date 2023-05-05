class Confettiful {
  constructor(el) {
    this.el = el;
    this.containerEl = null;

    this.confettiFrequency = 10;
    this.confettiColors = [
      "#EF2964",
      "#00C09D",
      "#2D87B0",
      "#48485E",
      "#EFFF1D",
    ];
    this.confettiAnimations = ["slow", "medium", "fast"];

    this._setupElements();
    this._renderConfetti();
  }
  _setupElements() {
    const containerEl = document.createElement("div");
    const elPosition = this.el.style.position;

    if (elPosition !== "relative" || elPosition !== "absolute") {
      this.el.style.position = "relative";
    }

    containerEl.classList.add("confetti-container");

    containerEl.setAttribute("id", "target");

    this.el.appendChild(containerEl);

    this.containerEl = containerEl;

    setTimeout(() => {
      //document.querySelector('.output').style.display = 'none';
      document.getElementById("target").remove();
    }, 10000);
  }
  _renderConfetti() {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement("div");
      const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
      const confettiBackground =
        this.confettiColors[
          Math.floor(Math.random() * this.confettiColors.length)
        ];
      const confettiLeft =
        Math.floor(Math.random() * this.el.offsetWidth) + "px";
      const confettiAnimation =
        this.confettiAnimations[
          Math.floor(Math.random() * this.confettiAnimations.length)
        ];

      confettiEl.classList.add(
        "confetti",
        "confetti--animation-" + confettiAnimation
      );
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);

      this.containerEl.appendChild(confettiEl);
    }, 25);
  }
}

export default Confettiful;
