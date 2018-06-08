const path = require('path')
const fs = require('fs')
const cheerio = require('cheerio')

const request = require('request')
const cron = require('cron')

const sleep = (millseconds = 3000) => {
    return new Promise(rs => setTimeout(rs, millseconds))
}

module.exports = {
    path,
    fs,
    sleep,
    cheerio,
    request,
    cron,
}