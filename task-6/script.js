var outContainerEl;
var outContainerShadowEl;
var formEl;

var sendBtnEl;

var formdata;

var emailRegexp = /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i;
// var emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneMask = {
    mask: '+{7} (000) 00-00-000'
};

window.onload = function () {

    outContainerEl = document.getElementById('outContainer');

    const outContainerShadowEl = document.getElementById('outContainerShadow');
    outContainerShadowEl.addEventListener("click", () => { closeDialog(); });

    const supportBtn = document.getElementById('support');
    supportBtn.addEventListener("click", () => { openDialog(); });

    const cancelBtn = document.getElementById('cancel');
    cancelBtn.addEventListener("click", () => { closeDialog(); });

    sendBtnEl = document.getElementById('send');
    sendBtnEl.addEventListener("click", () => { sendForm(); });
}


function openDialog() {
    outContainerEl.classList.add("open");
    formEl = document.getElementById('feedbackForm');
    formEl.addEventListener("change", () => {      
        saveFormDataToStorage();
    });

    
    const mask = IMask(formEl.elements.phone, phoneMask);

    const savedStr = localStorage.getItem('feedbackForm');
    if (savedStr) {
        const savedObj = JSON.parse(savedStr);
        if (savedObj) {
            formdata = savedObj;

            formEl.elements.firstName.value = savedObj.firstName;
            formEl.elements.lastName.value = savedObj.lastName;
            formEl.elements.email.value = savedObj.email;
            formEl.elements.phone.value = savedObj.phone;
            formEl.elements.message.value = savedObj.message;
        }
    }
}

function closeDialog() {
    outContainerEl.classList.remove("open");
}

function sendForm() {
    const isSend = getCookie('isSend') === 'true';
    if (isSend) {
        const firstName = getCookie('firstName');
        alert(`${firstName}, ваше обращение обрабатывается!`)
        return;
    }

    formdata = getFormData();

    let canSand = true;
    canSand = checkValidation();

    if (canSand) {
        setCookie('isSend', 'true');
        setCookie('firstName', formdata.firstName);
        setCookie('lastName', formdata.lastName);
        alert(`${formdata.firstName}, Спасибо за обращение`);
    }
}

function saveFormDataToStorage() {
    formdata = getFormData();
    localStorage.setItem('feedbackForm', JSON.stringify(formdata));
}

function getFormData() {
    formdata = {
        firstName: formEl.elements.firstName.value,
        lastName: formEl.elements.lastName.value,
        email: formEl.elements.email.value,
        phone: formEl.elements.phone.value,
        message: formEl.elements.message.value,
    };

    return formdata
}

function checkValidation() {
    canSand = true;

    if (formdata.firstName === '') {
        setError(formEl.elements.firstName, 'Имя - обязательное поле');
        canSand = false;
    } else {
        setSuccess(formEl.elements.firstName);
    }

    if (formdata.lastName === '') {
        setError(formEl.elements.lastName, 'Фамилия - обязательное поле');
        canSand = false;
    } else {
        setSuccess(formEl.elements.lastName);
    }

    if (formdata.email === '') {
        setError(formEl.elements.email, 'Почта - обязательное поле');
        canSand = false;
    } else {
        if (!emailRegexp.test(String(formdata.email).toLowerCase())) {
            setError(formEl.elements.email, 'Почта - некорректный формат');
            formEl.elements.email.setCustomValidity("Invalid field.");
            canSand = false;
        } else {
            setSuccess(formEl.elements.email);
            formEl.elements.email.setCustomValidity("");
        }
    }

    if (formdata.phone === '') {
        setError(formEl.elements.phone, 'Телефон - обязательное поле');
        canSand = false;
    } else {
        if (formdata.phone.length !== 18) {
            setError(formEl.elements.phone, 'Телефон - некорректный формат');
            canSand = false;
        } else {
            setSuccess(formEl.elements.phone);
        }
    }

    if (formdata.message === '') {
        setError(formEl.elements.message, 'Сообщение - обязательное поле');
        canSand = false;
    } else {
        setSuccess(formEl.elements.message);
    }

    // if (!canSand) {
    //     sendBtnEl.disabled = true;
    // } else {
    //     sendBtnEl.disabled = false;
    // }

    return canSand;
}

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
}
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
};


function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, days = 2) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + ";";
}