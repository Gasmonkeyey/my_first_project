// ЧАСТЬ 2: ОСНОВНЫЕ ЗАДАНИЯ

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

// Деструктуризация параметров
function createUser({ name, age, email = "не указан" }) {
    return `Пользователь: ${name}, возраст: ${age}, email: ${email}`;
}

// Замыкание
function secretMessage(password, message) {
    return function(inputPassword) {
        if (inputPassword === password) {
            return message;
        }
        return "Доступ запрещен";
    };
}

// ЧАСТЬ 3: РЕКУРСИЯ И ФУНКЦИИ ВЫСШЕГО ПОРЯДКА

// Композиция функций
function compose(...functions) {
    return function(initialValue) {
        return functions.reduceRight((value, fn) => fn(value), initialValue);
    };
}

// Аналог Array.prototype.map
function myMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}

// Аналог Array.prototype.filter
function myFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

// Аналог Array.prototype.reduce
function myReduce(array, callback, initialValue) {
    let accumulator;
    let startIndex;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        if (array.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
}

// ЧАСТЬ 4: СЛОЖНО, НО ВАЖНО

// Каррирование
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...nextArgs) {
            return curried.apply(this, args.concat(nextArgs));
        };
    };
}

// Мемоизация
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Дебаунсинг
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Троттлинг
function throttle(fn, interval) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= interval) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}

// Функция-валидатор
function createValidator(options) {
    const {
        minLength = 0,
        requireDigit = false,
        requireUppercase = false
    } = options;

    return function(value) {
        if (value.length < minLength) {
            return { valid: false, error: `Минимальная длина: ${minLength}` };
        }
        if (requireDigit && !/\d/.test(value)) {
            return { valid: false, error: 'Должна быть хотя бы одна цифра' };
        }
        if (requireUppercase && !/[A-ZА-Я]/.test(value)) {
            return { valid: false, error: 'Должна быть хотя бы одна заглавная буква' };
        }
        return { valid: true };
    };
}