const xhr = new XMLHttpRequest();

xhr.onload = function() {
  console.log(`Статус: ${xhr.status}; Результат: ${xhr.response}`)
};

xhr.onerror = function() {
  console.log('Ошибка запроса');
};

// https://jsonplaceholder.typicode.com/
// https://jsonplaceholder.typicode.com/todos/1
// https://jsonplaceholder.typicode.com/posts

xhr.open("get", "https://jsonplaceholder.typicode.com/posts", true);
xhr.send();

// console.log('Результат запроса')