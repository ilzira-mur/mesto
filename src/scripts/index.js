import Card from '../components/Card.js';
import { obj, FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


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
const zoomedPictureModalWindow = document.querySelector('.popup_type_zoomed');
const cardsList = document.querySelector('.cards');


// экземпляр класса FormValidator для формы редактирования профиля
const formValidatorTypeEdit = new FormValidator(obj, formElementEdit);
formValidatorTypeEdit.enableValidation();

// экземпляр класса FormValidator для формы добавления новой карточки
const formValidatorTypeNewCard = new FormValidator(obj, formElementCard);
formValidatorTypeNewCard.enableValidation();

// создание нового экземпляра карточки
function createCard(item) {
  const card = new Card(item, '.card-template_type_default', {
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
  }});
  return card.createNewCard();
};

// экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage(zoomedPictureModalWindow);
popupWithImage.setEventListeners();

// экземпляр класса PopupWithForm для попапа добавления карточки
const addNewCardPopup = new PopupWithForm (cardFormModalWindow, {
  formSubmitCallBack: (data) => {
    const item = {
      name: data.cardname,
      link: data.cardlink,
    };
    сards.addItem(createCard(item));
    formElementCard.reset();
  formValidatorTypeNewCard.disableSubmitButton();
  addNewCardPopup.close();
  },
});
addNewCardPopup.setEventListeners();


// экземпяр класса для отображения информации о пользователе на странице
const userInfo = new UserInfo({ nameInfo, jobInfo });

// экземпяр класса PopupWithForm для попапа редактирования профиля
const editPopup = new PopupWithForm (editFormModalWindow, {
  formSubmitCallBack: (data) => {
    const item = {
      name: data.profilename,
      job: data.profileabout,
    };
    userInfo.setUserInfo(item);
    editPopup.close();
  }, 
});
editPopup.setEventListeners();


// слушатели кнопки изменить профиль
buttonEdit.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.job;
  editPopup.open();
})

// слушатели кнопки добавить новую карточку
buttonAddCard.addEventListener('click', () => {
  formElementCard.reset();
  addNewCardPopup.open();
})

// отрисовка карточек
const сards = new Section({
  initialItems: initialCards,
  renderer: (item) => {
    сards.addItem(createCard(item));
  },
},
cardsList
);

сards.rendererItems()