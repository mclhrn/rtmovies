var
  CronJob = require('cron').CronJob,
  movies = require('../movies/movies'),
  log = require('../../libs/logger').getLogger();

var cronJobs = [];

/**
 * Create and start cron jobs.
 */
function create() {
  // cronJobs.push(createCron('RT Movies', '* 30 11 * * 0-6', movies.updateMovies.bind(movies))); // This cron runs every weekday at 11:30am
  cronJobs.push(createCron('RT Movies', '* 30 11 * * 0-6', movies.updateMovies.bind(movies))); // This cron runs every weekday at 11:30am
  log.info('Cron Jobs successfully created');
}

/**
 * Kick start the Cron Jobs
 */
function start() {
  cronJobs.forEach(function (job) {
    job.start();
  });
  log.info('Started all cron jobs');
}

/**
 * Cancel all Cron Jobs
 */
function stop() {
  cronJobs.forEach(function (job) {
    job.stop();
  });
  log.info('Stopped all cron jobs');
}

/**
 * Create a cron task that is wrapped with some control flow.
 * @param {String}    cronName  Name of task.
 * @param {String}    cronTab   Cron tab to control timing.
 * @param {Function}  cronFn    Function to run for cron, must take a callback.
 */
function createCron(cronName, cronTab, cronFn) {

  var c = new CronJob(cronTab, function () {

    var self = this;

    // Add a flag to check is the task in progress and task name
    c.inProgress = false;
    c.name = cronName;

    // Check is the cron currently running
    if (self.inProgress) {
      log.warn('=== Not running cron {' + self.name + '} right now as it is already in progress ===');
    } else {
      log.info('=== Starting cron {' + self.name + '} ===');
      cronFn(function (err) {

        if (err) {
          log.err('=== Cron {' + self.name + '} has finished with error ===');
          log.err(JSON.stringify(err));
        }

        log.info('=== Cron {' + self.name + '} has finished without error ===');

        // Reset in progress flag
        self.inProgress = false;
      });
    }
  }, true, false);

  return c;
}

module.exports = {
  create: create,
  start: start,
  stop: stop
};
