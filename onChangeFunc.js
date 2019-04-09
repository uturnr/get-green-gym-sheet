var rebuildBests = require('./rebuildBests');

module.exports = function onChangeFunc(e) { //eslint-disable-line no-unused-vars

  // handle deltions, ranges, row inserts

  const activeSheet = e.source.getActiveSheet();
  if (activeSheet.getName() === 'Gym') {
    if (e.changeType === 'EDIT') {
      const gymCell = e.source.getActiveCell();
      if (gymCell.getFontSize() === 18.0) {
        rebuildBests(gymCell.getRow());
      }
    } else if (
      e.changeType !== 'FORMAT'
      && e.changeType !== 'OTHER'
    ) {
      rebuildBests();
    }

  }


}
