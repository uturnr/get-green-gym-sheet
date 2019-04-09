var bestsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bests'); //eslint-disable-line no-undef

module.exports = function rebuildBests(row) { //eslint-disable-line no-unused-vars

  let startRow;
  let rowsToClear;
  const lastColumn = bestsSheet.getLastColumn();
  const colsToClear = lastColumn - 1;

  if (row) { //clear row
    rowsToClear = 1;
    startRow = row;
  } else { // clear all
    const lastRow = bestsSheet.getLastRow();
    rowsToClear = lastRow - 3;
    startRow = 3;
  }


  const bestsRange = bestsSheet.getRange(startRow, 2, rowsToClear, colsToClear);
  bestsRange.clearContent();

}
