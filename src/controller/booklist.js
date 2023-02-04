import Booklist from "../models/booklist";
import Book from "../models/book";

const createBooklist = async (req, res) => {
  try {
    const booklist = new Booklist({ ...req.body, owner: req.userId });
    await booklist.save();
    res.status(201).json({ booklist });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const updateBooklist = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates" });
  }

  try {
    const booklist = await Booklist.findOne({
      _id: req.params.bookId,
      owner: req.userId,
    });
    if (!booklist) {
      return res.status(404).json({ error: `Booklist not found` });
    }

    updates.forEach((update) => (booklist[update] = req.body[update]));
    await booklist.save();

    res.status(200).json({ booklist });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const getUserBooklists = async (req, res) => {
  try {
    const userId = req.params.userId || req.userId;
    const booklists = await Booklist.find({ owner: userId });
    res.status(200).json({ booklists });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const getBooklist = async (req, res) => {
  try {
    const booklist = await Booklist.findOne({ _id: req.params.booklistId });
    if (!booklist) {
      return res.status(404).json({ error: "Booklist not found" });
    }
    res.status(200).json({ booklist });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const getBooklistItems = async (req, res) => {
  try {
    const booklist = await Booklist.findOne({
      _id: req.params.booklistId,
    });
    if (!booklist) {
      return res.status(404).json({ error: "Booklist not found" });
    }

    res.status(200).json(booklist.books);
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const addBooklistItem = async (req, res) => {
  try {
    const booklist = await Booklist.findOne({
      _id: req.params.booklistId,
      owner: req.userId,
    });
    if (!booklist) {
      return res.status(404).json({ error: "Booklist not found" });
    }

    const books = req.body.books;
    books.forEach(async (bookId) => {
      const book = await Book.findOne({ _id: bookId });
      booklist.push(book);
    });

    res.status(200).json(booklist);
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const removeBooklistItem = async (req, res) => {
  try {
    const booklist = await Booklist.findOne({
      _id: req.params.booklistId,
      owner: req.userId,
    });
    if (!booklist) {
      return res.status(404).json({ error: "Booklist not found" });
    }

    const booksToRemove = req.body.books;

    booklist.books.filter((book) => !booksToRemove.contains(book._id));

    res.status(200).json(booklist);
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

export {
  addBooklistItem,
  createBooklist,
  getUserBooklists,
  getBooklist,
  getBooklistItems,
  removeBooklistItem,
  updateBooklist,
};
