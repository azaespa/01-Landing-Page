const modal = document.querySelector("dialog");
const content = document.querySelector(".content");
const addNewBook = document.querySelector("#add-new-book");
const formAddBook = document.querySelector("#form-add-book");
const sidebarBookCover = document.querySelector(".sidebar-book-cover");
const sidebarBookTitle = document.querySelector(".sidebar-book-title");
const sidebarBookAuthor = document.querySelector(".sidebar-book-author");
const sidebarBookPages = document.querySelector(".sidebar-book-pages > span");
const bookReadStatus = document.querySelector("#read-status > input[type='checkbox']");        
const deleteBook = document.querySelector("#delete-book");

const cardEntries = document.querySelectorAll(".card.entry");
const readBookCovers = document.querySelectorAll(".card.read > .cover");

const faReadIcon = '<i class="fa-solid fa-circle-check fa-4x read-icon" style="color: #497fef;"></i>';

let books = localStorage.key("Library") == null ? [] : JSON.parse(localStorage.getItem("Library"));

function Book(title, author, pages, read) {
    this.id = new Date().getTime();
    this.imgSrc = "src/js-for-dummies.jpg";
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.createCard = function() {
    const readStatus = this.read;
    const bookPages = this.pages;

    const card = document.createElement("div");
    card.classList.add("card", "entry");
    card.id = this.id;
    this.read && card.classList.add("read");

    const cover = document.createElement("div");
    const image = document.createElement("img");
    cover.classList.add("cover");
    image.src = this.imgSrc;
    image.alt = this.title;

    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    bookTitle.title = this.title;
    bookTitle.innerText = this.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-author");
    bookAuthor.innerText = this.author;

    cover.append(image);
    card.classList.contains("read") && (cover.innerHTML += faReadIcon);
    card.append(cover);
    card.append(bookTitle);
    card.append(bookAuthor);
    content.append(card);

    card.addEventListener("click", function() {
        const cardSelected = document.querySelector(".card.selected")
        cardSelected != null && cardSelected.classList.remove("selected");
        card.classList.toggle("selected");             
    })
    
    card.addEventListener("click", function() {
        sidebarBookCover.src = image.src;
        sidebarBookTitle.innerText = bookTitle.innerText;
        sidebarBookAuthor.innerText = bookAuthor.innerText;
        sidebarBookPages.innerText = bookPages;
        bookReadStatus.checked = readStatus;
    })
}

addNewBook.addEventListener("click", function() { 
    modal.showModal(); 

    //RESET INPUT FIELDS
    const formInputTexts = document.querySelectorAll("#form-add-book > input:not(input[type='checkbox'])");
    const formInputCheckbox = document.querySelector("#form-book-status")

    formInputCheckbox.checked = false;
    for (input of formInputTexts) {
        input.value = "";
    }
});

formAddBook.addEventListener("submit", function(event) {
    event.preventDefault();
    const bookTitle = event.currentTarget.formBookTitle.value;
    const bookAuthor = event.currentTarget.formBookAuthor.value;
    const bookPages = event.currentTarget.formBookPages.value;
    const bookReadStatus = event.currentTarget.formBookStatus.checked;
    
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookReadStatus);
    
    books.push(newBook);

    localStorage.setItem("Library", JSON.stringify(books));
    
    newBook.createCard();
    
    modal.close();
})

for (const book of books) {
    const existingBook = new Book(book.title, book.author, book.pages, book.read);
    existingBook.id = book.id;
    existingBook.createCard();
}

if (books.length > 0) {
    document.getElementById(`${books[0].id}`).classList.add("selected");
    sidebarBookCover.src = books[0].imgSrc;
    sidebarBookTitle.innerText = books[0].title;
    sidebarBookAuthor.innerText = books[0].author;
    sidebarBookPages.innerText = books[0].pages;
    bookReadStatus.checked = books[0].read;    
}

bookReadStatus.addEventListener("click", function() {
    const cardSelected = document.querySelector(".card.selected");
    const cover = cardSelected.querySelector(".cover");
    const icon = cover.querySelector("i");

    for (const book of books) {
        if (book.id == cardSelected.id) {
            bookReadStatus.checked ? cardSelected.classList.add("read") : cardSelected.classList.remove("read");
            cardSelected.classList.contains("read") ? (cover.innerHTML += faReadIcon) : (cover.removeChild(icon));
            books[books.indexOf(book)].read = bookReadStatus.checked;
            localStorage.setItem("Library", JSON.stringify(books));    
        }      
    }
})

deleteBook.addEventListener("click", function() {
    const cardSelected = document.querySelector(".card.selected");

    for (const book of books) {
        if (book.id == cardSelected.id) {
            books.splice(books.indexOf(book), 1);
            localStorage.setItem("Library", JSON.stringify(books));    
            content.removeChild(cardSelected);

            sidebarBookCover.src = "";
            sidebarBookTitle.innerText = "";
            sidebarBookAuthor.innerText = "";
            sidebarBookPages.innerText = "0";
            bookReadStatus.checked = false;
        }
    }
    
})