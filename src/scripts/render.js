import { readCategoryRequest, allCompaniesRequest } from './requests.js';
import { handleButtonSector } from '../pages/scripts/index.js';

function createSelectCompany(id, nameCompany) {
    const select = document.querySelector('#select__company');

    const optionTag = document.createElement('option');

    optionTag.value = id;
    optionTag.name = nameCompany;
    optionTag.innerText = nameCompany;

    select.appendChild(optionTag);
}

export function renderSelectCompany() {
    const select = document.querySelector('#select__company');
    const optionSelected = document.createElement('option');

    select.innerHTML = '';

    optionSelected.setAttribute('selected', true);
    optionSelected.value = "";
    optionSelected.name = "Select Padrão";
    optionSelected.innerText = 'Selecionar Setor';

    select.appendChild(optionSelected);

    const allCategoriesList = JSON.parse(localStorage.getItem('@KE-allCategoriesList'));

    allCategoriesList.forEach(({ id, name }) => {
        createSelectCompany(id, name);
    });
};

function createCompaniesList(nameCompany, sectorCompany) {
    const liTag = document.createElement('li');
    const h3TittleTag = document.createElement('h3');
    const buttonSectionTag = document.createElement('button');

    h3TittleTag.innerText = nameCompany;

    buttonSectionTag.classList.add('button__chip');
    buttonSectionTag.innerText = sectorCompany;

    liTag.append(h3TittleTag, buttonSectionTag);
    return liTag;
}

export async function renderAllCompaniesList() {
    const ulCompanyList = document.querySelector('.company__list');
    const allCategoriesList = JSON.parse(localStorage.getItem('@KE-allCategoriesList'));
    const readAllSectors = await allCompaniesRequest();

    ulCompanyList.innerHTML = '';

    allCategoriesList.forEach((category) => {
        readAllSectors.forEach((sector) => {
            if (category.id === sector.category_id) {
                ulCompanyList.appendChild(createCompaniesList(sector.name, category.name));
            };
        });
    });
    handleButtonSector();
};

export async function renderCompaniesList(sector) {
    const ulCompanyList = document.querySelector('.company__list');
    const readSectors = await readCategoryRequest(sector);
    ulCompanyList.innerHTML = '';

    readSectors.forEach(({ name }) => {
        ulCompanyList.appendChild(createCompaniesList(name, sector));
    });
    handleButtonSector();
};