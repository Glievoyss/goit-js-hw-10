import './styles.css'; // подключаю стили
import menuAll from './menu.json'; // поллючаю даееые про меню
import templateCard from './template/menu.hbs'; // подключаю шаблон

// выбираю элементы ДОМА для дальнейшей манипуляции с ними
const refs = {
  postCard: document.querySelector('#menu'), // Это УЛ в который будут прилетать карточки
  labelLight: document.querySelector('#theme-switch-control'), // чекбокс
  bodyLight: document.querySelector('body'), // весь сайт (на него накидываеться тема лайт или не лайт)
};

// объект с названиями тем (они же классы которые подключаются)
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

// переменная для ключа который запишеться в локалстроредж
const localStorageKEY = 'lightValue';

// функция которая при старте поднимает с локалстореджа значение и меняет или не меняет тему и чекбокс
const startThem = function() {
  const startThem = localStorage.getItem(localStorageKEY);
  if (startThem === Theme.DARK) {
    refs.bodyLight.classList = startThem ;
    refs.labelLight.checked = true;
  }
};
// и тут же вызываю эту функцию
startThem();

// посылаю в функцию которая прилетела с экспорта хенделбарса шаш шаблон
const newCards = templateCard(menuAll);
// сформированные функцией лишки вывожу в ДОМ
refs.postCard.insertAdjacentHTML('afterbegin', newCards);

// влючаю событие (выбор чекбокса) и ссылаюсь на функцию которая будет при этом выполняться
refs.labelLight.addEventListener('change', lightFunc);

function lightFunc(event) {
  //console.dir(event.target.checked);

  if (event.target.checked) {
    // если чекбокс включен (true) то.....

    // записываю значение темной темы из обьекта с названиями тем
    localStorage.setItem(localStorageKEY, Theme.DARK);
    // и тут прикрепляю класс с этой темой
    refs.bodyLight.classList = Theme.DARK;
  } else {
    // соответственно если чек бокс выключить то записываем в локал светлую тему и вешаем класс светлой темы
    localStorage.setItem(localStorageKEY, Theme.LIGHT);
    refs.bodyLight.classList = Theme.LIGHT;
  }
}
