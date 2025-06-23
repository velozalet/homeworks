//==========================================================
//Student Yaroslav Lutskyi. JS Homework: Functions and Scope
// =========================================================
console.log("============Function & Scope=============");

// =========================================
// Task 1: Create a function called greet that logs: "Hello, student!" to the console. Then call the function
// =========================================
let greetText = "Hello, student!";
function greet() { console.log(greetText) } //OR: const greet = () => { console.log(greetText); };
greet();


// =========================================
// Task 2: Create a function that takes a name as a parameter and logs "Hello, <name>!" to the console. Call the function with different names
// =========================================
function greetByName(name) { console.log(`Hello, ${name}!`); } //OR: const greetByName = (name) => { console.log(`Hello, ${name}!`); };
greetByName("Nadya");
greetByName("SpongeBob");


// =========================================
// Task 3: Create a function that returns the square of a number. Call the function and store the result in a variable. log the result
// =========================================
function getSquareNumber(num) { return num * num; } //OR: const getSquareNumber = (num) => { return num * num; };
let resultSquareNumber = getSquareNumber(8); console.log(resultSquareNumber);


// =========================================
// Task 4: Demonstrate local vs global scope. Create a global variable and a function that has a local variable.
// Log both and explain the difference in a comment. Display both values in the console
// =========================================
//Global variable
let globalVar = "G L O B A L  variable";

function demonstrateScopeFunc() {
    /*Local variable (exists only inside this function - only inside its scope blocks)*/
    let localVar = "LOCAL variable";

    console.log(globalVar); //Accessible here because it's a global variable
    console.log(localVar);  //Accessible here because we call it in the block(function) where it was declared.
} demonstrateScopeFunc();

console.log(globalVar); //Accessible here because it's a global variable
//console.log(localVar); //(!)Error: 'localVar is not defined' - Not accessible here because outside the block(function)
/*
 Explanation:
 - globalVar is declared outside the function and can be accessed anywhere.
 - localVar is declared inside showScope() and only exists within that function's scope.
    (!) Scope Blocks for Local Variables: Function body{}, Loop body{}, if-else block {}, switch-case block {}, try-catch blocks {}
 Trying to access localVar outside the 'Scope Blocks' causes an error.
*/


// =========================================
// Task 5: Create a function that accepts another function as a parameter. The callback should log "Callback function was called"
// Call the outer function and pass the inner function as an argument
// =========================================
//Define the function that takes another function as a parameter
function outerFunction(callback){
    callback(); //Call the callback function inside
}
//Define the callback function
function callbackFunc(){
    console.log("Callback function was called");
}
outerFunction(callbackFunc); //Call the outer function and pass the callback function as an argument

/*OR Arrow function version:
    const outerFunction = (callback) => { callback(); }; //Define the function that takes another function as a parameter
    const callbackFunc = () => { console.log("Callback function was called"); }; //Define the callback function
    outerFunction(callbackFunc); //Call the outer function and pass the callback function as an argument
*/


// =========================================
// Task 6: Create a function that accepts two numbers and a function. The function should perform an operation using the passed-in function
// Example: pass in add, subtract, multiply as callback functions
// Call the main function with different callbacks.Display results in the console
// =========================================
function calculateFunc(param1, param2, callback) {
    return callback(param1, param2);
}

function addFunc(x,y) { return x + y; }      //Add function
function subtractFunc(x,y) { return x - y; } //Subtract function
function multiplyFunc(x,y) { return x * y; } //Multiply function
function divisionFunc(x,y) { return x / y; } //Division function

//Call calculateFunc() with different operations:
console.log(calculateFunc(10, 5, addFunc));      //15
console.log(calculateFunc(10, 5, subtractFunc)); //5
console.log(calculateFunc(10, 5, multiplyFunc)); //50
console.log(calculateFunc(10, 5, divisionFunc)); //2

/*OR Arrow function version:
    const calculateFunc = (param1, param2, callback) => callback(param1, param2);

    const addFunc = (x,y) => x + y;      //Add function
    const subtractFunc = (x,y) => x - y; //Subtract function
    const multiplyFunc = (x,y) => x * y; //Multiply function
    const divisionFunc = (x,y) => x / y; //Division function

    //Call calculateFunc() with different operations:
    console.log(calculateFunc(10, 5, addFunc));      //15
    console.log(calculateFunc(10, 5, subtractFunc)); //5
    console.log(calculateFunc(10, 5, multiplyFunc)); //50
    console.log(calculateFunc(10, 5, divisionFunc)); //2
*/


// =========================================
// Task 7: Create and use an anonymous function. Assign it to a variable and call it. It should log "Anonymous function executed"
// =========================================
/*
    const anonymousFunc = (function() {
        console.log("Anonymous function executed");
    }); anonymousFunc();
*/ /*OR*/

const anonymousFunc = function() {
    console.log("Anonymous function executed");
}; anonymousFunc();

// =========================================
// Task 8: Rewrite Task 7 using an arrow function instead. Call it and display the result in the console
// =========================================
const myAnonymousFunc = () =>  console.log("Anonymous function executed"); myAnonymousFunc();


