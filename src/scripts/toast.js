export const bg_blue = '#3532FF';
export const bg_green = '#36B37E';
export const bg_red = '#FF5630';
export const txt_black = '#212529';
export const txt_white = '#FFFFFF';

export function toast(bg_color, txt_color, text) {
    const toastContainer = document.querySelector('.toast__container');
    const toastParagraph = document.querySelector('.toast__container > p');

    toastParagraph.innerText = text;
    toastContainer.style = `background-color: ${bg_color}; border-color: ${bg_color}; color: ${txt_color}`;

    toastContainer.style.display = 'flex';

    setTimeout(() => {
        toastContainer.classList.add('toast__fadeOut');
    }, 1500);

    setTimeout(() => {
        toastContainer.classList.remove('toast__fadeOut');
        toastContainer.style.display = 'none';
    }, 2500);
};