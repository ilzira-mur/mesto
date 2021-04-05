import { handleZoomedPicture } from './index.js'

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
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
      handleZoomedPicture(this._data.name, this._data.link);
    });
  }


  // переключение состояния лайка
  _handleLikeCard() {
    this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
    console.log(this._link, this._name)
  }

  // удаление карточки
  _handleDeleteCard() {
  this._element.querySelector('.card__button-delete').closest('.card').remove();
};
}