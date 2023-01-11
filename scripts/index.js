import Card from './Card.js';
import FormValidator from './FormValidator.js';

const cardsContainer = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('#popupEdit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('#popupAdd');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('#popupCard');
const popupCardImage = document.querySelector('.popup__card-image');
const popupCardText = document.querySelector('.popup__card-text');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const formEditElement = document.querySelector('#formEdit');
const formAddElement = document.querySelector('#formAdd');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_about');
const placeInput = document.querySelector('.form__input_type_place');
const linkInput = document.querySelector('.form__input_type_link');
const closeButtons = document.querySelectorAll('.popup__close');
const formValidators = {};

//Объект настроек для валидации
const obj = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error'
}

//Массив из 6 карточек с фотографиями
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Создание карточек
function createCard(item) {
    const cardExemplar = new Card(item, '.element-template', openPopupCard);
    const card = cardExemplar.generateCardElement();

    return card;
}

//Добавление карточек
function renderCard(item) {
    cardsContainer.prepend(createCard(item));
}

initialCards.forEach((item) => {
    renderCard(item);
});

//Включение валидации форм
const enableValidation = (obj) => {
    const formList = [...document.querySelectorAll(obj.formSelector)];

    formList.forEach((item) => {
        const formExemplar = new FormValidator(obj, item);
        const formName = item.getAttribute('name');

        formValidators[formName] = formExemplar;

        formExemplar.enableValidation();
    });
}

enableValidation(obj);

//Открыть всплывающие окна
function openPopup(popup) {
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', closeByEsc);
}

//Открыть попап для карточки
function openPopupCard(cardName, cardLink) {
    openPopup(popupCard);
    
    popupCardImage.src = cardLink;
    popupCardImage.alt = cardName;
    popupCardText.textContent = cardName;
}

//Закрыть всплывающие окна
function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', closeByEsc);
}

//Закрыть всплывающие окна кликом на клавишу Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup); 
    }
} 

//Закрыть всплывающие окна кликом на оверлей
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        } 
    });
});

//Закрыть всплывающие окна кликом на крестик
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');

    button.addEventListener('click', () => closePopup(popup));
});

//Заполнить поля формы редактирования профиля текущими значениями
function fillCurrentValuesPopupEdit() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
}

//Обработчик отправки формы редактирования профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

    closePopup(popupEdit);
}

//Обработчик отправки формы добавления новой карточки
function handleAddFormSubmit(evt) {
    evt.preventDefault();
  
    renderCard({name: placeInput.value, link: linkInput.value});

    closePopup(popupAdd);

    formAddElement.reset();
}

//Слушатели
popupEditOpenButton.addEventListener('click', () => {
    openPopup(popupEdit);

    fillCurrentValuesPopupEdit();
    
    formValidators['nameFormEdit'].resetValidation();
});

popupAddOpenButton.addEventListener('click', () => {
    openPopup(popupAdd);

    formValidators['nameFormAdd'].resetValidation();
});

formEditElement.addEventListener('submit', handleEditFormSubmit);

formAddElement.addEventListener('submit', handleAddFormSubmit);