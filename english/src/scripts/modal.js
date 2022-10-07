import { game } from  "../index.js";
import { refreshPage } from '../index.js';
export const modalWin = document.querySelector('.modal-win');
export const modalText = document.querySelector('.modal-win-text');
export const modalWinImg = document.querySelector('.modal-win-img');
 export const modalOverlay = document.querySelector('.modal-overlay');
 export const mistakesP = document.querySelector('.mistakes');
 import { count, mistakes} from '../index';

 export function winImage() {
   if (game.audioArray.length != 0) return;
  modalWin.classList.add('active');
  modalOverlay.classList.add('is-open');

  if (count >= 8) {

    modalText.textContent = 'You win!';
    modalWinImg.src = 'src/img/success.jpg';
    mistakesP.textContent =0;
    new Audio('src/audio/success.mp3').play();
    setTimeout(() => refreshPage(), 3000)
  }
  else {

    modalText.textContent = 'You lose!';
    modalWinImg.src = 'src/img/failure.jpg';
    mistakesP.textContent = mistakes
    new Audio('src/audio/failure.mp3').play();
    setTimeout(() => refreshPage(), 3000)
  }
}
