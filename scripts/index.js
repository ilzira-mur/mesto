const popup = document.querySelector('.popup');

const buttonEditFormClose = document.getElementById('buttonCloseEdit');
const buttonCardFormClose = document.getElementById('buttonAddCardClose');
const buttonZoomedPictureClose = document.getElementById('buttonZooomedPictureClose');

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
const popupZoomedPicture = document.querySelector('.popup__zoomed-picture');
const popupZoomedName = document.querySelector('.popup__zoomed-name');

const cardsList = document.querySelector('.cards');
const templateElement = document.querySelector('.template');

function openPopup(popup) {
  popup.classList.add('popup_type_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_type_opened');
};

function closePopupEdit() {
  closePopup(editFormModalWindow)
};

function closePopupAddCard() {
  closePopup(cardFormModalWindow);
};

function closePopupZoomedPicture() {
  closePopup(zoomedPictureModalWindow);
}

function openPopupEdit() {
  openPopup(editFormModalWindow);
  savePopupEdit();
};

function savePopupEdit() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};
  
function openPopupAddCard() {
  openPopup(cardFormModalWindow);
};

function openPopupZoomedPicture(event) {
  openPopup(zoomedPictureModalWindow);
  popupZoomedPicture.src = event.target.getAttribute('src');
  popupZoomedName.textContent = event.target.getAttribute('alt');
};

function submitEditProfile(event) {
  event.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(editFormModalWindow);
};

function submitNewCard(event) {
  event.preventDefault();
  const cardElement = createCard(addCardNameInput.value, addCardLinkInput.value);
  cardsList.prepend(cardElement);
  formElementCard.reset();
  closePopup(cardFormModalWindow);
};

function likeCard(event) {
  event.target.classList.toggle('card__button-like_active');
};

function removeCard(event) {
  event.target.closest('.card').remove();
};

function createCard(name,  link) {
  const newItem = templateElement.content.cloneNode(true);
  const cardName = newItem.querySelector('.card__name');
  const cardPicture = newItem.querySelector('.card__picture');
  const buttonDelete = newItem.querySelector('.card__button-delete')
  const buttonLike = newItem.querySelector('.card__button-like')
  cardName.textContent = name;
  cardPicture.alt = name;
  cardPicture.src = link;
  buttonDelete.addEventListener('click', removeCard);
  buttonLike.addEventListener('click', likeCard);
  cardPicture.addEventListener('click', openPopupZoomedPicture);
  return newItem;
};

function renderCard(card, cardsList) {
  cardsList.prepend(createCard(card.name, card.link));
 }

initialCards.forEach((card) => {
  renderCard(card, cardsList)
 });

buttonEdit.addEventListener('click', openPopupEdit);
buttonAddCard.addEventListener('click', openPopupAddCard);

buttonEditFormClose.addEventListener('click', closePopupEdit);
buttonCardFormClose.addEventListener('click', closePopupAddCard);
buttonZoomedPictureClose.addEventListener('click', closePopupZoomedPicture);

formElementEdit.addEventListener('submit', submitEditProfile);
formElementCard.addEventListener('submit', submitNewCard);