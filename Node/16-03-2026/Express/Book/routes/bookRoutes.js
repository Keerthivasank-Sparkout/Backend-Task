const express = require("express");
const controller = require("../controller/bookController");

const router = express.Router();

router
  .route("/")
  .get(controller.getAllBooks)
  .post(controller.createBook);

router
  .route("/:id")
  .get(controller.getBook)
  .patch(controller.updateBook)
  .delete(controller.deleteBook);

module.exports = router;