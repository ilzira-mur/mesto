const buttonsClosePopup = document.querySelectorAll('.popup__button_type_close');

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

function openPopupEdit() {
  savePopupEdit();
  openPopup(editFormModalWindow);
};

function savePopupEdit() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};
  
function openPopupAddCard() {
  openPopup(cardFormModalWindow);
};

function handleZoomedPicture(event) {
  popupZoomedPicture.src = event.target.src;
  popupZoomedPicture.alt = event.target.alt;
  popupZoomedName.textContent = event.target.alt;
  openPopup(zoomedPictureModalWindow);
};

function submitEditProfile(event) {
  event.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(editFormModalWindow);
};

function submitNewCard(event) {
  event.preventDefault();
  renderCard({
    name: addCardNameInput.value,
    link: addCardLinkInput.value
  },cardsList);
  formElementCard.reset();
  closePopup(cardFormModalWindow);
};

function handleLikeCard(event) {
  event.target.classList.toggle('card__button-like_active');
};

function handleDeleteCard(event) {
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
  buttonDelete.addEventListener('click', handleDeleteCard);
  buttonLike.addEventListener('click', handleLikeCard);
  cardPicture.addEventListener('click', handleZoomedPicture);
  return newItem;
};

function renderCard(card, cardsList) {
  cardsList.prepend(createCard(card.name, card.link));
 };

initialCards.forEach((card) => {
  renderCard(card, cardsList)
 });

buttonEdit.addEventListener('click', openPopupEdit);
buttonAddCard.addEventListener('click', openPopupAddCard);

buttonsClosePopup.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

formElementEdit.addEventListener('submit', submitEditProfile);
formElementCard.addEventListener('submit', submitNewCard);