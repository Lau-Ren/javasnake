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
