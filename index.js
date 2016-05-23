// --- TABLE ---
function generateBoard (size) {
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

function handleInputs (e) {
  var newDirection
  if (e.which === 38) newDirection = 1
  if (e.which === 39) newDirection = 2
  if (e.which === 40) newDirection = 3
  if (e.which === 37) newDirection = 4
  window.clearInterval(movementInterval)
  handleMovement(newDirection)
  startMovementInterval()
}

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
  alert('Gameover!')
  window.location.reload()
}

// --- RUN ---
$(function () {
  generateBoard(15)
  spawnPlayer($('#cell_0_7'))
  $(document).on("keyup", handleInputs)
  startMovementInterval()
  startFoodInterval()
})
