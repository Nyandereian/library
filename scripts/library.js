let grid = document.querySelector('.grid');
let form = document.querySelector('.add-book-form');
let temp = document.querySelector('#row-template').content;

let library = [{id: 0, title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling', pages: 309, read: "true"}];
let bookCount = 1; // Includes deleted books to act as an ID

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  f = e.target;
  if(!validate(form)) return validationError(form);
  addBook(f.title.value, f.author.value, f.pages.value, f.read.value);
  resetForm();
  renderLast();
});

function validate(form) {
  let invalid = Array.from(form.elements).some((input) => input.value == "");
  let checked = Array.from(form.read).some((radio) => radio.checked == true);
  return (invalid || !checked)? false : true;
}

function validationError(form) {
  document.querySelector('.validation-error').style.display = 'block';
  return false;
}

function resetForm() {
  form.reset();
  document.querySelector('.validation-error').style.display = 'none';
}

function addBook(title, author, pages, read) {
  library.push(new Book(bookCount, title, author, pages, read));
  bookCount++;
}

function render(newRow, book) {
  newRow.querySelector('.grid-row').setAttribute('data-id', book.id);
  newRow.querySelector('.book-title p').textContent = book.title;
  newRow.querySelector('.author p').textContent = book.author;
  newRow.querySelector('.pages p').textContent = book.pages;
  if(book.read == "true") newRow.querySelector('.check').classList.add('checked');
  newRow.querySelector('.check').addEventListener('click', (e) => toggleRead(e.target));
  newRow.querySelector('.delete button').addEventListener('click', (e) => deleteRow(e.target));
  grid.appendChild(newRow);
}

function renderAll() {
  library.forEach((book) => render(temp.cloneNode(true), book));
}

renderAll();

function renderLast() {
  render(temp.cloneNode(true), library[library.length - 1]);
}

function toggleRead(target) {
  target.classList.toggle('checked');
  let id = target.parentNode.parentNode.dataset.id;
  let book = library.filter(b => b.id == id);
  book[0].read = (book[0].read == "true") ? "false" : "true";
}

function deleteRow(target) {
  let id = target.parentNode.parentNode.parentNode.dataset.id;
  library = library.filter((book) => book.id != id);
  target.parentNode.parentNode.parentNode.remove();
}
