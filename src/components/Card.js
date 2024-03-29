// класс для создания карточки
export default class Card {
  constructor(userId, data, cardSelector, {handleCardClick, handleDeleteCard, handleAddlike, handleDeletelike }) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._userId = userId;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddlike = handleAddlike;
    this._handleDeletelike = handleDeletelike;

  }

  // получение шаблона разметки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  
  // создание карточки
  createNewCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__picture');
    this._element.querySelector('.card__name').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.card__like-counter').textContent = this._likes.length
    
    if (this._data.likes.find((like) => like._id === this._userId)) {
      this._element.querySelector('.card__button-like').classList.add('card__button-like_active');
    }; 

    if (this._data.owner._id === this._userId) {
      this._element.querySelector('.card__button-delete').style.display = 'block';
    } else {
      this._element.querySelector('.card__button-delete').style.display = 'none';
    };

    this._setEventListeners();
    return this._element;
  }

  // установка слушателей
  _setEventListeners() {
    this._element.querySelector('.card__button-like').addEventListener('click', () => {
      this._showLike();
    });
    this._element.querySelector('.card__button-delete').addEventListener('click', () => {
      this._handleDeleteCard(this._userId);
    });
    this._element.querySelector('.card__picture').addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link);
    });
  }

  // переключение состояния лайка
  _handleLikeCard() {
    this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
  }

  // удаление карточки
  _handleDeleteCard() {
  this._element.querySelector('.card__button-delete').closest('.card').remove();
}

  deleteCard() {
    this._element.remove();
    this._element.innerHTML = "";
  }

// поставить лайк
  addLike() {
    const like = this._element.querySelector('.card__button-like');
    like.classList.toggle('card__button-like_active');
  }

  // показать счетчик лайков
  showLikeCounter(likes) {
    const likeCounter = this._element.querySelector('.card__like-counter');
    likeCounter.textContent = likes.length;
  }

  // показать лайки
  _showLike() {
    const like = this._element.querySelector('.card__button-like');
    if (!like.classList.contains('card__button-like_active') === true) {
      this._handleAddlike()
    }
    else {
      this._handleDeletelike()
    }
  }

}