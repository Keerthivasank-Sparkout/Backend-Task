const stocks ={
    Furits:["Strawberry","Grapes","Banana","Apple"],
    liquid:["Water","Ice"],
    holder:["Cone","Cup","Stick"],
    toppings:["Chocolate","Peanuts"]
};
//callback function
const order = (Fruit_name,call_back)=>{
    setTimeout(()=>{
        console.log(`${stocks.Furits[Fruit_name]} was Selected....`);
        call_back();
    },2000)
}
//this is called callback hell
const production = ()=>{
    setTimeout(()=>{
        console.log('Production is Started....');
        setTimeout(()=>{
            console.log("Fruit is chopped....");
            setTimeout(()=>{
                console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} is added....`);
                setTimeout(()=>{
                    console.log("Machine is Started....");
                    setTimeout(()=>{
                        console.log(`Ice cream was placed on ${stocks.holder[1]}....`);
                        setTimeout(()=>{
                            console.log(`${stocks.toppings[1]} is added as a Toppings....`);
                            setTimeout(()=>{
                                console.log('serve the Ice cream.....');
                            },2000)
                        },3000)
                    },2000)
                },1000)
            },1000)
        },2000)
    },2000)
}

order(1,production)