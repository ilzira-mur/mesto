// класс отвечает за открытие и закрытие попапа
export default class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
      this._buttonSubmit = this._popupSelector.querySelector('.popup__button_type_save');
      this._buttonClose = this._popupSelector.querySelector('.popup__button_type_close');
    }

    // открыть
    open() {
      this._popupSelector.classList.add('popup_type_opened');
      document.addEventListener('keydown', this._handleEscClose);
      document.addEventListener('click', this._handleOverlayClose);
    }
  
    // закрыть
    close() {
      this._popupSelector.classList.remove('popup_type_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      document.removeEventListener('click', this._handleOverlayClose);
    }


    // закрыть на Esc
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            const popupActive = document.querySelector('.popup_type_opened');
            this.close(popupActive);
        }
    }
    
    // закрыть на overlay
    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup')) {
          this.close();
        }
    }
  
    // слушатели
    setEventListeners() {
      this._buttonClose.addEventListener('click', () => {
        this.close();
      });
    }
  
  // уведомление о загрузке
  handleLoading(message) {
    this._buttonSubmit.textContent = message;
  }

  }