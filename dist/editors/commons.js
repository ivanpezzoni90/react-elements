"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shadowEditor = exports.positionEditor = exports.paddingEditor = exports.lengthEditor = exports.labelPositionEditor = exports.iconSizeEditor = exports.iconEditor = exports.fontWeightEditor = exports.fontSizeEditor = exports.colorEditors = exports.borderRadiusEditor = exports.alignPositionEditor = exports.ElementContainer = exports.EditorContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _colors = require("../constants/colors");

var _types = require("../types");

var _Icon = require("../ui/Icon");

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var EditorContainer = _styledComponents.default.div.attrs({
  className: 'ie__workarea__editor'
})(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    padding: 0.5em 1em 0.5em 0.5em;\n    flex-direction: column;\n"])));

exports.EditorContainer = EditorContainer;

var ElementContainer = _styledComponents.default.div.attrs({
  className: 'ie__workarea__element'
})(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    padding: 1em 1em 2em 1em;\n    border-bottom: 1px solid #c3c3c3\n"])));

exports.ElementContainer = ElementContainer;
var labelPositionEditor = {
  type: 'select',
  label: 'Label Position',
  default: _types.LabelPositions.horizontal,
  prop: 'labelPosition',
  options: [{
    label: 'Horizontal',
    value: _types.LabelPositions.horizontal
  }, {
    label: 'Vertical',
    value: _types.LabelPositions.vertical
  }]
};
exports.labelPositionEditor = labelPositionEditor;
var positionEditor = {
  type: 'select',
  label: 'Position',
  default: _types.Positions.vertical,
  prop: 'position',
  options: [{
    label: 'Horizontal',
    value: _types.Positions.horizontal
  }, {
    label: 'Vertical',
    value: _types.Positions.vertical
  }]
};
exports.positionEditor = positionEditor;
var alignPositionEditor = {
  type: 'select',
  label: 'Alignment',
  default: _types.AlignPositions.left,
  prop: 'align',
  options: [{
    label: 'Left',
    value: _types.AlignPositions.left
  }, {
    label: 'Center',
    value: _types.AlignPositions.center
  }, {
    label: 'Right',
    value: _types.AlignPositions.right
  }]
};
exports.alignPositionEditor = alignPositionEditor;
var shadowEditor = {
  label: 'Shadow',
  type: 'toggle',
  default: true,
  prop: 'shadow'
};
exports.shadowEditor = shadowEditor;
var colorEditors = [{
  type: 'color',
  label: 'Text Color',
  prop: 'textColor',
  default: _colors.allColors['Dim Gray']
}, {
  type: 'color',
  label: 'Label Color',
  prop: 'labelColor',
  default: _colors.allColors['Dim Gray']
}, {
  type: 'color',
  label: 'Border Color',
  prop: 'borderColor',
  default: _colors.allColors['Dim Gray']
}];
exports.colorEditors = colorEditors;

var lengthEditor = function lengthEditor() {
  var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _types.ElementLength.full;
  return {
    label: 'Length',
    type: 'select',
    default: def,
    prop: 'length',
    options: [{
      label: 'Full',
      value: _types.ElementLength.full
    }, {
      label: 'S',
      value: _types.ElementLength.s
    }, {
      label: 'M',
      value: _types.ElementLength.m
    }, {
      label: 'L',
      value: _types.ElementLength.l
    }, {
      label: 'Squared',
      value: _types.ElementLength.squared
    }]
  };
};

exports.lengthEditor = lengthEditor;
var paddingEditor = {
  label: 'Padding',
  type: 'select',
  default: _types.Padding.m,
  prop: 'padding',
  options: [{
    label: 'S',
    value: _types.Padding.s
  }, {
    label: 'M',
    value: _types.Padding.m
  }, {
    label: 'L',
    value: _types.Padding.l
  }]
};
exports.paddingEditor = paddingEditor;
var fontWeightEditor = {
  label: 'Font Weight',
  type: 'select',
  default: _types.FontWeight.light,
  prop: 'fontWeight',
  options: [{
    label: 'Lighter',
    value: _types.FontWeight.lighter
  }, {
    label: 'Light',
    value: _types.FontWeight.light
  }, {
    label: 'Semibold',
    value: _types.FontWeight.semibold
  }, {
    label: 'Bold',
    value: _types.FontWeight.bold
  }, {
    label: 'Bolder',
    value: _types.FontWeight.bolder
  }]
};
exports.fontWeightEditor = fontWeightEditor;
var borderRadiusEditor = {
  label: 'Border Radius',
  type: 'select',
  default: _types.BorderRadius.s,
  prop: 'borderRadius',
  options: [{
    label: 'No',
    value: _types.BorderRadius.no
  }, {
    label: 'XS',
    value: _types.BorderRadius.xs
  }, {
    label: 'S',
    value: _types.BorderRadius.s
  }, {
    label: 'M',
    value: _types.BorderRadius.m
  }, {
    label: 'L',
    value: _types.BorderRadius.l
  }, {
    label: 'XL',
    value: _types.BorderRadius.xl
  }, {
    label: 'XXL',
    value: _types.BorderRadius.xxl
  }]
};
exports.borderRadiusEditor = borderRadiusEditor;
var fontSizeEditor = {
  label: 'Element Size',
  type: 'select',
  default: _types.ElementSize.m,
  prop: 'fontSize',
  options: [{
    label: 'XXS',
    value: _types.ElementSize.xxs
  }, {
    label: 'XS',
    value: _types.ElementSize.xs
  }, {
    label: 'S',
    value: _types.ElementSize.s
  }, {
    label: 'M',
    value: _types.ElementSize.m
  }, {
    label: 'L',
    value: _types.ElementSize.l
  }, {
    label: 'XL',
    value: _types.ElementSize.xl
  }, {
    label: 'XXL',
    value: _types.ElementSize.xxl
  }]
};
exports.fontSizeEditor = fontSizeEditor;
var iconOptions = Object.values(_Icon.IconList).map(function (v) {
  return {
    label: v,
    value: v,
    icon: v
  };
});
var iconEditor = {
  type: 'select',
  default: _Icon.IconList.check,
  label: 'Icon',
  prop: 'icon',
  options: iconOptions
};
exports.iconEditor = iconEditor;
var sizeOptions = Object.entries(_types.IconSize).map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];

  return {
    label: k,
    value: v
  };
});
var iconSizeEditor = {
  label: 'Size',
  type: 'select',
  default: _types.IconSize.xs,
  prop: 'fontSize',
  options: sizeOptions
};
exports.iconSizeEditor = iconSizeEditor;