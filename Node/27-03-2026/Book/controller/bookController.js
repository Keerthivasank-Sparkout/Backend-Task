const books = require("../data/books.json");

// GET ALL BOOKS
exports.getAllBooks = (req, res) => {
  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books
    }
  });
};

// GET SINGLE BOOK
exports.getBook = (req, res) => {
  const id = Number(req.params.id);

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "Book not found"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      book
    }
  });
};

// CREATE BOOK
exports.createBook = (req, res) => {
  const newBook = {
    id: books.length + 1,
    ...req.body
  };

  books.push(newBook);

  res.status(201).json({
    status: "success",
    data: {
      book: newBook
    }
  });
};

// UPDATE BOOK
exports.updateBook = (req, res) => {
  const id = Number(req.params.id);

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "Book not found"
    });
  }

  Object.assign(book, req.body);

  res.status(200).json({
    status: "success",
    data: {
      book
    }
  });
};

// DELETE BOOK
exports.deleteBook = (req, res) => {
  const id = Number(req.params.id);

  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Book not found"
    });
  }

  books.splice(index, 1);

  res.status(204).json({
    status: "success",
    data: null
  });
};