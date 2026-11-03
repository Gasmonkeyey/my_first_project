let passed = 0;
let failed = 0;

function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    const resultElement = document.createElement('div');
    resultElement.className = `test-result ${isEqual ? 'success' : 'error'}`;
    resultElement.innerHTML = `
        <strong>${testName}:</strong>
        ${isEqual ? '✅ УСПЕХ' : '❌ ОШИБКА'}
        <br>
        Ожидалось: ${JSON.stringify(expected)}
        <br>
        Получено: ${JSON.stringify(actual)}
    `;
    document.getElementById('testResults').appendChild(resultElement);
    console.log(`${testName}:`, isEqual ? '✅' : '❌', {expected, actual});

    if (isEqual) passed++;
    else failed++;
}

function runAllTests() {
    console.log('=== ЗАПУСК ТЕСТОВ ===');

    // sum
    runTest('sum(1, 2, 3)', sum(1, 2, 3), 6);
    runTest('sum()', sum(), 0);
    runTest('sum(5)', sum(5), 5);
    runTest('sum(-1, 1, 2)', sum(-1, 1, 2), 2);

    // createUser
    runTest('createUser с email',
        createUser({ name: 'Иван', age: 25, email: 'ivan@mail.ru' }),
        'Пользователь: Иван, возраст: 25, email: ivan@mail.ru');
    runTest('createUser без email',
        createUser({ name: 'Анна', age: 30 }),
        'Пользователь: Анна, возраст: 30, email: не указан');

    // secretMessage
    const getSecret = secretMessage('1234', 'Секрет');
    runTest('secretMessage верный пароль', getSecret('1234'), 'Секрет');
    runTest('secretMessage неверный пароль', getSecret('0000'), 'Доступ запрещен');

    // compose
    const addOne = x => x + 1;
    const double = x => x * 2;
    runTest('compose(addOne, double)(5)', compose(addOne, double)(5), 11);

    // myMap
    runTest('myMap([1,2,3], x => x*2)', myMap([1, 2, 3], x => x * 2), [2, 4, 6]);
    runTest('myMap([], x => x)', myMap([], x => x), []);

    // myFilter
    runTest('myFilter([1,2,3,4], x => x % 2 === 0)', myFilter([1, 2, 3, 4], x => x % 2 === 0), [2, 4]);

    // myReduce
    runTest('myReduce([1,2,3], (a,b) => a+b, 0)', myReduce([1, 2, 3], (a, b) => a + b, 0), 6);
    runTest('myReduce([1,2,3], (a,b) => a+b) без initial', myReduce([1, 2, 3], (a, b) => a + b), 6);
    runTest('myReduce([], (a,b) => a+b, 10)', myReduce([], (a, b) => a + b, 10), 10);

    // curry
    const add3 = (a, b, c) => a + b + c;
    const curriedAdd = curry(add3);
    runTest('curry(add3)(1)(2)(3)', curriedAdd(1)(2)(3), 6);
    runTest('curry(add3)(1, 2)(3)', curriedAdd(1, 2)(3), 6);
    runTest('curry(add3)(1, 2, 3)', curriedAdd(1, 2, 3), 6);

    // memoize
    let callCount = 0;
    const slowFn = memoize((n) => { callCount++; return n * n; });
    slowFn(5);
    slowFn(5);
    runTest('memoize: кэш работает (вызовов = 1)', callCount, 1);
    runTest('memoize: результат верный', slowFn(5), 25);

    // debounce
    let debounceCalled = 0;
    const debounced = debounce(() => debounceCalled++, 50);
    debounced();
    debounced();
    debounced();
    setTimeout(() => {
        runTest('debounce: вызвана 1 раз', debounceCalled, 1);
        console.log(`=== ИТОГО: ${passed} успешно, ${failed} провалено ===`);
    }, 100);

    // throttle
    let throttleCalled = 0;
    const throttled = throttle(() => throttleCalled++, 50);
    throttled();
    throttled();
    throttled();
    runTest('throttle: вызвана 1 раз', throttleCalled, 1);

    // createValidator
    const validator = createValidator({ minLength: 8, requireDigit: true, requireUppercase: true });
    runTest('validator: короткий пароль',
        validator('abc').valid, false);
    runTest('validator: без цифры',
        validator('Abcdefgh').valid, false);
    runTest('validator: без заглавной',
        validator('abcdefg1').valid, false);
    runTest('validator: валидный пароль',
        validator('Abcdefg1').valid, true);

    console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
}

document.addEventListener('DOMContentLoaded', function() {
    runAllTests();
});