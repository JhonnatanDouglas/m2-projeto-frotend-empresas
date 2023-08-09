import { toast, bg_blue, bg_green, bg_red, txt_black, txt_white } from './toast.js';

const token = JSON.parse(localStorage.getItem('@KE-userLoginToken')) || "";
const baseUrl = 'http://localhost:3333';
const headersRequest = {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${token}`
};

/* LOGIN - Rota responsável por logar um usuário ao sistema */

export async function loginRequest(loginBody) {
    const loginUserRequest = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: headersRequest,
        body: JSON.stringify(loginBody)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Email/Senha incorreta \nTente Novamente');
            }
            return res.json();
        })
        .then(responseJson => {
            const { isAdm, authToken } = responseJson;

            localStorage.setItem('@KE-userLoginVerification', JSON.stringify(isAdm));
            localStorage.setItem('@KE-userLoginToken', JSON.stringify(authToken));

            toast(bg_blue, txt_white, 'Login realizado com sucesso');

            setTimeout(() => {
                const userVerification = JSON.parse(localStorage.getItem('@KE-userLoginVerification'));

                if (userVerification) {
                    location.replace('./adminPage/adminPage.html');
                } else {
                    location.replace('./userPage/userPage.html');
                }
            }, 2501);
        })
        .catch(error => {
            toast(bg_red, txt_white, error);
            console.error(error);
        })

    return loginUserRequest;
};

/* REGISTRO - Rota responsável pela criação de um funcionário */

export async function registerRequest(registerBody) {
    const registerUserRequest = await fetch(`${baseUrl}/employees/create`, {
        method: 'POST',
        headers: headersRequest,
        body: JSON.stringify(registerBody)
    })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error('Ocorreu algum problema com o cadastro \nPor favor, tente novamente');
            }
            const responseJson = await res.json();
            toast(bg_blue, txt_white, 'Cadastro Realizado! \nFaça o Login em seguida');

            setTimeout(() => {
                location.replace('./loginPage.html');
            }, 2499);
        })
        .catch(error => {
            toast(bg_red, txt_white, error);
            console.error(error);
        })
    return registerUserRequest;
};


/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */


/* Rota responsável por listar todos os setores cadastrados no sistema */

export async function allCategoriesRequest() {
    const categoriesRequest = await fetch(`${baseUrl}/categories/readAll`, {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não pôde puxar todas as categorias')
            }
            return res.json();
        })
        .then(response => {
            localStorage.setItem('@KE-allCategoriesList', JSON.stringify(response));
            return response;
        })
        .catch(error => {
            toast(bg_red, txt_white, error);
            console.error(error);
        })
    return categoriesRequest;
};

/* Rota para listar todas as empresas cadastradas */

export async function allCompaniesRequest() {
    const categoriesRequest = await fetch(`${baseUrl}/companies/readAll`, {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não pôde puxar todas as empresas')
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            toast(bg_red, txt_white, error);
            console.error(error);
        })
    return categoriesRequest;
};

/* Rota responsável por listar todas as empresas do setor informado pela URL */

export async function readCategoryRequest(category_name) {
    const categoryRequest = await fetch(`${baseUrl}/companies/readByCategory/${category_name}`, {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível puxar todas as empresas atraves categoria desejada');
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            toast(bg_red, txt_white, error);
            console.error(error);
        })
    return categoryRequest;
};


/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */


/* OBRIGATORIO userTOKEN - Rota responsável para listar as informações do usuário logado */

export async function employeeProfileRequest() {
    const profileRequest = await fetch(`${baseUrl}/employees/profile`, {
        method: 'GET',
        headers: headersRequest,
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível trazer as informações do funcionário logado');
            }
            return res.json();
        })
        .then(response => {
            localStorage.setItem('@KE-userCompanyId', (response.company_id || "emptyId"));
            localStorage.setItem('@KE-userDepartmentId', (response.department_id || "emptyId"));
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return profileRequest;
};

/* OBRIGATORIO userTOKEN - Rota responsável por listar um departamento a partir do id informado */

export async function employeesListRequest(department_id) {
    const profileRequest = await fetch(`${baseUrl}/departments/readById/${department_id}`, {
        method: 'GET',
        headers: headersRequest,
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível trazer o departamento solicitado pelo id');
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return profileRequest;
};


/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */


/* Rota responsável por listar todos os funcionários cadastrados */

export async function allEmployeesListRequest() {
    const profileRequest = await fetch(`${baseUrl}/employees/readAll`, {
        method: 'GET',
        headers: headersRequest,
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível trazer a lista de funcionários cadastrados');
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return profileRequest;
};


/* Rota responsável por listar todos os funcionários que ainda não foram contratados para nenhum departamento */

export async function allEmployeesNotHiredRequest() {
    const profileRequest = await fetch(`${baseUrl}/employees/outOfWork`, {
        method: 'GET',
        headers: headersRequest,
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível trazer a lista de funcionários não contratados para nenhum departamento');
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return profileRequest;
};


/* OBRIGATORIO adminTOKEN -  Rota responsável por listar uma empresa a partir do id informado */

export async function companyIdRequest(company_id) {
    const profileRequest = await fetch(`${baseUrl}/companies/readById/${company_id}`, {
        method: 'GET',
        headers: headersRequest,
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível trazer a empresa solicitada pelo id');
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return profileRequest;
};


/* OBRIGATORIO adminTOKEN - Rota responsável por listar todos os departamentos cadastrados */

export async function allDepartmentsRequest() {
    const categoriesRequest = await fetch(`${baseUrl}/departments/readAll`, {
        method: 'GET',
        headers: headersRequest
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não pôde puxar todos os departamentos')
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return categoriesRequest;
};


/* OBRIGATORIO userTOKEN - Rota responsável por listar todos os departamentos de uma empresa, o ID da empresa deve ser informado na URL da requisição*/

export async function idDepartmentRequest(company_id) {
    const categoriesRequest = await fetch(`${baseUrl}/departments/readByCompany/${company_id}`, {
        method: 'GET',
        headers: headersRequest
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não pôde puxar a categoria selecionada');
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            toast(bg_red, txt_white, error);
            console.error(error);
        })
    return categoriesRequest;
};


/* OBRIGATORIO userTOKEN - Rota responsável por cadastrar um novo departamento */

/* body_department tem que haver o seguinte:

    {
    "name": "Tecnologia da Informação",
    "description": "Departamento responsável pela parte de TI",
    "company_id": "86bffcd8-ff51-4b42-8dd2-e60639a3dc13"
    }

*/

export async function newDepartmentRequest(body_department) {
    const newDepartment = await fetch(`${baseUrl}/departments/create`, {
        method: "POST",
        headers: headersRequest,
        body: JSON.stringify(body_department)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível cadastrar o novo departamento')
            }
            return res.json();
        })
        .then(response => {
            toast(bg_green, txt_white, 'Cadastrado com sucesso');
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return newDepartment;
}


/* OBRIGATORIO userTOKEN - Rota responsável por atualizar as informações de um funcionário */

/* body_employee tem que haver o seguinte:

    {
    "name": "Rafael Jagochitz Bertoldo update",
    "email": "bertoldo@mail.com.update"
    }

*/

async function updateEmployeeRequest(body_employee, employee_id) {
    const updateEmployee = await fetch(`${baseUrl}/employees/updateEmployee/${employee_id}`, {
        method: "PATCH",
        headers: headersRequest,
        body: JSON.stringify(body_employee)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível atualizar o cadastro do funcionário')
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return updateEmployee;
}


/* OBRIGATORIO userTOKEN - Rota responsável por contratar um funcionário para um departamento */

/* body_employee tem que haver o seguinte:

    {
    "department_id": "6c9bee88-0265-42fe-97f5-086c37b71a54"
    }

*/

async function hireEmployeeRequest(body_employee, employee_id) {
    const hireEmployee = await fetch(`${baseUrl}/employees/hireEmployee/${employee_id}`, {
        method: "PATCH",
        headers: headersRequest,
        body: JSON.stringify(body_employee)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível contratar o funcionário')
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return hireEmployee;
}


/* OBRIGATORIO userTOKEN - Rota responsável por demitir um funcionário para um departamento */

async function dismissEmployeeRequest(employee_id) {
    const hireEmployee = await fetch(`${baseUrl}/employees/dismissEmployee/${employee_id}`, {
        method: "PATCH",
        headers: headersRequest,
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível demitir o funcionário')
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return hireEmployee;
}


/* OBRIGATORIO userTOKEN - Rota responsável por atualizar a descrição de um departamento */

/* body_department tem que haver o seguinte:

    {
    "description": "teste update3",
    }

*/

export async function updateDepartmentRequest(body_department, department_id) {
    const updateDepartment = await fetch(`${baseUrl}/departments/update/${department_id}`, {
        method: "PATCH",
        headers: headersRequest,
        body: JSON.stringify(body_department)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível atualizar o departamento')
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return updateDepartment;
}


/* OBRIGATORIO userTOKEN - Rota responsável por deletar um usuário */

async function deleteEmployeeRequest(employee_id) {
    const deleteEmployee = await fetch(`${baseUrl}/employees/deleteEmployee/${employee_id}`, {
        method: "DELETE",
        headers: headersRequest,
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível deletar o usuario')
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return deleteEmployee;
}


/* OBRIGATORIO userTOKEN - Rota responsável por deletar um departamento */

async function deleteDepartmentRequest(department_id) {
    const deleteDepartment = await fetch(`${baseUrl}/departments/delete/${department_id}`, {
        method: "DELETE",
        headers: headersRequest,
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Não foi possível deletar o departamento')
            }
            return res.json();
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        })
    return deleteDepartment;
}
