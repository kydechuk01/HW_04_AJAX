function alertFirst() {
  localStorage.setItem('userName', prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя'));
  localStorage.setItem('lastVisit', new Date());
}

function getUserNamefromLocalStorage() {
  return localStorage.getItem('userName');
}

function alertSecond() {
  const userName = getUserNamefromLocalStorage();
  const userLastVisit = localStorage.getItem('lastVisit');
  if (userName) {
    alert(`Привет, ${userName}! С возвращением. В последний раз вы были у нас ${userLastVisit}`);
    localStorage.setItem('lastVisit', new Date());
  } else console.log('Пользователь не найден');
}

console.log('Время открытия страницы: ', new Date());

const userName = getUserNamefromLocalStorage();

(userName) ? alertSecond() : alertFirst();

