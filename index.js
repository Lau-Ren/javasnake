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
