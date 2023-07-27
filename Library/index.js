const modal = document.querySelector("dialog");
const content = document.querySelector(".content");
const addNewBook = document.querySelector("#add-new-book");
const formAddBook = document.querySelector("#form-add-book");

const cardEntries = document.querySelectorAll(".card.entry");
const readBookCovers = document.querySelectorAll(".card.read > .cover");

const faReadIcon = '<i class="fa-solid fa-circle-check fa-4x read-icon" style="color: #497fef;"></i>';

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.createCard = function() {
        const card = document.createElement("div");
        card.classList.add("card", "entry");
        this.read && card.classList.add("read");
        
        const cover = document.createElement("div");
        const image = document.createElement("img");
        cover.classList.add("cover");
        image.src = "src/js-for-dummies.jpg";
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
            document.querySelector(".selected").classList.remove("selected");
            card.classList.toggle("selected");             
        })
    }
}

addNewBook.addEventListener("click", function() { 
    modal.showModal(); 

    const formInputTexts = document.querySelectorAll("#form-add-book > input:not(input[type='checkbox'])");
    const formInputCheckbox = document.querySelector("#form-book-status")

    formInputCheckbox.checked = false;
    for (input of formInputTexts) {
        input.value = "";
    }
});

for (let entry of cardEntries) {
    entry.addEventListener("click", function() {
        document.querySelector(".selected").classList.remove("selected");
        entry.classList.toggle("selected"); 
    });
}

for (let cover of readBookCovers) {
    cover.innerHTML += faReadIcon;
}

const theHobbit = new Book('The Hobbit', 'Bitoy', '11', 'not read yet');

formAddBook.addEventListener("submit", function(event) {
    event.preventDefault();
    const bookTitle = event.currentTarget.formBookTitle.value;
    const bookAuthor = event.currentTarget.formBookAuthor.value;
    const bookPages = event.currentTarget.formBookPages.value;
    const bookStatus = event.currentTarget.formBookStatus.checked;
    
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    newBook.createCard();

    modal.close();
})