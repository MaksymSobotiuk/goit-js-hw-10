import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const snackbarForm = document.querySelector(".form");
const formInputText = document.querySelector(".delay-text");

function textDelay(event) {
    
    const delayValue = parseInt(formInputText.value);
    const delayInput = document.querySelector('input[name="state"]:checked');

    if (!delayInput) {
        return;
    }
    event.preventDefault();

    const snackbarPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (delayInput.value === 'fulfilled') {
                resolve(delayValue);
            } else {
                reject(delayValue);
            }
        }, delayValue);
    });
   snackbarPromise.then(handlerSuccess).catch(handlerError);
   formInputText.value = '';
    const buttons = document.querySelectorAll('input[name="state"]');
    buttons.forEach(button => {
        button.checked = false;
    });
}
snackbarForm.addEventListener('submit', textDelay);

function handlerSuccess(delay) {
    iziToast.show({
        titleColor: '#fff',
        messageColor: '#fff',
        message: `✅ Fulfilled promise in ${delay}ms`,
        closeOnEscape: true,
        position: 'topRight',
        backgroundColor: '#59a10d',
    });
}

function handlerError(delay) {
    iziToast.show({
        titleColor: '#fff',
        messageColor: '#fff',
        message: `❌ Rejected promise in ${delay}ms`,
        closeOnEscape: true,
        position: 'topRight',
        backgroundColor: '#ef4040',
    });
}