import throttle from 'lodash.throttle';

const container = document.querySelector('.feedback-form');

uploadForm(container);

container.addEventListener('input', throttle(inputForm, 500));
container.addEventListener('submit', submitForm);

function uploadForm(container) {
  let data = JSON.parse(localStorage.getItem('feedback - form - state')) ?? {};
  [...container.elements].forEach(elem => {
    if (
      (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') &&
      data[elem.name]
    ) {
      elem.value = data[elem.name];
    }
  });
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
  localStorage.setItem('feedback - form - state', JSON.stringify(data));
}

function submitForm(evt) {
  const { currentTarget } = evt;
  if (
    [...currentTarget.elements].some(elem => {
      return (
        (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') &&
        elem.value == 0
      );
    })
  ) {
    evt.preventDefault;
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
  console.log(localStorage.getItem('feedback - form - state'));
  localStorage.setItem('feedback - form - state', JSON.stringify({}));
}
