import { toast, bg_blue, bg_red, txt_black, txt_white } from '../../scripts/toast.js';
import { loginRequest } from '../../scripts/requests.js';

function handleHomePage() {
    const buttonLoginPage = document.querySelector('.button__home');

    buttonLoginPage.addEventListener('click', (event) => {
        event.preventDefault();
        location.replace('../../index.html');
    });
};

function handleRegisterPage() {
    const buttonLoginPage = document.querySelectorAll('.button__register');

    buttonLoginPage.forEach((buttonLogin) => {
        buttonLogin.addEventListener('click', (event) => {
            event.preventDefault();
            location.replace('./registerPage.html');
        });
    });
};

function handleLogin() {
    const buttonLogin = document.querySelector('.button__user-login');
    const inputs = document.querySelectorAll('input');
    let count = 0;
    let loginObj = {};

    buttonLogin.addEventListener('click', async (event) => {
        event.preventDefault();
        inputs.forEach(({ value, name }) => {
            if (value.trim() === '') {
                count++
            }
            loginObj[name] = value;
        });

        if (count !== 0) {
            count = 0;
            return toast(bg_red, txt_white, 'Por favor, preencha todos os campos necessários');
        } else {
            const token = await loginRequest(loginObj);
            return token;
        };
    });
};

handleHomePage();
handleRegisterPage();
handleLogin();