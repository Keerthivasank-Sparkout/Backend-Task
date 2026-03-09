const stocks ={
    Fruits:["Strawberry","Grapes","Banana","Apple"],
    liquid:["Water","Ice"],
    holder:["Cone","Cup","Stick"],
    toppings:["Chocolate","Peanuts"]
};

const isShopOpen = true;

const time = (time)=>{
    return new Promise((resolve,reject)=>{
        if(isShopOpen){
            setTimeout(resolve,time);
        }
        else{
            reject("Shop is closed....")
        }
    })
}

async function kitchen(){
    try{
        await time(2000);
        console.log(`${stocks.Fruits[0]} was selected....`)
        await time(1000);
        console.log("Production is Started....")
        await time(2000);
        console.log(`${stocks.Fruits[0]} is chopped....`)
        await time(3000);
        console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} are added....`)
        await time(2000);
        console.log("Machine is started....")
        await time(3000);
        console.log(`Ice cream was placed on ${stocks.holder[1]}....`)
        await time(2000);
        console.log(`${stocks.toppings[1]} is added as toppings....`)
        await time(3000);
        console.log('Serve the Ice cream.....')
    }catch(error){
        console.log(error.message);
    }
    finally{
        console.log("Thanks For comming....")
    }
}
kitchen()