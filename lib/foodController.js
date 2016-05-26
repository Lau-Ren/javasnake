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
