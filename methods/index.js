const {
    db
} = require('../libs')

const methods = require('./get');

module.exports = {
    ...methods,
}