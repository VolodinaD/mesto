import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
    popupEditOpenButton,
    popupAddOpenButton,
    formValidators,
    obj,
    initialCards
} from '../utils/constants.js';

const popupCard = new PopupWithImage('#popupCard');

const handleCardClick = (cardName, cardLink) => {
    popupCard.open(cardName, cardLink);
};

//Создание карточек
function createCard(item) {
    const cardExemplar = new Card(item, '.element-template', handleCardClick);

    const card = cardExemplar.generateCardElement();

    return card; 
}

//Добавление карточек на страницу
const cardElements = new Section({ items: initialCards, renderer: (item) => {
    cardElements.addItem(createCard(item));
}
}, '.elements');

//Добавление новых карточек
const popupAdd = new PopupWithForm('#popupAdd', (data) => {
    cardElements.addItem(createCard(data));

    popupAdd.close();
});

const userInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__subtitle' });

//Добавление информации о пользователе на страницу
const popupEdit = new PopupWithForm('#popupEdit', (data) => {
    userInfo.setUserInfo(data);

    popupEdit.close();
});

cardElements.renderItems();
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

    popupEdit.setInputValues(userInfo.getUserInfo());

    formValidators['nameFormEdit'].resetValidation();
});

popupAddOpenButton.addEventListener('click', () => {
    popupAdd.open();

    formValidators['nameFormAdd'].resetValidation();
});