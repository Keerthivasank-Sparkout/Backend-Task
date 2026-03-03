
// PART 1: VAR, LET, CONST BEHAVIOR
console.log("----- VAR BEHAVIOR -----");
// var is function scoped
{
  var x = 10;
}
console.log("var outside block:", x); // 10

// var hoisting
console.log("var hoisting:", a); // undefined
var a = 5;

//LET BEHAVIOR
console.log("\n----- LET BEHAVIOR -----");
// let is block scoped
{
  let y = 20;
  console.log("let inside block:", y);
}
// console.log(y); // Uncomment → ReferenceError

// Temporal Dead Zone example
// console.log(b); // Uncomment → ReferenceError
let b = 10;

//CONST BEHAVIOR
console.log("\n----- CONST BEHAVIOR -----");
const c = 50;
// c = 100; // Uncomment → Error

const user = { name: "Keerthi" };
user.name = "Buddy";
console.log("const object modified:", user);

//PART 2: PRIMITIVE VS REFERENCE

console.log("\n----- PRIMITIVE -----");
let p1 = 10;
let p2 = p1;
p2 = 20;
console.log("p1:", p1); 
console.log("p2:", p2);

console.log("\n----- REFERENCE -----");

let obj1 = { name: "Keerthi" };
let obj2 = obj1;

obj2.name = "Buddy";
console.log("obj1:", obj1); // Modified
//  PART 3: TYPE COERCION
console.log("\n----- TYPE COERCION -----");
// String + Number
console.log('"5" + 2 =', "5" + 2); // "52"
// String - Number
console.log('"5" - 2 =', "5" - 2); // 3
// Boolean conversion
console.log("true + 1 =", true + 1); // 2
// null behavior
console.log("null + 1 =", null + 1); // 1
// undefined behavior
console.log("undefined + 1 =", undefined + 1); // NaN
// Equality differences
console.log("null == undefined:", null == undefined);   // true
console.log("null === undefined:", null === undefined); // false
// Array coercion
console.log("[] + [] =", [] + []); // ""
console.log("[] + {} =", [] + {}); // "[object Object]"

//  PART 4: FALSY & TRUTHY
console.log("\n----- FALSY VALUES -----");
const falsyValues = [false, 0, -0, 0n, "", null, undefined, NaN];
falsyValues.forEach(value => {
  console.log(value, "→", Boolean(value));
});
console.log("\nTruthy example:");
if ("0") {
  console.log('"0" is truthy');
}
//  PART 5: VAR VS LET IN LOOP (INTERVIEW FAVORITE)

console.log("\n----- VAR LOOP -----");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100);
}
console.log("\n----- LET LOOP -----");
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 100);
}