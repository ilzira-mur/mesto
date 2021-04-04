export const obj = {
  formSelectop: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_save',
  errorSpanClass: 'popup__span-error_active',
  errorInputClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__button_disabled',
}
  
export class FormValidator {
  constructor(obj, formElement) {
    this._formElement = formElement;
    this._formSelectop = obj.formSelectop;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._errorSpanClass = obj.errorSpanClass;
    this._errorInputClass = obj.errorInputClass;
    this._inactiveButtonClass = obj.inactiveButtonClass;
  }
  
// валидация
  enableValidation() {
    this._formList = Array.from(document.querySelectorAll(this._formSelectop));
    this._formList.forEach(formElement => {formElement.addEventListener('submit', (event) => {
          event.preventDefault();
        });
        this._setInputListeners();
      }
    );
  }

  // обработчик полей формы
  _setInputListeners() {
    const formElement = document.querySelector(this._formElement);
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    
    this._inputList.forEach((inputElement) => {inputElement.addEventListener('input', () => {
          this._checkInput(inputElement);
          this._toggleButtonState();
        });
      });
  };

  // проверка валидности введеных данных
  _checkInput(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  // скрыть ошибку ввода и убрать подчеркивание поля ввода
  _hideInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorSpanClass);
    inputElement.classList.remove(this._errorInputClass);
  };

  // показать ошибку ввода и подчеркнуть поле ввода
  _showInputError(inputElement, validationMessage) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._errorSpanClass);
    inputElement.classList.add(this._errorInputClass);
  };
  
  // переключатель состояния кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  // проверка есть ли одно не валидное поле
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  };

}