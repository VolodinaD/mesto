import Popup from '../components/Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._cardDeleteButton = this._popup.querySelector('.popup-delete__button');
    }

    setHandleConfirmationSubmit(handleConfirmationSubmit) {
        this._handleConfirmationSubmit = handleConfirmationSubmit;
    }

    setEventListeners() {
        super.setEventListeners();

        this._cardDeleteButton.addEventListener('click', (evt) => {
            evt.preventDefault();

            this._handleConfirmationSubmit();
        });
    }
}