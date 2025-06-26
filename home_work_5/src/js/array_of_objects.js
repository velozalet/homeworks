//==========================================================
//Student Yaroslav Lutskyi. JS Homework: An Array of objects
// =========================================================

//Starter data: list of students and their grades
const students = [
    { name: "Alice", grade: 85 },
    { name: "Bob", grade: 58 },
    { name: "Charlie", grade: 95 },
    { name: "David", grade: 45 },
    { name: "Eva", grade: 72 },
]; //console.log(students);

const getArrlength = arr => arr.length; //OR: const getArrlength = (arr) => { return arr.length; };

console.log("==========An Array of objects===========");
// =========================================
// Task 1: Create a new array of strings in this format: "Alice:85", "Bob:58", etc. Display the result in the console
// =========================================
//1. for() loop --> manually push to an array
const studentArr1 = [];
for( let i=0; i < getArrlength(students); i++ ) {
    studentArr1.push(`${students[i].name}: ${students[i].grade}`);
} //console.log(studentArr1);

//2. forEach() method --> manually push to an array
const studentArr2 = [];
students.forEach((student) => {
    studentArr2.push(`${student.name}: ${student.grade}`);
}); //console.log(studentArr2);

//3. for...of method / for...in method (!) - not recommended for arrays
const studentArr3 = [];
for( const student of students ){
    studentArr3.push(`${student.name}: ${student.grade}`);
} //console.log(studentArr3);

//4. map() method --> returns a new array directly
const studentArr4 = students.map(
    (item, index, array) => `${item.name}: ${item.grade}`
); //console.log(studentArr4);
/*OR Using map() method inside a function*/
    function studentArr44(arr) {
        return arr.map(
            (item, index, array) => `${item.name}: ${item.grade}`
        );
    } console.log( studentArr44(students) );


//5. reduce() method
/* acc(accumulator) starts as an empty array [] (the value is carried over between iterations)
    On each iteration, we push the formatted string into acc.
    Return acc after each iteration.
    Finally, reduce() gives back the built array.
*/
const studentArr5 = students.reduce((acc, item, index, array) => {
    acc.push(`${item.name}: ${item.grade}`);
    return acc;
}, []); //console.log(studentArr5);


// =========================================
// Task 2: Create a new array that only includes the students who passed (grade is 60 or higher). isplay the result in the console
// =========================================
//1. for() loop
const passedStudents1 = [];
for( let i=0; i < getArrlength(students); i++ ) {
    if( students[i].grade >= 60 ) { passedStudents1.push(students[i]); }
} //console.log(passedStudents1);

//2. forEach() method
const passedStudents = [];
students.forEach((student) => {
    if( student.grade >= 60 ) { passedStudents.push(student); }
}); //console.log(passedStudents);

//3. filter() method
//3.1
/* const passedStudents3 = students.filter( //OR: const passedStudents3 = students.filter(student => student.grade >= 60);
        function(student) { return student.grade >= 60; }
    ); //console.log(passedStudents3);
*/  /*OR*/

//3.2
function checkGrade(student, val) { return student.grade >= val; }
const passedStudents3 = students.filter( //OR: const passedStudents3 = students.filter(student => checkGrade(student, 60));
    function(student) { return checkGrade(student, 60); }
); console.log(passedStudents3);


// =========================================
// Task 3: Calculate the average grade of the class. Round the result to 2 decimal places. Display the result in the console
// =========================================
//1. forEach() method / for() loop
let totalGrade1 = 0;
let averageGrade1;
students.forEach((student) => { totalGrade1 += student.grade; });
averageGrade1 = ( totalGrade1 / getArrlength(students) ).toFixed(2);
console.log(averageGrade1);

//2. reduce() method        acc, item, index, array
const totalGrade2 = students.reduce( //OR: const totalGrade2 = students.reduce( (acc, item, index, array) =>  acc + item.grade, 0 );
    (acc, item, index, array) =>  {
        return acc + item.grade;
    }, 0
);
const averageGrade2 = ( totalGrade2 / getArrlength(students) ).toFixed(2);
//console.log(averageGrade2);


// =========================================
// Task 4: Loop through the students and display(log) the result in the console:
// "<name> passed" if grade >= 60
// "<name> failed" if grade < 60
// =========================================
//1. for() loop / forEach() method
/*
    for( let i = 0; i < getArrlength(students); i++ ) {
        if (students[i].grade >= 60) {
            console.log(`${students[i].name} - passed`);
        } else {
            console.log(`${students[i].name} - failed`);
        }
        OR:
        //(students[i].grade >= 60) ? console.log(`${students[i].name} - passed`) : console.log(`${students[i].name} - failed`);
    }
*/
/*
    students.forEach((student) => {
            if(student.grade >= 60){
                console.log(`${student.name} - passed`);
            }else{
                console.log(`${student.name} - failed`);
            }
        OR:
        //(student.grade >= 60) ? console.log(`${student.name} - passed`) : console.log(`${student.name} - failed`);
    });
*/

//2. for...of method
/*
    for( const student of students ){
       if(student.grade >= 60){
            console.log(`${student.name} - passed`);
        }else{
            console.log(`${student.name} - failed`);
        }
        OR:
        //console.log( student.grade >= 60 ? `${student.name} - passed` : `${student.name} - failed` );
    }
*/

//3. map() method
const messages = students.map((item, index, array) => {
    if( item.grade >= 60 ){ return `${item.name} - passed`; }else{ return `${item.name} - failed`; }
});
messages.forEach((item, index, array) => { return console.log(item)} ); //OR: messages.forEach(item =>  console.log(item) );


// =========================================
// Task 5: Print each student’s name one by one using a loop. Display the result in the console
// =========================================
//1. for() loop
//for( let i = 0; i < getArrlength(students); i++ ) { console.log(students[i].name); }

//2. forEach() method
students.forEach( //OR: students.forEach(item => console.log(item.name));
    (item, index, array) => { return console.log(item.name); }
);

//3. for...of method
//for( const student of students ){ console.log(student.name); }

//4. map() method
//students.map((item, index, array) => { return console.log(item.name); }); //OR: students.map(item => console.log(item.name) );


// =========================================
// Bonus Task: Create a function that returns the student with the highest grade. Display the result in the console
// =========================================
//I. reduce() method
function getTopStudent(arr) {
    return arr.reduce( (acc, item, index, array)  => {
        //if( item.grade > acc.grade ){ return item; }else{ return acc; } //OR: return item.grade > acc.grade ? item : acc;
        if( item.grade > acc.grade ){ return item; }else{ return acc; }
    });
} //console.log(getTopStudent(students));
/* - Inside the reduce() callback, compare item.grade with acc.grade.
   - If item.grade is greater, return item as the new accumulator. Otherwise, keep the existing acc.
*/

//II. map() --> Math.max() --> find() method
//1) Get an array of all grades | Result: [85, 58, 95, 45, 72]
const grades = students.map((item, index, array) => { return item.grade;} ); //OR: const grades = students.map(item => item.grade);

//2.1) Get the highest grade using Math.max() with the spread operator
    //const maxGrade = Math.max(...grades); //95
//2.2) Get the highest grade using Math.max() with apply() method | apply() - method that lets you call a function with a given this value and an array of arguments.
    //OR: const maxGrade = Math.max.apply(null, grades); //95
    //OR: const minGrade = Math.min.apply(null, grades); //45
//2.3  Get the highest grade using reduce() method
const maxGrade = grades.reduce((acc, item, index, array) => {
    if( item > acc ){ return item; }else{ return acc; } //OR:  return (item > acc) ? item : acc;
});//95

//3) Find the student with that highest grade using find() method
const topStudent = students.find( (item, index, array) => { //OR: const topStudent = students.find(item => item.grade === maxGrade);
    return item.grade === maxGrade;
}); console.log(topStudent);


// =========================================
// In-Place Task 1: Add a new property to each student called "status". It should be set to "pass" or "fail" based on the grade
//Modify the original students array directly. Display the modified students array in the console
// =========================================
//1. for() loop
/*
    for( let i = 0; i < getArrlength(students); i++ ){
        if (students[i].grade >= 60) { students[i].status = "pass"; }else{ students[i].status = "fail"; }
    } console.log(students);
*/

//2.  for...of method
/*
    for( let student of students ) {
        if( student.grade >= 60 ){ student.status = "pass"; }else{ student.status = "fail"; }
    } console.log(students);
*/

//3. forEach() method
students.forEach((item, index, array) => {
    if( item.grade >= 60 ){ item.status = "pass"; }else{ item.status = "fail"; }
}); console.log(students);


// =========================================
// In-Place Task 2: Curve the grades by adding 5 points to each student's grade. Make sure no grade goes over 100.
// Modify the original students array directly. Display the modified students array in the console
// =========================================
//1. for() loop
/*
    for( let i = 0; i < getArrlength(students); i++ ){
        students[i].grade += 5;
        if( students[i].grade > 100 ){ students[i].grade = 100; }
    } console.log(students);
*/

//2.  for...of method
/*
    for( let student of students ) {
        student.grade += 5;
        if( student.grade > 100 ){ student.grade = 100; }
    } console.log(students);
*/

//3. forEach() method
/*
    students.forEach((item, index, array) => {
        item.grade += 5;
        if( item.grade > 100 ){ item.grade = 100; }
    }); console.log(students);
*/

//3. map() method
students.map((item, index, array) => {
    item.grade += 5;
    if( item.grade > 100 ){ item.grade = 100; }
    return item;
}); console.log(students);
//_____________________________________________________________________________________________________________