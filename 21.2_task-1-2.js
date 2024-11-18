
// Task1 — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

const XMLtest = `<list>
    <student>
        <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
    <student>
        <name lang="en">
            <first>John</first>
            <second>Doe</second>
        </name>
        <age>40</age>
        <prof>engineer</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Анна</first>
            <second>Смирнова</second>
        </name>
        <age>32</age>
        <prof>doctor</prof>
    </student>
    <student>
        <name lang="en">
            <first>Sarah</first>
            <second>Johnson</second>
        </name>
        <age>45</age>
        <prof>lawyer</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Михаил</first>
            <second>Иванов</second>
        </name>
        <age>50</age>
        <prof>manager</prof>
    </student>
    <student>
        <name lang="en">
            <first>Emily</first>
            <second>Williams</second>
        </name>
        <age>28</age>
        <prof>architect</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Екатерина</first>
            <second>Павлова</second>
        </name>
        <age>37</age>
        <prof>accountant</prof>
    </student>
    <student>
        <name lang="en">
            <first>Michael</first>
            <second>Brown</second>
        </name>
        <age>48</age>
        <prof>scientist</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Дмитрий</first>
            <second>Кузнецов</second>
        </name>
        <age>42</age>
        <prof>musician</prof>
    </student>
    <student>
        <name lang="en">
            <first>Lisa</first>
            <second>Miller</second>
        </name>
        <age>30</age>
        <prof>artist</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Ольга</first>
            <second>Алексеева</second>
        </name>
        <age>25</age>
        <prof>designer</prof>
    </student>
</list>`;

// console.log(XMLtest);

var parser = new DOMParser();
var XMLresult = parser.parseFromString(XMLtest, 'application/xml')

// console.log(XMLresult);

const XMLlist = XMLresult.querySelectorAll('student');

// console.log(XMLlist);

// todo: преоразовать список студентов в JS-объект типа:
// {
//   list: [
//     { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
//     { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
//   ]
// }

var JSresult = {};
JSresult.list = [];

XMLlist.forEach((student) => {
 var JSstudent = {};
 JSstudent.name = student.querySelector('name').querySelector('first').textContent + ' ' + student.querySelector('name').querySelector('second').textContent;
 JSstudent.age = student.querySelector('age').textContent;
 JSstudent.prof = student.querySelector('prof').textContent;
 JSstudent.lang = student.querySelector('name').getAttribute('lang');
 JSresult.list.push(JSstudent);
});

// вывод в консольт js-объекта в читабельном виде

console.log(JSON.stringify(JSresult, null, 2));


// Task 2

// Дан образец  JSON-строки:
// {"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}
// Ваша задача — создать JS-объект, который при преобразовании в JSON будет возвращать в качестве результата такую же JSON-строку, как в образце. Получившуюся строку вывести в консоль.


const t2_JSONtestString = '{"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}';

var t2_JSresult = {};// создание JS-объекта

t2_JSresult.name = 'Anton';
t2_JSresult.age = 36;
t2_JSresult.skills = ['Javascript', 'HTML', 'CSS'];
t2_JSresult.salary = 80000;

console.log('original string: ' + t2_JSONtestString);
console.log('new object: ' + JSON.stringify(t2_JSresult, null, 2));

if (t2_JSONtestString == JSON.stringify(t2_JSresult))
    console.log('Успешный успех. Строки совпадают!')
else 
    console.log('Неудача. Строки не совпадают');
