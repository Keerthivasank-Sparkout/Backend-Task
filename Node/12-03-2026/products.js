const http = require('http')
const fs = require('fs')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res)=>{
    const {query,pathname} = url.parse(req.url,true);

    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200,{'content-type':'text/html'})
        const cardHtml = dataObj.map(el => replaceTemplate(templateCard,el)).join('');
        const output =templateOverview.replace('{%PRODUCT_CARDS%}',cardHtml)
        res.end(output)
    }
    else if(pathname === '/product'){
        res.writeHead(200,{'content-type':'text/html'})
        const product = dataObj[query.id];
        const output = replaceTemplate(templateProduct,product)
        res.end(output)

    }
    else if(pathname === '/api'){
        res.writeHead(200,{'content-type':'application/json'})
        res.end(data)
    }

    else{
        res.writeHead(404,{
            'content-type': 'text/html',
            'my-header':'hello-world'
        })
        res.end('<h1>Page not found....</h1>')
    }
})

server.listen(3000,'localhost',()=>{
    console.log('server listen on the port:3000');
    
})