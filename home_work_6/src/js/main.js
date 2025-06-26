//==========================================================
//Student Yaroslav Lutskyi. JS Homework: An Array of objects
// =========================================================

/* I) Multiplier Factory
Write a function 'createMultiplier' that takes a number factor and returns a new function.
That function should take another number and return it multiplied by the factor.

Requirements:
- Use a closure to capture the factor
- The returned function should accept one argument
- Do not use global variables

Example:
const double = createMultiplier(2);
console.log(double(5)); // 10

const triple = createMultiplier(3);
console.log(triple(5)); // 15

const half = createMultiplier(0.5);
console.log(half(10)); // 5
*/
//Closure: The inner function(returned function) remembers the factor from its parent’s scope, even after createMultiplier() has finished running
function createMultiplier(factor){
    //This inner function has access to 'factor' via closure
    return function(number) {
        return number * factor;
    };
} //OR: const createMultiplier = (factor) => { return (number) => number * factor; };
const double = createMultiplier(2); console.log(double(5)); //10
const triple = createMultiplier(3); console.log(triple(5)); //15
const half = createMultiplier(0.5); console.log(half(10)); //5
//====================================================================================================================


/* II) Once Function
Write a function once(fn) that takes a function fn and returns a new function.
The returned function should call fn only once, no matter how many times it's invoked.
After the first call, all subsequent calls should return undefined and not invoke fn.

Requirements
- Use a **closure** to keep track of whether fn has already been called.
- The returned function should:
  - Call fn only on the first invocation.
  - Ignore or return undefined on all future calls.
- The original fn may take **any number of arguments**.

Example:
function greet(name) {
  console.log("Hello, " + name + "!");
}
const greetOnce = once(greet);
greetOnce("Ygor"); // Output: Hello, Ygor!
greetOnce("John"); // No output
greetOnce("Jane"); // No output
*/
//Closure keeps track of called inside the returned function, remembering whether fn has run yet.
//The spread operator(...args) allows the returned function to accept any number of arguments and forward them to fn.

function greet(name){ console.log("Hello, " + name + "!"); }

function onceFunc(fn) {
    let called = false;

    return function(...args) {
        if(!called){
            called = true;
            return fn(...args);
        } //If already called, do nothing(OR return undefined)
    };
}

/* OR with 'Arrow function':

    const greet = (name) => { console.log("Hello, " + name + "!"); };

    const onceFunc = (fn) => {
        let called = false;

        return (...args) => {
            if(!called){
                called = true;
                return fn(...args);
            }//If already called, do nothing(OR return undefined)
        };
    };
*/
const greetOnce = onceFunc(greet);

greetOnce("Yaroslav"); //Hello, Yaroslav!
greetOnce("John"); //no output
greetOnce("Michele"); //no output
greetOnce("Donald"); //no output
//====================================================================================================================


/* III) Exercise 1: Factorial
These exercises will help you understand and master recursion in JavaScript — solving problems by having a function call itself.

Write a function factorial(n) that returns the factorial of n.

    The factorial of n is n * (n-1) * (n-2) * ... * 1
    Example: factorial(5) should return 120

Instructions:
- Do not use loops(for, while, etc.)
- Each solution must use pure recursion
- Focus on defining a base case and a recursive case
- Use console.log() to test your results

Example:
console.log(factorial(0)); // 1
console.log(factorial(5)); // 120
*/
//Recursion in JS — function call itself.
//Base case: when n === 0, return 1 (by definition: 0! = 1)
//Recursive case: multiply n by factorial(n - 1)

function factorial(n) {
    if(n === 0) { return 1; } //Base case
    return n * factorial(n - 1); //Recursive case
}
//OR: const factorial = (n) => { if (n === 0) { return 1; } return n * factorial(n - 1); };

console.log(factorial(0)); // 1
console.log(factorial(5)); // 120
console.log(factorial(7)); // 5040