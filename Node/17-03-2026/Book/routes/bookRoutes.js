const express = require('express');
const router = express.Router();

// controllers
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controller/bookController');

// middleware
const logger = require('../middleware/logger');
const validateBook = require('../middleware/validateBook');

// apply logger globally to this router
router.use(logger);

// routes
router
  .route('/')
  .get(getAllBooks)
  .post(validateBook, createBook);

router
  .route('/:id')
  .get(getBook)
  .patch( validateBook, updateBook)
  .delete(deleteBook);

module.exports = router;