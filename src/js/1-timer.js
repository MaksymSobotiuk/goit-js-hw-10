
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';


import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const timerInput = document.querySelector('#datetime-picker');
const timerStartButton = document.querySelector('button[data-start]');
const dataDays = document.querySelector('.value[data-days]');
const dataHours = document.querySelector('.value[data-hours]');
const dataMinutes = document.querySelector('.value[data-minutes]');
const dataSeconds = document.querySelector('.value[data-seconds]');
timerStartButton.disabled = true;
let userSelectedDate;
let countdownTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate < Date.now()) {

      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: 'white',
        messageSize: '18',
        theme: 'dark',
        backgroundColor: 'red',
        position: 'topCenter',
        close: false,
        progressBar: false,
        iconUrl: './img/circle.svg',
      });
    } else {
      timerStartButton.disabled = false;
    }
  },
};

flatpickr(timerInput, options);

timerStartButton.addEventListener('click', startCountdown);

function startCountdown() {
  timerInput.setAttribute('disabled', 'true');
  countdownTime = userSelectedDate - Date.now();
  timerStartButton.disabled = true;
  const intervalId = setInterval(() => {
    countdownTime = countdownTime - 1000;
    if (countdownTime < 1000) {
      clearInterval(intervalId);
      countdownTime = 0;
      timerInput.removeAttribute('disabled');
    }
    const objTime = convertMs(countdownTime);
    dataDays.textContent = addLeadingZero(objTime.days);
    dataHours.textContent = addLeadingZero(objTime.hours);
    dataMinutes.textContent = addLeadingZero(objTime.minutes);
    dataSeconds.textContent = addLeadingZero(objTime.seconds);
  }, 1000);
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}