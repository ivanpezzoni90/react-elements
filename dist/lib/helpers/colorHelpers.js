"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fontColorFromBackground = exports.darkOrLightColor = void 0;
exports.lightenDarkenColor = lightenDarkenColor;
exports.rgbFromHex = void 0;

var _colors = require("../constants/colors");

var darkOrLightColor = function darkOrLightColor(colorCode) {
  var _rgbFromHex = rgbFromHex(colorCode),
      r = _rgbFromHex.r,
      g = _rgbFromHex.g,
      b = _rgbFromHex.b;

  if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
    return 'light';
  }

  return 'dark';
};

exports.darkOrLightColor = darkOrLightColor;

var fontColorFromBackground = function fontColorFromBackground(colorCode) {
  return darkOrLightColor(colorCode) === 'light' ? _colors.allColors['Davys Grey'] : _colors.allColors['Cultured 2'];
};

exports.fontColorFromBackground = fontColorFromBackground;

var rgbFromHex = function rgbFromHex(colorCode) {
  var code = colorCode.slice(1);
  var num = parseInt(code, 16);
  return {
    r: num >> 16,
    g: num >> 8 & 0x00FF,
    b: num & 0x0000FF
  };
};

exports.rgbFromHex = rgbFromHex;

function lightenDarkenColor(colorCode, amount) {
  var code = colorCode.slice(1);
  var num = parseInt(code, 16);
  var red = (num >> 16) + amount;

  if (red > 255) {
    red = 255;
  } else if (red < 0) {
    red = 0;
  }

  var blue = (num >> 8 & 0x00FF) + amount;

  if (blue > 255) {
    blue = 255;
  } else if (blue < 0) {
    blue = 0;
  }

  var green = (num & 0x0000FF) + amount;

  if (green > 255) {
    green = 255;
  } else if (green < 0) {
    green = 0;
  }

  return '#' + (green | blue << 8 | red << 16).toString(16);
}