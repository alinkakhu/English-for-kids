import {cards} from './cards.js';
import { startBtn} from './playMode';
import { train,main } from  "../index.js";
export let mainCard;
 export let categoryC={
  categoryCards: ''
 }

export function createCard(obj) {
    if (!obj) { return }
    const gallery = obj.cards.map(item => {
      return `<li class="card">
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

    }).join('');
    startBtn.removeAttribute('disabled')
    const ul = document.createElement('ul');
    const container = document.createElement('div');
    container.classList.add('container');
    ul.classList.add('category-list');
    main.append(container);
    container.append(ul);
    ul.insertAdjacentHTML('afterbegin', gallery);

    categoryC.categoryCards = document.querySelectorAll('.category-disc');
   if (train.classList.contains('none')) {
    categoryC.categoryCards.forEach((item) => {
     item.classList.add('none');
      item.closest('li').classList.add('card-play');
     item.closest('li').firstElementChild.classList.add('play-mode');
     const imgCard = item.closest('li').querySelector('.card-img');
    imgCard.classList.add('img-play');
     })
   }
   }



   export function createMainCards() {
   let maingGallery = cards.map(item => {
      return `<li class="main-card">
    <div class="main-img">
    <img src="${item.cards[6].image}" alt="">
    </div>
   <div class="main-content">${item.categoryName}</div>
    </li>`;
    }).join('');

    const mainUl = document.createElement('ul');
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');
    mainUl.classList.add('main-list');
    main.append(mainContainer);
    mainContainer.append(mainUl);
    mainUl.insertAdjacentHTML('afterbegin', maingGallery);
    mainCard = document.querySelectorAll('.main-card')
    if (train.classList.contains('none')) {
      mainCard.forEach((item) => {
    item.classList.add('play-mode')
      })
    }

  }






 export function flipCard(card) {
    // console.log(card.closest('li').firstElementChild.lastElementChild.querySelector('audio').src.slice(32).slice(0, -4))
    card.closest('li').classList.add('is-flipped');
     let storage = JSON.parse(localStorage.getItem('statistics'));
      storage.forEach((item) => {
        if (card.closest('li').firstElementChild.lastElementChild.querySelector('audio').src.slice(32).slice(0, -4) == item.word) {
          item.clicked += 1;
        }
      });
      localStorage.setItem('statistics', JSON.stringify(storage))
  }

 export function reverseFlip(card) {
    card.closest('li').addEventListener('mouseleave', () => {
  card.closest('li').classList.remove('is-flipped');
      card.closest('li').classList.add('rotate')
    });
  }

  document.addEventListener('click', (e) => {
    console.log(e.target)
     if (e.target.classList.contains('turn')) {
      let audio = e.target.closest('li').firstElementChild.lastElementChild.querySelector('audio').src;
      console.log(e.target)
      flipCard(e.target);
      new Audio(audio).play();
       reverseFlip(e.target);
     }
   }
  )


