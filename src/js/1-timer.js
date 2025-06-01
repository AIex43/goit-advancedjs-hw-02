import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let countdownInterval;
let selectedDate;

startBtn.disabled = true;

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    if (selectedDates[0] <= now) {
      iziToast.error({ title: 'Error', message: 'Please choose a future date' });
    } else {
      selectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  }
});

startBtn.addEventListener('click', () => {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = selectedDate - now;
    if (diff <= 0) {
      clearInterval(countdownInterval);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(diff);
    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }, 1000);
});

function convertMs(ms) {
  const sec = 1000;
  const min = sec * 60;
  const hr = min * 60;
  const day = hr * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hr);
  const minutes = Math.floor((ms % hr) / min);
  const seconds = Math.floor((ms % min) / sec);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
