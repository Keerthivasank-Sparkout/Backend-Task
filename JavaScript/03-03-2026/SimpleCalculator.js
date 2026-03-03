let num_1 = 8;
let num_2 = 4;
let option='0';
let result;
switch(option){
    case '+':
        result = num_1+num_2;
        break;
    case '-':
        result = num_1 - num_2;
        break;
    case '*':
        result = num_1 * num_2;
        break;
    case '/':
        result = num_1 / num_2;
        break;
    case '%':
        result = num_1 % num_2;
        break;
    default:
        console.log("Enter the valid opertator...");
}
if(result){
console.log(result);
}