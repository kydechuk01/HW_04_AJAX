// 21.7. Финальное задание

// Задание 6.
// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:
// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводится ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводится ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводится ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
// Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
// ***
// *** picsum.photos не работает, поэтому используем другой ресурс с заглушками:
// ***
// Get a List of Photos
// In order to obtain a list of photos, you can send a GET request to the following API endpoint:
// https://api.slingacademy.com/v1/sample-data/photos
// There are 2 optional parameters that can be used for pagination:
// offset: Determines whether to start returning data. The default value is 0
// limit: This limits the number of results (for better performance and speed). The default value is 10
// For example, you can send a GET request to the following API endpoint to get 20 photos (starting from the 6th):
// https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20
// The response is in JSON format.
// Data Structure
// {
//     "success": true,
//     "total_photos": 132,
//     "message": "Successfully fetched 20 of 132 photos",
//     "offset": 5,
//     "limit": 20,
//     "photos": [
//         {
//             "url": "https://api.slingacademy.com/public/sample-photos/6.jpeg",
//             "title": "Apply future response she reduce decide",
//             "user": 30,
//             "description": "Training beautiful age four skin...",
//             "id": 6
//         },
//     ]
// }
// Each photo record comes with the fields below:
// id: The id of the photo
// url: The URL of the photo
// title: The title of the photo (just some meaningless text)
// description: The description of the photo (a long meaningless sentence)
// user: The id of the user who owns the photo


//
// КОНСТАНТЫ
//

const btnRequestImages = document.querySelector('#btnRequestImages');
const inputPageNumber = document.querySelector('#inputPageNumber');
const inputPageLimit = document.querySelector('#inputPageLimit');
const divImagesList = document.querySelector('#imagesList');
const loadingPlaceholder = document.querySelector('#loadingPlaceholder');
const linkReset =document.querySelector('#linkReset');

const baseURL = 'https://api.slingacademy.com/v1/sample-data/photos?' // ?offset=5&limit=20

// константы сообщнений об ошибоке
const LOADING_MSG = 'Загрузка данных...';
const ERR_NUMBER_AND_LIMIT = "Номер страницы и лимит вне диапазона от 1 до 10";
const ERR_NUMBER = "Номер страницы вне диапазона от 1 до 10";
const ERR_LIMIT = "Лимит вне диапазона от 1 до 10";


//
// ФУНКЦИИ
//

// очищаем строку лоадера
function clearLoader() {
    loadingPlaceholder.innerHTML = '&nbsp;';
}

// включаем лоадер
function showLoader() {
    loadingPlaceholder.innerHTML = LOADING_MSG;
}

// выводим заданную ошибку в поле лоадера
function renderInputError(err_msg) {
    loadingPlaceholder.innerHTML = '<span class="error">' + err_msg + '</span>';
}

// очистка блока изображений
function clearImagesList() {
    divImagesList.innerHTML = 'Здесь будут новые изображения';
}

// сохранение настроек последнего успешного запроса в кэш
function saveLastVisit(imagesData) {
    localStorage.setItem('m21_task6_lastvisit', JSON.stringify(imagesData));
}

// загрузка настроек последнего успешного запроса из кэша и запуск отрисовки
function getLastVisit() {
    data = JSON.parse(localStorage.getItem('m21_task6_lastvisit'));
    inputPageLimit.value = data.limit;
    inputPageNumber.value = data.offset;
    fetchImages(data.offset, data.limit);
}

// запрашиваем список изображений с сервера
function fetchImages(pageNumber, pageLimit) {
    // генерация URL с запросом
    requestURL = baseURL + 'offset=' + pageNumber + '&limit=' + pageLimit;
    fetch(requestURL)
        .then((response) => { return response.json() })
        .then((data) => {
            saveLastVisit(data);
            renderImages(data)
        })
        .catch((error) => {
            console.log('error: ' + error);
            renderInputError(error)
        })
        .finally(() => { clearLoader() })

};

// отрисовка полученных изображений
function renderImages(imagesArr) {
    clearImagesList(); // очищаем поле вывода
    // console.log('Сервер вернул ', imagesArr.photos.length, ' изображений');
    if (!imagesArr.success || imagesArr.photos.length < 1) {
        renderInputError('Сервер не вернул результатов по этому запросу');
        return;
    }

    let imagesList = '';
    imagesArr.photos.forEach((photo) => {
        imagesList += `<a href="${photo.url}" target="_blank"><img class="imagePreview" src=${photo.url} alt=${photo.title} width=300 height=200"></a>`;
    });
    // помещаем результат на страницу
    divImagesList.innerHTML = imagesList;
}


// вешаем обработчик на кнопку запроса
function setBtnListener() {
    btnRequestImages.addEventListener('click', () => {
        clearLoader();

        // проверка pageLimit && pageNumber = 1 .. 10
        let errorNumber = 0;
        let errorLimit = 0;
        const pageNumber = Number(inputPageNumber.value);
        const pageLimit = Number(inputPageLimit.value);
        if (pageNumber < 1 || pageNumber > 10) errorNumber++;
        if (pageLimit < 1 || pageLimit > 10) errorLimit++;

        if (errorLimit && errorNumber) { renderInputError(ERR_NUMBER_AND_LIMIT); return };
        if (errorLimit) { renderInputError(ERR_LIMIT); return };
        if (errorNumber) { renderInputError(ERR_NUMBER); return };

        showLoader();
        clearImagesList();
        fetchImages(pageNumber, pageLimit);
    })
};

// вешаем обработчик на кнопку сброса
function setResetListener() {
    linkReset.addEventListener('click', () => {
        resetSettings();
    });
}

// сброс настроек, очищение окон и инпутов
function resetSettings() {
    inputPageLimit.value = '';
    inputPageNumber.value = '';
    clearImagesList();
    clearLoader();
    localStorage.removeItem('m21_task6_lastvisit');
    console.log('Настройки очищены');
}

//
// MAIN CODE
//


// после окончания загрузки страницы вешаем обработчики на кнопки и проверяем кэш
window.onload = () => {
    setBtnListener();
    setResetListener();
    const userLastVisit = localStorage.getItem('m21_task6_lastvisit');
    if (!userLastVisit) {
        console.log('First visit!');
    } else {
        getLastVisit();
    }
};
