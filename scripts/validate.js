function showInputError(inputElement, errorMessage, settings) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);

    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(inputElement, settings) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass);

    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(inputElement, settings) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(inputElement, settings);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
    
function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function enableValidation(settings) {
    const formList = [...document.querySelectorAll(settings.formSelector)];

    formList.forEach((formElement) => {
        const inputList = [...formElement.querySelectorAll(settings.inputSelector)];
        const buttonElement = formElement.querySelector(settings.submitButtonSelector);
        
        toggleButtonState(inputList, buttonElement, settings);
           
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                checkInputValidity(inputElement, settings);
                toggleButtonState(inputList, buttonElement, settings);
            });
        });
    });
}

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error'
});