export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
        this._userId = null;
    }

    getUserInfo() {
        this._userInfo = {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src
        };

        return this._userInfo;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }

    setUserId(id) {
        this._userId = id;
    }

    getUserId() {
        return this._userId;
    }
}