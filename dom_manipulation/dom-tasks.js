// ЗАДАНИЕ 1: Создание и вставка элементов

function createCard(title, content) {
    const target = document.getElementById('target1');
    if (!target) return null;

    const card = document.createElement('div');
    card.className = 'card';

    const heading = document.createElement('h4');
    heading.textContent = title;

    const paragraph = document.createElement('p');
    paragraph.textContent = content;

    card.appendChild(heading);
    card.appendChild(paragraph);
    target.appendChild(card);

    return card;
}

function createList(items) {
    const target = document.getElementById('target1');
    if (!target || !Array.isArray(items)) return null;

    const ol = document.createElement('ol');

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ol.appendChild(li);
    });

    target.appendChild(ol);
    return ol;
}

// ЗАДАНИЕ 2: Навигация по DOM

function countChildren() {
    const parent = document.getElementById('parent-element');
    if (!parent) return 0;
    return parent.children.length;
}

function findSpecialChild() {
    const parent = document.getElementById('parent-element');
    if (!parent) return null;
    const special = parent.querySelector('.special');
    return special ? special.textContent.trim() : null;
}

function getParentBackground() {
    const child = document.querySelector('.child');
    if (!child) return null;
    const parent = child.parentElement;
    return getComputedStyle(parent).backgroundColor;
}

// ЗАДАНИЕ 3: Работа с классами и стилями

function setupStyleToggle() {
    const btn = document.getElementById('toggle-style');
    const target = document.getElementById('style-target');
    if (!btn || !target) return;

    btn.addEventListener('click', function() {
        target.classList.toggle('active-style');
    });
}

function changeHeaderColor() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    header.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    header.style.background = `rgb(${r}, ${g}, ${b})`;
}

function animateElement() {
    const target = document.getElementById('style-target');
    if (!target) return;

    target.style.transform = 'scale(1.2)';
    target.style.opacity = '0.5';
    target.style.transition = 'all 0.5s ease';

    setTimeout(() => {
        target.style.transform = 'scale(1)';
        target.style.opacity = '1';
    }, 500);
}

// ЗАДАНИЕ 4: Обработка событий

function setupClickCounter() {
    const btn = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    if (!btn || !counter) return;

    let count = 0;
    btn.addEventListener('click', function() {
        count++;
        counter.textContent = `Кликов: ${count}`;
    });
}

function setupInputDisplay() {
    const input = document.getElementById('text-input');
    const display = document.getElementById('input-display');
    if (!input || !display) return;

    input.addEventListener('input', function() {
        display.textContent = input.value;
    });
}

function setupKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        console.log(`Keydown: code=${e.code}, key=${e.key}`);
    });

    document.addEventListener('keyup', function(e) {
        console.log(`Keyup: code=${e.code}, key=${e.key}`);
    });
}

// ЗАДАНИЕ 5: Динамические списки

function addListItem() {
    const input = document.getElementById('item-input');
    const list = document.getElementById('dynamic-list');
    if (!input || !list) return;

    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement('li');
    li.className = 'list-item';

    const span = document.createElement('span');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'delete-btn';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    input.value = '';
    input.focus();
}

function removeListItem(event) {
    if (event.target.classList.contains('delete-btn')) {
        const li = event.target.closest('.list-item');
        if (li) li.remove();
    }
}

function clearList() {
    const list = document.getElementById('dynamic-list');
    if (!list) return;
    list.innerHTML = '';
}

function setupListEvents() {
    const addBtn = document.getElementById('add-item');
    const clearBtn = document.getElementById('clear-list');
    const list = document.getElementById('dynamic-list');
    const input = document.getElementById('item-input');

    if (addBtn) addBtn.addEventListener('click', addListItem);
    if (clearBtn) clearBtn.addEventListener('click', clearList);
    if (list) list.addEventListener('click', removeListItem);

    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addListItem();
        });
    }
}

// ЗАДАНИЕ 6: Работа с формами

function validateForm(formData) {
    const errors = [];

    const name = formData.get('name');
    if (!name || name.trim().length < 2) {
        errors.push('Имя: минимум 2 символа');
    }

    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Email: некорректный формат');
    }

    const age = formData.get('age');
    if (age && (isNaN(age) || age < 1 || age > 120)) {
        errors.push('Возраст: от 1 до 120');
    }

    return errors;
}

function displayFormErrors(errors) {
    const output = document.getElementById('form-output');
    if (!output) return;

    output.innerHTML = '';
    output.className = 'error-message';

    const ul = document.createElement('ul');
    errors.forEach(err => {
        const li = document.createElement('li');
        li.textContent = err;
        ul.appendChild(li);
    });
    output.appendChild(ul);
}

function displayFormSuccess(userData) {
    const output = document.getElementById('form-output');
    if (!output) return;

    output.innerHTML = '';
    output.className = 'success-message';

    const p = document.createElement('p');
    p.textContent = '✅ Форма успешно отправлена!';
    output.appendChild(p);

    const ul = document.createElement('ul');
    Object.entries(userData).forEach(([key, value]) => {
        const li = document.createElement('li');
        li.textContent = `${key}: ${value}`;
        ul.appendChild(li);
    });
    output.appendChild(ul);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const errors = validateForm(formData);

    if (errors.length > 0) {
        displayFormErrors(errors);
    } else {
        const userData = {
            'Имя': formData.get('name'),
            'Email': formData.get('email'),
            'Возраст': formData.get('age') || 'не указан'
        };
        displayFormSuccess(userData);
        form.reset();
    }
}

function setupForm() {
    const form = document.getElementById('user-form');
    if (form) form.addEventListener('submit', handleFormSubmit);
}

// ИНИЦИАЛИЗАЦИЯ

function initializeApp() {
    setupStyleToggle();
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
    setupForm();

    createCard('Пример карточки', 'Это содержимое карточки');
    createList(['Первый элемент', 'Второй элемент', 'Третий элемент']);

    console.log('Приложение инициализировано!');
}

document.addEventListener('DOMContentLoaded', initializeApp);