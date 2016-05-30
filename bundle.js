(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var tableController = require('./lib/tableController')
var inputController = require('./lib/inputController')
var playerController = require('./lib/playerController')
var intervalController = require('./lib/intervalController')

// --- RUN --- //
$(function () {
  tableController.generateTable(15)
  playerController.spawnPlayer($('#cell_0_7'))
  inputController.listen()
  intervalController.setMovementInterval(true)
  intervalController.setFoodInterval(true)
})

},{"./lib/inputController":4,"./lib/intervalController":5,"./lib/playerController":6,"./lib/tableController":7}],2:[function(require,module,exports){
var tableController = require('./tableController')

module.exports = {
  spawnFrequency: 2000,

  handleFood: function () {
    if (!$('td').hasClass('food')) this.spawnFood()
  },

  spawnFood: function () {
    $(tableController.returnRandomCell()).addClass('food')
  },

  consumeFood: function (foodCell) {
    foodCell.removeClass('food')
  }
}

},{"./tableController":7}],3:[function(require,module,exports){
var intervalController = require('./intervalController')
var tail = require('./tailController').tail

module.exports = {
  gameOver: function () {
    alert(`Gameover! Score: ${tail.length}`)
    window.location.reload()
  },
}

},{"./intervalController":5,"./tailController":8}],4:[function(require,module,exports){
var intervalController = require('./intervalController')
var playerController = require('./playerController')

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
    $(document).on("keyup", this.recieveInput.bind(this))
  },

  recieveInput: function (key) {
    var newDirection = inputs.get(key.which)
    if (newDirection) this.processInput(newDirection)
  },

  processInput: function (direction) {
    if (Math.abs(direction - playerController.direction) === 2) return
    intervalController.setMovementInterval(false)
    playerController.processMovement(direction)
    intervalController.setMovementInterval(true)
  }
}

},{"./intervalController":5,"./playerController":6}],5:[function(require,module,exports){
var playerController = require('./playerController')
var foodController = require('./foodController')

module.exports = {
  movementInterval: undefined,
  foodInterval: undefined,

  setMovementInterval: function (active) {
    if (active) {
      movementInterval = window.setInterval(function() {
        playerController.processMovement(playerController.direction)
    }, playerController.speed)
    } else {
      window.clearInterval(movementInterval)
    }
  },

  setFoodInterval: function (active) {
    if (active) {
      foodInterval = window.setInterval(function() {
        foodController.handleFood()
    }, foodController.spawnFrequency)
    } else {
      window.clearInterval(foodInterval)
    }
  },
}

},{"./foodController":2,"./playerController":6}],6:[function(require,module,exports){
var tableController = require('./tableController')
var foodController = require('./foodController')
var tailController = require('./tailController')
var gameController = require('./gameController')

module.exports = {
  speed: 300,
  direction: 3,

  spawnPlayer: function (playerCell) {
    playerCell.addClass('player')
  },

  processMovement: function (movement) {
    var oldCell = $('.player')
    var newCell = tableController.returnCellByDirection(oldCell, movement)
    this.direction = movement
    this.checkForCollisions(newCell)
    this.movePlayer(oldCell, newCell)
  },

  checkForCollisions: function (newCell) {
    if (!newCell.is('td') || newCell.hasClass('tail')) gameController.gameOver()
    if (newCell.hasClass('food')) {
      foodController.consumeFood(newCell)
      tailController.grow(newCell)
    }
  },

  movePlayer: function (oldCell, newCell) {
    oldCell.removeClass('player')
    newCell.addClass('player')
    tailController.update(oldCell)
  }
}

},{"./foodController":2,"./gameController":3,"./tableController":7,"./tailController":8}],7:[function(require,module,exports){
var randomInt = require('./utils').returnRandomInt

module.exports = {
  generateTable: function (size) {
    for (let i = 0; i < size; i++) {
      $('#table').append(`<tr id="row_${i}"></tr>`)
      for (let j = 0; j < size; j++) {
        $('#row_' + i).append(`<td id="cell_${i}_${j}"></td>`)
      }
    }
  },

  returnCellByDirection: function (oldCell, direction) {
    var cells = {
      1: oldCell.closest('tr').prev().children().eq(oldCell.index()),
      2: oldCell.next(),
      3: oldCell.closest('tr').next().children().eq(oldCell.index()),
      4: oldCell.prev()
    }
    return cells[direction]
  },

  returnRandomCell: function () {
    var cells = $('td').toArray()
    var randomCell = $(cells[randomInt(cells.length)])
    while (randomCell.hasClass('player') || randomCell.hasClass('tail')) {
      randomCell = $(cells[randomInt(cells.length)])
    }
    return randomCell
  }
}

},{"./utils":9}],8:[function(require,module,exports){
module.exports = {
  tail: [],

  update: function (newCell) {
    var previousCell
    for (var i = 0; i < this.tail.length; i++) {
      $(this.tail[i]).removeClass('tail')
      $(newCell).addClass('tail')
      previousCell = this.tail[i]
      this.tail[i] = newCell
      newCell = previousCell
    }
  },

  grow: function (newCell) {
    newCell.addClass('tail')
    this.tail.unshift(newCell.attr('id'))
  }
}

},{}],9:[function(require,module,exports){
module.exports = {
  returnRandomInt: function (max) {
    return Math.floor(Math.random() * (max - 0 + 1)) + 0
  }
}

},{}]},{},[1]);
