"use strict";

const emailInput = document.querySelector('input[name="email"]');
const checkEmailBtn = document.getElementById('checkUserEmailBtn');
const passwordInput = document.querySelector('input[name="password"]');
const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
const nameInput = document.querySelector('input[name="username"]');
const genderInput = document.querySelector('input[name="gender"]');
const phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
const addressInput = document.querySelector('input[name="address"]');
const registerForm = document.querySelector('.sign-up-form');
let isEmailValid = false;

registerForm.addEventListener("submit", function (event) {
    register(event);
});

checkEmailBtn.addEventListener('click', async () => {
    await checkEmailAvailability();
});

emailInput.addEventListener('input', () => {
    isEmailValid = false;
});

async function checkEmailAvailability() {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        alert("이메일을 입력하세요");
        isEmailValid = false;
        return false;
    } else if (!emailRegex.test(email)) {
        alert("유효한 이메일 형식이 아닙니다.");
        isEmailValid = false;
        return false;
    }

    try {
        const response = await fetch('/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (data.isDuplicate) {
            alert('이미 사용 중인 이메일입니다.');
            isEmailValid = false;
        } else {
            alert('사용 가능한 이메일입니다.');
            isEmailValid = true;
        }
        console.log("중복 여부: ", isDuplicate);
        return isEmailValid;
    } catch (error) {
        console.error('Error checking email availability:', error);
        isEmailValid = false;
        return false;
    }
}