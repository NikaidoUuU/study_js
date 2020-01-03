import Character from "./Character.js";

(function() {
  const stage = document.querySelector(".stage");
  const house = document.querySelector(".house");
  const bar = document.querySelector(".progress-bar");
  const selectCharacter = document.querySelector(".select-character");
  const mousePos = { x: 0, y: 0 };
  let maxScrollValue;

  function resizeHandler() {
    // (스크롤 할 수 있는 범위) 전체 문서 높이 - 창 높이
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener("scroll", () => {
    const scrollPer = pageYOffset / maxScrollValue;
    /* 끝에 조금 안 닿게, default -490vw, -490 ~ 490 */
    const zMove = scrollPer * 980 - 490;
    house.style.transform = `translateZ(${zMove}vw)`;

    // progress bar
    bar.style.width = scrollPer * 100 + "%";
  });

  window.addEventListener("mousemove", e => {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stage.style.transform = `
    rotateX(${mousePos.y * 5}deg) 
    rotateY(${mousePos.x * 5}deg)
    `;
  });

  window.addEventListener("resize", resizeHandler);

  stage.addEventListener("click", e => {
    new Character({
      xPos: (e.clientX / window.innerWidth) * 100,
      speed: Math.random() * 0.5 + 0.2
    });
  });

  selectCharacter.addEventListener("click", e => {
    const value = e.target.getAttribute("data-char");
    document.body.setAttribute("data-char", value);
  });

  resizeHandler();
})();
