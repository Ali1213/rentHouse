// const {
//     db
// } = require('../libs')




module.exports = async function(params){

    const select = "select * from renthouse order by create_time desc limit 500"
    const result = await db.all(select)
    return result || []
}