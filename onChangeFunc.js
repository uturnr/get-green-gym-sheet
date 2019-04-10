var recolor = require('./recolor');

module.exports = function onChangeFunc(e) { //eslint-disable-line no-unused-vars

  // handle deletions, ranges, row inserts

  const activeSheet = e.source.getActiveSheet();
  if (activeSheet.getName() === 'Get Green') {
    if (e.changeType === 'EDIT') {
      const gymCell = e.source.getActiveCell();
      recolor(gymCell.getRow());
    } else if (
      e.changeType !== 'FORMAT'
      && e.changeType !== 'OTHER'
    ) {
      recolor();
    }

  }


}
