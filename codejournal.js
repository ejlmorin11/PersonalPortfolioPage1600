/* Variables - containers that store values
    Multi-line comment here */
// let (mutable)
// const (immutable)

var name; // a declared variable, but not initialized
//and it's in the global scope (BAD)

let foo; // a declared variable that can be changed

//const bar; // a delcared variable that cannot be 
//changed - short for 'constant'
//these days, developers use constant as their go to

const ANSWER = 42; // const is declared and initialized
//with the value 42. Syntax says consts are in ALL CAPS

// Strings is just a string of characters that are put together. 
//It either starts with double or single quotes

let string1 = "Hello World!" // preferred

let string2 = new String("Hello World") // string constructor,
// string is a function in this case

// Number

let myNum = 2903824;

let myNum2 = 345.89;

"1" == 1; // this statement is true because of type
//coercion and loose equality checking
"1" === 1; // false because this is strict equality
//checking

// Boolean

let myBool = true;

// Array

let myArray = []; // this is an empty array

//
let myArray2 = [0, "Bob", myBool, ANSWER, true];

let secondEleement = myArray2[1]; // the second position is at index #1

myArray2.push("Thor"); // added an element to the end of myArray2

let mylongString = "adfakldfkjlafmcmadfj;adsfjak;ldsfja;kdslfjads;klfja;sdkfj"

mylongString.length;

// Object

let minObject = {};

const myCar = {
    make: "Chevrolet",
    color: "Red",
    year: "1965",
    vin: "2349905969696969"
};

myCar.numDoors = 4; //this adds the prop numDoors = 4. 4 is the value 



//behavior, interactivity = JS
//style = css
//structure = HTML

//notes 10/12

const anotherObject = {
    words: ["food", "bar", "baz"],
    car: {
        make: "McLaren",
        model: "675LT"
    },
    awesomeness: true
}

//Functions

function myFunction() {
    return "My greeting to you..."
}

function sumTwoThings(one, two) {
    // watch out for date types issues here!
    return one + two; // if numbers, will add them. If strings, will concatenate
}

// [] = array, {} = object, () = function