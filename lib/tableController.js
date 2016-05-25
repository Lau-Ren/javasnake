module.exports = {
  generateTable: function (size) {
    for (let i = 0; i < size; i++) {
      $('#table').append(`<tr id="row_${i}"></tr>`)
      for (let j = 0; j < size; j++) {
        $('#row_' + i).append(`<td id="cell_${i}_${j}"></td>`)
      }
    }
  },

  returnCellByDirection: function (oldCell, direction) {
    var cells = {
      1: oldCell.closest('tr').prev().children().eq(oldCell.index()),
      2: oldCell.next(),
      3: oldCell.closest('tr').next().children().eq(oldCell.index()),
      4: oldCell.prev()
    }
    return cells[direction]
  }
}
