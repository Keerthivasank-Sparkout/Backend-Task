const fs = require('fs')
//blocking the code -> synchronus method

    const readFile = fs.readFileSync('./txt/input.txt','utf-8')
    console.log(readFile)

    const TextOut = `This a about avacodo: ${readFile}.\ncreated At ${Date.now()}`;
    fs.writeFileSync('./txt/output.txt',TextOut)
    console.log('file written')

//Non block the code -> Asynchronus method
    fs.readFile('./txt/start.txt','utf-8',(err,data)=>{
        console.log(data)
        fs.readFile(`./txt/${data}.txt`,'utf-8',(err,data1)=>{
            console.log(data1)
            fs.readFile('./txt/append.txt','utf-8',(err,data2)=>{
                console.log(data2);
                fs.writeFile('./txt/final.txt',`${data1}\n${data2}`,err=>{
                    console.log('file has been written')
                })
            })
        })
    })
    console.log("Asychronus way method")