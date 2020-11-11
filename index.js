const express = require("express");
const app = express();

const database = require("./services/database");
const MovieRouter = require("./routes/movies");

app.use(express.json());
app.use("/dashboard", MovieRouter);
database.connect();

app.listen(8000, console.log("Server running on port 8000"));
