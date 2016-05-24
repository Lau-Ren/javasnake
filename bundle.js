(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// --- TABLE ---
var generateBoard = require('./lib/generateBoard')
var handleInputs = require('./lib/handleInputs')
var inputController = require('./lib/inputController')

function returnCellByDirection (oldCell, direction) {
  let cells = {
    1: oldCell.closest('tr').prev().children().eq(oldCell.index()),
    2: oldCell.next(),
    3: oldCell.closest('tr').next().children().eq(oldCell.index()),
    4: oldCell.prev()
  }
  return cells[direction]
}

function returnRandomCell () {
  let cells = $('td').toArray()
  let randomCell = $(cells[returnRandomInt(cells.length)])
  while (randomCell.hasClass('player') || randomCell.hasClass('tail')) {
    randomCell = $(cells[returnRandomInt(cells.length)])
  }
  return randomCell
}

// --- MOVEMENT ---
var movementInterval
var previousCell
var playerSpeed = 300
var direction = 3



function directionValid (newDirection) {
  if (tail.length > 0) {
    if (direction === 1 && newDirection === 3) return false
    if (direction === 2 && newDirection === 4) return false
    if (direction === 3 && newDirection === 1) return false
    if (direction === 4 && newDirection === 2) return false
  }
  return true
}

function handleMovement (newDirection) {
  if (newDirection) {
    if (directionValid(newDirection)) {
      direction = newDirection
    } else {
      return
    }
  }
  var oldCell = $('.player')
  var newCell = returnCellByDirection(oldCell, direction)
  checkForCollisions(newCell)
  movePlayer(oldCell, newCell)
  updateTail(oldCell)
}

function movePlayer (oldCell, newCell) {
  oldCell.removeClass('player')
  newCell.addClass('player')
}

function startMovementInterval () {
  movementInterval = window.setInterval(function() {
    handleMovement()
  }, playerSpeed)
}

// --- PLAYER ---
function spawnPlayer (playerCell) {
  playerCell.addClass('player')
}

function checkForCollisions (newCell) {
  if (!newCell.is('td') || newCell.hasClass('tail')) gameOver()
  if (newCell.hasClass('food')) consumeFood(newCell)
}

// --- FOOD ---
var foodSpawnFrequency = 2000

function startFoodInterval () {
  var foodInterval = window.setInterval(function() {
    handleFood()
  }, foodSpawnFrequency)
}

function handleFood () {
  if (!$('td').hasClass('food')) {
    spawnFood()
  }
}

function spawnFood () {
  $(returnRandomCell()).addClass('food')
}

function consumeFood (foodCell) {
  foodCell.removeClass('food')
  foodCell.addClass('tail')
  tail.unshift(foodCell.attr('id'))
}

// --- TAIL ---
var tail = []

function updateTail (newCell) {
  var previousCell
  for (let i = 0; i < tail.length; i++) {
    $(tail[i]).removeClass('tail')
    $(newCell).addClass('tail')
    previousCell = tail[i]
    tail[i] = newCell
    newCell = previousCell
  }
}

// --- UTILS ---
function returnRandomInt (max) {
  return Math.floor(Math.random() * (max - 0 + 1)) + 0
}

function gameOver () {
  // alert('Gameover!')
  window.location.reload()
}

// --- RUN ---
$(function () {
  generateBoard(15)
  spawnPlayer($('#cell_0_7'))
  // $(document).on("keyup", handleInputs)
  startMovementInterval()
  startFoodInterval()
  inputController.listen()
})

},{"./lib/generateBoard":3,"./lib/handleInputs":4,"./lib/inputController":6}],2:[function(require,module,exports){
module.exports = {
  spawnFrequency: 2000
}

},{}],3:[function(require,module,exports){
module.exports = function generateBoard (size) {
  for (let i = 0; i < size; i++) {
    $('#table').append(generateRowElement(i))
    for (let j = 0; j < size; j++) {
      $('#row_' + i).append(generateCellElement(i, j))
    }
  }
}

function generateRowElement (rowNumber) {
  return `<tr id="row_${rowNumber}"></tr>`
}

function generateCellElement (rowNumber, cellNumber) {
  return `<td id="cell_${rowNumber}_${cellNumber}"></td>`
}

},{}],4:[function(require,module,exports){
var handleMovement = require('./handleMovement')
var intervalController = require('./intervalController')

module.exports = function handleInputs (e) {
  var newDirection
  if (e.which === 38) newDirection = 1
  if (e.which === 39) newDirection = 2
  if (e.which === 40) newDirection = 3
  if (e.which === 37) newDirection = 4
  intervalController.setMovementInterval(false)
  handleMovement(newDirection)
  intervalController.setMovementInterval(true)
}

},{"./handleMovement":5,"./intervalController":7}],5:[function(require,module,exports){

},{}],6:[function(require,module,exports){
var handleMovement = require('./handleMovement')
var intervalController = require('./intervalController')
var inputs = new Map([
   [38, 1],
   [39, 2],
   [40, 3],
   [37, 4],
   [65, 4],
   [83, 3],
   [68, 2],
   [87, 1],
  ])

module.exports = {
  listen: function () {
    $(document).on("keyup", this.recieveInput)
  },

  recieveInput: function (key) {
    if (!inputs.get(key.which)) return
    this.processInput(key.which)
  },

  processInput: function (input) {
    if (Math.abs(input - player.direction)) console.log('backwards!')
  }
}
// }function handleInputs (e) {
//   var newDirection =
//   if (e.which === 38) newDirection = 1
//   if (e.which === 39) newDirection = 2
//   if (e.which === 40) newDirection = 3
//   if (e.which === 37) newDirection = 4
//   intervalController.setMovementInterval(false)
//   handleMovement(newDirection)
//   intervalController.setMovementInterval(true)
// }

},{"./handleMovement":5,"./intervalController":7}],7:[function(require,module,exports){
var player = require('./playerController')
var food = require('./foodController')

module.exports = {
  movementInterval: undefined,
  foodInterval: undefined,

  setMovementInterval: function (active) {
    if (active) {
      movementInterval = window.setInterval(function() {
      handleMovement()
    }, player.speed)
    } else {
    window.clearInterval(movementInterval)
    }
  },

  setFoodInterval: function () {
    foodInterval = window.setInterval(function() {
      handleFood()
    }, food.spawnFrequency)
  }
}

},{"./foodController":2,"./playerController":8}],8:[function(require,module,exports){
module.exports = {
  speed: 300
}

},{}]},{},[1]);
