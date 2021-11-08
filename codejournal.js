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

// Arrow Functions

element => console.log(element) // implicit 'return' when only one line for the function
element = {
    let foo = 'bar' + 'baz'
    return console.log(element) // explicit 'return' because of multiple lines
}
(num1, num2) => num1 + num2

// basic syntax is num => 'The Num'

// a higher order function is a function that accepts another funciton as a aparameter.
// filter, map, and reduce are the most popoular, but forEach, every, find, and some are also
HTMLFormControlsCollection

const the Function = () => {
    //multiple lines use curly braces and 'return' keyword
    return "I am awesome";
};

// Filter method example. Filter returns an array of all elements that 'pass the test'
const pilots = [
    {
        id: 2,
        name: "Wedge Antilles",
        faction: "Rebels"
    },
    {
        id: 8,
        name: "Ciena Ree",
        faction: "Empire"
    },
    {
        id: 40,
        name: "Iden Versio",
        faction: "Empire"
    },
    {
        id: 66,
        name: "Thane Kyrell",
        faction: "Rebels"
    }
];

const rebels = pilots.filter((pilot) => pilot.faction === "Rebels");
const empire = pilots.filter((pilot) => {
    return pilot.faction === "Empire";
})

// Array helper method 'map' example

let filmURLs = [
    "https://swapi.co/api/films/",
    "https://swapi.co/api/films/5/",
    "https://swapi.co/api/films/4/this one is longer... even longer",
    "https://swapi.co/api/films/6/",
    "https: ",
    "https://swapi.co/api/films/1/"
  ];
  
  const filmLengths = filmURLs.map((filmURL) => filmURL.length);
  
  const filmPlusMore = filmURLs.map((filmURL) => {
    let filmObj = {
      index: filmURL,
      date: Date.now()
    };
    return filmObj;
  });
  
  const pilotNames = pilots.map((pilot) => pilot.name).filter(item => item !== undefined);
  
  // Reduce example

  const array1 [1, 2, 3, 4];
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  // 1 + 2 + 3 + 4
  console.log(array1.reduce(reducer));
  // expected output: 10

  // 5 + 1 + 2 + 3 + 4
  console.log(array1.reduce(reducer, 5));
  // expected output; 15

const swpilots = [
    {
      id: 10,
      name: "Poe Dameron",
      years: 14
    },
    {
      id: 2,
      name: "Temmin 'Snap' Wexley",
      years: 30
    },
    {
      id: 41,
      name: "Tallissan Lintra",
      years: 16
    },
    {
      id: 99,
      name: "Ello Asty",
      years: 22
    },
  ];
  
  const totalYears = swpilots.reduce((acc, pilot) => acc + pilot.years, 0);
  
  const mostExpPilot = swpilots.reduce((oldest, pilot) => {
    return (oldest.years || 0) > pilot.years ? oldest : pilot;
  }, {});

  // Now we combine map, reduce, and filter

const personnel = [
    {
      id: 5,
      name: "Luke Skywalker",
      pilotingScore: 98,
      shootingScore: 56,
      isForceUser: true
    },
    {
      id: 82,
      name: "Sabine Wren",
      pilotingScore: 73,
      shootingScore: 99,
      isForceUser: false
    },
    {
      id: 22,
      name: "Zeb Orellios",
      pilotingScore: 20,
      shootingScore: 59,
      isForceUser: false
    },
    {
      id: 15,
      name: "Ezra Bridger",
      pilotingScore: 43,
      shootingScore: 67,
      isForceUser: true
    },
    {
      id: 11,
      name: "Caleb Dume",
      pilotingScore: 71,
      shootingScore: 85,
      isForceUser: true
    }
  ];
  
  let jediPersonnel = personnel.filter((person) => person.isForceUser);
  
  let jediScores = jediPersonnel.map(
    (jedi) => jedi.pilotingScore + jedi.shootingScore
  );
  
  let totalJediScore = jediScores.reduce((acc, score) => acc + score, 0);
  
  const totalJediScoreChained = personnel
    .filter((person) => person.isForceUser)
    .map((jedi) => jedi.pilotingScore + jedi.shootingScore)
    .reduce((acc, score) => acc + score, 0);
  
  // Ternary operator syntax: condition ? exprIfTrue : exprIfFalse
  
  const totalJediScoreReduce = personnel.reduce(
    (acc, person) =>
      person.isForceUser
        ? acc + person.pilotingScore + person.shootingScore
        : acc,
    0
  );