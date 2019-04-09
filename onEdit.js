var rebuildBests = require('./rebuildBests');

module.exports = function onEdit(e) { //eslint-disable-line no-unused-vars

  // handle deltions, ranges, row inserts

  const activeSheet = e.source.getActiveSheet();
  var gymCell = e.source.getActiveCell();
  if (
    activeSheet.getName() === 'Gym'
    && gymCell.getFontSize() === 18.0
  ) {

    rebuildBests(gymCell.getRow());

  }

}
