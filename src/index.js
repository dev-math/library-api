import express from "express";
import cors from "cors";
import initDatabase from "./config/db";
import routes from "./routes";

initDatabase();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
