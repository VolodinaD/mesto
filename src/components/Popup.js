export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose() {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        });
    }
   
    setEventListeners() {
        this._handleEscClose();

        this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
        
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            } 
        });
    }
}