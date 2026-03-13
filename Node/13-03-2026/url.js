const http = require('http')
const url = require('url')

const server = http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url,true)
    res.writeHead(200,{'content-type': 'application/json'})
    res.end(JSON.stringify({
        pathName :parsedUrl.pathname,
        query : parsedUrl.query

    }))
})
server.listen(3000,'localhost',()=>{
    console.log("server listen on port:3000")
})