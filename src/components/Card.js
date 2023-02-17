import { api, userInfo, popupDelete } from '../pages/index.js';
import { cardDeleteButton } from '../utils/constants.js';

export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }    

    _getTemplateElement() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _putLike(evt) {
        api.putLike(this._cardId)
            .then(res => {
                evt.target.classList.add('element__like-button_active');
                
                this._likeNumber.textContent = res.likes.length;
            })
            .catch((err) => {
                console.log(err);
            }); 
    }

    _deleteLike(evt) {
        api.deleteLike(this._cardId)
            .then(res => {
                evt.target.classList.remove('element__like-button_active');

                this._likeNumber.textContent = res.likes.length;
            })
            .catch((err) => {
                console.log(err);
            }); 
    }

    _deleteCard() {
        api.deleteCard(this._cardId)
            .then(() => {
                this._element.remove();

                delete this._cardId;
                
                popupDelete.close();
            })
            .catch((err) => {
                console.log(err);
            }); 
    }

    _setEventListeners() {
        this._cardImage = this._element.querySelector('.element__image');
        this._likeNumber = this._element.querySelector('.element__like-number');
        this._trashButton = this._element.querySelector('.element__trash-button');
        this._likeButton = this._element.querySelector('.element__like-button');

        this._likeButton.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('element__like-button_active')) {
                this._deleteLike(evt);
            } else {
                this._putLike(evt);
            }
        });
        
        this._trashButton.addEventListener('click', () => {
            popupDelete.open();

            cardDeleteButton.addEventListener('click', () => {
                this._deleteCard();
            });
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    generateCardElement() {
        this._element = this._getTemplateElement();
        
        this._setEventListeners();

        this._element.querySelector('.element__name').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._likeNumber.textContent = this._likes.length;

        this._likes.forEach((item) => {
            if (item._id === userInfo.getUserId()) {
                this._likeButton.classList.add('element__like-button_active');
            }
        });

        if (!(this._ownerId === userInfo.getUserId())) {
            this._trashButton.remove();
        }
                
        return this._element;
    }
}