let passed = 0;
let failed = 0;

function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    const resultElement = document.createElement('div');
    resultElement.className = `test-result ${isEqual ? 'test-success' : 'test-failure'}`;
    resultElement.innerHTML = `
        <strong>${testName}:</strong>
        ${isEqual ? '✅ УСПЕХ' : '❌ ОШИБКА'}
        ${isEqual ? '' : `<br>Ожидалось: ${JSON.stringify(expected)}<br>Получено: ${JSON.stringify(actual)}`}
    `;

    const container = document.getElementById('testResults') || document.body;
    container.appendChild(resultElement);
    console.log(`${testName}:`, isEqual ? '✅' : '❌', {expected, actual});

    if (isEqual) passed++;
    else failed++;
}

function runAllTests() {
    console.log('ЗАПУСК ТЕСТОВ DOM);

    // Тест 1: countChildren
    runTest('countChildren() возвращает 3', countChildren(), 3);

    // Тест 2: findSpecialChild
    runTest('findSpecialChild() находит элемент', findSpecialChild(), 'Особый дочерний элемент');

    // Тест 3: createCard
    const card = createCard('Тест', 'Описание');
    runTest('createCard создаёт .card', card && card.classList.contains('card'), true);
    runTest('createCard содержит h4', card && card.querySelector('h4').textContent, 'Тест');

    // Тест 4: createList
    const list = createList(['A', 'B']);
    runTest('createList создаёт ol', list && list.tagName, 'OL');
    runTest('createList содержит 2 li', list && list.children.length, 2);

    // Тест 5: getParentBackground
    const bg = getParentBackground();
    runTest('getParentBackground возвращает строку', typeof bg, 'string');

    // Тест 6: динамический список
    const input = document.getElementById('item-input');
    const listEl = document.getElementById('dynamic-list');
    if (input && listEl) {
        input.value = 'Тестовый элемент';
        addListItem();
        runTest('addListItem добавляет li', listEl.children.length, 1);
        runTest('addListItem содержит текст', listEl.children[0].querySelector('span').textContent, 'Тестовый элемент');

        clearList();
        runTest('clearList очищает список', listEl.children.length, 0);
    }

    // Тест 7: валидация формы
    const formData = new FormData();
    formData.append('name', 'A');
    formData.append('email', 'bad');
    const errors = validateForm(formData);
    runTest('validateForm находит ошибки', errors.length >= 2, true);

    // Тест 8: валидная форма
    const goodData = new FormData();
    goodData.append('name', 'Иван');
    goodData.append('email', 'ivan@mail.ru');
    goodData.append('age', '25');
    runTest('validateForm: валидные данные', validateForm(goodData).length, 0);

    console.log(`=== ИТОГО: ${passed} успешно, ${failed} провалено ===`);
}

// Запуск тестов после инициализации приложения
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(runAllTests, 100);
});