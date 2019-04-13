var polyfills = require('./polyfills');
var chroma = require('chroma-js');

polyfills();

var gymSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Get Green'); //eslint-disable-line no-undef
var clearBests = require('./clearBests');

var colors = {
  bestWeight: '#70e69c',
  bestReps: '#a1efb9',
  same: null,
  background: '#e7effa',
  fail: '#ff99a2',
}

function getWeightColorAndBest(todayWeight, bestWeight) {

  var color;
  var best = bestWeight;
  if (todayWeight === '') { 
    color = colors.background;
  } else if (
    todayWeight > bestWeight
    || (todayWeight === 0 && bestWeight === '')
  ) {
    color = colors.bestWeight;
    best = todayWeight;
  } else if (todayWeight === bestWeight) {
    color = colors.same;
  } else {
    color = colors.fail;
  }
  return { color, best };

}

function getRepColorAndBest(todayWeight, bestWeight, todayReps, bestReps) {

  var color;
  var best = bestReps;
  if (
    todayWeight <= bestWeight
    && todayReps === ''
  ) {
    color = colors.background;
  } else if (
    todayWeight > bestWeight
    && todayReps === ''
  ) {
    color = colors.background;
    best = todayReps;
  } else if (
    todayWeight > bestWeight
    || (todayWeight === 0 && bestWeight === '')
    || (
      todayWeight === bestWeight
      && todayReps > bestReps
    )
  ) {
    color = colors.bestReps;
    best = todayReps;
  } else if (
    ( 
      todayWeight === bestWeight
      && todayReps === bestReps
    ) || (
      todayWeight < bestWeight
    )
  ) {
    color = colors.same;
  } else {
    let failScale = Math.min(((bestReps - todayReps) / bestReps) * 2, 1);
    color = chroma.mix('white', colors.fail, failScale, 'lch').hex();
  }
  return { color, best };

}

module.exports = function recolor(row) { //eslint-disable-line no-unused-vars

  // row for 1 row, if empty, all rows
  if (!row) {
    clearBests();
  }

  let startRow;
  let rowsToRebuild;
  const lastColumn = gymSheet.getLastColumn();
  const colsToRebuild = lastColumn - 1;

  if (row) {
    rowsToRebuild = 1;
    startRow = row;
  } else {
    rowsToRebuild = gymSheet.getLastRow();
    startRow = 1;
  }


  const gymRange = gymSheet.getRange(startRow, 2, rowsToRebuild, colsToRebuild);
  const gymValues = gymRange.getValues();
  const bestValues = [];
  const newColors = [];
  /*
    gymValues is an array of arrays
    [
      [cell,cell,cell],
      [cell,cell,cell],
    ]
    newColors and bestValues will follow the same shape
  */
  gymValues.forEach((rowArray, rowI) => {

    // if (rowI === 0) { // while testing

    newColors.push([]); // new empty row
    bestValues.push([]); // new empty row
    
    let rowType = 'data';
    if (
      (
        typeof rowArray[0] === 'string'
        && rowArray[0].length > 0
      ) || (
        typeof rowArray[0] === 'object'
      )
    ) {
      rowType = 'info';
    }
    
    rowArray.forEach((cellVal, colI) => {
      // do not color info cells or cells from first day
      if (rowType === 'info' || colI < 4) {
        let plainColor = (
          cellVal === ''
          ? colors.background
          : colors.same
        );
        newColors[rowI].push(plainColor);
        bestValues[rowI].push(cellVal);
      } else {        
        const set = colI % 4; // remember colI starts at 0 not 1
        
        let colorAndBest;

        if (set === 0) { // weight
          colorAndBest = getWeightColorAndBest(
            cellVal, // todayWeight
            bestValues[rowI][colI - 4] // bestWeight
          );
        } else { // set
          colorAndBest = getRepColorAndBest(
            gymValues[rowI][colI - set], // todayWeight
            bestValues[rowI][colI - 4 - set], // bestWeight
            cellVal, // todayReps
            bestValues[rowI][colI - 4] // bestReps
          );
        }
        
        newColors[rowI].push(colorAndBest.color);
        bestValues[rowI].push(colorAndBest.best);
      }
    });


  });

  const newBestsRange = gymSheet.getRange(startRow, 2, rowsToRebuild, colsToRebuild);
  // const newBestsRange = bestsSheet.getRange(3, 2, 1, lastColumn - 1); // while testing
  newBestsRange.setBackgrounds(newColors);

}
