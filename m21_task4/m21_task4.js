function generateRandom() {
    return Math.floor(Math.random() * 100 + 1)
}

const testPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let testRandom = generateRandom();
        (testRandom % 2 === 0) ? resolve(testRandom) : reject(testRandom);
    }, 1000)
});

testPromise
    .then((result) => {
        console.log(`Завершено успешно. Сгенерированное число четное — ${result}`);
        })
    .catch((result) => {
        console.log(`Завершено с ошибкой. Сгенерированное число нечетное — ${result}`);
    });
