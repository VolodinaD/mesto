export default class Card {
    constructor(data, templateSelector, handleCardClick, handlePutLikeClick, handleDeleteLikeClick, handleTrashClick, userId) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handlePutLikeClick = handlePutLikeClick;
        this._handleDeleteLikeClick = handleDeleteLikeClick;
        this._handleTrashClick = handleTrashClick;
        this._userId = userId;
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
        this._handlePutLikeClick(this._cardId, this._likeNumber, evt);
    }

    _deleteLike(evt) {
        this._handleDeleteLikeClick(this._cardId, this._likeNumber, evt);
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
        
        this._trashButton.addEventListener('click', (evt) => {
            this._handleTrashClick(this._cardId, evt);
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
            if (item._id === this._userId) {
                this._likeButton.classList.add('element__like-button_active');
            }
        });

        if (!(this._ownerId === this._userId)) {
            this._trashButton.remove();
        }
                
        return this._element;
    }
}