function alertFirst() {
	const userName = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя');
  // записываем результат только если пользователь ввел непустую строку (не нажал Cancel)
  if (userName) {
    localStorage.setItem('m21_task3_userName', userName);
    localStorage.setItem('m21_task3_lastVisit', new Date());
  }
}

function getUserNamefromLocalStorage() {
  return localStorage.getItem('m21_task3_userName');
}

function alertSecond() {
  const userName = getUserNamefromLocalStorage();
  const userLastVisit = localStorage.getItem('m21_task3_lastVisit');
  if (userName) {
    alert(`Привет, ${userName}! С возвращением. В последний раз вы были у нас ${userLastVisit}`);
    localStorage.setItem('m21_task3_lastVisit', new Date());
  } else console.log('Пользователь не найден');
}

console.log('Время открытия страницы: ', new Date());

const userName = getUserNamefromLocalStorage();

(userName) ? alertSecond() : alertFirst();

