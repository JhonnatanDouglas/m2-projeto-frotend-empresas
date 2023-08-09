import { toast, bg_blue, bg_red, txt_black, txt_white } from '../../scripts/toast.js';
import { registerRequest } from '../../scripts/requests.js';

function authentication() {
    const verifyToken = localStorage.getItem('@KE-userLoginToken');
    const verifyIsAdm = localStorage.getItem('@KE-userLoginVerification');
    
    if (verifyToken && verifyIsAdm == 'true') {
        location.replace('./adminPage/adminPage.html');
    } else if (verifyToken && verifyIsAdm == 'false') {
        location.replace('./registerPage.html');
    } 
}

function handleHomePage() {
    const buttonHomePage = document.querySelectorAll('.button__home');

    buttonHomePage.forEach(buttonHome => {
        buttonHome.addEventListener('click', (event) => {
            event.preventDefault();
            location.replace('../../index.html');
        });
    });
};

function handleLoginPage() {
    const buttonLoginPage = document.querySelector('.button__login');

    buttonLoginPage.addEventListener('click', (event) => {
        event.preventDefault();
        location.replace('./loginPage.html');
    });
};

function handleRegister() {
    const buttonLogin = document.querySelector('.button__user-register');
    const inputs = document.querySelectorAll('input');
    let count = 0;
    let registerObj = {};

    buttonLogin.addEventListener('click', async (event) => {
        event.preventDefault();
        inputs.forEach(({ value, name }) => {
            if (value.trim() === '') {
                count++
            }
            registerObj[name] = value;
        });

        if (count !== 0) {
            count = 0;
            return toast(bg_red, txt_white, 'Por favor, preencha todos os campos necessários');
        } else {
            registerRequest(registerObj);
        };
    });
};

authentication()
handleHomePage();
handleLoginPage();
handleRegister();