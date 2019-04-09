/**
 * Return write arguments.
 */
function clearBests() {
}
function onChangeFunc() {
}
function onInstall() {
}
function rebuildBests() {
}/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var bestsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bests'); //eslint-disable-line no-undef

module.exports = function rebuildBests(row) {
  //eslint-disable-line no-unused-vars
  var startRow;
  var rowsToClear;
  var lastColumn = bestsSheet.getLastColumn();
  var colsToClear = lastColumn - 1;

  if (row) {
    //clear row
    rowsToClear = 1;
    startRow = row;
  } else {
    // clear all
    var lastRow = bestsSheet.getLastRow();
    rowsToClear = lastRow - 3;
    startRow = 3;
  }

  var bestsRange = bestsSheet.getRange(startRow, 2, rowsToClear, colsToClear);
  bestsRange.clearContent();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var gymSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Gym'); //eslint-disable-line no-undef

var bestsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bests'); //eslint-disable-line no-undef

var clearBests = __webpack_require__(0);

function getBestWeight(todayWeight, bestWeight) {
  var result;

  if (todayWeight > bestWeight || todayWeight === 0 && bestWeight === '') {
    result = todayWeight;
  } else {
    result = bestWeight;
  }

  return result;
}

function getBestReps(todayWeight, bestWeight, todayReps, bestReps) {
  var result;

  if (todayWeight > bestWeight || todayWeight === 0 && bestWeight === '' || todayWeight === bestWeight && todayReps > bestReps) {
    result = todayReps;
  } else {
    result = bestReps;
  }

  return result;
}

module.exports = function rebuildBests(row) {
  //eslint-disable-line no-unused-vars
  // row for 1 row, if empty, all rows
  if (!row) {
    clearBests();
  }

  var startRow;
  var rowsToRebuild;
  var lastColumn = gymSheet.getLastColumn();
  var colsToRebuild = lastColumn - 1;

  if (row) {
    rowsToRebuild = 1;
    startRow = row;
  } else {
    var lastRow = gymSheet.getLastRow();
    rowsToRebuild = lastRow - 3;
    startRow = 3;
  }

  var gymRange = gymSheet.getRange(startRow, 2, rowsToRebuild, colsToRebuild);
  var gymValues = gymRange.getValues();
  var newBestsValues = [];
  gymValues.forEach(function (rowArray, rowIndex) {
    // if (rowIndex === 0) { // while testing
    newBestsValues.push([]);
    rowArray.forEach(function (cellValue, colIndex) {
      if (colIndex < 4) {
        // copy values from first day
        newBestsValues[rowIndex].push(gymValues[rowIndex][colIndex]);
      } else {
        var set = colIndex % 4; // remember colIndex starts at 0 not 1

        if (set === 0) {
          // weight
          newBestsValues[rowIndex].push(getBestWeight(cellValue, // todayWeight
          newBestsValues[rowIndex][colIndex - 4] // bestWeight
          ));
        } else {
          // set
          newBestsValues[rowIndex].push(getBestReps(gymValues[rowIndex][colIndex - set], // todayWeight
          newBestsValues[rowIndex][colIndex - 4 - set], // bestWeight
          cellValue, // todayReps
          newBestsValues[rowIndex][colIndex - 4] // bestReps
          ));
        }
      }
    }); // }
  });
  var newBestsRange = bestsSheet.getRange(startRow, 2, rowsToRebuild, colsToRebuild); // const newBestsRange = bestsSheet.getRange(3, 2, 1, lastColumn - 1); // while testing

  newBestsRange.setValues(newBestsValues);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var clearBests = __webpack_require__(0);

var onChangeFunc = __webpack_require__(4);

var onInstall = __webpack_require__(5);

var rebuildBests = __webpack_require__(1);
/**
 * Return write arguments.
 */


global.clearBests = clearBests;
global.onChangeFunc = onChangeFunc;
global.onInstall = onInstall;
global.rebuildBests = rebuildBests;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var rebuildBests = __webpack_require__(1);

module.exports = function onChangeFunc(e) {
  //eslint-disable-line no-unused-vars
  // handle deltions, ranges, row inserts
  var activeSheet = e.source.getActiveSheet();

  if (activeSheet.getName() === 'Gym') {
    if (e.changeType === 'EDIT') {
      var gymCell = e.source.getActiveCell();

      if (gymCell.getFontSize() === 18.0) {
        rebuildBests(gymCell.getRow());
      }
    } else if (e.changeType !== 'FORMAT' && e.changeType !== 'OTHER') {
      rebuildBests();
    }
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function onInstall() {
  //eslint-disable-line no-unused-vars
  var ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('onChangeFunc').forSpreadsheet(ss).onChange().create();
};

/***/ })
/******/ ]);