import {renderUserProfile, renderCompanies} from '../../scripts/renderUserPage.js';

function authentication() {
    const verifyToken = localStorage.getItem('@KE-userLoginToken');
    const verifyIsAdm = localStorage.getItem('@KE-userLoginVerification');

    if(verifyToken && verifyIsAdm === 'true')  {
        location.replace('../adminPage/adminPage.html');
    } else if (verifyToken && verifyIsAdm === 'false') {
        return 'Página autenticada';
    } else {
        location.replace('../../../index.html');
    }
}

function handleLogout() {
    const buttonLogout = document.querySelector('.button__logout');

    buttonLogout.addEventListener('click', async () => {
        localStorage.clear();
        location.replace('../../../index.html');
    });
};

authentication();

renderUserProfile();
// renderCompanies();
handleLogout();