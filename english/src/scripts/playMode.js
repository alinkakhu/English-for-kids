import { game } from "../index.js";
export const repeatBtn = document.querySelector(".repeat-word");
export let startBtn = document.querySelector(".start-game");

export function getCurrentArrCards() {
  let currentCards = document.querySelectorAll(".card");

  game.startBtnisClicked = true;
  currentCards.forEach((item) => {
    game.audioArray.push(item.querySelector("audio").src.slice(53));
  });
  game.audioArray.sort(() => Math.random() - 0.5);
  playAudio2(false);
  repeatBtn.classList.remove("none");
  startBtn.classList.add("none");
}
function getWord(arr) {
  return arr.shift();
}

export function playAudio2(repeat) {
  if (repeat == 3) {
    new Audio(game.currentWord).play();
  } else game.currentWord = getWord(game.audioArray);
  new Audio(game.currentWord).play();
}

startBtn.addEventListener("click", getCurrentArrCards);
