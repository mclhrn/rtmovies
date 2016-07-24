/**
 * Interface to mongo using $FH.DB
 */
var $fh = require('fh-mbaas-api'),
  log = require('../../libs/logger').getLogger();


function create(collection, data, callback) {

  var options = {
    "act": "create",
    "type": collection,
    "fields": data
  };

  $fh.db(options, function (err, data) {
    if (err) {
      log.err("Error " + err);
      callback(err, null);
    } else {
      log.info(JSON.stringify(data));
      callback(null, data);
    }
  });
}


function read(collection, callback) {

  var options = {
    "act": "list",
    "type": collection
  };

  $fh.db(options, function (err, data) {
    if (err) {
      log.err("Error " + err);
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}


function list(collection, where, callback) {

  var options = {
    "act": "list",
    "type": collection,
    "eq": where
  };

  $fh.db(options, function (err, data) {
    if (err) {
      log.err("Error " + err);
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}


function listAll(collection, callback) {

  var options = {
    "act": "list",
    "type": collection
  };

  $fh.db(options, function (err, data) {
    if (err) {
      log.err("Error " + err);
      callback(err, null);
    } else {
      callback(null, data);
    }
  });

}


function update(collection, guid, data, callback) {

  var options = {
    "act": "update",
    "type": collection,
    "guid": guid,
    "fields": data
  };

  $fh.db(options, function (err, data) {
    if (err) {
      log.err("Error " + err);
      callback(err, null);
    } else {
      log.info(JSON.stringify(data));
      callback(null, data);
    }
  });
}


function deleteRow(collection, guid, callback) {

  var options = {
    "act": "delete",
    "type": collection,
    "guid": guid
  };

  $fh.db(options, function (err, data) {
    if (err) {
      log.err("Error " + err);
      callback(err, null);
    } else {
      log.info(JSON.stringify(data));
      callback(null, data);
    }
  });
}


function deleteAll(collection, callback) {

  var options = {
    "act": "deleteall",
    "type": collection
  };

  $fh.db(options, function (err, data) {
    if (err) {
      log.err("Error " + err);
    } else {
      console.log(JSON.stringify(data));
      callback(null, data);
    }
  });
}


function deleteRowWhere(collection, where, callback) {

  var options = {
    "act": "list",
    "type": collection,
    "eq": where
  };

  $fh.db(options, function (err, data) {

    if (err) {
      log.err("Error " + err);
      callback(err, null);
    }

    console.log(JSON.stringify(data));

    if (!data.list[0].guid) {
      log.err("Error: Guid not found");
      return callback({
        msg: 'Error: Guid not found',
        statusCode: 500
      });
    }

    var options = {
      "act": "delete",
      "type": collection,
      "guid": data.list[0].guid
    };

    $fh.db(options, function (err, data) {
      if (err) {
        log.err("Error " + err);
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  });
}


module.exports = {
  create: create,
  read: read,
  update: update,
  deleteAll: deleteAll,
  list: list,
  listAll: listAll,
  deleteRow: deleteRow,
  deleteRowWhere: deleteRowWhere
};
