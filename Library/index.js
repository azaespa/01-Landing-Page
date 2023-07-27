const addNewBook = document.getElementById("add-new-book");
const modal = document.querySelector("dialog");
const cardEntries = document.querySelectorAll(".card.entry");

addNewBook.addEventListener("click", function() { modal.showModal() });

for (let entry of cardEntries) {
    entry.addEventListener("click", function() { 
        document.querySelector(".selected").classList.remove("selected");
        entry.classList.toggle("selected"); 
    });
}

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