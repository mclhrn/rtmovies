var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  $fhdb = require('../../libs/db/fhdb'),
  log = require('../../libs/logger').getLogger();

function getMovies() {

  var movies = new express.Router();
  movies.use(cors());
  movies.use(bodyParser());

  movies.get('/in-theatres', function (req, res) {
    // res.json({msg: '/movies'});
    $fhdb.read("RT_IN_THEATRES", function (error, response) {
      if (error) {
        log.err(error);
      } else {
        res.json(response);
      }
    });
  });

  movies.get('/coming-soon', function (req, res) {
    // res.json({msg: '/movies'});
    $fhdb.read("RT_COMING_SOON", function (error, response) {
      if (error) {
        log.err(error);
      } else {
        res.json(response);
      }
    });
  });

  return movies;
}

module.exports = getMovies;
