const http = require('http')
const url = require('url')

const server = http.createServer((req,res)=>{
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('<h1>welcome to overview....</h1>')
    }
    else if(pathName === '/product'){
        res.end('<h1>welcome to product....</h1>')
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