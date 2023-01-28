export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        this._userInfo = {
            profileName: this._name.textContent,
            about: this._about.textContent
        };

        return this._userInfo;
    }

    setUserInfo(data) {
        this._name.textContent = data.profileName;
        this._about.textContent = data.about;
    }
}    