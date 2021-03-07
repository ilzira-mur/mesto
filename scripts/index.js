const popup = document.querySelector('.popup');
const buttonClosePopup = document.querySelectorAll('.popup__button_type_close');

const buttonEdit = document.querySelector('.button_type_edit');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const nameInfo = document.querySelector('.info__name');
const jobInfo = document.querySelector('.info__about');

const buttonAddCard = document.querySelector('.button_type_add-card');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formElementCard = document.querySelector('.popup__form_type_new-card');

const popupZoomed = document.querySelector('.popup_type_zoomed');
const popupZoomedPicture = document.querySelector('.popup__zoomed-picture');
const popupZoomedName = document.querySelector('.popup__zoomed-name');

const cardsList = document.querySelector('.cards');
const templateElement = document.querySelector('.template');

const initialCards = [
  {
    name: 'Анс',
    link: 'https://images.unsplash.com/photo-1607508305025-7c74035cec0c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1661&q=80'
  },
  {
    name: 'Канкун',
    link: 'https://images.unsplash.com/photo-1560358564-933dc5864d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
  },
  {
    name: 'Пхи Пхи',
    link: 'https://images.unsplash.com/photo-1521109464564-2fa2faa95858?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Гранд-Анс',
    link: 'https://images.unsplash.com/photo-1467897705408-734f28cffec5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
  },
  {
    name: 'Ла Диг',
    link: 'https://images.unsplash.com/photo-1563464637439-5efdce3e66e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
  },
  {
    name: 'Укулхас',
    link: 'https://images.unsplash.com/photo-1575647063571-2f7094a9bc7e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
  }];

function closePopup(event) {
  event.target.classList.contains('popup__button_type_close');
  event.target.closest('.popup').classList.remove('popup_type_opened');
};

function openPopupEdit() {
  popup.classList.add('popup_type_opened');
  savePopupEdit();
};

function savePopupEdit() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};
  
function openPopupAddCard() {
  popupAddCard.classList.add('popup_type_opened');
};

function openPopupZoomedPicture(event) {
  popupZoomed.classList.add('popup_type_opened');
  const PicturePath = event.target.getAttribute('src');
  popupZoomedPicture.src = PicturePath;
  const TextPath = event.target.getAttribute('alt');
  popupZoomedName.textContent = TextPath;
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  popup.classList.remove('popup_type_opened');
};

function newCardSubmitHandler(event) {
  event.preventDefault();
  const name = formElementCard.elements.cardname;
  const link = formElementCard.elements.cardlink;
  const parentElement = document.getElementById('cards');
  const theFirstChild = parentElement.firstChild;
  const newElement = createCard(name.value, link.value);
  parentElement.insertBefore(newElement, theFirstChild);
  formElementCard.reset();
  popupAddCard.classList.remove('popup_type_opened');
  addTaskListeners(newElement);
};

function likeCard(event) {
  event.target.classList.toggle('card__button-like_active');
};

function removeCard(event) {
  const card = event.target.closest('.card');
  card.parentNode.removeChild(card);
};

function createCard(name,  link) {
  const newItem = templateElement.content.cloneNode(true);
  const cardName = newItem.querySelector('.card__name');
  cardName.textContent = `${name}`;
  const cardPicture = newItem.querySelector('.card__picture');
  cardPicture.setAttribute('alt', `${name}`);
  cardPicture.setAttribute('src', `${link}`);
  addTaskListeners(newItem);
  return newItem;
};

initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link);
  cardsList.appendChild(cardElement);
});

function addTaskListeners(task) {
  const buttonDelete = task.querySelector('.card__button-delete');
	buttonDelete.addEventListener('click', removeCard);

  const buttonLike = task.querySelector('.card__button-like');
  buttonLike.addEventListener('click', likeCard);

  const cardPicture = task.querySelector('.card__picture');
  cardPicture.addEventListener('click', openPopupZoomedPicture);
};

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

buttonClosePopup.forEach(elem => elem.addEventListener('click', closePopup));
buttonEdit.addEventListener('click', openPopupEdit);
buttonAddCard.addEventListener('click', openPopupAddCard);
formElementEdit.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', newCardSubmitHandler);