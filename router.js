
const Router = require('koa-router');

const router = new Router();

const { getRentHouseList } = require('./methods');

router.get('/getAll',async (ctx) => {
    const params = mergeArgs(ctx);
    let result
    try {
        result = await getRentHouseList(params);
        ctx.body = {code:0, data: result}
    } catch (e) {
        console.log(e)
        ctx.body = {code:10040,Message: e.Message};
    }
})

function mergeArgs(ctx) {
    return Object.assign(
        {},
        ctx.request.query,
        ctx.request.body,
        ctx.request.params,
    );
}


module.exports = router;
