// import sqlite from 'sqlite';
const sqlite = require('sqlite')

const path = require('path')
const fs = require('fs')

const dbpath = path.join(__dirname,"../db",'database.sqlite');

try{
    fs.statSync(path.dirname(dbpath))
}catch(e){
    fs.mkdirSync(path.dirname(dbpath))
}


const initStr = fs.readFileSync(path.join(__dirname, 'db.sql'), 'utf8')

// DB
async function init(){
    const db = await sqlite.open(dbpath, { Promise })
    await db.exec(initStr)
    return db
} 


module.exports = init