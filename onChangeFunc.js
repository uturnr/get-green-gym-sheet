import rebuild, { updateSingleCell } from './rebuild';

const onChangeFunc = e => {

  // handle deletions, ranges, row inserts

  const activeSheet = e.source.getActiveSheet();
  if (activeSheet.getName() === 'Get Green') {
    if (e.changeType === 'EDIT') {
      const gymCell = e.source.getActiveCell();
      const lastColInSheet = activeSheet.getLastColumn();
      const editedCellRow = gymCell.getRow();
      const editedCellCol = gymCell.getColumn();
      const editedCellRowVals = activeSheet.getRange(
        editedCellRow,
        1,
        1,
        lastColInSheet
      ).getValues()[0];
      const valsCount = editedCellRowVals.length;
      // Loop over backwards to find col of first cell with value.
      // (Starts at 1 not 0)
      for (let i = valsCount - 1; i >= 1; i--) {
        if (editedCellRowVals[i]) {
          const col = i + 1;
          rebuild(editedCellRow);
          // if (editedCellCol === col) {
          //   updateSingleCell(gymCell);
          // } else {
          //   rebuild(editedCellRow);
          // }
          break;
        }
      }
    } else if (
      e.changeType !== 'FORMAT'
      && e.changeType !== 'OTHER'
    ) {
      rebuild();
    }

  }

}

export default onChangeFunc;
