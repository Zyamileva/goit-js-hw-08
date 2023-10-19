import throttle from 'lodash.throttle';

const container = document.querySelector('.feedback-form');

uploadForm(container);

container.addEventListener('input', throttle(inputForm, 500));
container.addEventListener('submit', submitForm);

function uploadForm(container) {
  try {
    let dataStorage = localStorage.getItem('feedback - form - state') ?? {};
    let data = JSON.parse(dataStorage);
    [...container.elements].forEach(elem => {
      if (
        (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') &&
        data[elem.name]
      ) {
        elem.value = data[elem.name];
      }
    });
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function inputForm(evt) {
  const { currentTarget } = evt;
  if (currentTarget) {
    saveData(currentTarget);
  }
}

function saveData(currentTarget) {
  const data = {};
  [...currentTarget.elements].forEach(elem => {
    if (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') {
      data[elem.attributes.name.value] = elem.value;
    }
  });
  try {
    localStorage.setItem('feedback - form - state', JSON.stringify(data));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function submitForm(evt) {
  evt.preventDefault();
  const { currentTarget } = evt;
  if (
    [...currentTarget.elements].some(elem => {
      return (
        (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') &&
        elem.value == 0
      );
    })
  ) {
    alert('Не введена інформація.');
    return;
  }
  saveData(currentTarget);
  resetData();
}

function resetData() {
  [...container.elements].forEach(elem => {
    if (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') {
      elem.value = '';
    }
  });

  try {
    console.log(localStorage.getItem('feedback - form - state'));
    localStorage.setItem('feedback - form - state', JSON.stringify({}));
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
  container.reset();
}
