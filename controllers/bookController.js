const { replaceOne } = require("../models/Book");
const Book = require("../models/Book");
const parseRequestBody = require("../utils/parseRequestBody");

const getBooks = async (request, response) => {
  try {
    const books = await Book.find();
    if (!books) {
      return response.status(400).json({
        error: "Error in getting movies!",
      });
    }

    response.status(200).json({
      books: books,
    });
  } catch (e) {
    return response.status(400).json({
      error: e,
    });
  }
};

const getBookById = async (request, response) => {
  try {
    const books = await Book.find({ _id: request.params.id });

    if (!books || books.length === 0) {
      return response.status(400).json({
        error: "Book not found!",
      });
    }

    response.status(200).json({
      books: books,
    });
  } catch (e) {
    return response.status(400).json({
      error: e,
    });
  }
};

const addBook = async (request, response) => {
  try {
    const book = {
      title: request.body.title,
      genre: request.body.genre,
      author:request.body.author,
      published:request.body.published,
      price:request.body.price
    };

    const newBook = new Book(book);
    const result = await newBook.save();

    if (!result) {
      return response.status(400).json({
        error: "Error in adding new movie!",
      });
    }

    response.status(200).json({
      message: "New book added!",
    });
  } catch (e) {
    return response.status(400).json({
      error: e,
    });
  }
};

const updateBook = async (request, response) => {
  const updates = parseRequestBody(request.body);
  try {
    const result = await Book.updateOne(
      { _id: request.params.id },
      { $set: updates }
    );

    if (!result) {
      return response.status(400).json({
        error: "Error in updating Book.",
      });
    }

    response.status(200).json({
      result: result,
    });
  } catch (e) {
    return response.status(400).json({
      error: e,
    });
  }
};

const deleteBook = async (request, response) => {
  try {
    await Book.deleteOne({ _id: request.params.id }, (error, result) => {
      if (error) {
        return response.status(400).json({
          error: error,
        });
      }

      response.status(200).json({
        message: "Successfully deleted book",
        result: result,
      });
    });
  } catch (e) {
    return response.status(400).json({
      error: e,
    });
  }
};

module.exports = {
  getBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
};
