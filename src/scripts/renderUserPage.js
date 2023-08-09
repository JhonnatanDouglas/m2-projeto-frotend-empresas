import { employeeProfileRequest } from './requests.js';

export async function renderUserProfile() {
    const userName = document.querySelector('.user__profile > h2');
    const userEmail = document.querySelector('.user__profile > p');
    const { name, email } = await employeeProfileRequest();

    userName.innerText = name;
    userEmail.innerText = email;
}

export function renderCompanies() {
    const tittleDepart = document.querySelector('.depart__name');
    const employeeslist = document.querySelector('.employees__list');
    const employeesEmpty = document.querySelector('.employees__empty');
    const departId = localStorage.getItem('@KE-userDepartmentId');
    const companyId = localStorage.getItem('@KE-userCompanyId');

    if (departId === "emptyId") {
        tittleDepart.style.display = 'none';
        employeeslist.style.display = 'none';
        employeesEmpty.style.display = 'flex';
    } else {
        console.log('Falta construir. Tem que saber como é quando é contratado.');
    }
}