function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

Book.prototype.toggleRead = function()
{
    this.read = !this.read;
}

let library = [];

library.push(new Book("The Hobbit", "J.R.R. Tolkien", 1000, false));

let table = document.createElement("table");
table.setAttribute("border", "1");

let nBooks = 0;

function renderLibrary()
{
    let body = document.querySelector("body");
    let header = document.createElement("tr");

    let titleHeader = document.createElement("th");
    titleHeader.textContent = "Title";
    table.appendChild(titleHeader);

    let authorHeader = document.createElement("th");
    authorHeader.textContent = "Author";
    table.appendChild(authorHeader);

    let pagesHeader = document.createElement("th");
    pagesHeader.textContent = "Pages";
    table.appendChild(pagesHeader);

    let readHeader = document.createElement("th");
    readHeader.textContent = "Read?";
    table.appendChild(readHeader);
    
    body.insertBefore(table, body.childNodes[0]);

    //library.forEach((book, index) => addBookToLibrary(book));
}

renderLibrary();

function addBookToLibrary(book)
{
    library.push(book);

    let tableRow = document.createElement("tr");

    let titleEntry = document.createElement("td");
    titleEntry.textContent = book.title;
    tableRow.appendChild(titleEntry);

    let authorEntry = document.createElement("td");
    authorEntry.textContent = book.author;
    tableRow.appendChild(authorEntry);

    let pagesEntry = document.createElement("td");
    pagesEntry.textContent = book.pages;
    tableRow.appendChild(pagesEntry);

    let readEntry = document.createElement("td");
    let readButton = document.createElement("button");
    readButton.textContent = book.read ? "Yes" : "No";
    readEntry.appendChild(readButton);
    tableRow.appendChild(readEntry);

    readButton.addEventListener("click", function()
    {
        console.log("cliked");
        let index = +(this.parentNode.getAttribute("index"));
        library[index].toggleRead();
        this.textContent = library[index].read ? "Yes" : "No";
    });

    let removeButton = document.createElement("button");
    removeButton.textContent = "X";
    tableRow.appendChild(removeButton);

    tableRow.setAttribute("index", library.length - 1);

    table.appendChild(tableRow);

    removeButton.addEventListener("click", function()
    {
        let index = +(this.parentNode.getAttribute("index"));
        library.splice(index, 1);
        table.removeChild(this.parentNode);
    })

    
}

function removeBook(index, row)
{
    library.splice(index, 1);
    table.removeChild(row);
}

let addButton = document.querySelector("button[id='add']");

let form = document.querySelector("form");
let titleInput = document.querySelector("input[name='title']");
let authorInput = document.querySelector("input[name='author']");
let pagesInput = document.querySelector("input[name='pages']");
let readInput = document.querySelector("input[name='read']");

function emptyFields()
{
    return titleInput.value.length == 0 || authorInput.value.length == 0
        || pagesInput.value.length == 0;
}

function clearFields()
{
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
}

form.onsubmit = function(event)
{
    if(emptyFields())
    {
        alert("Please fill out all of the fields");
    }
    else
    {
        let book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked ? true : false);
        addBookToLibrary(book, table);
        clearFields();
        addButton.classList.remove("hide");
        form.classList.add("hide");
    }
    return false;
};

function showForm()
{
    addButton.classList.add("hide");
    form.classList.remove("hide");
}

addButton.addEventListener("click", showForm);

