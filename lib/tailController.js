module.exports = {
  tail: [],

  update: function (newCell) {
    var previousCell
    for (var i = 0; i < this.tail.length; i++) {
      $(this.tail[i]).removeClass('tail')
      $(newCell).addClass('tail')
      previousCell = this.tail[i]
      this.tail[i] = newCell
      newCell = previousCell
    }
  },

  grow: function (newCell) {
    newCell.addClass('tail')
    this.tail.unshift(newCell.attr('id'))
  }
}
