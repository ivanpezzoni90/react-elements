"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _colors = require("../constants/colors");

var _helpers = require("../helpers");

var _types = require("../types");

var _Icon = _interopRequireDefault(require("./Icon"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var calculateIconSize = function calculateIconSize(iconSize, fontSize) {
  var parsedFontSize = parseInt(fontSize, 10);
  var calculatedIconSize = iconSize * parsedFontSize;
  return "".concat(calculatedIconSize, "px");
};

var ButtonElement = _styledComponents.default.button(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: ", ";\n    height: 3.5em;\n    padding: ", ";\n    border-radius: ", ";\n    background-color: ", ";\n    ", "\n    color: ", ";\n    font-size: ", ";\n    font-weight: ", ";\n    border: none;\n    ", "\n"])), function (props) {
  return props.length;
}, function (props) {
  return props.padding;
}, function (props) {
  return props.borderRadius;
}, function (props) {
  return props.color;
}, function (props) {
  return !props.disabled ? "\n        &:hover {\n            background-color: ".concat((0, _helpers.lightenDarkenColor)(props.color, -30), ";\n        }\n    ") : '';
}, function (props) {
  return props.textColor;
}, function (props) {
  return props.fontSize;
}, function (props) {
  return props.fontWeight;
}, function (props) {
  return props.disabled ? "opacity: 0.5;\n        pointer-events: none,\n        cursor: not-allowed" : '';
});

var LabelWrapper = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    padding: 0 0.25em 0 0.25em;\n    max-width: ", ";\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n"])), function (_ref) {
  var length = _ref.length;
  return length;
});

var Button = function Button(_ref2) {
  var padding = _ref2.padding,
      borderRadius = _ref2.borderRadius,
      color = _ref2.color,
      textColor = _ref2.textColor,
      fontSize = _ref2.fontSize,
      fontWeight = _ref2.fontWeight,
      disabled = _ref2.disabled,
      label = _ref2.label,
      length = _ref2.length,
      icon = _ref2.icon,
      iconColor = _ref2.iconColor,
      buttonIconSize = _ref2.buttonIconSize,
      iconPosition = _ref2.iconPosition,
      onClick = _ref2.onClick;
  var calculatedIconSize = calculateIconSize(buttonIconSize, fontSize);

  var IconElement = /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: icon,
    color: iconColor,
    fontSize: calculatedIconSize
  });

  return /*#__PURE__*/_react.default.createElement(ButtonElement, {
    padding: padding,
    borderRadius: borderRadius,
    color: color,
    textColor: textColor,
    fontSize: fontSize,
    fontWeight: fontWeight,
    length: length,
    disabled: disabled,
    onClick: onClick
  }, icon && iconPosition === _types.IconPosition.left && IconElement, /*#__PURE__*/_react.default.createElement(LabelWrapper, {
    length: length
  }, label), icon && iconPosition === _types.IconPosition.right && IconElement);
};

Button.defaultProps = {
  padding: _types.Padding.m,
  borderRadius: _types.BorderRadius.s,
  color: _colors.allColors['Firebrick'],
  textColor: _colors.allColors['White'],
  fontSize: _types.ElementSize.l,
  fontWeight: _types.FontWeight.light,
  label: 'Label',
  disabled: false,
  onClick: function onClick() {},
  length: _types.ElementLength.full,
  icon: undefined,
  iconColor: _colors.allColors['White'],
  buttonIconSize: _types.ButtonIconSize.auto,
  iconPosition: _types.IconPosition.left
};
var _default = Button;
exports.default = _default;