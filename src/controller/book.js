import Book from "../models/book";
import Booklist from "../models/booklist";

export const isBookOnUserLibrary = async (userId, bookKey) => {
  try {
    const userLibrary = await Booklist.findOne({
      name: "My Library",
      owner: userId,
    });
    const book = userLibrary.books.find((b) => b === bookKey);
    return !!book;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const saveBookToUserLibrary = async (req, res) => {
  try {
    let book = await Book.findOne({ key: req.body.key });
    if (!book) {
      book = new Book(req.body);
      await book.save();
    }

    const userLibrary = await Booklist.findOne({
      name: "My Library",
      owner: req.userId,
    });
    userLibrary.books.push(book.key);
    await userLibrary.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: `${error}` });
  }
};

export const removeUserSavedBook = async (req, res) => {
  try {
    const book = await Book.findOne({ key: req.body.bookKey });
    if (!book) {
      throw new Error("Book not found");
    }

    const userLibrary = await Booklist.findOne({
      name: "My Library",
      owner: req.userId,
    });
    userLibrary.books.pull(book.key);
    await userLibrary.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};
