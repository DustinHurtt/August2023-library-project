var express = require('express');
var router = express.Router();

const Book = require('../models/Book')

/* GET home page. */
router.get('/', (req, res, next) => {

    Book.find()
        .then((results) => {
            console.log("These are the books from the DB", results)
            res.render('books/books-list.hbs', { results })
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })

});

router.get('/book-details/:bookId', (req, res, next) => {

    let { bookId } = req.params

    Book.findById(bookId)
        .then((foundBook) => {
            console.log("These is the book from the DB", foundBook)
            res.render('books/book-details.hbs', foundBook )
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })

})

router.get('/create', (req, res, next) => {

    res.render('books/book-create.hbs')

})

router.post('/create', (req, res, next) => {

    let { title, description, author, rating } = req.body

    Book.create({
        title,
        description,
        author,
        rating,
    })
    .then((createdBook) => {
        console.log("this is the new book ===>", createdBook)
        res.redirect(`/books/book-details/${createdBook._id}`)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })


})

router.get('/edit/:bookId', (req, res, next) => {

    let { bookId } = req.params

    Book.findById(bookId)
        .then((foundBook) => {
            console.log("These is the book from the DB", foundBook)
            res.render('books/book-edit.hbs', foundBook )
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })

})

router.post('/edit/:bookId', (req, res, next) => {

    let { bookId } = req.params

    let { title, description, author, rating } = req.body

    Book.findByIdAndUpdate(
        bookId,
        {
            title,
            description,
            author,
            rating,
        },
        { new: true }
    )
    .then((updatedBook) => {
        console.log("Book after update ===>", updatedBook)
        res.redirect(`/books/book-details/${updatedBook._id}`)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})

router.post('/delete/:bookId', (req, res, next) => {
    
    let { bookId } = req.params

    Book.findByIdAndRemove(bookId)
        .then((result) => {
            console.log("Deletion result ===>", result)
            res.redirect('/books')
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })

})

module.exports = router;