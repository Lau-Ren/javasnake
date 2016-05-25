var player = require('./playerController')
var movementController = require('./movementController')

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
    if (newDirection) this.processInput(newDirection) // checks if key is valid
  },

  processInput: function (direction) {
    if (Math.abs(direction - player.direction) === 2) return // prevents backwards input
    movementController.processMovement(direction)
  }
}
