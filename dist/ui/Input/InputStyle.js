"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = exports.InputWrapper = exports.InputNumberIcons = exports.InputElementStyle = exports.IconWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../../helpers");

var _colors = require("../../constants/colors");

var _types = require("../../types");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var InputElementStyle = _styledComponents.default.input(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    width: ", ";\n    height: 2.5em;\n    position: relative;\n    padding: 0 1em;\n    border: none;\n    border-radius: 4px;\n    font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    line-height: normal;\n    background-color: transparent;\n    color: ", ";\n    outline: none;\n    ", "\n    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,\n      0.1s padding ease-in-out;\n    -webkit-appearance: none;\n\n    ::placeholder,\n    ::-webkit-input-placeholder {\n      color: rgba(255, 255, 255, 0.8);\n    }\n    ::-moz-placeholder {\n      color: rgba(255, 255, 255, 0.8);\n    }\n    :-ms-input-placeholder {\n      color: rgba(255, 255, 255, 0.8);\n    }\n    :-moz-placeholder {\n      color: rgba(255, 255, 255, 0.8);\n    }\n    ", "\n"])), function (props) {
  return props.length === _types.ElementLength.full ? props.computedWidth : (0, _helpers.calculateInnerElementLength)(props.length);
}, function (props) {
  return props.textColor;
}, function (props) {
  return props.shadow ? 'box-shadow: 0px 4px 20px 0px transparent;' : '';
}, function (props) {
  return props.error ? "color: ".concat(_colors.allColors['Lava'], ";") : '';
});

exports.InputElementStyle = InputElementStyle;

var InputWrapper = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n    cursor: text;\n    width: ", ";\n    height: 3.5em;\n    position: relative;\n    background-color: rgba(255, 255, 255, 0.3);\n    border: none;\n    border-bottom: 1px solid ", ";\n    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;\n    ", "\n    ", "\n    &:hover{\n      background-color: rgba(255, 255, 255, 0.45);\n      ", "\n    }\n"])), function (props) {
  return props.length;
}, function (props) {
  return props.borderColor;
}, function (props) {
  return props.locked ? 'pointer-events: none;' : '';
}, function (props) {
  return props.active && props.shadow ? "background-color: ".concat(_colors.allColors['White'], ";\n            box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);") : '';
}, function (props) {
  return props.shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : '';
});

exports.InputWrapper = InputWrapper;

var Label = _styledComponents.default.label(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    padding: 1em 1em 0 1em;\n    font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    line-height: 24px;\n    color: ", ";\n    opacity: 1;\n    pointer-events: none;\n    transition: 0.1s all ease-in-out;\n\n    ", "\n\n    ", "\n\n    ", "\n\n    max-width: ", ";\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n"])), function (props) {
  return props.labelColor;
}, function (props) {
  return props.error ? "color: ".concat(_colors.allColors['Lava'], ";") : '';
}, function (props) {
  return props.active ? "padding: .25em 1.5em 0 1.5em;\n        opacity: 1;\n        color: ".concat(props.error ? _colors.allColors['Lava'] : props.labelColor, ";\n        font-size: 12px;") : '';
}, function (props) {
  return !props.active ? 'height: 3em;' : '';
}, function (_ref) {
  var length = _ref.length;
  return length;
});

exports.Label = Label;

var InputNumberIcons = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    position: absolute;\n    top: 0.75em;\n    right: 1em;\n    display: flex;\n    flex-direction: column;\n    cursor: pointer;\n"])));

exports.InputNumberIcons = InputNumberIcons;

var IconWrapper = _styledComponents.default.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral([""])));

exports.IconWrapper = IconWrapper;