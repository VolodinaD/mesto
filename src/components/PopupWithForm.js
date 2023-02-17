import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;
        this._inputList = [...this._popup.querySelectorAll('.form__input')];
        this._formElement = this._popup.querySelector('.form');
        this._formButton = this._formElement.querySelector('.form__button');
        this._formButtonText = this._formButton.textContent;
    }

    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    _renderLoading(isLoading) {
        if (isLoading) {
            this._formButton.textContent = 'Сохранение...';
        } else {
            this._formButton.textContent = this._formButtonText;
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._renderLoading(true);

            this._handleFormSubmit(this._getInputValues());
        });
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    _resetValues() {
        this._formElement.reset();

        this._renderLoading(false);
    }

    close() {
        super.close();
        
        setTimeout(() => {
            this._resetValues();
        }, 500);
    }
}