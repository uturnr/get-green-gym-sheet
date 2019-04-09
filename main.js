var clearBests = require('./clearBests');
var onChangeFunc = require('./onChangeFunc');
var onInstall = require('./onInstall');
var rebuildBests = require('./rebuildBests');
/**
 * Return write arguments.
 */
global.clearBests = clearBests;
global.onChangeFunc = onChangeFunc;
global.onInstall = onInstall;
global.rebuildBests = rebuildBests;
