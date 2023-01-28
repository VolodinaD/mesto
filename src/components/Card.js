export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
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
        evt.target.classList.toggle('element__like-button_active');
    }

    _deleteCard(evt) {
        evt.target.closest('.element').remove();
    }

    _setEventListeners() {
        this._cardImage = this._element.querySelector('.element__image');

        this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
            this._putLike(evt);
        });
        
        this._element.querySelector('.element__trash-button').addEventListener('click', (evt) => {
            this._deleteCard(evt);
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

        return this._element;
    }
}