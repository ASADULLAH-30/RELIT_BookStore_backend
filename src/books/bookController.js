const Book = require("./book.model");

// ✅ 1. Create a new Book
const postABook = async (req, res) => {
  try {
    const newBook = new Book({ ...req.body });
    await newBook.save();
    res.status(201).send({ message: "Book Posted Successfully", book: newBook });
  } catch (error) {
    console.error("Error in creating book", error);
    res.status(500).send({ message: "Failed to post book" });
  }
};

// ✅ 2. Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch books" });
  }
};

// ✅ 3. Get one book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

// ✅ 4. Get books by title (filtering)
const getBookByTitle = async (req, res) => {
  try {
    const title = req.query.title; // example: /api/books?title=Harry
    const books = await Book.find({ title: { $regex: title, $options: "i" } });
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch books by title" });
  }
};

// ✅ 5. Update a book by ID
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.status(200).send({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).send({ message: "Failed to update book" });
  }
};

// ✅ 6. Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getBookById,
  getBookByTitle,
  updateBook,
  deleteBook,
};
