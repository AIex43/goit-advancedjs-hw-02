import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';

const startBtn = document.getElementById('start-btn');
const dateInput = document.getElementById('datetime-picker');

let userSelectedDate = null;
let timerId = null;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selected = selectedDates[0];
    if (selected <= Date.now()) {
      iziToast.error({ message: 'Please choose a date in the future' });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selected;
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  dateInput.disabled = true;

  timerId = setInterval(() => {
    const delta = userSelectedDate - Date.now();
    if (delta <= 0) {
      clearInterval(timerId);
      updateTimerDisplay(convertMs(0));
      dateInput.disabled = false;
      return;
    }
    updateTimerDisplay(convertMs(delta));
  }, 1000);
});

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
