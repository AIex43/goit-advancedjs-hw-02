import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  setTimeout(() => {
    if (state === 'fulfilled') {
      iziToast.success({
        title: '✅ Success',
        message: `Promise resolved in ${delay}ms`,
      });
    } else {
      iziToast.error({
        title: '❌ Error',
        message: `Promise rejected in ${delay}ms`,
      });
    }
  }, delay);
});
