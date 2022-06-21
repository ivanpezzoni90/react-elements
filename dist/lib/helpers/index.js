"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  generateID: true,
  calculateInnerElementLength: true,
  mergeClasses: true,
  elaborateComputedWidth: true,
  splitArrayInGroups: true,
  round: true
};
exports.mergeClasses = exports.generateID = exports.elaborateComputedWidth = exports.calculateInnerElementLength = void 0;
exports.round = round;
exports.splitArrayInGroups = splitArrayInGroups;

var _colorHelpers = require("./colorHelpers");

Object.keys(_colorHelpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _colorHelpers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _colorHelpers[key];
    }
  });
});

var generateID = function generateID() {
  return Math.random().toString(36).slice(2);
};

exports.generateID = generateID;

var calculateInnerElementLength = function calculateInnerElementLength(length) {
  return {
    s: '6em',
    m: '14em',
    l: '30em',
    full: '100%'
  }[length];
};

exports.calculateInnerElementLength = calculateInnerElementLength;

var mergeClasses = function mergeClasses(currentClass, additionalClasses) {
  var classesToMerge = Array.isArray(additionalClasses) ? additionalClasses : [additionalClasses];
  var newClass = currentClass;
  classesToMerge.forEach(function (c) {
    newClass = "".concat(newClass, " ").concat(c);
  });
  return newClass;
};

exports.mergeClasses = mergeClasses;

var elaborateComputedWidth = function elaborateComputedWidth(width) {
  // Subtract padding in px to parsed computed width
  var numWidth = parseInt(width, 10) - 32;
  return "".concat(numWidth, "px");
};

exports.elaborateComputedWidth = elaborateComputedWidth;

function splitArrayInGroups(a, size) {
  return a.map(function (item, index) {
    return index % size === 0 ? a.slice(index, index + size) : null;
  }).filter(Boolean);
}

function round(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}