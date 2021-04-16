// класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ nameInfo, jobInfo }) {
    this._name = nameInfo;
    this._job = jobInfo;

  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userInfo;
    
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._job.textContent = userInfo.job;
  }

}
