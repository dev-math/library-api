import Book from "../models/book";

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.bookId });
    if (!book) {
      return res.status(404).json({error: `Book not found`});
    }
    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.bookId });
    if (!book) {
      return res.status(404).json({ error: `Book not found` });
    }

    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const updateBook = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "author", "pages", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates" });
  }

  try {
    const book = await Book.findOne({ _id: req.params.bookId });
    if (!book) {
      return res.status(404).json({ error: `Book not found` });
    }

    updates.forEach((update) => (book[update] = req.body[update]));
    await book.save();

    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

export { getBooks, getBook, deleteBook, updateBook, createBook };
