import express from "express";
import initDatabase from "./config/db.js";

initDatabase();

const app = express();
const PORT = 8080;

// BOOKS
// GET /books - Retrieve a list of all books in the library
// GET /books/:id - Retrieve information about a specific book
// POST /books - Add a new book to the library
// PUT /books/:id - Update information about a specific book
// DELETE /books/:id - Remove a book from the library

// SEARCH
// GET /search?q=:query - Search for books by title, author, or genre

app.get("/", (_req, res) => {
  res.send("Oi");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
