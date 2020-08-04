'use strict';

var gBooks = [];
var gBooksMap = {};
var gCurrency = '£';
const KEY = 'books';
function createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [];
        books = gBooksData.map(function (book, ind) {
            return _createBook(book.title, book.price, ind+1);
        });
    }
    gBooks = books;
    createBookMap();
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function _createBook(title, price, id = gBooks.length) {
    var book = { title: title, price: price };
    book.id = zeroLead3(id);
    book.image = `${book.id}.jpg`;
    gBooks.push(book);
    return book;
}

function removeBook(bookId) {
    var bookInd = gBooksMap[bookId];
    gBooks.splice(bookInd, 1);
    createBookMap();
    _saveBooksToStorage();
}

function createBookMap() {
    gBooksMap = {};
    gBooks.map(function (book, ind) {
        gBooksMap[book.id] = ind;
    });
}

function getBookById(bookId) {
    return gBooks[gBooksMap[bookId]];
}

function addBook(title, price) {
    var book = _createBook(title, price);
    _saveBooksToStorage();
}

function updateBook(bookId, price){
    getBookById(bookId).price = price;
    _saveBooksToStorage();
}

function saveBookRating(bookId, rating){
    var book = getBookById(bookId);
    book.rating = rating;
    _saveBooksToStorage();
}

function getBookRating(bookId){
    var book = getBookById(bookId);
    return (book && book.rating) ? book.rating : 0;
}