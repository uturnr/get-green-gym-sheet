import polyfills from './polyfills';
import chroma from 'chroma-js';
import clearBests from './clearBests';
import { firstBestsCol, firstColoredRow } from './constants';
import { colsPerDay, firstEntryCol, nonEntryCols } from './variables';

polyfills();

const gymSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Get Green');

const colors = {
  bestWeight: '#70e69c',
  bestReps: '#a1efb9',
  same: null,
  background: '#e7effa',
  fail: '#ff99a2',
}

const getWeightColorAndBest = (todayWeight, bestWeight) => {

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

const getRepColorAndBest = (todayWeight, bestWeight, todayReps, bestReps) => {

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

const rebuild = row => {

  // If row is not passed, rebuild all rows.
  if (!row) {
    clearBests();
  }

  let startRow;
  let rowsToRebuild;
  const lastColumn = gymSheet.getLastColumn();
  const colsWithEntries = lastColumn - nonEntryCols;

  if (row) {
    rowsToRebuild = 1;
    startRow = row;
  } else {
    rowsToRebuild = gymSheet.getLastRow();
    startRow = firstColoredRow;
  }

  const bestsRange = gymSheet.getRange(startRow, firstBestsCol, rowsToRebuild, colsPerDay)
  const entriesRange = gymSheet.getRange(startRow, firstEntryCol, rowsToRebuild, colsWithEntries);
  const entriesValues = entriesRange.getValues();
  const bestValuesByDay = [];
  const newColors = [];
  const finalBestValues = [];
  /*
    gymValues is an array of arrays
    [
      [cell,cell,cell],
      [cell,cell,cell],
    ]
    newColors and bestValuesByDay and finalBestValues will follow the same shape
  */
  entriesValues.forEach((rowArray, rowI) => {

    newColors.push([]); // new empty row
    bestValuesByDay.push([]); // new empty row
    
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
      
      const set = colI % colsPerDay; // remember colI starts at 0 not 1
      
      if (rowType === 'info' || colI <= colsPerDay - 1) {
        // do not color info cells or cells from first day
        
        let plainColor = (
          cellVal === ''
          ? colors.background
          : colors.same
        );
        newColors[rowI].push(plainColor);
        bestValuesByDay[rowI].push(cellVal);
      } else {
        // update colors and best numbers
        
        let colorAndBest;

        if (set === 0) { // weight
          colorAndBest = getWeightColorAndBest(
            cellVal, // todayWeight
            bestValuesByDay[rowI][colI - colsPerDay] // bestWeight
          );
        } else { // set
          colorAndBest = getRepColorAndBest(
            entriesValues[rowI][colI - set], // todayWeight
            bestValuesByDay[rowI][colI - colsPerDay - set], // bestWeight
            cellVal, // todayReps
            bestValuesByDay[rowI][colI - colsPerDay] // bestReps
          );
        }
        
        newColors[rowI].push(colorAndBest.color);
        bestValuesByDay[rowI].push(colorAndBest.best);
      }
      
    });
    
    const lastBests = bestValuesByDay[rowI].slice(-colsPerDay);
    if (lastBests.length === colsPerDay) {
      finalBestValues.push(lastBests);
    }

  });

  entriesRange.setBackgrounds(newColors);
  bestsRange.setValues(finalBestValues);

}

export default rebuild;
