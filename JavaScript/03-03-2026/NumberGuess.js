let num = Math.floor(Math.random() * 100) + 1;
let win = false;
while (!win) {
    let user_input = prompt("Enter a number between 1 and 100:");
    let user_number = Number(user_input);
    // Input validation
    if (isNaN(user_number)) {
        console.log("Enter a valid number!");
        continue;
    }
    if (user_number < 1 || user_number > 100) {
        console.log("Number must be between 1 and 100!");
        continue;
    }
    if (user_number > num) {
        console.log("Too High...");
    }
    else if (user_number < num) {
        console.log("Too Low...");
    }
    else {
        win = true;
        console.log("You win..! The number was:", num);
    }
}