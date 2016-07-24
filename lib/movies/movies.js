var _ = require('underscore'),
  request = require('request'),
  moment = require('moment'),
  env = require('../../libs/env'),
  $fhdb = require('../../libs/db/fhdb'),
  async = require('async'),
  log = require('../../libs/logger').getLogger();

var RT_BASE_URL = env.get("RT_BASE_URL"),
  API_KEY_2 = env.get("API_KEY_2"),
  RT_IN_THEATRES_URL = env.get("RT_IN_THEATRES_URL"),
  RT_IN_THEATRES_PARAMS = env.get("RT_IN_THEATRES_PARAMS"),
  RT_UPCOMING_URL = env.get("RT_UPCOMING_URL"),
  RT_UPCOMING_PARAMS = env.get("RT_UPCOMING_PARAMS");

function updateMovies() {
  doInTheatres();
  doComingSoon();
}

function doInTheatres() {
  var options = {
    url: RT_BASE_URL + RT_IN_THEATRES_URL + API_KEY_2 + RT_IN_THEATRES_PARAMS,
    encoding: 'utf8',
    timeout: 4000
  };

  request(options, function (error, response, body) {
    log.info("doInTheatres() - response code is: " + response.statusCode);
    if (error && response.statusCode != 200) {
      log.warn("doInTheatres()" + error.message);
      return;
    }
    var json = {};
    try {
      json = JSON.parse(body);
    } catch (err) {
      console.log(err);
    }
    parseResponse('RT_IN_THEATRES', json);
  });
}

function doComingSoon() {
  var options = {
    url: RT_BASE_URL + RT_UPCOMING_URL + API_KEY_2 + RT_UPCOMING_PARAMS,
    encoding: 'utf8',
    timeout: 4000
  };

  request(options, function (error, response, body) {
    log.info("doComingSoon() - response code is: " + response.statusCode);
    if (error && response.statusCode != 200) {
      log.warn("doComingSoon()" + error.message);
      return;
    }
    var json = {};
    try {
      json = JSON.parse(body);
    } catch (err) {
      console.log(err);
    }
    parseResponse('RT_COMING_SOON', json);
  });
}

function parseResponse(collection, json) {
  $fhdb.deleteAll(collection, function (err, res) {
    if (err) console.log(err);
    else storeMovies(collection, json);
  });
}

function storeMovies(collection, movies) {
  $fhdb.create(collection, movies, function (err, data) {
    if (err) log.err(err);
    else log.info(JSON.stringify(data));
  });
}

module.exports = {
  updateMovies: updateMovies
};
