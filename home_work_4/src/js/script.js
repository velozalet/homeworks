//console.log('Hello World ++');
//--------------------------------------------------------------------
let person1 = {
    name: "Alice",
    age: 25
};

let person2 = { ...person1 }; //Deep copy of 'person1' object
person2.favoriteColor = "yellow";

console.log(person1); //{name: 'Alice', age: 25}
console.log(person2); //{name: 'Alice', age: 25, favoriteColor: 'yellow'}

/*
* What are the primitive types in JS ? Give example of each.
* --> Primitive types in JavaScript:
* 1. String - represents text: let name = "Alice";
* 2. Number — represents numeric values (integer or float): let age = 30;
* 3. Boolean — represents true or false: let isOnline = true;
* 4. Undefined — a variable that has been declared but not assigned a value:
*           let score; console.log(score); //undefined
* 5. Null — represents an intentional absence of any value: let data = null;
* 6. Symbol — unique and immutable value, often used as object property keys: let id = Symbol("id");
* 7. BigInt — for large integers beyond the safe limit of Number: let bigNumber = 1234567890123456789012345678901234567890n;
*
*
* When should you use an object?
    let person = {
      name: "Donald",
      lastName: "Trump",
      age: 75,
      position: function() {
        console.log("president");
      }
    };
* --> Use an object when you need to group related data and their properties together under a single name.
It’s ideal for:
        - Representing real-world entities with characteristics (properties) and behaviors (methods).
        - Storing key-value pairs, where keys are strings (or Symbols) and values can be any type.
* We can use an object when:
- You need to store multiple related values.
- The data has named properties.
- You want to easily access and update values via dot notation (person.age) or bracket notation (person["age"]).
*
*
* When should you use an  array?
        let fruits = ["apple", "pear", "banana", "peach"];
* -->  Use an array when you need to store multiple values in a specific order, and you’ll often work with them by index(position).
* We can use an array when:
- You have a list of related items (e.g. names, numbers, objects).
- The order of items matters.
- You need to iterate over items using loops (for, forEach, map, etc.).
- You want to access items by their numeric index (fruits[0] gives "apple").
*/
//--------------------------------------------------------------------

/*Task: Declare a function that takes two arguments(name and favorite hobby) and console on the screen:
My name is {name} and my favorite color is {favorite color} */

/** showMessage function
 * @param name (str)
 * @param favoriteHobby (str)
 * @param displayConsole (bool)
 * @returm
 */
function showMessage(name, favoriteHobby, displayConsole = true) {
    if(displayConsole){
        console.log(`${name} : ${favoriteHobby}`);
    }else{
        alert(`${name} : ${favoriteHobby}`);
        //alert( name +' '+  favoriteHobby);
    }
}
showMessage('Donald', 'destroy the World', true);