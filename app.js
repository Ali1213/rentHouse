const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const CONFIG = require('./config');

const app = new Koa();
const dbInit = require('./libs/db')



const Router = require('koa-router');

const router = new Router();

const { getRentHouseList } = require('./methods');

async function main(){
    global.db = await dbInit()

    
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

    app.use(bodyParser());

    app.use(require('./router').routes());

    app.listen(CONFIG.port, CONFIG.host, () => {
        console.log(`Listen to ${CONFIG.port} at ${new Date()}`);
    });
}

main()