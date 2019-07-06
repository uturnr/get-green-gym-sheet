const gymSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Get Green'); //eslint-disable-line no-undef

const clearBests = row => { //eslint-disable-line no-unused-vars

  let startRow;
  let rowsToClear;
  const lastColumn = gymSheet.getLastColumn();
  const colsToClear = lastColumn - 1;

  if (row) { //clear row
    rowsToClear = 1;
    startRow = row;
  } else { // clear all
    const lastRow = gymSheet.getLastRow();
    rowsToClear = lastRow - 3;
    startRow = 3;
  }


  const bestsRange = gymSheet.getRange(startRow, 2, rowsToClear, colsToClear);
  bestsRange.setBackground(null);

}

export default clearBests;
