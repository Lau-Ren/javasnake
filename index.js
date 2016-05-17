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
    1: $(oldCell).closest('tr').prev().children().eq($(oldCell).index()),
    2: $(oldCell).next(),
    3: $(oldCell).closest('tr').next().children().eq($(oldCell).index()),
    4: $(oldCell).prev()
  }
  return cells[direction]
}

function returnRandomCell () {
  let cells = $('td').toArray()
  let randomCell = $(cells[returnRandomInt(cells.length)])
  while ($(randomCell).hasClass('player') || $(randomCell).hasClass('tail')) {
    randomCell = $(cells[returnRandomInt(cells.length)])
  }
  return randomCell
}

// --- MOVEMENT ---

var movementInterval
var playerSpeed = 300
var direction = 3

function handleInputs (e) {
  window.clearInterval(movementInterval)
  if (e.which === 38) direction = 1
  if (e.which === 39) direction = 2
  if (e.which === 40) direction = 3
  if (e.which === 37) direction = 4
  handleMovement()
  startMovementInterval()
}

function handleMovement () {
  var oldCell = $('.player')
  var newCell = returnCellByDirection(oldCell, direction)
  checkForCollisions(newCell)
  movePlayer(oldCell, newCell)
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
  var randomCell = returnRandomCell()
  $(randomCell).addClass('food')
}

function consumeFood (foodCell) {
  foodCell.removeClass('food')
}

// --- UTILS ---

function returnRandomInt (max) {
  return Math.floor(Math.random() * (max - 0 + 1)) + 0
}

function checkForCollisions (newCell) {
  if (!newCell.is('td')) gameOver()
  if (newCell.hasClass('food')) consumeFood(newCell)
}

function gameOver () {
  // alert('game over! evidently you suck...')
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
