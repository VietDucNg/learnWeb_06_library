const form = document.querySelector('form');
const nameInput = document.querySelector('#bookName');
const authorInput = document.querySelector('#author');
const errors = document.querySelectorAll('.error');
const inputDivs = document.querySelectorAll('.input-div');
const requiredInputs = document.querySelectorAll('input[required]');
const successMsg = document.querySelector('.success-msg');

const BOOK_NAME_REGEX = /^[\p{L}\p{N}][\p{L}\p{N} .,:;'"!?()\-–—]{1,149}$/u;
const AUTHOR_REGEX = /^[\p{L}][\p{L} '-]{1,29}$/u;

// deal with focus style for input-div
inputDivs.forEach(div => div.addEventListener('click',()=>{
    const input = div.querySelector('input');
    if (input) {
        input.focus();
        div.classList.add('focus');
    };
}))

document.addEventListener('click', (e)=>{
    inputDivs.forEach(div => {
        if (!div.contains(e.target)) div.classList.remove('focus');
    });
});

// form validation
function setInvalid(input, msg){
    input.parentElement.parentElement.querySelector('.error').textContent = msg;
    input.parentElement.classList.add('invalid');
}

function setValid(input){
    input.parentElement.classList.add('valid');
}

function clearValidation(input){
    const error = input.parentElement.parentElement.querySelector('.error');
    error.textContent = '';
    input.parentElement.classList.remove('invalid', 'valid');
}

function clearAllValidation(){
    errors.forEach(error => error.textContent = '');
    successMsg.textContent = '';
    inputDivs.forEach(div => div.classList.remove('invalid','valid'));
}

function checkBookName(bookName) {
    const string = bookName.value.trim();
    if (string && !BOOK_NAME_REGEX.test(string)) {
        setInvalid(bookName, 'Enter a valid book name')
        return false;
    } else if (string) {
        setValid(bookName);
        return true
    }
}

function checkAuthor(author) {
    const string = author.value.trim();
    if (string && !AUTHOR_REGEX.test(string)){
        setInvalid(author, 'Enter a valid author name');
        return false;
    } else if (string) {
        setValid(author);
        return true;
    }
}

function checkEmpty(input) {
    if (input.value.trim()==='') {
        setInvalid(input, '*This field is required')
        return false;
    } else return true;
}

function applyCheckEmpty(){
    requiredInputs.forEach(input => checkEmpty(input))
}

function reset() {
    clearAllValidation();
    successMsg.textContent = 'New book was added!';
    form.reset();
}

nameInput.addEventListener('input', ()=>{
    clearValidation(nameInput);
    successMsg.textContent = '';
    checkBookName(nameInput);
})

authorInput.addEventListener('input', ()=>{
    clearValidation(authorInput);
    successMsg.textContent = '';
    checkAuthor(authorInput);
})

export {
    checkBookName,
    checkAuthor,
    applyCheckEmpty,
    clearAllValidation,
    reset
};