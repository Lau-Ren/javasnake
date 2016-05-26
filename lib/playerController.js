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
