import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;
        this._inputList = [...this._popup.querySelectorAll('.form__input')];
        this._formElement = this._popup.querySelector('.form');
    }

    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());
        });
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    close() {
        super.close();
        
        this._formElement.reset();
    }
}