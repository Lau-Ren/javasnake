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
