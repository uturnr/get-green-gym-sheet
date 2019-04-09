module.exports = function onInstall() { //eslint-disable-line no-unused-vars

  var ss = SpreadsheetApp.getActive();
    ScriptApp.newTrigger('onChangeFunc')
      .forSpreadsheet(ss)
      .onChange()
      .create();

}
