const { replaceOne } = require("../models/Movie");
const Movie = require("../models/Movie");
const parseRequestBody = require("../utils/parseRequestBody");

const getMovies = async (request, response) => {
  try {
    const movies = await Movie.find();
    if (!movies) {
      return response.status(400).json({
        error: "Error in getting movies!",
      });
    }

    response.status(200).json({
      movies: movies,
    });
  } catch (e) {
    return response.status(400).json({
      error: e,
    });
  }
};

const getMovieById = async (request, response) => {
  try {
    const movie = await Movie.find({ _id: request.params.id });

    if (!movie || movie.length === 0) {
      return response.status(400).json({
        error: "Movie not found!",
      });
    }

    response.status(200).json({
      movie: movie,
    });
  } catch (e) {
    return response.status(400).json({
      error: e,
    });
  }
};

const addMovie = async (request, response) => {
  try {
    const movie = {
      title: request.body.title,
      genre: request.body.genre,
      director: request.body.director,
    };

    const newMovie = new Movie(movie);
    const result = await newMovie.save();

    if (!result) {
      return response.status(400).json({
        error: "Error in adding new movie!",
      });
    }

    response.status(200).json({
      message: "New movie added!",
    });
  } catch (e) {
    return response.status(400).json({
      error: e,
    });
  }
};

const updateMovie = async (request, response) => {
  const updates = parseRequestBody(request.body);
  try {
    const result = await Movie.updateOne(
      { _id: request.params.id },
      { $set: updates }
    );

    if (!result) {
      return response.status(400).json({
        error: "Error in updating movie!",
      });
    }

    response.status(200).json({
      result: result,
    });
  } catch (e) {
    return response.status(400).json({
      error: e,
    });
  }
};

const deleteMovie = async (request, response) => {
  try {
    await Movie.deleteOne({ _id: request.params.id }, (error, result) => {
      if (error) {
        return response.status(400).json({
          error: error,
        });
      }

      response.status(200).json({
        message: "Successfully deleted movie",
        result: result,
      });
    });
  } catch (e) {
    return response.status(400).json({
      error: e,
    });
  }
};

module.exports = {
  getMovies,
  addMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
};
