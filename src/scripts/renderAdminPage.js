import { allCompaniesRequest, allDepartmentsRequest, companyIdRequest } from './requests.js';

function createSelectAllCompanies(idDepart, nameDepart, idCategory) {
    const select = document.querySelector('#select-admin__company');

    const optionCompanyTag = document.createElement('option');
    optionCompanyTag.id = idDepart;
    optionCompanyTag.value = nameDepart;
    optionCompanyTag.innerText = nameDepart;
    optionCompanyTag.dataset.idCategory = idCategory;

    select.appendChild(optionCompanyTag);
}

export async function renderSelectAllCompanies() {
    const allCompanies = await allCompaniesRequest();
    const select = document.querySelector('#select-admin__company');
    const optionCompanyTag = document.createElement('option');

    select.innerHTML = '';
    optionCompanyTag.setAttribute('selected', true);
    optionCompanyTag.id = "defaultSelect";
    optionCompanyTag.value = "emptySelect";
    optionCompanyTag.innerText = 'Selecionar Empresa';

    select.appendChild(optionCompanyTag);

    allCompanies.forEach(({ id, name, description, category_id }) => {
        createSelectAllCompanies(id, name, category_id);
    });
};

export function createDepartAdminList(nameDepartment, descriptionDepartment, nameCompany) {
    const liTag = document.createElement('li');

    const figure__viewDepart = document.createElement('figure');
    const figcaption__viewDepart = document.createElement('figcaption');
    const img__viewDepart = document.createElement('img');

    const figure__editDepart = document.createElement('figure');
    const figcaption__editDepart = document.createElement('figcaption');
    const img__editDepart = document.createElement('img');

    const figure__deleteDepart = document.createElement('figure');
    const figcaption__deleteDepart = document.createElement('figcaption');
    const img__deleteDepart = document.createElement('img');

    figcaption__viewDepart.classList.add('department__name');
    figcaption__viewDepart.innerText = nameDepartment;
    img__viewDepart.classList.add('view__icon');
    img__viewDepart.src = '../../assets/icons/view.svg';
    img__viewDepart.alt = 'icone de visualização do departamento';

    figcaption__editDepart.classList.add('department__description');
    figcaption__editDepart.innerText = descriptionDepartment;
    img__editDepart.classList.add('edit__icon');
    img__editDepart.src = '../../assets/icons/edit.svg';
    img__editDepart.alt = 'icone de edição do departamento';
    img__editDepart.dataset.id = nameDepartment.trim();


    figcaption__deleteDepart.classList.add('department__company');
    figcaption__deleteDepart.innerText = nameCompany;
    img__deleteDepart.classList.add('delete__icon');
    img__deleteDepart.src = '../../assets/icons/delete.svg';
    img__deleteDepart.alt = 'icone de deletar o departamento';

    figure__viewDepart.append(figcaption__viewDepart, img__viewDepart);
    figure__editDepart.append(figcaption__editDepart, img__editDepart);
    figure__deleteDepart.append(figcaption__deleteDepart, img__deleteDepart);
    liTag.append(figure__viewDepart, figure__editDepart, figure__deleteDepart);

    return liTag;
}

export async function renderDepartAdminList() {
    const ulTag = document.querySelector('.departments__list');
    const allDeparts = await allDepartmentsRequest()

    ulTag.innerHTML = '';

    allDeparts.forEach(async (department) => {
        const searchCompany = await companyIdRequest(department.company_id)
        const departmentName = department.name;
        const departmentDescription = department.description;
        const companyName = searchCompany.name;

        const liTag = createDepartAdminList(departmentName, departmentDescription, companyName);
        ulTag.appendChild(liTag);
    });
}

function modalCreateSelectAllCompanies(idDepart, nameDepart, idCategory) {
    const select = document.querySelector('#selectDepartCreate');

    const optionCompanyTag = document.createElement('option');

    optionCompanyTag.name = 'company_id';
    optionCompanyTag.value = idDepart;
    optionCompanyTag.innerText = nameDepart;
    optionCompanyTag.dataset.idCategory = idCategory;

    select.appendChild(optionCompanyTag);
}

export async function renderModalSelectAllCompanies() {
    const allCompanies = await allCompaniesRequest();
    const select = document.querySelector('#selectDepartCreate');
    const optionCompanyTag = document.createElement('option');

    select.innerHTML = '';
    optionCompanyTag.setAttribute('selected', true);
    optionCompanyTag.setAttribute('hidden', true);
    optionCompanyTag.id = "defaultSelect";
    optionCompanyTag.value = "emptySelect";
    optionCompanyTag.innerText = 'Selecionar empresa';

    select.appendChild(optionCompanyTag);

    allCompanies.forEach(({ id, name, description, category_id }) => {
        modalCreateSelectAllCompanies(id, name, category_id);
    });
};