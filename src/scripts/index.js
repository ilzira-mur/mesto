import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import '../pages/index.css';


// данные для валидации
const obj = {
  formSelectop: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_save',
  errorSpanClass: 'popup__span-error_active',
  errorSpan: 'popup__span-error',
  errorInputClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__button_disabled',
}


const buttonEdit = document.querySelector('.button_type_edit');
const editFormModalWindow = document.querySelector('.popup_type_edit');
const deleteCardModalWindow = document.querySelector('.popup_type_delete-card');
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
const buttonDelete = document.querySelectorAll('.card__button-delete');
const avatarPenEdit = document.querySelector('.profile__avatar-container');
const avatarEditModalWindow = document.querySelector('.popup_type_avatar-edit');
const formElementAvatarEdit = document.querySelector('.popup__form_type_avatar-edit')
const avatar = document.querySelector('.profile__avatar')

// экземпляр класса Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: "8865dd26-fca5-4131-9c42-5dfb67b3f292",
    "Content-Type": "application/json",
  },
});

// экземпяр класса для отображения информации о пользователе на странице
const userInfo = new UserInfo({nameInfo, jobInfo, api, avatar});

let userId

// массив промисов которые нужно выполнить
Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([cards, userData]) => {
  userId = userData._id;
  userInfo.getUserInfo(userData)
  userInfo.setUserInfo(userData)
  section.rendererItems(cards.reverse());
})
.catch((err) => {console.log(err)
});


// отрисовка карточек с сервера
const section = new Section({
  initialItems: [],
  rendererItems: (item) => {
    section.addNewItem(createCard(item));
  },
},
cardsList,
api
);

// экземпляр класса FormValidator для формы редактирования профиля
const formValidatorTypeEdit = new FormValidator(obj, formElementEdit);
formValidatorTypeEdit.enableValidation();

// экземпляр класса FormValidator для формы добавления новой карточки
const formValidatorTypeNewCard = new FormValidator(obj, formElementCard);
formValidatorTypeNewCard.enableValidation();

// экземпляр класса FormValidator для формы добавления нового Аватара
const formValidatorTypeAvatarEdit = new FormValidator(obj, formElementAvatarEdit);
formValidatorTypeAvatarEdit.enableValidation();

// экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage(zoomedPictureModalWindow);
popupWithImage.setEventListeners();

// экземпляр класса PopupDeleteCard
const popupDelete = new PopupDeleteCard(deleteCardModalWindow);
popupDelete.setEventListeners();

// создание нового экземпляра карточки
function createCard(item) {
  const card = new Card( userId, item, '.card-template_type_default', {
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
  },
   handleDeleteCard: (id) => {
      popupDelete.open();
      popupDelete.setHandleSubmit(function(){
        api.deleteCard(item._id)
        .then((item) => {
        card.deleteCard(item._id);
        popupDelete.close();
        })
      .catch((err) => {console.log(err)
      });
    })
    },
    handleAddlike: (id) => {
      api.setLike(item._id)
        .then((item) => {
          card.showLikeCounter(item.likes);
          card.addLike();
        })
        .catch((err) => {console.log(err)
        });
    },
    handleDeletelike: (id) => {
      api.deleteLike(item._id)
        .then((item) => {
          card.showLikeCounter(item.likes);
          card.addLike();
        })
        .catch((err) => {console.log(err)
        });
    }
});
  return card.createNewCard();
};



// экземпляр класса PopupWithForm для попапа добавления карточки
const addNewCardPopup = new PopupWithForm (cardFormModalWindow, {
  formSubmitCallBack: () => {
    loadingMessage(true, cardFormModalWindow);
    const inputValue = addNewCardPopup.getInputValues();
    const newItem = api.addNewCard(inputValue);
    newItem.then((item) => {
      section.addNewItem(createCard(item));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formElementCard.reset();
      formValidatorTypeNewCard.disableSubmitButton();
      loadingMessage(false, cardFormModalWindow);
      addNewCardPopup.close();
    });
  },
});
addNewCardPopup.setEventListeners();



// экземпяр класса PopupWithForm для попапа редактирования Аватара
const avatarEditPopup = new PopupWithForm (avatarEditModalWindow, {
  formSubmitCallBack: () => {
    loadingMessage(true, avatarEditModalWindow);
    const inputValue = avatarEditPopup.getInputValues();
    const newAvatar = api.changeUserAvatar(inputValue);
    newAvatar.then((data) => {
        userInfo.setUserAvatar(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formElementAvatarEdit.reset();
        formValidatorTypeAvatarEdit.disableSubmitButton();
        loadingMessage(false, avatarEditModalWindow);
        avatarEditPopup.close();
      });
  } 
  });
avatarEditPopup.setEventListeners();


// экземпяр класса PopupWithForm для попапа редактирования профиля
const editPopup = new PopupWithForm (editFormModalWindow, {
  formSubmitCallBack: () => {
    loadingMessage(true, editFormModalWindow);
    const inputValue = editPopup.getInputValues();
    const newProfile = api.setUserInfo(inputValue)
    .then((data) => {
        userInfo.setUserInfo(data)
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingMessage(false, editFormModalWindow);
      editPopup.close();
    })
  }, 
});
editPopup.setEventListeners();

 
// слушатель кнопки изменить профиль
buttonEdit.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.job;
  formValidatorTypeEdit.removeInputErrors();
  formValidatorTypeEdit.ableSubmitButton();
  editPopup.open();
})

// слушатель кнопки добавить новую карточку
buttonAddCard.addEventListener('click', () => {
  formElementCard.reset();
  formValidatorTypeNewCard.removeInputErrors();
  formValidatorTypeNewCard.disableSubmitButton();
  addNewCardPopup.open();
})

// слушатель кнопки обновить Аватар
avatarPenEdit.addEventListener('click', () => {
  avatarEditPopup.open();
})

// изменение текста кнопки Submit
function loadingMessage(saving, cardSelector) {
  const submitButton = cardSelector.querySelector('.popup__button_type_save');

  if (saving) {
    submitButton.textContent = 'Сохранение...';
  } else {
    if (cardSelector === editFormModalWindow || cardSelector === avatarEditModalWindow) {
      submitButton.textContent = 'Сохранить';
    } else {
      submitButton.textContent = 'Создать';
    }
  }
}