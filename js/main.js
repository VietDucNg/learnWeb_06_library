import { 
    checkBookName,
    checkAuthor,
    applyCheckEmpty,
    clearAllValidation,
    reset
 } from "./form.js";

const form = document.querySelector('form');
const nameInput = document.querySelector('#bookName');
const authorInput = document.querySelector('#author');
const statusInput = document.querySelector('#status');
const tableBody = document.querySelector('table tbody');
const delAllBtn = document.querySelector('.delAll-btn');

let library = [];

const STORAGE_KEY = 'library';

function saveLibrary() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}

function loadLibrary() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return false;

    library = JSON.parse(data).map( b => {
        const book = new Book(b.name, b.author, b.status);
        book.id = b.id;
        return book
    });

    return true;
}

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
    if (!isDuplicate(name,author)) {
        library.push(newBook);
        saveLibrary();
    }
}

function createDefaultBooks() {
    addBookToLibrary('Kinh Van Hoa', 'Nguyen Nhat Anh', 'true');
    addBookToLibrary('How to Win Friends and Influence People', 'Dale Carnegie', 'false');
    addBookToLibrary('Dreamy Eye', 'Nguyen Nhat Anh', 'true')
}

function createTableData(book,tr,cellType) {
    const td = document.createElement('td');
    if (cellType === 'status') {
        const statusBtn = document.createElement('button');
        statusBtn.classList.add('status-btn');
        statusBtn.textContent = (book.status)? 'Read' : 'Unread';
        statusBtn.classList.add((book.status)? 'read' : 'unread');
        td.appendChild(statusBtn);
    } else if (cellType === 'delBtn') {
        const delBtn = document.createElement('button');
        delBtn.classList.add('del-btn');
        delBtn.textContent = 'REMOVE';
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
        tr.dataset.id = book.id;
        tableBody.appendChild(tr);
        createTableData(book,tr,'name');
        createTableData(book,tr,'author');
        createTableData(book,tr,'status');
        createTableData(book,tr,'delBtn');
    }
}

function disableDelAllBtn() {
    delAllBtn.disabled = library.length === 0;
}

function delBook(book,tr) {
    library = library.filter(b => b.id !== book.id);
    tr.remove();
    disableDelAllBtn();
    saveLibrary();
}

function delAllBook() {
    library = [];
    localStorage.removeItem(STORAGE_KEY);
    displayBooks();
}

function changeStatus(book,statusBtn) {
    book.toggleStatus();
    statusBtn.textContent = (book.status === true)? 'Read' : 'Unread';
    statusBtn.classList.remove('read','unread');
    statusBtn.classList.add((book.status) ? 'read' : 'unread')
    saveLibrary();
}

function handelTableClick(e){
    const button = e.target.closest('button');
    if (!button) return;

    const row = button.closest('tr');
    const bookID = row.dataset.id;
    const book = library.find(b => b.id === bookID);

    if (button.classList.contains('status-btn')) changeStatus(book, button);
    if (button.classList.contains('del-btn')) delBook(book, row);
}

tableBody.addEventListener('click', handelTableClick);

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

window.addEventListener('load', () => {
    const loaded = loadLibrary();

    if (!loaded) {
        createDefaultBooks();
        saveLibrary();
    }

    displayBooks();
});

export {delAllBook, disableDelAllBtn};