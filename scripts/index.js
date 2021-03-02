let buttonShow = document.querySelector('.button_type_edit');
let buttonHide = document.querySelector('.popup__button_type_close');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let nameInfo = document.querySelector('.info__name');
let jobInfo = document.querySelector('.info__about');

function openPopup() {
  popup.classList.add('popup_opened');
  save();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup();
}

function save() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
}

  buttonShow.addEventListener ('click', openPopup);
  buttonHide.addEventListener ('click', closePopup);
  formElement.addEventListener('submit', formSubmitHandler);

  


let buttonAdd = document.querySelector('.button_type_add-card');
let popup_add_card = document.querySelector('.popup_type_add-card');
let buttonClose = document.querySelector('.popup__button_type_close-add-card');


function openPopup_add_card() {
  popup_add_card.classList.add('popup_opened');
}

function closePopup_add_card() {
  popup_add_card.classList.remove('popup_opened');
}


  buttonAdd.addEventListener ('click', openPopup_add_card);
  buttonClose.addEventListener ('click', closePopup_add_card);
  

  let buttonLike = document.querySelectorAll('.card__button-like');

  Array.prototype.forEach.call(buttonLike,function(el){
    el.addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__button-like_active')})
});

  

let buttonOpenPicture = document.querySelectorAll('.card__picture');
let buttonClosePicture = document.querySelector('.popup__button_type_close-photo')
let popupZoomPicture = document.querySelector('.popup_type_open-photo');

Array.prototype.forEach.call(buttonOpenPicture,function(el){
  el.addEventListener('click', function () {
    popupZoomPicture.classList.add('popup_opened')})
});

function closeZoomPicture() {
  popupZoomPicture.classList.remove('popup_opened')
}

buttonClosePicture.addEventListener ('click', closeZoomPicture);




let cardName = document.querySelector('.card__name');
let cardLink = document.querySelector('.card__picture');
let cardNameInput = document.querySelector('.popup__input_type_card-name');
let cardLinkInput = document.querySelector('.popup__input_type_card-link');



function formSubmitNewCard (evt) {
  evt.preventDefault();
  cardLink.textContent = cardNameInput.value;
  cardLink.textContent = cardLinkInput.value;
  closePopup_add_card();
}

  formElement.addEventListener('submit', formSubmitNewCard);


  document.addEventListener('animationstart', function (e) {
    if (e.animationName === 'fade-in') {
        e.target.classList.add('popup__animation');
    }
  });
  
  document.addEventListener('animationend', function (e) {
    if (e.animationName === 'fade-out') {
        e.target.classList.remove('popup__animation');
     }
  });

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

