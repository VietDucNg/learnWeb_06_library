const tableBody = document.querySelector('table tbody');

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
    addBookToLibrary('Kinh Van Hoa', 'Nguyen Nhat Anh', true);
    addBookToLibrary('How to Win Friends and Influence People', 'Dale Carnegie', false);
    addBookToLibrary('Dreamy Eye', 'Nguyen Nhat Anh', true)
}

function createTableData(book,tr,cellType) {
    const td = document.createElement('td');
    if (cellType === 'status') {
        const statusBtn = document.createElement('button');
        const status = (book.status === true)? 'Read' : 'Unread';
        statusBtn.textContent = status;
        tr.appendChild(statusBtn);
    } else {
        td.textContent = book[cellType];
        tr.appendChild(td);
    }
}

function displayBooks() {
    for (const book of library) {
        const tr = document.createElement('tr');
        tableBody.appendChild(tr);
        createTableData(book,tr,'name');
        createTableData(book,tr,'author');
        createTableData(book,tr,'status')
    }
}

window.addEventListener('load', ()=> {
    createDefaultBooks();
    console.log(library);
    displayBooks();
    
})