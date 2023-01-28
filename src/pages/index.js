import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
    popupEditOpenButton,
    popupAddOpenButton,
    nameInput,
    jobInput,
    formValidators,
    obj,
    initialCards
} from '../utils/constants.js';

//Создание экземляров классов для попапов
const popupEdit = new Popup('#popupEdit');
const popupAdd = new Popup('#popupAdd');
const popupCard = new PopupWithImage('#popupCard');

const handleCardClick = (cardName, cardLink) => {
    popupCard.open(cardName, cardLink);
};

//Добавление карточек на страницу
const cardElements = new Section({ items: initialCards, renderer: (item) => {
    const cardExemplar = new Card(item, '.element-template', handleCardClick);
    
    const card = cardExemplar.generateCardElement();

    cardElements.addItem(card);
}
}, '.elements');

//Добавление новых карточек
const formAddElement = new PopupWithForm('#popupAdd', (data) => {
    const newCardExemplar = new Card(data, '.element-template', handleCardClick);

    const newCard = newCardExemplar.generateCardElement();

    newCard.querySelector('.element__image').src = data.link;
    newCard.querySelector('.element__name').textContent = data.name;

    cardElements.addItem(newCard);

    formAddElement.close();
});

const userInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__subtitle' });

//Добавление информации о пользователе на страницу
const formEditElement = new PopupWithForm('#popupEdit', (data) => {
    userInfo.setUserInfo(data);

    formEditElement.close();
});

cardElements.renderItems();
formEditElement.setEventListeners();
formAddElement.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupCard.setEventListeners();

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

//Слушатели для открытия попапов
popupEditOpenButton.addEventListener('click', () => {
    popupEdit.open();

    const currentUserInfo = userInfo.getUserInfo();

    nameInput.value = currentUserInfo.profileName;
    jobInput.value = currentUserInfo.about;

    formValidators['nameFormEdit'].resetValidation();
});

popupAddOpenButton.addEventListener('click', () => {
    popupAdd.open();

    formValidators['nameFormAdd'].resetValidation();
});