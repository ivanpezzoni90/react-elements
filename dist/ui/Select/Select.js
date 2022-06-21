"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _helpers = require("../../helpers");

var _types = require("../../types");

var _Icon = _interopRequireWildcard(require("../../ui/Icon"));

var _SelectStyle = require("./SelectStyle");

var _hooks = require("../../hooks");

var _colors = require("../../constants/colors");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Select(props) {
  var options = props.options,
      valueFromProps = props.value,
      label = props.label,
      shadow = props.shadow,
      onChange = props.onChange,
      length = props.length,
      labelColor = props.labelColor,
      textColor = props.textColor,
      borderColor = props.borderColor,
      optionSelectedColor = props.optionSelectedColor,
      resettable = props.resettable;

  var isValidValue = function isValidValue(v) {
    return v !== null && v !== '';
  };

  var id = (0, _react.useRef)((0, _helpers.generateID)());

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var toggling = function toggling() {
    return setIsOpen(!isOpen);
  };

  var _useState3 = (0, _react.useState)(valueFromProps),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedOption = _useState4[0],
      setSelectedOption = _useState4[1];

  var _useState5 = (0, _react.useState)(isValidValue(selectedOption)),
      _useState6 = _slicedToArray(_useState5, 2),
      hasValue = _useState6[0],
      setHasValue = _useState6[1];

  (0, _react.useEffect)(function () {
    setHasValue(isValidValue(selectedOption));
  }, [selectedOption]);

  var onOptionClicked = function onOptionClicked(value) {
    return function () {
      setSelectedOption(value);
      onChange(value);
      setIsOpen(false);
    };
  };

  var onSelectReset = function onSelectReset(e) {
    e.stopPropagation();
    setSelectedOption(null);
    onChange(null);
    setIsOpen(false);
  };

  var getOptionFromValue = function getOptionFromValue(value) {
    return options.find(function (o) {
      return o.value === value;
    }) // TODO: Review the "as"
    ;
  };

  var selectRef = (0, _react.useRef)(null);
  var dropDownZIndex = (0, _hooks.useComputedZIndex)(selectRef);
  var selectElementWidth = (0, _helpers.elaborateComputedWidth)((0, _hooks.useComputedWidth)(selectRef));
  var currentOptionObject = getOptionFromValue(selectedOption);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_SelectStyle.SelectWrapper, {
    ref: selectRef,
    hasValue: hasValue,
    length: length,
    shadow: shadow,
    borderColor: borderColor,
    onClick: toggling
  }, /*#__PURE__*/_react.default.createElement(_SelectStyle.Label, {
    htmlFor: id.current,
    hasValue: hasValue,
    labelColor: labelColor,
    length: length
  }, label), /*#__PURE__*/_react.default.createElement(_SelectStyle.SelectElement, {
    length: length,
    shadow: shadow,
    computedWidth: selectElementWidth,
    textColor: textColor
  }, currentOptionObject && currentOptionObject.icon ? /*#__PURE__*/_react.default.createElement(_SelectStyle.ListIcon, null, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: currentOptionObject.icon,
    fontSize: _types.IconSize.s
  })) : null, currentOptionObject && currentOptionObject.label), isOpen && /*#__PURE__*/_react.default.createElement(_SelectStyle.DropDownListContainer, {
    zIndex: dropDownZIndex,
    length: length
  }, /*#__PURE__*/_react.default.createElement(_SelectStyle.DropDownList, null, options.map(function (o) {
    return /*#__PURE__*/_react.default.createElement(_SelectStyle.ListItem, {
      onClick: onOptionClicked(o.value),
      key: o.value.toString(),
      selected: selectedOption === o.value,
      textColor: textColor,
      optionSelectedColor: optionSelectedColor
    }, o.icon ? /*#__PURE__*/_react.default.createElement(_SelectStyle.ListIcon, null, /*#__PURE__*/_react.default.createElement(_Icon.default, {
      icon: o.icon,
      fontSize: _types.IconSize.s
    })) : null, o.label);
  }))), resettable && /*#__PURE__*/_react.default.createElement(_SelectStyle.ResetWrapper, {
    onClick: onSelectReset
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _Icon.IconList.outlineClose,
    fontSize: _types.IconSize.m
  })), /*#__PURE__*/_react.default.createElement(_SelectStyle.CaretWrapper, null, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _Icon.IconList.caretDown
  }))));
}

var defaultProps = {
  options: [],
  value: null,
  label: 'Label',
  length: _types.ElementLength.full,
  shadow: true,
  labelColor: _colors.allColors['Dim Gray'],
  textColor: _colors.allColors['Dim Gray'],
  borderColor: _colors.allColors['Dim Gray'],
  optionSelectedColor: _colors.allColors['Quick Silver'],
  resettable: false,
  onChange: function onChange() {}
};
Select.defaultProps = defaultProps;
var _default = Select;
exports.default = _default;