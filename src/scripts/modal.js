export function handleModal_DepartCreate() {
    const modalController = document.querySelector('.departCreate__modal-controller--open');
    const buttons = document.querySelectorAll('.create__depart');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (!modalController.hasAttribute('open')) {
                modalController.showModal();
            }
            handleCloseModal();
        });
    });
};

export function handleModal_DepartView() {
    const modalController = document.querySelector('.departView__modal-controller--open');
    const buttons = document.querySelectorAll('.view__icon');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (!modalController.hasAttribute('open')) {
                modalController.showModal();
            }
            handleCloseModal();
        });
    });
};

export function handleModal_DepartEdit() {
    const modalController = document.querySelector('.departEdit__modal-controller--open');
    const buttons = document.querySelectorAll('.edit__icon');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (!modalController.hasAttribute('open')) {
                modalController.showModal();
            }
            handleCloseModal();
        });
    });
};

export function handleModal_DepartDelete() {
    const modalController = document.querySelector('.departDelete__modal-controller--open');
    const buttons = document.querySelectorAll('.delete__icon');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (!modalController.hasAttribute('open')) {
                modalController.showModal();
            }
            handleCloseModal();
        });
    });
};

export function handleModal_userEdit() {
    const modalController = document.querySelector('.userEdit__modal-controller--open');
    const buttons = document.querySelectorAll('.user-edit__icon');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (!modalController.hasAttribute('open')) {
                modalController.showModal();
            }
            handleCloseModal();
        });
    });
};

export function handleModal_userDelete() {
    const modalController = document.querySelector('.userDelete__modal-controller--open');
    const buttons = document.querySelectorAll('.user-delete__icon');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (!modalController.hasAttribute('open')) {
                modalController.showModal();
            }
            handleCloseModal();
        });
    });
};

export function handleCloseModal() {
    const buttons = document.querySelectorAll('.button__modal--close');

    const modal_departView = document.querySelector('.departView__modal-controller--open');
    const modal_departCreate = document.querySelector('.departCreate__modal-controller--open');
    const modal_departEdit = document.querySelector('.departEdit__modal-controller--open');
    const modal_departDelete = document.querySelector('.departDelete__modal-controller--open');

    const modal_userEdit = document.querySelector('.userEdit__modal-controller--open');
    const modal_userDelete = document.querySelector('.userDelete__modal-controller--open');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            modal_departView.close();
            modal_departCreate.close();
            modal_departEdit.close();
            modal_departDelete.close();

            modal_userEdit.close();
            modal_userDelete.close();
        });
    });
};