const tableBody = document.querySelector('table tbody');
const submitBtn = document.querySelector('.submit-btn');
const nameInput = document.querySelector('#bookName');
const authorInput = document.querySelector('#author');
const statusInput = document.querySelector('#status');

let library = [];

function Book(name,author,status) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.status = status;
}

function addBookToLibrary(name,author,status) {
    const newBook = new Book(name,author,status);
    library.push(newBook);
}

function createDefaultBooks() {
    addBookToLibrary('Kinh Van Hoa', 'Nguyen Nhat Anh', 'true');
    addBookToLibrary('How to Win Friends and Influence People', 'Dale Carnegie', 'false');
    addBookToLibrary('Dreamy Eye', 'Nguyen Nhat Anh', 'true')
}

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    addBookToLibrary(nameInput.value,authorInput.value,statusInput.value)
    displayBooks();
})

function delBook(book,tr) {
    library = library.filter(eachBook => eachBook.id !== book.id);
    tr.remove();
}

function changeStatus(book,statusBtn) {
    if (book.status === 'true') {
        book.status = 'false';
        statusBtn.textContent = 'Unread';
    } else {
        book.status = 'true';
        statusBtn.textContent = 'Read';
    }
}

function createTableData(book,tr,cellType) {
    const td = document.createElement('td');
    if (cellType === 'status') {
        const statusBtn = document.createElement('button');
        const status = (book.status === 'true')? 'Read' : 'Unread';
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

window.addEventListener('load', ()=> {
    createDefaultBooks();
    console.log(library);
    displayBooks();
    
})