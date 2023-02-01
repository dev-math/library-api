import express from "express";
import { initDatabase } from "./config/db.js";

initDatabase();

const app = express();
const PORT = 8080;

// BOOKS
// GET /books - Retrieve a list of all books in the library
// GET /books/:id - Retrieve information about a specific book
// POST /books - Add a new book to the library
// PUT /books/:id - Update information about a specific book
// DELETE /books/:id - Remove a book from the library

// GET: /me current user details
// /users 
// POST: create user
// DELETE: remove user
// GET: / list users
// GET: /users/:userId list user
// PUT: /users/:userId update user

// GET: /users/:userId/booklists list booklists
// POST: /users/:userId/booklists create booklist
// GET: /users/:userId/booklists/:id list booklist
// PUT: /users/:userId/booklists/:id update booklist

// SEARCH
// GET /search?q=:query - Search for books by title, author, or genre

app.get("/", (_req, res) => {
  res.send("Oi");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
