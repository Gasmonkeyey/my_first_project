// Tasks

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ЗАДАНИЕ 1

function handleBasicClick(event) {
    const output = document.getElementById('basic-output');
    const btn = event.target;

    output.textContent = `Тип: ${event.type}
Координаты: X=${event.clientX}, Y=${event.clientY}
Target: ${event.target.tagName}#${event.target.id}`;

    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 500);
    showToast('Кнопка нажата!', 'info');
}

function handleMouseEvents(event) {
    const box = document.getElementById('color-box');
    const output = document.getElementById('mouse-output');

    if (event.type === 'mouseenter') {
        box.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    } else if (event.type === 'mouseleave') {
        box.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
    } else if (event.type === 'mousemove') {
        output.textContent = `Координаты мыши: X=${event.offsetX}, Y=${event.offsetY}`;
    }
}

function setupBasicEvents() {
    const btn = document.getElementById('basic-btn');
    const box = document.getElementById('color-box');

    if (btn) btn.addEventListener('click', handleBasicClick);
    if (box) {
        box.addEventListener('mouseenter', handleMouseEvents);
        box.addEventListener('mouseleave', handleMouseEvents);
        box.addEventListener('mousemove', handleMouseEvents);
    }
}

// ЗАДАНИЕ 2

function handleKeyEvents(event) {
    const output = document.getElementById('key-output');

    output.textContent = `key: "${event.key}"
code: "${event.code}"
Ctrl: ${event.ctrlKey} | Alt: ${event.altKey} | Shift: ${event.shiftKey}`;

    if ((event.ctrlKey && event.key === 's') ||
        (event.altKey && event.key === 'c') ||
        (event.shiftKey && event.key === 'A')) {
        event.preventDefault();
        output.textContent += `\n⚡ Специальная комбинация: ${event.key}`;
        showToast(`Комбинация ${event.key} перехвачена`, 'success');
    }
}

function setupKeyboardEvents() {
    const input = document.getElementById('key-input');
    if (!input) return;

    input.addEventListener('keydown', handleKeyEvents);
    input.addEventListener('keyup', function() {
        const output = document.getElementById('key-output');
        if (output) output.textContent = 'Информация о клавише: —';
    });
}

// ЗАДАНИЕ 3

function handleDelegationClick(event) {
    const list = document.getElementById('item-list');
    const output = document.getElementById('delegation-output');
    if (!list) return;

    if (event.target.classList.contains('delete')) {
        const item = event.target.closest('.item');
        if (item) {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            setTimeout(() => item.remove(), 200);
        }
    } else {
        const item = event.target.closest('.item');
        if (item) item.classList.toggle('selected');
    }

    setTimeout(() => {
        const selectedCount = list.querySelectorAll('.item.selected').length;
        if (output) output.textContent = `Выбрано: ${selectedCount}`;
    }, 250);
}

function addNewItem() {
    const list = document.getElementById('item-list');
    if (!list) return;

    const id = Date.now();
    const item = document.createElement('div');
    item.className = 'item';
    item.dataset.id = id;
    item.innerHTML = `Элемент ${id} <span class="delete">✕</span>`;
    list.appendChild(item);
    showToast('Элемент добавлен', 'success');
}

function setupDelegationEvents() {
    const list = document.getElementById('item-list');
    const addBtn = document.getElementById('add-item-btn');

    if (list) list.addEventListener('click', handleDelegationClick);
    if (addBtn) addBtn.addEventListener('click', addNewItem);
}

// ЗАДАНИЕ 4

function preventLinkDefault(event) {
    event.preventDefault();
    const link = event.target;
    const output = document.getElementById('prevention-output');

    output.textContent = '⚠️ Переход по ссылке предотвращён!';

    link.classList.add('shake');
    setTimeout(() => link.classList.remove('shake'), 400);
    showToast('Ссылка не перешла (preventDefault)', 'error');
}

function preventFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector('input');
    const output = document.getElementById('prevention-output');

    const value = input.value.trim();
    if (!value) {
        output.textContent = '❌ Ошибка: поле не может быть пустым';
        output.style.borderLeftColor = 'var(--accent)';
        showToast('Поле пустое!', 'error');
    } else {
        output.textContent = `✅ Отправлено: "${value}"`;
        output.style.borderLeftColor = 'var(--success)';
        showToast('Форма отправлена', 'success');
        form.reset();
    }
}

function setupPreventionEvents() {
    const link = document.getElementById('prevent-link');
    const form = document.getElementById('prevent-form');

    if (link) link.addEventListener('click', preventLinkDefault);
    if (form) form.addEventListener('submit', preventFormSubmit);
}

// ЗАДАНИЕ 5

function triggerCustomEvent() {
    const event = new CustomEvent('customAction', {
        detail: { message: 'Привет от кастомного события!', time: new Date().toLocaleTimeString() }
    });
    document.dispatchEvent(event);
}

function handleCustomEvent(event) {
    const output = document.getElementById('custom-output');
    const btn = document.getElementById('trigger-custom');

    if (output) output.textContent = `Кастомное событие: ${event.detail.message}\nВремя: ${event.detail.time}`;
    if (btn) {
        btn.classList.add('pulse');
        setTimeout(() => btn.classList.remove('pulse'), 500);
    }
    showToast(event.detail.message, 'info');
}

function setupMultipleListeners() {
    document.addEventListener('customAction', () => {
        console.log('Обработчик 1: событие получено');
    });
    document.addEventListener('customAction', (e) => {
        console.log('Обработчик 2: данные =', e.detail);
    });
    document.addEventListener('customAction', () => {
        console.log('Обработчик 3: обработка завершена');
    });
    showToast('Добавлено 3 обработчика', 'success');
}

function setupCustomEvents() {
    document.addEventListener('customAction', handleCustomEvent);

    const triggerBtn = document.getElementById('trigger-custom');
    const multipleBtn = document.getElementById('multiple-listeners');

    if (triggerBtn) triggerBtn.addEventListener('click', triggerCustomEvent);
    if (multipleBtn) multipleBtn.addEventListener('click', setupMultipleListeners);
}

// ЗАДАНИЕ 6: Загрузка изображений

const IMAGE_SOURCES = [
    'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 1000),
    'https://picsum.photos/seed/' + Date.now() + '/400/300',
    'https://via.placeholder.com/400x300/667eea/ffffff?text=Image+Loaded'
];

function loadImageWithEvents() {
    const container = document.getElementById('image-container');
    const output = document.getElementById('loading-output');
    if (!container) return;

    container.innerHTML = '';
    container.className = 'image-container loading';
    if (output) output.textContent = 'Статус загрузки: ⏳ загрузка...';

    let currentIndex = 0;

    function tryLoad() {
        if (currentIndex >= IMAGE_SOURCES.length) {
            container.className = 'image-container error';
            container.innerHTML = '<div class="placeholder"><span>❌</span><p>Не удалось загрузить</p></div>';
            if (output) output.textContent = 'Статус загрузки: ❌ все источники недоступны';
            showToast('Не удалось загрузить изображение', 'error');
            return;
        }

        const img = document.createElement('img');
        const src = IMAGE_SOURCES[currentIndex];

        img.addEventListener('load', () => {
            container.className = 'image-container success';
            if (output) output.textContent = `Статус загрузки: ✅ загружено\nИсточник: ${currentIndex + 1}`;
            showToast('Изображение загружено!', 'success');
        });

        img.addEventListener('error', () => {
            currentIndex++;
            img.remove();
            tryLoad();
        });

        img.alt = 'Загруженное изображение';
        img.src = src;
        container.appendChild(img);
    }

    tryLoad();
}

function simulateLoadError() {
    const container = document.getElementById('image-container');
    const output = document.getElementById('loading-output');
    if (!container) return;

    container.innerHTML = '';
    container.className = 'image-container loading';
    if (output) output.textContent = 'Статус загрузки: попытка загрузки...';

    const img = document.createElement('img');

    img.addEventListener('error', () => {
        container.className = 'image-container error';
        container.innerHTML = '<div class="placeholder"><span>❌</span><p>Ошибка загрузки</p></div>';
        if (output) output.textContent = 'Статус загрузки: ❌ ошибка (файл не существует)';
        showToast('Ошибка загрузки изображения', 'error');
    });

    img.src = 'https://this-domain-does-not-exist-' + Date.now() + '.com/image.jpg';
    container.appendChild(img);
}

function setupLoadingEvents() {
    const loadBtn = document.getElementById('load-image');
    const errorBtn = document.getElementById('load-error');

    if (loadBtn) loadBtn.addEventListener('click', loadImageWithEvents);
    if (errorBtn) errorBtn.addEventListener('click', simulateLoadError);
}

// ЗАДАНИЕ 7

let timerInterval = null;
let timerValue = 0;

function startTimer() {
    if (timerInterval !== null) {
        showToast('Таймер уже запущен', 'info');
        return;
    }

    const output = document.getElementById('timer-output');
    timerInterval = setInterval(() => {
        timerValue++;
        if (output) output.textContent = `⏱ Таймер: ${timerValue}с`;
    }, 1000);
    showToast('Таймер запущен', 'success');
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timerValue = 0;
    const output = document.getElementById('timer-output');
    if (output) output.textContent = '⏱ Таймер: 0с';
    showToast('Таймер остановлен', 'info');
}

function createDebounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function createThrottle(func, interval) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= interval) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

function testDebounce() {
    const output = document.getElementById('async-output');
    let normalCount = 0;
    let debouncedCount = 0;

    const debouncedFn = createDebounce(() => {
        debouncedCount++;
        output.textContent = `Debounce: обычных вызовов = ${normalCount}, debounce сработал = ${debouncedCount}`;
        showToast('Debounce сработал 1 раз', 'success');
    }, 500);

    for (let i = 0; i < 5; i++) {
        normalCount++;
        debouncedFn();
    }

    output.textContent = `Debounce: обычных вызовов = ${normalCount}, ждём 500мс...`;
}

function testThrottle() {
    const output = document.getElementById('async-output');
    let normalCount = 0;
    let throttledCount = 0;

    const throttledFn = createThrottle(() => {
        throttledCount++;
        output.textContent = `Throttle: обычных вызовов = ${normalCount}, throttle сработал = ${throttledCount}`;
    }, 500);

    for (let i = 0; i < 5; i++) {
        normalCount++;
        throttledFn();
    }

    output.textContent = `Throttle: обычных вызовов = ${normalCount}, throttle сработал = ${throttledCount}`;
    showToast('Throttle ограничил вызовы', 'info');
}

function setupTimerEvents() {
    const startBtn = document.getElementById('start-timer');
    const stopBtn = document.getElementById('stop-timer');
    const debounceBtn = document.getElementById('debounce-btn');
    const throttleBtn = document.getElementById('throttle-btn');

    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (stopBtn) stopBtn.addEventListener('click', stopTimer);
    if (debounceBtn) debounceBtn.addEventListener('click', testDebounce);
    if (throttleBtn) throttleBtn.addEventListener('click', testThrottle);
}

// ИНИЦИАЛИЗАЦИЯ

function initializeEventHandler() {
    setupBasicEvents();
    setupKeyboardEvents();
    setupDelegationEvents();
    setupPreventionEvents();
    setupCustomEvents();
    setupLoadingEvents();
    setupTimerEvents();
    console.log('✅ Все обработчики событий инициализированы!');
    showToast('Приложение готово к работе', 'success');
}

document.addEventListener('DOMContentLoaded', initializeEventHandler);