import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._cardImage = this._popup.querySelector('.popup__card-image');
        this._cardText = this._popup.querySelector('.popup__card-text');
    }

    open(cardName, cardLink) {
        super.open();

        this._cardImage.src = cardLink;
        this._cardImage.alt = cardName;
        this._cardText.textContent = cardName;
    }
}