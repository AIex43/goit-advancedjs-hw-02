
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;


  createDelayedPromise(delay, state)
    .then(message => {
      iziToast.success({
        title: '✅ Success',
        message,
      });
    })
    .catch(message => {
      iziToast.error({
        title: '❌ Error',
        message,
      });
    });
});


function createDelayedPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const msg = `Promise ${state === 'fulfilled' ? 'resolved' : 'rejected'} in ${delay}ms`;
      state === 'fulfilled' ? resolve(msg) : reject(msg);
    }, delay);
  });
}
