
const {
    cron,
} = require('../libs')

const douban = require('../fns/douban')

var CronJob = cron.CronJob;
var job = new CronJob({
    cronTime: '0 */2 * * * *',
    onTick: function() {
      /*
       * Runs every weekday (Monday through Friday)
       * at 11:30:00 AM. It does not run on Saturday
       * or Sunday.
       */
      douban().then(console.log).catch(console.error)
    },
    start: false,
    timeZone: 'America/Los_Angeles'
  });