const express = require("express");
const router = express.Router();

const {
  getMovies,
  addMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", addMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
module.exports = router;
