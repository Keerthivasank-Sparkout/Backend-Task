// var is function scoped
{
  var x = 10;
}
console.log("var outside block:", x);
console.log()//for empty line
// var hoisting
console.log("var hoisting:", a);
console.log()
var a = 5;
// let is block scoped
{
  let y = 20;
  console.log("let inside block:", y);
  console.log()//for empty line
}
// console.log(y); // this cause the reference error because of let is block scope
// Temporal Dead Zone example
// console.log(b); // this casue the reference error because of the not hoisted it is in tdz 
let b = 10;

const c = 50;
// c = 100; it cause error because of the const can not be updated or re-declared
const user = { name: "Keerthi" };
user.name = "Buddy";
console.log("const object modified:", user);
console.log()//for empty line

let p1 = 10;
let p2 = p1;
p2 = 20;
console.log()//for empty line
console.log("p1:", p1); 
console.log("p2:", p2);
console.log()//for empty line

let obj1 = { name: "Keerthi" };
let obj2 = obj1;

obj2.name = "Buddy";
console.log("obj1:", obj1);
console.log()//for empty line
//  PART 3: TYPE COERCION
// String + Number
console.log()//for empty line
console.log('"5" + 2 =', "5" + 2); 
console.log()//for empty line
// String - Number
console.log('"5" - 2 =', "5" - 2); 
console.log()//for empty line
// Boolean conversion
console.log("true + 1 =", true + 1);
console.log()//for empty line
// null behavior
console.log("null + 1 =", null + 1);
console.log()//for empty line
// undefined behavior
console.log("undefined + 1 =", undefined + 1);
console.log()//for empty line
// Equality differences
console.log("null == undefined:", null == undefined);  
console.log()//for empty line
console.log("null === undefined:", null === undefined);
console.log()//for empty line
//  PART 4: FALSY & TRUTHY
const falsyValues = [false, 0, -0, 0n, "", null, undefined, NaN];
falsyValues.forEach(value => {
  console.log(value, "→", Boolean(value));
});
console.log()//for empty line
console.log("\nTruthy example:");
console.log()//for empty line
if ("0") {
  console.log('"0" is truthy');
  console.log()//for empty line
}
