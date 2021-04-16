// класс размещения карточек на странице
export default class Section {
    constructor({ initialItems, renderer }, containerSelector) {
      this._initialItems = initialItems;
      this._renderer = renderer;
      this._containerSelector = containerSelector;
    }
  
    // рендер карточек
    rendererItems() {
      this._initialItems.forEach((item) => {
            this._renderer(item);
      });
    }
  
    // добавление карточки
    addItem(element) {
      this._containerSelector.prepend(element);
    }
  }