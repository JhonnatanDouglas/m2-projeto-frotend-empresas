import {
    allDepartmentsRequest,
    companyIdRequest,
    newDepartmentRequest,
    updateDepartmentRequest
} from '../../scripts/requests.js';

import {
    renderSelectAllCompanies,
    renderDepartAdminList,
    createDepartAdminList,
    renderModalSelectAllCompanies,
} from '../../scripts/renderAdminPage.js';

import {
    handleModal_DepartCreate,
    handleModal_DepartView,
    handleModal_DepartEdit,
    handleModal_DepartDelete,
    handleModal_userEdit,
    handleModal_userDelete

} from '../../scripts/modal.js';

import { toast, bg_blue, bg_green, bg_red, txt_black, txt_white } from '../../scripts/toast.js';

function authentication() {
    const verifyToken = localStorage.getItem('@KE-userLoginToken');
    const verifyIsAdm = localStorage.getItem('@KE-userLoginVerification');

    if (verifyToken && verifyIsAdm === 'false') {
        location.replace('../userPage/userPage.html');
    } else if (verifyToken && verifyIsAdm === 'true') {
        return 'Página autenticada';
    } else {
        location.replace('../../../index.html');
    }
}

function handleAdminLogout() {
    const buttonLogout = document.querySelector('.button__logout');

    buttonLogout.addEventListener('click', async () => {
        localStorage.clear();
        location.replace('../../../index.html');
    });
};

async function handleSelectAllCompanies() {
    const renderSelect = renderSelectAllCompanies();
    let allDepartsList = [];

    const ulTag = document.querySelector('.departments__list');
    const departListTag = document.querySelector('.departments__list');
    const departEmptyTag = document.querySelector('.departments__list--empty');
    const infoDepart = document.querySelector('.departments__list--empty > h2');
    const selectCompany = document.querySelector('#select-admin__company');
    const allDeparts = await allDepartmentsRequest();

    selectCompany.addEventListener('change', (event) => {
        event.preventDefault();
        ulTag.innerHTML = '';
        allDepartsList = [];

        allDeparts.forEach(async (department) => {
            const searchCompany = await companyIdRequest(department.company_id);
            const departmentName = department.name;
            const departmentDescription = department.description;
            const companyName = searchCompany.name;

            let selected = selectCompany.value;

            if (selected === companyName) {

                allDepartsList.push(department);
                localStorage.setItem('@KE-allDepartsList', JSON.stringify(allDepartsList));

                departListTag.style.display = 'flex';
                departEmptyTag.style.display = 'none';

                const li = createDepartAdminList(departmentName, departmentDescription, companyName);
                ulTag.appendChild(li);

                setTimeout(() => {
                    handleModal_DepartView();
                    handleModal_DepartEdit();
                    handleModal_DepartDelete();
                    handleDescriptionUpdate();
                }, 250);
            }
            else if (selected === 'emptySelect') {
                departListTag.style.display = 'none';
                departEmptyTag.style.display = 'flex';
                infoDepart.innerText = 'Selecione uma EMPRESA para visualizar o departamento';
            }
            else if (ulTag.innerHTML == "") {
                departListTag.style.display = 'none';
                departEmptyTag.style.display = 'flex';
                infoDepart.innerText = `Empresa ${selected} não possui departamentos`;
            };
        });
    });
};

function handleRenewDepartment() {
    const message = document.querySelector('#departCreate__message');
    const inputs = document.querySelectorAll('#formDepartCreate > input');
    const select = document.querySelector('#selectDepartCreate');

    const button = document.querySelector('.button__create-depart');
    const closeModal = document.querySelector('.departCreate__modal-controller--open');
    let count = 0;
    let departObj = {};

    select.addEventListener('change', (event) => {
        event.preventDefault();
        let selectValue = select.value;
        let selectName = "company_id";

        departObj[selectName] = selectValue;
    });

    button.addEventListener('click', async (event) => {
        event.preventDefault();
        inputs.forEach(({ name, value }) => {
            if (value.trim() === '') {
                count++
            }
            departObj[name] = value;
        });

        if (count !== 0) {
            count = 0;
            closeModal.close();

            return toast(bg_red, txt_white, 'Por favor, preencha todos os campos necessários');
        } else {
            const token = await newDepartmentRequest(departObj);

            message.style.display = 'flex';

            setTimeout(() => {
                closeModal.close();
                location.reload();
            }, 2000);
            return token;
        };
    });

    handleModal_DepartView();
    handleModal_DepartEdit();
    handleModal_DepartDelete();
};

async function handleDescriptionUpdate() {
    const closeModal = document.querySelector('.departEdit__modal-controller--open');
    const message = document.querySelector('#departEdit__message');
    const textarea = document.querySelector('#description__area');
    const button = document.querySelector('.button__edit-depart');
    const buttonIcon = document.querySelectorAll('.edit__icon');
    const arrayDepart = JSON.parse(localStorage.getItem('@KE-allDepartsList'));
    const findDepart = await allDepartmentsRequest();
    let companyId = '';
    let departObj = {};


    buttonIcon.forEach((icon) => {
        icon.addEventListener('click', (event) => {
            arrayDepart.forEach(({ id, name }) => {
                if (name === event.target.dataset.id) {
                    findDepart.forEach((depart) => {

                        if (depart.id == id) {
                            companyId = depart.id;

                            button.addEventListener('click', async () => {
                                if (textarea.value == "") {
                                    closeModal.close();
                                    return toast(bg_red, txt_white, 'Por favor, preencha todos os campos necessários');
                                }

                                departObj["description"] = textarea.value;

                                const update = await updateDepartmentRequest(departObj, companyId);

                                message.style.display = 'flex';

                                setTimeout(() => {
                                    closeModal.close();
                                    location.reload();
                                }, 2000);

                                return update;
                            });
                        };
                    });
                };
            });
        });
    });
};




authentication();

handleSelectAllCompanies();
renderDepartAdminList();

handleRenewDepartment();
handleAdminLogout();


renderModalSelectAllCompanies();
handleModal_DepartCreate();


