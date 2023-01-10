export default class Card {
    constructor(data, templateSelector, openPopupCard) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopupCard = openPopupCard;
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
        this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
            this._putLike(evt);
        });
        
        this._element.querySelector('.element__trash-button').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopupCard(this._name, this._link);
        });
    }

    generateCardElement() {
        this._element = this._getTemplateElement();
        
        this._setEventListeners();

        this._element.querySelector('.element__name').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;

        return this._element;
    }
}