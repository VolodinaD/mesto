export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-59/users/me', {
            headers: this._headers
        })
            .then(this._checkResponse);
    } 

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
            .then(this._checkResponse);
    } 

    patchUserInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkResponse);
    }

    postNewCard(data) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    putLike(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    deleteLike(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    patchUserAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse);
    }
}