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
