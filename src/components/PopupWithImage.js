import Popup from "./Popup.js";

// этот класс перезаписывает родительский метод open для PopupWithImage
export default class PopupWithImage extends Popup {
  open(name, link) {
    const popupImage = document.querySelector('.popup__picture');
    const popupCaption = document.querySelector('.popup__caption');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    super.open();
  }
}