// класс размещения карточек на странице
export default class Section {
    constructor({ initialItems, rendererItems }, containerSelector, api) {
      this._initialItems = initialItems;
      this._renderer = rendererItems;
      this._containerSelector = containerSelector;
      this._api = api;
    }
  
    // рендер карточек
    rendererItems(items) {
      items.forEach((item) => {
            this._renderer(item);
      });
    }
  
    // загрузка новой карточки на страницу
    addNewItem(element) {
      this._containerSelector.prepend(element);
    }

    // добавление карточек из начального списка на страницу
    addInitialItem(element) {
      this._containerSelector.append(element);
    }
  }