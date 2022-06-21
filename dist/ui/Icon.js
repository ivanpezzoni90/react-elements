"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IconList = void 0;

var _react = _interopRequireDefault(require("react"));

var _fa = require("react-icons/fa");

var _io = require("react-icons/io5");

var _ai = require("react-icons/ai");

var _types = require("../types");

var _iconMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IconList;
exports.IconList = IconList;

(function (IconList) {
  IconList["caretDown"] = "caret-down";
  IconList["caretUp"] = "caret-up";
  IconList["caretLeft"] = "caret-left";
  IconList["caretRight"] = "caret-right";
  IconList["check"] = "check";
  IconList["close"] = "close";
  IconList["outlineClose"] = "outline-close";
})(IconList || (exports.IconList = IconList = {}));

var iconMap = (_iconMap = {}, _defineProperty(_iconMap, IconList.caretDown, _fa.FaCaretDown), _defineProperty(_iconMap, IconList.caretUp, _fa.FaCaretUp), _defineProperty(_iconMap, IconList.caretLeft, _fa.FaCaretLeft), _defineProperty(_iconMap, IconList.caretRight, _fa.FaCaretRight), _defineProperty(_iconMap, IconList.close, _io.IoCloseSharp), _defineProperty(_iconMap, IconList.check, _io.IoCheckmarkSharp), _defineProperty(_iconMap, IconList.outlineClose, _ai.AiOutlineCloseCircle), _iconMap);

function Icon(_ref) {
  var icon = _ref.icon,
      color = _ref.color,
      fontSize = _ref.fontSize;
  var IconComponent = iconMap[icon];
  return <IconComponent style={{
    color: color,
    fontSize: fontSize
  }} />;
}

var defaultProps = {
  icon: undefined,
  color: '#666',
  fontSize: _types.IconSize.xs
};
Icon.defaultProps = defaultProps;
var _default = Icon;
exports.default = _default;