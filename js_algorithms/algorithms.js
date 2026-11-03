// ЧИСЛА

// Временная сложность: O(√n)
function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
}

// Временная сложность: O(n)
function factorial(n) {
    if (n < 0) return null;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Временная сложность: O(n)
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const result = [0, 1];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
}

// Временная сложность: O(log(min(a, b)))
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// СТРОКИ

// Временная сложность: O(n)
function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/\s/g, '');
    let left = 0;
    let right = clean.length - 1;
    while (left < right) {
        if (clean[left] !== clean[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Временная сложность: O(n)
function countVowels(str) {
    const vowels = 'аеёиоуыэюяaeiou';
    let count = 0;
    const lower = str.toLowerCase();
    for (let i = 0; i < lower.length; i++) {
        if (vowels.includes(lower[i])) count++;
    }
    return count;
}

// Временная сложность: O(n)
function reverseString(str) {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
}

// Временная сложность: O(n)
function findLongestWord(sentence) {
    const words = sentence.split(/\s+/);
    let longest = '';
    for (const word of words) {
        if (word.length > longest.length) {
            longest = word;
        }
    }
    return longest;
}

// МАССИВЫ

// Временная сложность: O(n) - линейная
function findMax(arr) {
    if (!arr || arr.length === 0) return null;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// Временная сложность: O(n)
function removeDuplicates(arr) {
    const result = [];
    for (const item of arr) {
        if (!result.includes(item)) {
            result.push(item);
        }
    }
    return result;
}

// Временная сложность: O(n²) - квадратичная
function bubbleSort(arr) {
    const result = [...arr];
    const n = result.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    return result;
}

// Временная сложность: O(log n) - логарифмическая
function binarySearch(sortedArr, target) {
    let left = 0;
    let right = sortedArr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (sortedArr[mid] === target) return mid;
        if (sortedArr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// УТИЛИТЫ
// Временная сложность: O(1)
function formatCurrency(amount, currency = '₽') {
    const rounded = Math.round(amount * 100) / 100;
    const parts = rounded.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    const formatted = parts.length > 1 ? parts.join('.') : parts[0];
    return `${formatted} ${currency}`;
}

// Временная сложность: O(1)
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Временная сложность: O(n)
function generatePassword(length = 8) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}';
    const all = upper + lower + digits + special;

    let password = '';
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += special[Math.floor(Math.random() * special.length)];

    for (let i = 4; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
}