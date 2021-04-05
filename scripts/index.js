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
const zoomedPictureModalWindow = document.querySelector('.popup_type_zoomed');
const popupZoomedPicture = document.querySelector('.popup__picture');
const popupZoomedName = document.querySelector('.popup__caption');
const cardsList = document.querySelector('.cards');


// экземпляр класса FormValidator для каждой формы
const formValidatorTypeEdit = new FormValidator(obj, formElementEdit);
formValidatorTypeEdit.enableValidation();

const formValidatorTypeNewCard = new FormValidator(obj, formElementCard);
formValidatorTypeNewCard.enableValidation();


// открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_type_opened');
  document.addEventListener('keydown', keyHandler);
};

// закрытие модального окна
function closePopup(popup) {
  popup.classList.remove('popup_type_opened');
  document.removeEventListener('keydown', keyHandler);
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

// открытие модального окна увеличенной картинки
export function handleZoomedPicture(name, link) {
  popupZoomedPicture.src = link;
  popupZoomedPicture.alt = name;
  popupZoomedName.textContent = name;
  openPopup(zoomedPictureModalWindow);
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
  formValidatorTypeNewCard.disableSubmitButton();
  closePopup(cardFormModalWindow);
};


// прогрузка карточек на страницу
initialCards.forEach((item) => {
const cardElement = createCard(item);
cardsList.prepend(cardElement);
});


// рендер карточек
function renderCard(item) {
  cardsList.prepend(createCard(item));
 };


// создание нового экземпляра карточки
 function createCard(item) {
  const card = new Card(item, '.card-template_type_default');
  return card.createNewCard();
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
buttonEdit.addEventListener('click', openPopupEdit);
buttonAddCard.addEventListener('click', () => openPopup(cardFormModalWindow))
formElementEdit.addEventListener('submit', submitEditProfile);
formElementCard.addEventListener('submit', submitNewCard);