# KegJS

## About

KegJS is a JavaScript library which aims to simplify the storage,retrieval and querying of data in particular in single page JavaScript applications.
It provides an interface that feels natural to database developers to read and write to an underlying JSON data model.

> **Please Note:** KegJS is not production ready and is for experimental use only.

## Features
- Create collections (tables) to store occurences of different entity types used by your application.
- Create entries (rows) to store data as any JavaScript data type.
- Filter collection entries by column values.
- Update column values for filtered results.
- Calculate aggregate functions on a filtered results.
- Export the entire data model to JSON or browser localStorage for importing again later with the option to use data compression.

## Browser Imports
```html
<!-- Dependency LZUTF8 required for string compression -->
<script id="lzutf8" src="https://cdn.jsdelivr.net/npm/lzutf8/build/production/lzutf8.min.js"></script>

<!-- KegJS -->
<script src="KegJS.bundle.js"></script>
```

## Basic Usage Example

```js
//Create a Keg
var keg = new KegJS();

// Let's say "Person" is an entity type in your application:
var person = keg.createCollection("Person");

//Say we want to track whether the person owns a dog, FALSE by default
person.setDefaultColumnValue("dogOwner",false);

//Create a function for adding people to the collection we will specify their first name, last name and age
var addPerson = person.buildCreateFunction(["firstName","lastName","age"]);

//Add some entries to the collection...
addPerson(["John","Doe",35]);
addPerson(["Jane","Doe",33]);
addPerson(["Joe","Bloggs",42]);

//Let's now search for John...
var filtered1 = person.filter("firstName").equals("John");
var l1 = filtered1.length(); 
console.log(l1); // 1

var john = filtered1.index(0);
// or, put simply:
john = filtered1.first();

// Let's retrieve his age...
var age = john.get("age"); 
console.log(age); // 35

// John gets a dog...
john.set("dogOwner",true);

// How many people now do not have dogs?
var filtered2 = person.filter("dogOwner").equals(false);
var l2 = filtered2.length();
console.log(l2); // 2 

// What is the average age of our "Person" collection?
var mean1 = person.column("age").mean(); 
console.log(mean1); // 36.67

// What about those who do not have dogs?
var mean2 = filtered2.column("age").mean();
console.log(mean2); // 37.5

//Lets save our keg for later:
keg.toLocalStorage("myKeg");

//Retrieving the data model:
var keg2 = new KegJS();
keg2.fromLocalStorage("myKeg");


```



