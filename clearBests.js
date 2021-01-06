import { firstColoredRow, firstEntryRow } from './constants';
import { colsPerDay, firstColoredCol, firstWeightCol, uncoloredCols } from './variables';

const gymSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Get Green'); //eslint-disable-line no-undef

const clearColors = (startRow, rowsToClear) => {
  
  const lastColumn = gymSheet.getLastColumn();
  const colsToClear = lastColumn - uncoloredCols;
  
  const colorRange = gymSheet.getRange(startRow, firstColoredCol, rowsToClear, colsToClear);
  colorRange.setBackground(null);

}

const clearBestNumbers = (startRow, rowsToClear) => {
  
  const bestNumberRange = gymSheet.getRange(startRow, firstWeightCol, rowsToClear, colsPerDay);
  bestNumberRange.clear();
  
}

const clearBests = row => { //eslint-disable-line no-unused-vars

  let numberStartRow;
  let colorStartRow;
  let rowsToClear;

  if (row) { //clear row
    rowsToClear = 1;
    numberStartRow, colorStartRow = row;
  } else { // clear all
    const lastRow = gymSheet.getLastRow();
    rowsToClear = lastRow;
    numberStartRow = firstEntryRow;
    colorStartRow = firstColoredRow;
  }
  
  clearColors(colorStartRow, rowsToClear);
  clearBestNumbers(numberStartRow, rowsToClear);

}

export default clearBests;
