const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const database = require("./services/database");
const BookRouter = require("./routes/books");
const { response } = require("express");

app.use(express.json());
app.use("/api/BookStore", BookRouter);
database.connect();

app.listen(8000, console.log("Server running on port 8000"));
