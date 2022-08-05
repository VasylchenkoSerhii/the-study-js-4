import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);

let isActive = false;

function onSubmit(e) {
  e.preventDefault();

  if (isActive) {
    return;
  };

  
  let delay = Number(refs.form.elements.delay.value);
  const step = Number(refs.form.elements.step.value);
  const amount = Number(refs.form.elements.amount.value);

  isActive = true;

  for (let i = 1; i <= amount; i += 1){
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
  };

  setTimeout(() => {
    isActive = false;
  }, delay)
};

 
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
      } 
    }, delay);
  });
};
  
