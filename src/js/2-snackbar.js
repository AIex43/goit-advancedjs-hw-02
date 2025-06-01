import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('promise-form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(form.delay.value);
  const state = form.state.value;

  createPromise(delay, state)
    .then(ms => {
      iziToast.success({ message: `✅ Fulfilled promise in ${ms}ms` });
    })
    .catch(ms => {
      iziToast.error({ message: `❌ Rejected promise in ${ms}ms` });
    });

  form.reset();
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
}
