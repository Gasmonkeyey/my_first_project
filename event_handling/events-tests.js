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
    document.body.appendChild(resultElement);
    console.log(`${testName}:`, isEqual ? '✅' : '❌', {expected, actual});

    if (isEqual) passed++;
    else failed++;
}

function runAllTests() {
    console.log('=== ЗАПУСК ТЕСТОВ СОБЫТИЙ ===');

    // Тест 1: Кастомное событие
    let customEventFired = false;
    document.addEventListener('customAction', () => { customEventFired = true; });
    triggerCustomEvent();
    runTest('Кастомное событие сработало', customEventFired, true);

    // Тест 2: CustomEvent detail
    let detailMessage = '';
    const handler = (e) => { detailMessage = e.detail.message; };
    document.addEventListener('customAction', handler);
    const testEvent = new CustomEvent('customAction', {
        detail: { message: 'Тест' }
    });
    document.dispatchEvent(testEvent);
    document.removeEventListener('customAction', handler);
    runTest('CustomEvent detail.message', detailMessage, 'Тест');

    // Тест 3: debounce
    let debounceCount = 0;
    const debounced = createDebounce(() => debounceCount++, 50);
    debounced(); debounced(); debounced();
    setTimeout(() => {
        runTest('debounce: 3 вызова → 1 исполнение', debounceCount, 1);
    }, 100);

    // Тест 4: throttle
    let throttleCount = 0;
    const throttled = createThrottle(() => throttleCount++, 100);
    throttled(); throttled(); throttled();
    runTest('throttle: 3 вызова → 1 исполнение', throttleCount, 1);

    // Тест 5: предотвращение формы
    let formPrevented = false;
    const form = document.getElementById('prevent-form');
    if (form) {
        const fakeEvent = {
            preventDefault: () => { formPrevented = true; },
            target: form
        };
        preventFormSubmit(fakeEvent);
        runTest('preventFormSubmit вызывает preventDefault', formPrevented, true);
    }

    // Тест 6: обработчик клика
    const basicBtn = document.getElementById('basic-btn');
    if (basicBtn) {
        let clicked = false;
        basicBtn.addEventListener('click', () => { clicked = true; }, { once: true });
        basicBtn.click();
        runTest('Кнопка #basic-btn обрабатывает клик', clicked, true);
    }

    // Тест 7: делегирование
    const list = document.getElementById('item-list');
    if (list) {
        const initialCount = list.children.length;
        addNewItem();
        runTest('addNewItem добавляет элемент', list.children.length, initialCount + 1);
    }

    setTimeout(() => {
        console.log(`=== ИТОГО: ${passed} успешно, ${failed} провалено ===`);
    }, 150);
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(runAllTests, 200);
});