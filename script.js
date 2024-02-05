const selectElement = document.querySelector('select');
const entryButton = document.querySelector('button');
const paragraph = document.querySelector('#message');
const backButton = document.querySelector('#back');

// const teensNames = data.teens.map((teen) => teen.name);

const createElement = (parentElement, element, text, className) => {
  const newElement = document.createElement(element);

  newElement.innerText = text;
  newElement.className = className;

  parentElement.appendChild(newElement);
}

const addOptions = ({ teens }) => teens
  .forEach((teen) => createElement(selectElement, 'option', teen.name, ''));

const clickEntryButton = ({ teens }) => {
  entryButton.addEventListener('click', (event) => {
    event.preventDefault();
    const inputName = document.querySelector('select').value;
    const inputPassword = document.querySelector('#password').value;

    try {
      verifyLogin(teens, inputName, inputPassword);
      console.log('Teste');
    } catch (error) {
      paragraph.innerText = error.message;
    }
  })
}

const verifyLogin = (arrayTeens, teenName, password) => {
  if (!teenName) {
    throw new Error('Você deve selecionar um Teen');
  }

  const objectTeen = arrayTeens.find(({ name }) => name === teenName);

  if (objectTeen.password === password) {
    window.location.href = 'http://127.0.0.1:5500/teen-score.html';
    testFunction(objectTeen);
  } else {
    throw new Error('Usuário ou senha inválido(a)!');
  }
}

const testFunction = ({ name, score }) => {
  localStorage.setItem('teenName', JSON.stringify({ name, score }))
}

const addTeenName = () => {
  const paragraphName = document.querySelector('.teen-name');
  const recoveryObject = JSON.parse(localStorage.getItem('teenName'));
  paragraphName.innerHTML = `${recoveryObject.name}`;

  addScoreInfo(recoveryObject);
}

const addScoreInfo = ({ name, score }) => {
  console.log(name);
  console.log(score);
  const main = document.querySelector('main');
  console.log(main);
}

const clickBackButton = () => backButton
  .addEventListener('click', () => window.location = 'http://127.0.0.1:5500/index.html?');

window.onload = () => {
  if (window.location.href === 'http://127.0.0.1:5500/index.html?') {
    addOptions(data);
    clickEntryButton(data);
  } else {
    clickBackButton();
    addTeenName();
  }
}

// const max = data.teens.reduce((acc, score) => {
//   return Math.max(acc, score.score);
// }, -Infinity)
// console.log(max);
