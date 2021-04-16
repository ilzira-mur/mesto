// класс для создания карточки
export default class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._setEventListeners();
    return this._element;
  }

  // установка слушателей
  _setEventListeners() {
    this._element.querySelector('.card__button-like').addEventListener('click', () => {
      this._handleLikeCard();
    });
    this._element.querySelector('.card__button-delete').addEventListener('click', () => {
      this._handleDeleteCard();
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
}