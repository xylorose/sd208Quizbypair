const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
