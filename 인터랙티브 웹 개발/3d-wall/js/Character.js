class Character {
  constructor(info) {
    this.mainElem = document.createElement("div");
    this.mainElem.classList.add("character");
    this.mainElem.innerHTML = `
           <div class="character-face-con character-head">
               <div class="character-face character-head-face face-front"></div>
               <div class="character-face character-head-face face-back"></div>
           </div>
           <div class="character-face-con character-torso">
               <div class="character-face character-torso-face face-front"></div>
               <div class="character-face character-torso-face face-back"></div>
           </div>
           <div class="character-face-con character-arm character-arm-right">
               <div class="character-face character-arm-face face-front"></div>
               <div class="character-face character-arm-face face-back"></div>
           </div>
           <div class="character-face-con character-arm character-arm-left">
               <div class="character-face character-arm-face face-front"></div>
               <div class="character-face character-arm-face face-back"></div>
           </div>
           <div class="character-face-con character-leg character-leg-right">
               <div class="character-face character-leg-face face-front"></div>
               <div class="character-face character-leg-face face-back"></div>
           </div>
           <div class="character-face-con character-leg character-leg-left">
               <div class="character-face character-leg-face face-front"></div>
               <div class="character-face character-leg-face face-back"></div>
           </div>
           `;
    this.mainElem.style.left = `${info.xPos}%`;
    this.scrollState = false;
    this.lastScrollTop = 0;
    this.xPos = info.xPos;
    this.speed = info.speed;
    this.direction;
    this.runningState = false;
    this.rafId;
    this.init();

    document.querySelector(".stage").appendChild(this.mainElem);
  }

  init() {
    window.addEventListener("scroll", e => {
      clearTimeout(this.scrollState);

      if (!this.scrollState) {
        this.mainElem.classList.add("running");
      }

      this.scrollState = setTimeout(() => {
        this.scrollState = false;
        this.mainElem.classList.remove("running");
      }, 500);

      if (this.lastScrollTop > pageYOffset) {
        this.mainElem.setAttribute("data-direction", "backward");
      } else {
        this.mainElem.setAttribute("data-direction", "forward");
      }

      this.lastScrollTop = pageYOffset;
    });

    window.addEventListener("keydown", e => {
      if (this.runningState) return;

      switch (e.keyCode) {
        case 37:
          this.direction = "left";
          this.mainElem.setAttribute("data-direction", "left");
          this.mainElem.classList.add("running");
          this.run();
          this.runningState = true;
          break;
        case 39:
          this.direction = "right";
          this.mainElem.setAttribute("data-direction", "right");
          this.mainElem.classList.add("running");
          this.run();
          this.runningState = true;
          break;
      }
    });

    window.addEventListener("keyup", e => {
      this.mainElem.classList.remove("running");
      this.runningState = false;
      cancelAnimationFrame(this.rafId);
    });
  }

  run() {
    switch (this.direction) {
      case "left":
        this.xPos -= this.speed;
        break;
      case "right":
        this.xPos += this.speed;
        break;
    }

    if (this.xPos < 2) {
      this.xPos = 2;
    }

    if (this.xPos > 88) {
      this.xPos = 88;
    }

    this.mainElem.style.left = `${this.xPos}%`;

    this.rafId = requestAnimationFrame(() => this.run());
  }
}

export default Character;
