var intervalController = require('./intervalController')
var tail = require('./tailController').tail

module.exports = {
  gameOver: function () {
    alert(`Gameover! Score: ${tail.length}`)
    window.location.reload()
  },
}
