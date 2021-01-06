const firstColoredRow = 1; // 1
const firstEntryRow = 3; // 3
const firstWeightRow = firstEntryRow; // 3
const colsInADay = 4; // 4
const firstWeightCol = 2; // 2
const firstBestsCol = firstWeightCol;
const firstEntryCol = firstWeightCol + colsInADay; // 6
const firstColoredCol = firstWeightCol + ( 2 * colsInADay ); // 10
const nonEntryRows = firstEntryRow - 1; // 2
const uncoloredRows = firstColoredRow - 1; // 0
const uncoloredCols = firstColoredCol - 1; // 9
const nonEntryCols = firstEntryCol - 1; // 5
const nonNumberCols = firstWeightCol - 1; // 1

const k = {
  firstColoredRow,
  firstEntryRow,
  firstWeightRow,
  colsInADay,
  firstWeightCol,
  firstBestsCol,
  firstEntryCol,
  firstColoredCol,
  nonEntryRows,
  uncoloredRows,
  uncoloredCols,
  nonEntryCols,
  nonNumberCols,
};

export default k;
