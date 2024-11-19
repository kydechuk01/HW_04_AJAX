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
