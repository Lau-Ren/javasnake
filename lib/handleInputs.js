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
