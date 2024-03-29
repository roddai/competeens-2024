const selectElement = document.querySelector('select');
const entryButton = document.querySelector('button');
const paragraph = document.querySelector('#message');
const backButton = document.querySelector('#back');

const createElement = (parentElement, element, text, className) => {
  const newElement = document.createElement(element);

  newElement.innerText = text;
  newElement.className = className;

  parentElement.appendChild(newElement);
}

const addOptions = ({ teens }) => teens
  .forEach((teen) => createElement(selectElement, 'option', teen.name, 'option-teen-name display-1'));

const clickEntryButton = ({ teens }) => {
  entryButton.addEventListener('click', (event) => {
    event.preventDefault();
    const inputName = document.querySelector('select').value;
    const inputPassword = document.querySelector('#password').value;

    try {
      verifyLogin(teens, inputName, inputPassword);
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
    window.location.href = 'https://roddai.github.io/competeens-2024/teen-score.html';
    addInfoLocalStorage(objectTeen);
  } else {
    throw new Error('Usuário ou senha inválido(a)!');
  }
}

const addInfoLocalStorage = ({ name, score }) => localStorage.setItem('teenName', JSON.stringify({ nome: name, score }));

const addTeenName = () => {
  const paragraphName = document.querySelector('.teen-name');
  const recoveryObject = JSON.parse(localStorage.getItem('teenName'));
  paragraphName.innerHTML = `${recoveryObject.nome}`;

  addScoreInfo(recoveryObject);
}

const addScoreInfo = ({ score }) => {
  const main = document.querySelector('main');
  const maxScore = verifyMaxScore(data);
  const arrayWithScores = getArrayWithScores(data);
  const position = arrayWithScores.findIndex((number) => number === score) + 1;

  for (let index = 0; index <= 2; index += 1) {
    createElement(main, 'div', '', `score-position${index}`);
  }

  createBlockScore('Maior pontuação', maxScore, '.score-position0');
  createBlockScore('Sua pontuação', score, '.score-position1');
  createBlockScore('Sua posição no hanking', position, '.score-position2');
}

const createBlockScore = (text, number, className) => {
  const div = document.querySelector(className);
  createElement(div, 'p', text, 'text-score-type');
  createElement(div, 'p', number, 'score-type');
}

const verifyMaxScore = ({ teens }) => teens
  .reduce((acc, score) => Math.max(acc, score.score), -Infinity);

const getArrayWithScores = ({ teens }) => teens
  .map(({ score }) => score)
  .sort((a, b) => b - a);

const goBack = () => window.history.back();

window.onload = () => {
  if (window.location.href === 'https://roddai.github.io/competeens-2024/teen-score.html') {
    addTeenName();
  } else {
    addOptions(data);
    clickEntryButton(data);
  }
}
