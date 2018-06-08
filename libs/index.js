const path = require('path')
const fs = require('fs')
const dbPromise = require('./db')
const cheerio = require('cheerio')

const request = require('request')

const sleep = (millseconds = 3000) => {
    return new Promise(rs=>setTimeout(rs,millseconds))
}

module.exports = {
    path,
    fs,
    dbPromise,
    sleep,
    cheerio,
    request,
}