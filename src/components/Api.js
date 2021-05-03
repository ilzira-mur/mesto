export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка - ${res.status}`);
        });
    }

    addNewCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.cardname,
          link: data.cardlink
        })
      }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка - ${res.status}`);
        });
  }

   deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Произошла ошибка - ${res.status}`);
    });
  }

  changeUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatarlink,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Произошла ошибка - ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers
      }).then((res) => {
            if (res.ok) {
                return res.json();}
            return Promise.reject(`Произошла ошибка - ${res.status}`);
        });
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.profilename,
        about: data.profileabout
      })
      }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Произошла ошибка - ${res.status}`);
    });
  }

  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Произошла ошибка - ${res.status}`);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Произошла ошибка - ${res.status}`);
    });
  }

}