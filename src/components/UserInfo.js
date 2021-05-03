// класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ nameInfo, jobInfo, avatar }) {
    this._name = nameInfo;
    this._job = jobInfo;
    this._avatar = avatar;
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
    };
    return userInfo;
    
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._job.textContent = userInfo.about;
    this._avatar.src = userInfo.avatar;
  }

  // установить аватар
  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

}
