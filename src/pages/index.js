import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
    popupEditOpenButton,
    popupAddOpenButton,
    popupAvatarOpenIcon,
    formValidators,
    obj
} from '../utils/constants.js';

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
      authorization: '6648a217-161e-491e-b802-79fe9d15bd79',
      'Content-Type': 'application/json'
    }
}); 

export const userInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__subtitle', avatarSelector: '.profile__image' });

export const popupDelete = new Popup('#popupDelete');

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
const cardElements = new Section({ renderer: (item) => {
    cardElements.addItem(createCard(item));
}
}, '.elements');

//Добавление новых карточек
const popupAdd = new PopupWithForm('#popupAdd', (data) => {
    api.postNewCard(data)
        .then((res) => {
            data.likes = res.likes;
            data._id = res._id;
            data.owner = {
                _id: res.owner._id
            }
            
            cardElements.addItem(createCard(data));
    
            popupAdd.close();
        })
        .catch((err) => {
            console.log(err);
        });
});

//Добавление информации о пользователе на страницу
const popupEdit = new PopupWithForm('#popupEdit', (data) => {
    api.patchUserInfo(data)
        .then(() => {
            userInfo.setUserInfo(data);
    
            popupEdit.close();
        })
        .catch((err) => {
            console.log(err);
        }); 
});

//Изменение аватара пользователя
const popupAvatar = new PopupWithForm('#popupAvatar', (data) => {
    api.patchUserAvatar(data)
        .then(() => {
            userInfo.setUserAvatar(data);
    
            popupAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        }); 
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

//Получение данных от сервера
api.getUserInfo()
    .then(res => {
        userInfo.setUserId(res._id);
        userInfo.setUserInfo(res);
        userInfo.setUserAvatar(res);
    })
    .catch((err) => {
        console.log(err);
    });

api.getInitialCards()
    .then(res => {
        cardElements.renderItems(res.reverse());
    })
    .catch((err) => {
        console.log(err);
    }); 

//Навешивание слушателей на экземпляры попапов
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupCard.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();

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

popupAvatarOpenIcon.addEventListener('click', () => {
    popupAvatar.open();

    formValidators['nameFormAvatar'].resetValidation();
});