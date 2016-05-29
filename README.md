# Object Oriented Javasnake
Build a simple snake game with HTML, Object Oriented JavaScript, CSS and jQuery.

## Learning Objectives
1. Master HTML tables, rows and cells.
1. Practice using several useful jQuery methods, including: `addClass, removeClass, hasClass, closest, children, index, append, on`, and `eq`.
1. Learn about using `window.setInterval()` to handle timed or reoccurring events.
1. Really embrace the idea of objects as modules. Give each of your controller objects its own .js file, and require them in as needed.
1. Make the game your own! Go wild with the CSS, or add in a unique new feature.

## Plan
1. Make a sequential list of steps for yourself before you begin.
1. What is your MVP?
1. What functions will you need? How will the app flow?  

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
The skeleton for this project is already laid out. We have all our controllers, it's just a matter of determining the methods we need to get it all up and running. Remember, this game is an exercise in Object Oriented Programming, 
