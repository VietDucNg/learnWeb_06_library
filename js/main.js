const form = document.querySelector('form');
const tableBody = document.querySelector('table tbody');
const submitBtn = document.querySelector('.submit-btn');
const nameInput = document.querySelector('#bookName');
const authorInput = document.querySelector('#author');
const statusInput = document.querySelector('#status');
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

// data
let library = [];
class Book {
    constructor(name, author, status) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.author = author;
        this.status = status;
    };
    toggleStatus(){
        this.status = !this.status;
    };
}

function isDuplicate(name,author) {
    const normalizedName = name.trim().toLowerCase();
    const normalizedAuthor = author.trim().toLowerCase();
    return library.some(book =>
        book.name.trim().toLowerCase() === normalizedName &&
        book.author.trim().toLowerCase() === normalizedAuthor
    );
}

function addBookToLibrary(name,author,status) {
    const isRead = status === 'true';
    const newBook = new Book(name,author,isRead);
    if (!isDuplicate(name,author)) library.push(newBook);
}

function createDefaultBooks() {
    addBookToLibrary('Kinh Van Hoa', 'Nguyen Nhat Anh', 'true');
    addBookToLibrary('How to Win Friends and Influence People', 'Dale Carnegie', 'false');
    addBookToLibrary('Dreamy Eye', 'Nguyen Nhat Anh', 'true')
}

function delBook(book,tr) {
    library = library.filter(eachBook => eachBook.id !== book.id);
    tr.remove();
}

function changeStatus(book,statusBtn) {
    book.toggleStatus();
    statusBtn.textContent = (book.status === true)? 'Read' : 'Unread';
}

function createTableData(book,tr,cellType) {
    const td = document.createElement('td');
    if (cellType === 'status') {
        const statusBtn = document.createElement('button');
        const status = (book.status)? 'Read' : 'Unread';
        statusBtn.textContent = status;
        statusBtn.addEventListener('click', ()=>changeStatus(book,statusBtn));
        td.appendChild(statusBtn);
    } else if (cellType === 'delBtn') {
        const delBtn = document.createElement('button');
        delBtn.textContent = 'REMOVE';
        delBtn.addEventListener('click', ()=>delBook(book, tr));
        td.appendChild(delBtn);
    } else {
        td.textContent = book[cellType];
    }
    tr.appendChild(td);
}

function displayBooks() {
    tableBody.replaceChildren();
    for (const book of library) {
        const tr = document.createElement('tr');
        tableBody.appendChild(tr);
        createTableData(book,tr,'name');
        createTableData(book,tr,'author');
        createTableData(book,tr,'status');
        createTableData(book,tr,'delBtn');
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    clearAllValidation();

    const isValid =
    checkBookName(nameInput) && 
    checkAuthor(authorInput)
    applyCheckEmpty();

    if (isValid) {
        addBookToLibrary(nameInput.value,authorInput.value,statusInput.value)
        reset();
    }
    displayBooks();
})

window.addEventListener('load', ()=> {
    createDefaultBooks();
    console.log(library);
    displayBooks();
})