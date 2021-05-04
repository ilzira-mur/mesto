export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

  // проверка ответа сервера
  _getResponseData(res){
    if (res.ok) {
      return res.json();
    } else return Promise.reject(`Произошла ошибка - ${res.status}`);
  }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then(this._getResponseData);
    }

    addNewCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.cardname,
          link: data.cardlink
        })
      }).then(this._getResponseData);
  }

   deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  changeUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatarlink,
      }),
    }).then(this._getResponseData);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers
      }).then(this._getResponseData);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.profilename,
        about: data.profileabout
      })
      }).then(this._getResponseData);
  }

  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

}