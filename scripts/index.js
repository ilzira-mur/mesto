import { Card } from './Card.js';
import { obj, FormValidator } from './FormValidator.js';

const popup = document.querySelectorAll('.popup');
const buttonEdit = document.querySelector('.button_type_edit');
const editFormModalWindow = document.querySelector('.popup_type_edit');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const nameInfo = document.querySelector('.info__name');
const jobInfo = document.querySelector('.info__about');
const buttonAddCard = document.querySelector('.button_type_add-card');
const cardFormModalWindow = document.querySelector('.popup_type_add-card');
const formElementCard = document.querySelector('.popup__form_type_new-card');
const addCardNameInput = document.querySelector('.popup__input_type_card-name');
const addCardLinkInput = document.querySelector('.popup__input_type_card-link');
const cardsList = document.querySelector('.cards');
const buttonCreateNewCard = document.querySelector('.popup__button_type_save-card');

// экземпляр класса FormValidator для каждой формы
const formValidatorTypeEdit = new FormValidator(obj, '.popup__form_type_edit');
const enableValidationTypeEdit = formValidatorTypeEdit.enableValidation();

const formValidatorTypeNewCard = new FormValidator(obj, '.popup__form_type_new-card');
const enableValidationTypeNewCard = formValidatorTypeNewCard.enableValidation();


// открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_type_opened');
};

// закрытие модального окна
function closePopup(popup) {
  popup.classList.remove('popup_type_opened');
};

// открытие модального окна радактирования профиля
function openPopupEdit() {
  savePopupEdit();
  openPopup(editFormModalWindow);
};

// копирование информации профиля в строки ввода модального окна
function savePopupEdit() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};


// сохранение внесенных измений профиля 
function submitEditProfile(event) {
  event.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(editFormModalWindow);
};


// форма добавления новой карточки
function submitNewCard(event) {
  event.preventDefault();
  renderCard({
    name: addCardNameInput.value,
    link: addCardLinkInput.value
  },cardsList);
  formElementCard.reset();
  buttonCreateNewCard.classList.add('popup__button_disabled');
  buttonCreateNewCard.setAttribute('disabled', true);
  closePopup(cardFormModalWindow);
};


// прогрузка карточек на страницу
initialCards.forEach((item) => {
const card = new Card(item, '.card-template_type_default');
const cardElement = card.createNewCard();
const cardsList = document.querySelector('.cards');
cardsList.prepend(cardElement);
});


// рендер карточек
function renderCard(item, cardsList) {
  const card = new Card(item, '.card-template_type_default');
  cardsList.prepend(card.createNewCard());
 };


// закрытие попапа кликом на оверлей или нажатием на кнопку крестик
popup.forEach(popup => {
  popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button_type_close')) {
    closePopup(evt.target.closest('.popup'));
  };
  });
});


// закрытие попапа нажатием на Esc
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_type_opened');
    closePopup(popupActive);
  };
};


// слушатели
document.addEventListener('keydown', keyHandler);
buttonEdit.addEventListener('click', openPopupEdit);
buttonAddCard.addEventListener('click', () => openPopup(cardFormModalWindow))
formElementEdit.addEventListener('submit', submitEditProfile);
formElementCard.addEventListener('submit', submitNewCard);
