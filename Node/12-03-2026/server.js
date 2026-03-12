const http = require('http')

const server = http.createServer((req,res)=>{
    res.end('welcome to Node js server.....')
})

server.listen(3000,'localhost',()=>{
    console.log('server listen on the port:3000');
    
})