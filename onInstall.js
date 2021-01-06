const onInstall = () => { //eslint-disable-line no-unused-vars
  
  const deleteTrigger = triggerId => {
    // Loop over all triggers.
    var allTriggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < allTriggers.length; i++) {
      // If the current trigger is the correct one, delete it.
      if (allTriggers[i].getUniqueId() === triggerId) {
        ScriptApp.deleteTrigger(allTriggers[i]);
        break;
      }
    }
  }

  var ss = SpreadsheetApp.getActive();
  
  deleteTrigger('onChangeFunc');
  
  ScriptApp.newTrigger('onChangeFunc')
    .forSpreadsheet(ss)
    .onChange()
    .create();

}

export default onInstall;
