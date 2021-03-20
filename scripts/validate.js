const obj = {
    formSelectop: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_type_save',
    errorSpanClass: 'popup__span-error_active',
    errorInputClass: 'popup__input_type_error',
    inactiveButtonClass: 'popup__button_disabled',
  }
  
  // запуск валидации
  const enableValidation = ({formSelectop, inputSelector, submitButtonSelector, errorSpanClass, errorInputClass, inactiveButtonClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelectop));
    
    formList.forEach(
      formElement => {formElement.addEventListener('submit', (event) => {
          event.preventDefault();
        });
        setInputListeners(formElement, {inputSelector, submitButtonSelector, errorSpanClass, errorInputClass, inactiveButtonClass});
      }
    );
  };
  
  // обработчик полей формы
  const setInputListeners = (formElement, {inputSelector, submitButtonSelector, errorSpanClass, errorInputClass, inactiveButtonClass}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    
    inputList.forEach(
      inputElement => {inputElement.addEventListener('input', () => {
          checkInput(formElement, inputElement, {errorSpanClass, errorInputClass});
          toggleButtonState(inputList, buttonElement, {inactiveButtonClass});
        });
      }
    );
  };
  
  // проверка валидности введеных данных
  const checkInput = (formElement, inputElement, {errorSpanClass, errorInputClass}) => {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, {errorSpanClass, errorInputClass});
    } else {
      showInputError(formElement, inputElement, {errorSpanClass, errorInputClass});
    }
  };
  
  // скрыть ошибку ввода и убрать подчеркивание поля ввода
  const hideInputError = (formElement, inputElement, {errorSpanClass, errorInputClass}) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(errorSpanClass);
    inputElement.classList.remove(errorInputClass);
  };
  
  // показать ошибку ввода и подчеркнуть поле ввода
  const showInputError = (formElement, inputElement, {errorSpanClass, errorInputClass}) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorSpanClass);
    inputElement.classList.add(errorInputClass);
  };
  
  // переключатель состояния кнопки
  const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    if (hasInvalidInput(inputList) || hasEmptyInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };
  
  // проверка есть ли одно не валидное поле
  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };
  
  // проверка есть ли пустое поле
  const hasEmptyInput = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
  };
  
  enableValidation(obj);