// Col and row numbers are 1-indexed.
// Row Counts
const nonEntryRows = 2;
const uncoloredRows = 0;

// Row Numbers
const firstColoredRow = uncoloredRows + 1; // 1
const firstEntryRow = nonEntryRows + 1; // 3
const firstWeightRow = firstEntryRow; // 3

// Col Counts
const headerCols = 3;

// Col Numbers
const firstWeightCol = headerCols + 1; // 4
const firstBestsCol = firstWeightCol; // 4

export {
  firstBestsCol,
  firstColoredRow,
  firstEntryRow,
  firstWeightCol,
  firstWeightRow,
  headerCols,
  nonEntryRows,
  uncoloredRows,
};

