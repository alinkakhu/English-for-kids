import { game } from  "../index.js";
import { refreshPage } from '../index.js';
export const modalWin = document.querySelector('.modal-win');
export const modalText = document.querySelector('.modal-win-text');
export const modalWinImg = document.querySelector('.modal-win-img');
 export const modalOverlay = document.querySelector('.modal-overlay');
 import { count } from '../index';

 export function winImage() {
   if (game.audioArray.length != 0) return;
  modalWin.classList.add('active');
  modalOverlay.classList.add('is-open');

  if (count >= 7) {

    modalText.textContent = 'You win!';
    modalWinImg.src = '../src/img/success.jpg';
    new Audio('../src/audio/success.mp3').play();
    setTimeout(() => refreshPage(), 3000)
  }
  else {

    modalText.textContent = 'You lose!';
    modalWinImg.src = '../src/img/failure.jpg';
    new Audio('../src/audio/failure.mp3').play();
    setTimeout(() => refreshPage(), 3000)
  }
}
