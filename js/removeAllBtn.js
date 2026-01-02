import { delAllBook, disableDelAllBtn } from './main.js';

const delAllBtn = document.querySelector('.delAll-btn');
const delAllDialog = document.querySelector('.delAll-dialog');

delAllBtn.addEventListener('click', ()=> delAllDialog.showModal());

delAllDialog.addEventListener('close', ()=>{
    if (delAllDialog.returnValue === 'confirm') {
        delAllBook();
        disableDelAllBtn();
    };
});