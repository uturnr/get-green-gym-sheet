var gymSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Gym'); //eslint-disable-line no-undef
var bestsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bests'); //eslint-disable-line no-undef
var clearBests = require('./clearBests');

function getBestWeight(todayWeight, bestWeight) {

  var result;
  if (
    todayWeight > bestWeight
    || (todayWeight === 0 && bestWeight === '')
  ) {
    result = todayWeight;
  } else {
    result = bestWeight;
  }
  return result;

}

function getBestReps(todayWeight, bestWeight, todayReps, bestReps) {

  var result;
  if (
    todayWeight > bestWeight
    || (todayWeight === 0 && bestWeight === '')
    || (
      todayWeight === bestWeight
      && todayReps > bestReps
    )
  ) {
    result = todayReps;
  } else {
    result = bestReps;
  }
  return result;

}

module.exports = function rebuildBests(row) { //eslint-disable-line no-unused-vars

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
    const lastRow = gymSheet.getLastRow();
    rowsToRebuild = lastRow - 3;
    startRow = 3;
  }


  const gymRange = gymSheet.getRange(startRow, 2, rowsToRebuild, colsToRebuild);
  const gymValues = gymRange.getValues();
  const newBestsValues = [];
  gymValues.forEach(function(rowArray, rowIndex) {

    // if (rowIndex === 0) { // while testing

      newBestsValues.push([]);

      rowArray.forEach(function(cellValue, colIndex) {
        if (colIndex < 4) { // copy values from first day

          newBestsValues[rowIndex].push(
            gymValues[rowIndex][colIndex]
          );

        } else {

          const set = colIndex % 4; // remember colIndex starts at 0 not 1

          if (set === 0) { // weight

            newBestsValues[rowIndex].push(getBestWeight(
              cellValue, // todayWeight
              newBestsValues[rowIndex][colIndex - 4] // bestWeight
            ));

          } else { // set

            newBestsValues[rowIndex].push(getBestReps(
              gymValues[rowIndex][colIndex - set], // todayWeight
              newBestsValues[rowIndex][colIndex - 4 - set], // bestWeight
              cellValue, // todayReps
              newBestsValues[rowIndex][colIndex - 4] // bestReps
            ));

          }

        }
      });

    // }


  });

  const newBestsRange = bestsSheet.getRange(startRow, 2, rowsToRebuild, colsToRebuild);
  // const newBestsRange = bestsSheet.getRange(3, 2, 1, lastColumn - 1); // while testing
  newBestsRange.setValues(newBestsValues);

}
