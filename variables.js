import { headerCols } from './constants.js'

// Col and row numbers are 1-indexed.

const optionsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Options');
const setsPerDayFromSheet = optionsSheet.getRange(3, 2).getValue();


// Col Counts - Commented numbers based on 2 sets per day.
const setsPerDay = setsPerDayFromSheet ? setsPerDayFromSheet : 2;
const colsPerDay = setsPerDay + 1; // 3
const bestStorageCols = colsPerDay; // 3
const baselineCols = colsPerDay; // 3
const nonEntryCols = headerCols + bestStorageCols; // 6
const uncoloredCols = headerCols + bestStorageCols + baselineCols; // 9

// Col Numbers
const firstWeightCol = headerCols + 1; // 2
const firstEntryCol = nonEntryCols + 1; // 7
const firstColoredCol = uncoloredCols + 1; // 10


export {
  colsPerDay,
  firstColoredCol,
  firstEntryCol,
  firstWeightCol,
  nonEntryCols,
  uncoloredCols
};

