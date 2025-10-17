const express = require("express");
const Book = require("./book.model");
const { postABook, 
  getAllBooks,
  getBookById,
  getBookByTitle,
  updateBook,
  deleteBook,
} = require("./bookController");
const router = express.Router();


router.post("/create-book", postABook)
router.get("/", getAllBooks);         // GET -> all books
router.get("/search", getBookByTitle); // GET -> filter by title (query param)
router.get("/:id", getBookById);      // GET -> one book by ID
router.put("/:id", updateBook);       // PUT -> update book
router.delete("/:id", deleteBook);


module.exports = router;