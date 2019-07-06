import recolor from './recolor';

const onChangeFunc = e => {

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

export default onChangeFunc;
