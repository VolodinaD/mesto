import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(cardName, cardLink) {
        super.open();

        this._popup.querySelector('.popup__card-image').src = cardLink;
        this._popup.querySelector('.popup__card-image').alt = cardName;
        this._popup.querySelector('.popup__card-text').textContent = cardName;
    }
}