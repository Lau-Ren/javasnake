var intervals = require('./intervalController')
var tableController = require('./tableController')
var gameController = require('./gameController')
var foodController = require('./foodController')
var tail = require('./tailController')

module.exports = {
  processMovement: function (direction) {
    var oldCell = $('.player')
    var newCell = tableController.returnCellByDirection(oldCell, direction)
    this.checkForCollisions(newCell)
    this.movePlayer(oldCell, newCell)
    tail.update(oldCell)
  },

  checkForCollisions function (newCell) {
    if (!newCell.is('td') || newCell.hasClass('tail')) gameController.gameOver()
    if (newCell.hasClass('food')) foodController.consumeFood(newCell)
  },

  movePlayer: function (oldCell, newCell) {
    oldCell.removeClass('player')
    newCell.addClass('player')
  }
}
