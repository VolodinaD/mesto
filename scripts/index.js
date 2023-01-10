import Card from './Card.js';
import FormValidator from './FormValidator.js';

const cardsContainer = document.querySelector('.elements');
const popupEdit = document.querySelector('#popupEdit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = document.querySelector('#popupEditClose');
const popupAdd = document.querySelector('#popupAdd');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('#popupAddClose');
const popupCard = document.querySelector('#popupCard');
const popupCardCloseButton = document.querySelector('#popupCardClose');
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
const formEditSubmitButton = document.querySelector('#formEditSubmit');
const formAddSubmitButton = document.querySelector('#formAddSubmit');
const popupArray = [popupAdd, popupEdit, popupCard];
const formList = [...document.querySelectorAll('.form')];

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

//Добавление карточек
function renderCard(item) {
    const cardExemplar = new Card(item, '.element-template', openPopupCard);
    const card = cardExemplar.generateCardElement();

    cardsContainer.prepend(card);
}

initialCards.forEach((item) => {
    renderCard(item);
});

//Проверка на валидность полей форм
formList.forEach((item) => {
    const formExemplar = new FormValidator(obj, item);
    formExemplar.enableValidation();
});

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
popupArray.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target == evt.currentTarget) {
            closePopup(popup);
        }
    });
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

    formEditSubmitButton.classList.add('form__button_disabled');
    formEditSubmitButton.disabled = true;
}

//Обработчик отправки формы добавления новой карточки
function handleAddFormSubmit(evt) {
    evt.preventDefault();
  
    renderCard({name: placeInput.value, link: linkInput.value});

    closePopup(popupAdd);

    formAddElement.reset();

    formAddSubmitButton.classList.add('form__button_disabled');
    formAddSubmitButton.disabled = true;
}

//Слушатели
popupEditOpenButton.addEventListener('click', () => {
    openPopup(popupEdit);
    fillCurrentValuesPopupEdit();
});

popupAddOpenButton.addEventListener('click', () => {openPopup(popupAdd)});

popupEditCloseButton.addEventListener('click', () => {closePopup(popupEdit)});

popupAddCloseButton.addEventListener('click', () => {closePopup(popupAdd)});

popupCardCloseButton.addEventListener('click', () => {closePopup(popupCard)});

formEditElement.addEventListener('submit', handleEditFormSubmit);

formAddElement.addEventListener('submit', handleAddFormSubmit);