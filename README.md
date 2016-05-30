# Object Oriented Javasnake
Build a simple snake game with HTML, Object Oriented JavaScript, CSS and jQuery.

## Learning Objectives
1. Master HTML tables, rows and cells.
1. Practice using several useful jQuery methods, including: `addClass, removeClass, hasClass, next, closest, children, index, append, on`, and `eq`.
1. Learn about using `window.setInterval()` to handle timed or reoccurring events.
1. Really embrace the idea of objects as modules. Give each of your controller objects its own .js file, and require them in as needed.
1. Make the game your own! Go wild with the CSS, or add in a unique new feature.

## Plan
1. Make a sequential list of steps for yourself before you begin.
1. What is your MVP?
1. What will your functions do? How will the app flow?  

## HTML
The HTML for this project will be very minimal. We'll be building the table and rows programmatically, rather than hard coding them in to the index.html. Something as simple as this will suffice:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>JavaSnake</title>
    <link rel="stylesheet" type="text/css" href="index.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="bundle.js"></script>
  </head>
  <body>
    <h1>JavaSnake</h1>
    <table id="table">
    </table>
  </body>
</html>
```
The only real points of interest here are the script calls for jQuery and bundle.js. The project is set up to use watchify, so all of the code in our lib directory will get bundled up and served to our index.html when the `npm start` command is run.

## CSS
The CSS in this code is extremely basic. It simply sets the color of our table cells in their various states. Inactive, Player, Tail and Food.

## JavaScript
The skeleton for this project is already laid out. We have all our controllers, it's just a matter of determining the actions our methods need to perform to get it all up and running. Remember, this game is an exercise in Object Oriented Programming. We're going to be building all of our state variables and functions as *key : value* pairs within the controller objects. The controllers will then be required in where needed. IE: `var player = require('./playerController')`. And you will call your methods off the variables. IE: `player.movePlayer()`.

## The Table
HTML tables, rows and cells can be a little tricky to navigate when you first start using them. However, they do offer a reliable and scalable way to manage game boards, and are perfect for our purposes. Instead of hard coding one in, we're going to be generating a square table programmatically. Based on a size variable we pass in, our `generateTable` method should build the game board for us. Nested for loops should do the trick:
```
generateTable: function (size) {
  for ( ) {
    // generating rows
    for ( ) {
      // generating cells
    }
  }
},
```

## jQuery
A big part of this project revolves around using jQuery objects and functions. Especially important is being able to find and manipulate cells, based on the direction your snake is facing. The [.closest()](https://api.jquery.com/closest/) and [.next()](https://api.jquery.com/next/) functions might be especially useful here.

## Intervals
All of the timed events in this game will be controlled with `window.setInterval()`. Documentation for which can be found [here](http://www.w3schools.com/jsref/met_win_setinterval.asp). You set intervals to perform certain action after a certain number of milliseconds. IE:
```
var foodInterval = window.setInterval(function() {
  foodController.handleFood()
}, foodController.spawnFrequency)
```
Here we set the foodController to handle the food spawning process, every time the foodController.spawnFrequency elapses.

## Key Presses
We probably want to move our snake using the arrow, or ASDW keys. The `inputController` will be set up to listen for these keyup events, and fire movement functions on the `playerController` when appropriate. Read up on [keyup events](https://api.jquery.com/keyup/).

## The Tail
By far the trickiest part of this game is the snake's tail. Getting it to follow the player, and grow when new food is consumed, is a tough thing. The majority of the heavy lifting will be done over in the `tailController.update()` function. What might that look like?
```
update: function (newCell) {
  for (var i = 0; i < this.tail.length; i++) {
    // the tail array contains cells that currently contain tail
    // on every update, the tail cells eeds to slide forwards, one position
    previousCell = this.tail[i]
    this.tail[i] = newCell
    newCell = previousCell
  }
},
```

## Game Over
What are the conditions that must be met for the game to be over?
