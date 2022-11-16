const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = document.querySelector('.popup__close');
const formButton = document.querySelector('.form__button');

let profileName = document.querySelector('.profile__title');
let profileInfo = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_about');

//Открыть всплывающее окно
function popupOpen() {
    popupElement.classList.add('popup_opened');

    //Заполнить поля формы текущими значениями
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
}

//Закрыть всплывающее окно
function popupClose() {
    popupElement.classList.remove('popup_opened');
}

//Обработчик отправки формы
function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
}

popupOpenButtonElement.addEventListener('click', popupOpen);

popupCloseButtonElement.addEventListener('click', popupClose);

formButton.addEventListener('click', popupClose);

formElement.addEventListener('submit', formSubmitHandler);