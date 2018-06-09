const { 
    // db,
    sleep,
    request,
    cheerio,
} = require('../libs')
let db

async function getDoubanList(){
    const list = await db.all('select id,url from Url where type=?',"douban")
    if(list.length === 0) return [];
    return list;
}



function getDouBanPageUrl(mainUrl){
    const END = 'discussion?start=0';
    const MAX_PAGE = 10;
    const PAGE_NUM = 50;
    const list = [];
    for(let i = 0; i< MAX_PAGE;i++){
        list.push(mainUrl + END.replace(/\d+/,'' + PAGE_NUM * i))
    }
    return list;
}

async function doubanRequest(url){
    return new Promise((rs,rj)=>{
        request({url: url,headers:{'User-Agent': 'request'}},function(e,r,body){
            if(!e && r.statusCode == 200) {
                rs([body,null])
            } else {
                rj([null,e || r.statusCode])
            }
        })
    })
}

async function doubanRequestWrap(url){
    await sleep(Math.floor(Math.random()*20))
    return await doubanRequest(url)
}


function parseHtmlLevel2(body){
    let $ = cheerio.load(body);
    try{

        let content = $('#content .topic-richtext').text();
        let temp = $('#content div.topic-doc h3 span.color-green').text().trim();
        let create_time = new Date(temp).getTime()/1000;
        return {
            content,
            create_time,
        }
    }catch(e){
        return 
    }
}

function parseHtmlLevel1(body){
    let $ = cheerio.load(body);
    let $content = $('#content tbody tr')
    let results = []
    for(let i = 1; i< $content.length; i++){
        try{
            const title = $content.eq(i).find("td a").eq(0).attr("title")
            const url = $content.eq(i).find("td a").eq(0).attr("href")
            const username = $content.eq(i).find("td a").eq(1).text()
            const temp = new Date().getFullYear() + '-' + $content.eq(i).find("td.time").text()
            const update_time = new Date(temp).getTime()/1000
            results.push({
                title,
                username,
                update_time,
                url,
            })
        }catch(e){
            console.log(e)
            continue;
        }
    }
    return results;
}

async function filterLevel1List(levelList){

    const list = await db.all('select title,username from renthouse')
    const dict = new Map(list.map(item=>[item.title,item.username]))
    levelList = levelList.filter(item=> {
        const username = dict.get(item.title)
        return !(username && username == item.username)
    })
    return levelList;
}

async function insertMany(lists){
    lists = lists.map(list=>{
        db.run('INSERT INTO renthouse (uid,title,username,create_time,update_time,url,content) VALUES (?,?,?,?,?,?,?)',list.uid,list.title,list.username,list.create_time,list.update_time,list.url,list.content).catch(e=>console.log(e))
    })
    return await Promise.all(lists)
}

async function main(){
    db = await require('../libs/db')()
    let urlInfos = await getDoubanList();
    for(let {id, url} of urlInfos){
        let pageUrls = await getDouBanPageUrl(url)

        for(let pageUrl of pageUrls){
            let [body,err] = await doubanRequestWrap(pageUrl)
            if(err) continue
            let lists = parseHtmlLevel1(body)
            lists = await filterLevel1List(lists)
            let newList = []
            for(let list of lists){
                let [body,err] = await doubanRequestWrap(list.url)
                if(err)continue;

                const content = parseHtmlLevel2(body)

                // console.log("====",content)
                // console.log(Object.assign(list,content,{uid:id}))
                if(Object.keys(content).length<2) continue;
                newList.push(Object.assign(list,content,{uid:id}))
            }
            console.log("insert nums:",newList.length)
            await insertMany(lists);
        }

    }
}


module.exports = main;
