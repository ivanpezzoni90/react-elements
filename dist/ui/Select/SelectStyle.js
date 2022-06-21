"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectWrapper = exports.SelectElement = exports.ResetWrapper = exports.ListItem = exports.ListIcon = exports.Label = exports.DropDownListContainer = exports.DropDownList = exports.CaretWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../../helpers");

var _types = require("../../types");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SelectElement = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    width: ", ";   \n    display: flex;\n    text-align: left;\n    height: 1.75em;\n    position: relative;\n    padding: 0 1em;\n    border: none;\n    border-radius: 4px;\n    font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    line-height: normal;\n    background-color: transparent;\n    color: ", ";\n    outline: none;\n    ", "\n    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,\n    0.1s padding ease-in-out;\n    -webkit-appearance: none;\n\n    ::placeholder,\n    ::-webkit-input-placeholder {\n        color: rgba(255, 255, 255, 0.8);\n    }\n    ::-moz-placeholder {\n        color: rgba(255, 255, 255, 0.8);\n    }\n    :-ms-input-placeholder {\n        color: rgba(255, 255, 255, 0.8);\n    }\n    :-moz-placeholder {\n        color: rgba(255, 255, 255, 0.8);\n    }\n    padding: 0.5em 1em 0 1em;\n"])), function (props) {
  return props.length === _types.ElementLength.full ? props.computedWidth : (0, _helpers.calculateInnerElementLength)(props.length);
}, function (props) {
  return props.textColor;
}, function (props) {
  return props.shadow ? 'box-shadow: 0px 4px 20px 0px transparent;' : '';
});

exports.SelectElement = SelectElement;

var SelectWrapper = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n    width: ", ";\n    height: 3.5em;\n    position: relative;\n    background-color: rgba(255, 255, 255, 0.3);\n    border: none;\n    border-bottom: 1px solid ", ";\n    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;\n    ", "\n    &:hover{\n        ", "\n        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);\n    }\n"])), function (props) {
  return props.length;
}, function (props) {
  return props.borderColor;
}, function (props) {
  return props.hasValue && props.shadow ? "background-color: #ffffff;\n        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);" : '';
}, function (props) {
  return props.shadow ? 'background-color: rgba(255, 255, 255, 0.45);' : '';
});

exports.SelectWrapper = SelectWrapper;

var Label = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    padding: 1em 1em 0 1em;\n    font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    line-height: 24px;\n    color: ", ";\n    opacity: 1;\n    pointer-events: none;\n    transition: 0.1s all ease-in-out;\n\n    padding: .25em 1.5em 0 1.5em;\n    opacity: 1;\n    color: ", ";\n    font-size: 12px;\n\n    max-width: ", ";\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n"])), function (props) {
  return props.labelColor;
}, function (props) {
  return props.labelColor;
}, function (_ref) {
  var length = _ref.length;
  return length;
});

exports.Label = Label;

var CaretWrapper = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    position: absolute;\n    top: 1.5em;\n    right: 0.5em;\n"])));

exports.CaretWrapper = CaretWrapper;

var ResetWrapper = _styledComponents.default.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    position: absolute;\n    top: 1.25em;\n    right: 2em;\n    z-index: 1;\n"])));

exports.ResetWrapper = ResetWrapper;
var DropDownListContainer = (0, _styledComponents.default)('div')(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    position: absolute;\n    width: ", ";\n    ", "\n"])), function (props) {
  return props.length;
}, function (props) {
  return props.zIndex ? "z-index: ".concat(props.zIndex) : '';
});
exports.DropDownListContainer = DropDownListContainer;
var DropDownList = (0, _styledComponents.default)('ul')(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    margin: 3.75em 0 0 0;\n    padding: 0;\n    background-color: #ffffff;\n    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);\n    box-sizing: border-box;\n    color: #666;\n    font-size: 1em;\n    font-weight: 500;\n    text-align: left;\n"])));
exports.DropDownList = DropDownList;
var ListItem = (0, _styledComponents.default)('li')(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n    display: flex;\n    list-style: none;\n    padding: 0.5em 1em 0.5em 1em;\n    color: ", ";\n    &:hover {\n        ", ";\n    }\n    ", "\n"])), function (props) {
  return props.textColor;
}, function (props) {
  return !props.selected ? "background: ".concat((0, _helpers.lightenDarkenColor)( // Color
  props.optionSelectedColor, // Amount: is calculated positive (lighten) when color is dark,
  // negative (darken) when color is light
  (0, _helpers.darkOrLightColor)(props.optionSelectedColor) === 'dark' ? 60 : -10)) : '';
}, function (props) {
  return props.selected ? "background: ".concat(props.optionSelectedColor, ";\n            color: ").concat((0, _helpers.fontColorFromBackground)(props.optionSelectedColor), ";") : '';
});
exports.ListItem = ListItem;

var ListIcon = _styledComponents.default.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n    padding-right: 0.25em;\n"])));

exports.ListIcon = ListIcon;