import { allCategoriesRequest } from '../../scripts/requests.js';
import { renderSelectCompany, renderCompaniesList, renderAllCompaniesList } from '../../scripts/render.js';

function authentication() {
    const verifyToken = localStorage.getItem('@KE-userLoginToken');
    const verifyIsAdm = localStorage.getItem('@KE-userLoginVerification');
    
    if (verifyToken && verifyIsAdm == 'true') {
        location.replace('./src/pages/adminPage/adminPage.html');
    } else if (verifyToken && verifyIsAdm == 'false') {
        location.replace('./src/pages/userPage/userPage.html');
    } 
}

function handleLoginPage() {
    const buttonLoginPage = document.querySelector('.button__login');

    buttonLoginPage.addEventListener('click', () => {
        localStorage.clear();
        location.replace('./src/pages/loginPage.html');
    });
};

function handleRegisterPage() {
    const buttonLoginPage = document.querySelector('.button__register');

    buttonLoginPage.addEventListener('click', () => {
        localStorage.clear();
        location.replace('./src/pages/registerPage.html');
    });
};

export function handleButtonSector() {
    const optionChange = document.querySelectorAll('option');
    const buttonSector = document.querySelectorAll('.button__chip');

    optionChange.forEach((option) => {
        buttonSector.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                let nameSector = event.target.innerText;

                renderCompaniesList(nameSector);

                option.removeAttribute('selected');
                if (nameSector == option.innerText) {
                    option.setAttribute('selected', true)
                }
            });
        });
    });
};

function handleSelectCategory() {
    const select = document.querySelector('#select__company');
    const allCategoriesList = JSON.parse(localStorage.getItem('@KE-allCategoriesList'));

    select.addEventListener('change', () => {
        let selected = select.value;
        allCategoriesList.forEach(({ id, name }) => {
            if (selected === id) {
                return renderCompaniesList(name);
            } else if (selected === '') {
                renderAllCompaniesList();
                renderSelectCompany();
            };
        });
    });
};

authentication();

await allCategoriesRequest();
renderAllCompaniesList();
renderSelectCompany();
handleSelectCategory();
handleLoginPage();
handleRegisterPage();