// const {
//     db
// } = require('../libs')


async function getRentHouseList(params){

    const select = "select * from renthouse order by create_time desc limit 500"
    const result = await db.all(select)
    return result || []
}

async function addRentUrl(params){
    let paramsStr = ""
    let values = ""
    if(params.url){
        paramsStr += "url,"
        values += `"${params.url}",`
    }

    if(params.name){
        paramsStr += "name,"
        values += `"${params.name}",`
    }
    if(params.type){
        paramsStr += "type,"
        values += `"${params.type}",`
    }
    const result = await db.run(`INSERT INTO Url(${paramsStr.slice(0,-1)}) VALUES(${values.slice(0,-1)})`)
    return result;
}

module.exports = {
    getRentHouseList,
    addRentUrl,
}