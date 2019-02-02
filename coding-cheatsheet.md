Coding Cheatsheet

## Core JavaScript

### Sorting Arrays: `array.sort()`

Sorting arrays of numbers or strings:

```javascript
var unsorted, sorted;

unsorted = [1, 3, 2];
sorted = unsorted.sort();
console.log(sorted); // outputs [1, 2, 3]

unsorted = ["Zebra", "Armadillo", "Wombat"];
var sorted = unsorted.sort();
console.log(sorted); // outputs ["Armadillo", "Wombat", "Zebra"]
```

Using a custom sort function:

```javascript
var unsorted, sorted;

unsorted = [1, 3, 2];
sorted = unsorted.sort(reverseSort);
console.log(sorted); // outputs [3, 2, 1]

function reverseSort(a, b) {
  return (b - a);
}
```

Full documentation for `array.sort()`, including how the sorting function works on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

### Manipulating Arrays: `array.slice()`

Chop off the first `n` elements of an array:

```javascript
var startPosition, originals, survivors;

startPosition = 2; // Discard Array elements at any position (index) less than 2
originals = ["remove me", "delete me too", "keep me", "also keep me please!"]
survivors = originals.slice(startPosition);

console.log(survivors); // outputs ["keep me", "also keep me please!"]
```

Slice out an inner piece of an array:

```javascript
var startPosition, endPosition, originals, survivors;

startPosition = 1; // Discard Array elements at any position less than 1
endPosition = 4; // Stop slicing at position 4 (NOT including element at position 4!)
originals = ["unneeded", "important", "stuff", "here", "unimportant"]
survivors = originals.slice(startPosition, endPosition);

console.log(survivors); // outputs ["important", "stuff", "here"]
```

Full documentation for `array.slice()` on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

## NPM Basics

### For a _New_ Project:

Initialize a `package.json` for tracking NPM packages for your project:

1. Run: `npm init` (creates the **package.json** file):
   1. Enter values when prompted, or hit **[Enter]** for default / blank values
2. Create a **.gitignore** file: `touch .gitignore`
3. Add the following line to the **.gitignore** file: `node_modules/`
4. If needed, initialize a git repo: `git init`
4. Commit _both_ your **package.json** and **.gitignore** files to your repo.

### For an _Existing_ Project:

Install NPM packages needed for the project:

1. `npm install`
2. If there are errors:
   1. clear out your **node_modules** directory by running `rm -rf node_modules`
   2. run `npm install` again

### To add an NPM Package to a Project:

1. Run `npm install some-package` (**some-package** is the package to install)
2. Commit the changes to `package.json` and `package-lock.json` to your repo

## Node Debugger: The `inspect-process` Package

### Initializing:

1. Install globally: `npm install -g inspect-process`
1. Open your file (e.g. `script.js`) and add `debugger;` on one more lines (i.e. instead of `console.log`)
1. Run your file: `inspect script.js`

### Basic Usage:

1. Mouse over variables to see their values (more powerful than `console.log` which can only show you one variable at a time)
2. Press the "play" button to resume execution to the next `debugger;` statement (AKA "breakpoint")

## Useful NPM Packages

### Weather Lookup: `weather-js`

Usage:

```javascript
var weather = require('weather-js');

weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) {
  if(err) console.log(err);
 
  console.log(JSON.stringify(result, null, 2));
});
```

Full documentation on [npmjs.com](https://www.npmjs.com/package/weather-js).

### Lat / long Lookup: `node-geocoder`

Returns the lat / long coordinates for a given a street address.

Usage:

```javascript
var NodeGeocoder = require("node-geocoder");

var geocoder = NodeGeocoder(options);
 
// Using callback
geocoder.geocode('29 champs elysée paris', function(err, res) {
  console.log(res);
});
```

Can also be used for a reverse lookup; see online documentation for details.

Full documentation on [npmjs.com](https://www.npmjs.com/package/node-geocoder).

### Interactive Command Line: `inquirer`

Improves upon `process.argv` as it can prompt the user and take multiple input types.

Usage:

```javascript
var inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "username"
    },
    {
      type: "password",
      message: "Set your password",
      name: "password"
    },
    {
      type: "list",
      message: "Which Pokemon do you choose?",
      choices: ["Bulbasaur", "Squirtle", "Charmander"],
      name: "pokemon"
    },
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    console.log(inquirerResponse);
  });
```

Full documentation on [GitHub](https://github.com/SBoudrias/Inquirer.js/#documentation).
