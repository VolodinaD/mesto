const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
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
const formEditButton = document.querySelector('#formEditSubmit');
const formAddButton = document.querySelector('#formAddSubmit');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_about');
const placeInput = document.querySelector('.form__input_type_place');
const linkInput = document.querySelector('.form__input_type_link');

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

//Обработчик лайков
function putLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
}

//Обработчик удаления карточек
function deleteCard(evt) {
    evt.target.closest('.element').remove();
}

//Открыть всплывающее окно изображения карточки
function openPopupCard(evt) {
    popupCard.classList.add('popup_opened');

    popupCardImage.src = evt.target.src;
    popupCardImage.alt = evt.target.closest('.element').children[1].children[0].textContent;
    popupCardText.textContent = evt.target.closest('.element').children[1].children[0].textContent;
}

//Открыть всплывающее окно редактирования профиля
function openPopupEdit() {
    popupEdit.classList.add('popup_opened');

    //Заполнить поля формы текущими значениями
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
}

//Открыть всплывающее окно добавления карточки
function openPopupAdd() {
    popupAdd.classList.add('popup_opened');
}

//Закрыть всплывающие окна
function closePopup() {
    popupEdit.classList.remove('popup_opened');
    popupAdd.classList.remove('popup_opened');
    popupCard.classList.remove('popup_opened');
}

//Добавить 6 карточек на страницу 
initialCards.forEach((item) => {
    const card = cardTemplate.cloneNode(true);
    
    card.querySelector('.element__name').textContent = item.name;
    card.querySelector('.element__image').src = item.link;
    card.querySelector('.element__image').alt = item.name;

    //Cлушатели
    card.querySelector('.element__like-button').addEventListener('click', putLike);
    card.querySelector('.element__trash-button').addEventListener('click', deleteCard);
    card.querySelector('.element__image').addEventListener('click', openPopupCard);

    cards.append(card);
});

//Обработчик отправки формы редактирования профиля
function formEditSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
}

//Обработчик отправки формы добавления новой карточки
function formAddSubmitHandler(evt) {
    evt.preventDefault();
  
    const newCard = cardTemplate.cloneNode(true);
    
    newCard.querySelector('.element__name').textContent = placeInput.value;
    newCard.querySelector('.element__image').src = linkInput.value;
    newCard.querySelector('.element__image').alt = placeInput.value;

    //Cлушатели
    newCard.querySelector('.element__like-button').addEventListener('click', putLike);
    newCard.querySelector('.element__trash-button').addEventListener('click', deleteCard);
    newCard.querySelector('.element__image').addEventListener('click', openPopupCard);

    cards.prepend(newCard);

    placeInput.value = '';
    linkInput.value = '';
}

popupEditOpenButton.addEventListener('click', openPopupEdit);

popupAddOpenButton.addEventListener('click', openPopupAdd);

popupEditCloseButton.addEventListener('click', closePopup);

popupAddCloseButton.addEventListener('click', closePopup);

popupCardCloseButton.addEventListener('click', closePopup);

formEditElement.addEventListener('submit', formEditSubmitHandler);

formAddElement.addEventListener('submit', formAddSubmitHandler);

formEditButton.addEventListener('click', closePopup);

formAddButton.addEventListener('click', closePopup);