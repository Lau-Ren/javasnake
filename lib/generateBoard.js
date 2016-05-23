module.exports = function generateBoard (size) {
  for (let i = 0; i < size; i++) {
    $('#table').append(generateRowElement(i))
    for (let j = 0; j < size; j++) {
      $('#row_' + i).append(generateCellElement(i, j))
    }
  }
}

function generateRowElement (rowNumber) {
  return `<tr id="row_${rowNumber}"></tr>`
}

function generateCellElement (rowNumber, cellNumber) {
  return `<td id="cell_${rowNumber}_${cellNumber}"></td>`
}
