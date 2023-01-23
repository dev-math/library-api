import express from "express";
import { initDatabase } from "./config/db.js";

initDatabase();

const app = express();
const PORT = 8080;

app.get("/", (_req, res) => {
  res.send("Oi");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
