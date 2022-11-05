const cron = require('node-cron')

const removeOldAuthTokens = require('./removeOldAuthTokens')

module.exports = () => {
    cron.schedule('0 4 * * *', removeOldAuthTokens)
    }

