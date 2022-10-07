import { cards } from "./scripts/cards.js";
import {
  createCard,
  createMainCards,
  categoryC,

} from "./scripts/createCards.js";
import {
  generateStatistics,
  generateStatisticsRow,
} from "./scripts/statistics.js";
import { winImage, modalOverlay, modalWin } from "./scripts/modal.js";
import {
  repeatBtn,
  startBtn,
  getCurrentArrCards,
  playAudio2,
} from "./scripts/playMode.js";

export let mistakes =0;
export let count = 0;
export let startCount = 0;
export let game = {
  startBtnisClicked: false,
  currentWord: "",
  audioArray: [],
};
export const train = document.querySelector(".train");
export const startDiv = document.querySelector(".start");
export let playMode = false;
export const main = document.getElementById("main");
export let wordsArray = [];
export let wordsArr = [];
export const menu = document.querySelector(".menu-list");
export const stat = document.querySelector(".stat");
export const switcher = document.querySelector(".toggle-fill");
export const play = document.querySelector(".play");
export const navList = document.querySelector(".nav-list");
export const front = document.querySelector(".front");
export const back = document.querySelector(".back");
export const burgerIcon = document.querySelector(".bi-list");

for (let card of cards) {
  wordsArr.push(...card.cards);
}
function setLocalStorage() {
  localStorage.setItem("statistics", JSON.stringify(wordsArr));
}
setLocalStorage();

menu.addEventListener("click", (e) => {
  let target = e.target.textContent;
  const result = cards.find((item) => item.categoryName === target);

  if (
    e.target.classList.contains("nav-item") ||
    e.target.classList.contains("nav-link")
  ) {

    if (target === "Main page") {
      main.innerHTML = "";
      createMainCards();
    } else if (target === "Statistics") {
      main.innerHTML = "";
      generateStatistics();
      startDiv.classList.add("none");
    } else {
      main.innerHTML = "";
      createCard(result);
    }
  }
});

main.addEventListener("click", (e) => {
  let target = e.target;

  if (main.firstElementChild.firstChild.classList.contains("main-list")) {
    if (target.classList.contains("main-content") || target.nodeName == "IMG") {
      if (target.nodeName == "IMG") {
        target = target.closest("div").nextElementSibling;
      }
      const result = cards.find(
        (item) => item.categoryName === target.textContent
      );
      main.innerHTML = "";
      createCard(result);
    }
  }
});
createMainCards();

function changeStyle() {
  let changeMainC = document.querySelectorAll('.main-card')
  game.startBtnisClicked = false;
  playMode = !playMode;
  let ul = document.querySelector(".main-list");

  if (ul && playMode) {
    startBtn.setAttribute("disabled", "");
  }
  startDiv.classList.toggle("none");
  train.classList.toggle("none");
  play.classList.toggle("none");

  if (train.classList.contains("none")) {
    navList.classList.add("play-mode");
    burgerIcon.classList.add("play-icon");
    changeMainC.forEach((item) => {
      item.classList.add("play-mode");
    });

    startBtn.classList.remove("none");

    if (!categoryC.categoryCards) {
      return;
    }

    categoryC.categoryCards.forEach((item) => {
      item.classList.add("none");
      item.closest("li").classList.add("card-play");
      item.closest("li").firstElementChild.classList.add("play-mode");
      const imgCard = item.closest("li").querySelector(".card-img");
      imgCard.classList.add("img-play");
    });
    repeatBtn.classList.add("none");

    if (game.startBtnisClicked) {
      startBtn.classList.add("none");
      repeatBtn.classList.remove("none");
    }
  } else {
    startDiv.classList.add("none");
    burgerIcon.classList.remove("play-icon");
    navList.classList.remove("play-mode");
   [...categoryC.categoryCards].forEach((item) => {
      item.closest("li").classList.remove("disabled");
      item.closest("li").removeAttribute("disabled");
      item.closest("li").style.pointerEvents = "auto";
      item.classList.remove("none");
      item.closest("li").classList.remove("card-play");
      item.closest("li").firstElementChild.classList.remove("play-mode");
      const imgCard = item.closest("li").querySelector(".card-img");
      imgCard.classList.remove("img-play");
    });
    changeMainC.forEach((item) => {
      item.classList.remove("play-mode");
    });
    game.audioArray = [];
    const starsSwitch = document.querySelectorAll(".star");
    starsSwitch.forEach((item) => {
      item.remove();
    });
    let repeatCards = document.querySelectorAll(".card.repeat");
    repeatCards.forEach((item) => {
      item.closest("li").removeAttribute("disabled");
      item.closest("li").style.pointerEvents = "auto";
    });
  }
}

switcher.addEventListener("click", changeStyle);

startBtn.addEventListener("click", getCurrentArrCards);

document.addEventListener("click", (e) => {
  if (!playMode) {
    return;
  }
  let categoryDisabled = document.querySelectorAll(".card");

  if (!game.startBtnisClicked && playMode) {
    categoryDisabled.forEach((item) => {
      item.setAttribute("disabled", "");
      item.style.pointerEvents = "none";
    });
  } else {
    categoryDisabled.forEach((item) => {
      item.removeAttribute("disabled");
      item.style.pointerEvents = "auto";
    });
  }

  if (e.target.classList.contains("nav-link")) {
    game.audioArray = [];
    const starsToRemove = document.querySelectorAll(".star");
    starsToRemove.forEach((item) => {
      item.remove();
    });
    repeatBtn.classList.add("none");
    startBtn.classList.remove("none");
  }
  let clickedCard = e.target
    .closest(".front")
    .lastElementChild.querySelector("audio")
    .src.slice(53);

    if(!clickedCard){
      return
    }

  if (clickedCard === game.currentWord) {
    playCorrect();
    appendStar();
    e.target.closest("li").classList.add("disabled");
    count++;
    setTimeout(() => playAudio2(), 1000);

    let x = JSON.parse(localStorage.getItem("statistics"));

    x.forEach((item) => {
      if (clickedCard.slice(10).slice(0, -4) == item.word) {
        item.correct += 1;
      }
    });
    localStorage.setItem("statistics", JSON.stringify(x));
  } else {
    appendLoseStar();
    playFailure();
    mistakes++;
    count--;

    let y = JSON.parse(localStorage.getItem("statistics"));
    y.forEach((item) => {
      if (game.currentWord.slice(10).slice(0, -4) == item.word) {
        item.wrong += 1;
      }
    });
    localStorage.setItem("statistics", JSON.stringify(y));
  }
  winImage();
});

function playCorrect() {
  new Audio("src/audio/correct.mp3").play();
}
function playFailure() {
  new Audio("src/audio/error.mp3").play();
}

const starsContainer = document.querySelector(".stars");

function appendStar() {
  const winStar = document.createElement("img");
  winStar.src = "src/img/win-star.svg";
  winStar.classList.add("star");
  starsContainer.append(winStar);
  countStars()
}

function appendLoseStar() {
  const loseStar = document.createElement("img");
  loseStar.classList.add("star");
  loseStar.src = "src/img/lose-star.svg";
  starsContainer.append(loseStar);
  countStars()
}

function countStars(){
  let starsCount = document.querySelectorAll('.star');
  if(starsCount.length>=10){
starsCount.forEach((item)=>{
  item.remove()
})
  }
}
export const input = document.querySelector("input");
export function refreshPage() {
  modalOverlay.classList.remove("is-open");
  modalWin.classList.remove("active");
  game.startBtnisClicked = false;
  count = 0;
  game.currentWord = "";
  game.audioArray = [];
  main.innerHTML = "";
  playMode = false;
  const stars = document.querySelectorAll(".star");
  stars.forEach((item) => {
    item.remove();
  });
  navList.classList.remove("play-mode");
  burgerIcon.classList.remove("play-icon");

  createMainCards();
  const mainCards = document.querySelectorAll(".main-card");
  mainCards.forEach((item) => {
    item.classList.remove("play-mode");
  });
  startDiv.classList.add("none");
  train.classList.remove("none");
  play.classList.add("none");
  input.checked = true;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("repeat-word")) {
    playAudio2(3);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("stat-reset")) {
    localStorage.clear();
    setLocalStorage();
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    generateStatisticsRow();
  } else if (e.target.classList.contains("stat-repeat")) {
    playMode = false;
    startDiv.classList.add("none");
    navList.classList.remove("play-mode");
    const localSt = JSON.parse(localStorage.getItem("statistics"));
    main.innerHTML = "";
    train.classList.remove("none");
    play.classList.add("none");
    input.checked = true;
    burgerIcon.classList.remove("play-icon");
    let repeatArr = [];
    localSt.forEach((item) => {
      if (item.wrong > 1) {
        repeatArr.push(item);
      }
    });
    startBtn.setAttribute("disabled", "");

    const newRepeatArr = repeatArr
      .map((item) => {
        return `<li class="card repeat">
<div class="front">
<div class="category-img">
    <img src="${item.image}" class = "card-img" alt="">
</div>
<div class="category-disc">
<p>${item.word}</p>
<audio src="${item.audioSrc}"></audio>
<button type="button"><svg xmlns="http://www.w3.org/2000/svg" class ='turn' width="25" height="25" fill="currentColor" class="bi bi-arrow-clockwise"
    viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
</svg></button>
</div>
</div>

<div class="back">
    <div class="category-img">
        <img src="${item.image}" alt="">
    </div>
    <div class="category-disc">
        <p>${item.translation}</p>
    </div>
</div>

</li>`;
      })
      .join("");
    const ul = document.createElement("ul");
    const container = document.createElement("div");
    container.classList.add("container");
    ul.classList.add("category-list", "category-repeat");
    main.append(container);
    container.append(ul);
    ul.insertAdjacentHTML("afterbegin", newRepeatArr);
  }
});
