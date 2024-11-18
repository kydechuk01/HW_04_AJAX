// Задание 5.

// Написать код приложения, интерфейс которого состоит из поля ввода и кнопки «Получить список задач». При нажатии на кнопку нужно отправить запрос
// с помощью fetch на URL https://jsonplaceholder.typicode.com/users/3/todos.
// Число 3 представляет собой id пользователя, вместо него нужно подставить число, введенное в поле. Если пользователь с таким id существует, вернется список задач для этого пользователя, каждая задача представлена объектом вида:
// {
//     "userId": 3,
//     "id": 43,
//     "title": "tempore ut sint quis recusandae",
//     "completed": true
// }
// Где title — описание задачи, а completed — флаг, отображающий, выполнена задача или нет. Вывести данный список на страницу, оформив соответствующим образом: в виде списка (ul или ol), выполненные задачи должны быть написаны зачеркнутым текстом. Если пользователь с введенным id не существует, вывести сообщение:
// «Пользователь с указанным id не найден».

const btnRequestTodos = document.querySelector('#requestTodos');
const inputUserId = document.querySelector('#userNumber');
const listTodos = document.querySelector('#listTodos');
const loadingPlaceholder = document.querySelector('#loadingPlaceholder');
const baseTodosURL = 'https://jsonplaceholder.typicode.com/users/';
const todosRoute = '/todos';



// включаем лоадер
function showLoader() {
  loadingPlaceholder.innerHTML = 'Загрузка данных...'
}

// очищаем лоадер
function hideLoader() {
  loadingPlaceholder.innerHTML = '&nbsp;'
}

function clearResults() {
  listTodos.innerHTML = '';
}

// получение списка задач с сервера
function fetchTodos(userNumber) {
  let todosURL = baseTodosURL + userNumber + todosRoute;
  // console.log(`request: ${todosURL}`);
  fetch(todosURL)
    .then((response) => { return response.json() })
    .then((data) => { renderTodos(data) })
    .catch((error) => { console.log('error: ' + error) })
    .finally(() => { hideLoader() })
}

// отрисовка списка задач
function renderTodos(userTodos) {
  if (!Array.isArray(userTodos) || userTodos.length === 0) {
    listTodos.innerHTML = 'Пользователь не найден или у него отсутствуют данные';
    return;
  };

  let todolist = '<div>Список задач пользователя</div><ol>'; // оформляем список 

  // console.log(userTodos);
  userTodos.forEach((todoElement) => {
    todolist += '<li>';
    (todoElement.completed) ? todolist += '<span class="todoCompleted">' 
                            : todolist += '<span class="todoNotCompleted">';
    todolist += todoElement.title;
    todolist += '</span></li>';
  });

  todolist += '</ol>';
  listTodos.innerHTML = todolist;
}


const userName = getUserNamefromLocalStorage();


btnRequestTodos.addEventListener('click', () => {
  if (inputUserId.value == '') return;
  clearResults();
  showLoader();
  userId = inputUserId.value;
  fetchTodos(userId);
})
