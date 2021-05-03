// класс размещения карточек на странице
export default class Section {
    constructor({ initialItems, renderer }, containerSelector, api) {
      this._initialItems = initialItems;
      this._renderer = renderer;
      this._containerSelector = containerSelector;
      this._api = api;
    }
  
    // рендер карточек
    rendererItems() {
      this._initialItems.forEach((item) => {
            this._renderer(item);
      });
    }

    saveNewItem(element) {
      this._api
      .addNewCard({element})
      .then((data) => this.addNewItem(data.cardname, data.cardlink
      ))
      .catch((err) => {console.log(err)});
    };
  
    // загрузка новой карточки на страницу
    addNewItem(element) {
      this._containerSelector.prepend(element);
    }

    // добавление карточек из начального списка на страницу
    addInitialItem(element) {
      this._containerSelector.append(element);
    }
  }