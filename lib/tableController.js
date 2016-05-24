module.exports = {
  generateTable: function (size) {
    for (let i = 0; i < size; i++) {
      $('#table').append(`<tr id="row_${i}"></tr>`)
      for (let j = 0; j < size; j++) {
        $('#row_' + i).append(`<td id="cell_${i}_${j}"></td>`)
      }
    }
  }
}
