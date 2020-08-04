'use strict';
function init() {
    createBooks();
    renderBooks();
}
function renderBooks() {
    console.table(gBooks);
    var elContainer = document.querySelector('.container.books');
    var elTable = '<table class="table table-striped">';
    var elTHead = '<tr><th>Id</th><th>Title</th><th>Price</th><th>Cover</th><th>Actions</th></tr>';
    var elRows = gBooks.reduce(function (acc, book) {
        var elImg = getBookImageHTML(book);
        var elButtons = `<button onclick="onRead('${book.id}')" type="button" class="btn btn-primary">Read</button>`;
        elButtons += `<button onclick="onUpdateBook('${book.id}')" type="button" class="btn btn-warning btn-update">Update</button>`;
        elButtons += `<button onclick="onRemoveBook('${book.id}')" type="button" class="btn btn-danger">Delete</button>`;
        elButtons += `<p class="action-message"></p>`;
        var elTdTitle = `<td class="book-title">${book.title}${showBookRating(book.id)}</td>`;
        return acc + `<tr class='book-data book-${book.id}'><td>${book.id}</td>${elTdTitle}<td class="book-price">${gCurrency}${book.price}</td><td>${elImg}</td><td class="book-actions">${elButtons}</td></tr>`;
    }, '');
    elContainer.innerHTML = elTable + elTHead + elRows + '</table>';
}

function showBookRating(bookId){
    var rating = getBookRating(bookId);
    var ratingDisplay = '';
    for (var i = 1; i <= rating; i++){
        ratingDisplay += '⭐';
    }
    return `<p class="book-rating-stars">${ratingDisplay}</p>`;
}
function getBookImageHTML(book){
    return `<img src="images/${book.image}" alt="${book.title} Cover Image" class='book-cover img-thumbnail'/>`;
}

function onRead(bookId) {
    var modal = document.querySelector('.modal');
    modal.style.display = 'block';
    var book = getBookById(bookId);
    modal.setAttribute('data-book-id', bookId);
    modal.querySelector('.modal-title h4').innerText = book.title;
    modal.querySelector('.modal-price').innerText = book.price;
    modal.querySelector('.modal-image').innerHTML = getBookImageHTML(book);
    modal.querySelector('#rate-book-field').value = book.rating ? book.rating : 1;
}

function onBookRate(step){
    var spinner = document.querySelector('#rate-book-field');
    var rating = +spinner.value + step;
    if (step < 0) rating = Math.max(rating, 1);
    if (step > 0 ) rating = Math.min (rating, 10);
    spinner.value = rating;
}

function onSaveModalChanges(){
    var modal = document.querySelector('.modal');
    var bookId = modal.dataset.bookId;
    saveBookRating(bookId, document.querySelector('#rate-book-field').value);
    closeModal();
    renderBooks();
}

function closeModal(){
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
}

function onUpdateBook(bookId) {
    var elTrUpdateBook = document.querySelector('tr.book-'+bookId);
    var elTd = elTrUpdateBook.querySelector('td.book-price');
    if (elTrUpdateBook.classList.contains('update-mode')){
        var priceInput = elTd.querySelector('input').value;
        if (isNaN(priceInput)) {
            toggleActionMessage(elTrUpdateBook, 'Please insert a valid price');
            return;
        }
        toggleActionMessage(elTrUpdateBook, '');
        updateBook(bookId, priceInput);
        elTd.innerHTML = `${gCurrency}${priceInput}`;
        elTrUpdateBook.classList.remove('update-mode');
    }
    else{
        var price = elTd.innerText;
        elTrUpdateBook.classList.add('update-mode');
        elTd.innerHTML = `<input type="text" class="form-control" id="update-book-price" value="${price.substr(1)}">`;
    }
}

function toggleActionMessage(bookRow, message){
    var elMessage = bookRow.querySelector('.action-message');
    elMessage.innerText = message;    
    if (message.length > 0){
        elMessage.classList.remove('hidden');
    }
    else{
        elMessage.classList.add('hidden');
    }
}

function onRemoveBook(bookId) {
    var book = getBookById(bookId);
    if (confirm(`Are you sure you wante to delete ${book.title}?`)) {
        removeBook(bookId);
        renderBooks();
    }
}

function onAddBookOpen() {
    var elAddContainer = document.querySelector('.add-book');
    elAddContainer.classList.remove('d-none');
    //var elPriceInput = elAddContainer.querySelector("#add-book-price");
    //elPriceInput.setAttribute('placeholder',  `Price in ${gCurrency}`);
}

function onAddBook(){
    // TBD: validation
    var title = document.querySelector("#add-book-title").value;
    var price = document.querySelector("#add-book-price").value
    addBook(title, price);
    renderBooks();
}

function closeAddBook() {
    document.querySelector("#add-book-title").value = '';
    document.querySelector("#add-book-price").value = '';
    document.querySelector('.add-book').classList.add('d-none');
}