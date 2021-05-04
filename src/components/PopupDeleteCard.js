import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._buttonDelete = this._popupSelector.querySelector('.popup__button_type_save');
    }
     // сетер для submit удаления
  setHandleSubmit(data) {
    this._handleSubmit = data;
  }

  // слушатели
  setEventListeners() {
    this._buttonDelete.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._loadingMessageDelete('Удаление...');
      this._handleSubmit();
    });
    super.setEventListeners();
  }

  // уведомление о удалении карточки
  _loadingMessageDelete(text) {
    this._buttonSubmit.textContent = text;
  }

  // открыть
  open() {
    super.open();
    this._loadingMessageDelete('Да');
  }
}