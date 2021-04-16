import Popup from "./Popup.js";

// класс попапа с формой
export default class PopupWithForm extends Popup {
  constructor(popupElement, { formSubmitCallBack }) {
    super(popupElement);
    this._formSubmitCallBack = formSubmitCallBack;
    this._formSubmit = this._formSubmit.bind(this);
    this._form = popupElement.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__button_type_save');
  }

  // сабмит формы
  _formSubmit(evt) {
    evt.preventDefault();
    this._formSubmitCallBack(this._getInputValues(), this._submitButton);
  }

  // сбор данных всех полей формы
  _getInputValues() {
    const data = {};
    this._inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  // перезапись родительского метода close
  close() {
    super.close();
    this._form.reset();
  }

  // перезапись родительского метода setEventListeners
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);
  }
}
