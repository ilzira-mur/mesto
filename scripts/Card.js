export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
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
      this._handleZoomedPicture();
    });
  }

  // увеличение картинки
  _handleZoomedPicture() {
    document.querySelector('.popup__picture').src = this._link;
    document.querySelector('.popup__caption').alt = this._name;
    document.querySelector('.popup__caption').textContent = this._name;
    document.querySelector('.popup_type_zoomed').classList.add('popup_type_opened');
  }

  // переключение состояния лайка
  _handleLikeCard() {
    this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
  }

  // удаление карточки
  _handleDeleteCard() {
  this._element.querySelector('.card__button-delete').closest('.card').remove();
};
}