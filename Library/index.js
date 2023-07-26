const addNewBook = document.getElementById("add-new-book");
const modal = document.querySelector("dialog");

addNewBook.addEventListener("click", function () { modal.showModal() });

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

const theHobbit = new Book('The Hobbit', 'Bitoy', '11', 'not read yet');

console.log(theHobbit.info());