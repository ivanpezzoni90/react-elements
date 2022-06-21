"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchToggleElement = SwitchToggleElement;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../helpers");

var _types = require("../types");

var _Element = _interopRequireDefault(require("./Element"));

var _Icon = _interopRequireWildcard(require("../ui/Icon"));

var _colors = require("../constants/colors");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Slider = _styledComponents.default.span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: ", ";\n    border-radius: 15px;\n    border: 1px solid gray;\n    transition: 0.4s;\n\n    display: flex;\n    align-items: center;\n    justify-content: ", ";\n\n    &:before {\n        content: \"\";\n\n        position: absolute;\n        left: 1px;\n        bottom: 1px;\n\n        width: 20px;\n        height: 20px;\n        border-radius: 100%;\n\n        background-color: ", ";\n\n        transition: 0.4s;\n    }\n"])), function (_ref) {
  var toggle = _ref.toggle,
      color = _ref.color,
      colorOff = _ref.colorOff;
  return toggle ? color : colorOff;
}, function (_ref2) {
  var toggle = _ref2.toggle;
  return toggle ? 'flex-start' : 'flex-end';
}, function (_ref3) {
  var toggle = _ref3.toggle,
      color = _ref3.color,
      colorOff = _ref3.colorOff;
  return toggle ? colorOff : color;
});

var Input = _styledComponents.default.input(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  &:checked + ", ":before {\n    transform: translateX(23.4px);\n  }\n"])), Slider);

var SwitchElementWrapper = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    padding: 0 1em 0 0.25em;\n"])));

var Switch = _styledComponents.default.label(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    position: relative;\n    display: inline-block;\n    width: 48px;\n    height: 24px;\n    background-color: ", ";\n    border-radius: 15px;\n    transition: 0.4s;\n\n    & ", " {\n        opacity: 0;\n        width: 0;\n        height: 0;\n    }\n"])), function (_ref4) {
  var toggle = _ref4.toggle,
      color = _ref4.color,
      colorOff = _ref4.colorOff;
  return toggle ? color : colorOff;
}, Input);

var SwitchToggleAdvancedWrapper = _styledComponents.default.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    min-width: 7em;\n    width: ", ";\n    height: 3.5em;\n    position: relative;\n    background-color: rgba(255, 255, 255, 0.3);\n    border: none;\n    border-bottom: 1px solid #666;\n    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;\n    background-color: #ffffff;\n    ", "\n\n    &:hover{\n        background-color: rgba(255, 255, 255, 0.45);\n        ", "\n    }\n"])), function (props) {
  return props.length;
}, function (_ref5) {
  var shadow = _ref5.shadow;
  return shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);' : '';
}, function (_ref6) {
  var shadow = _ref6.shadow;
  return shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : '';
});

var SwitchToggleAdvancedLabel = _styledComponents.default.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: flex-start;\n    flex: 1;\n    padding: 0 1em 0 1em;\n\n    font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    line-height: 24px;\n    color: #666;\n    opacity: 1;\n    pointer-events: none;\n    transition: 0.1s all ease-in-out;\n\n    max-width: ", ";\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n"])), function (_ref7) {
  var length = _ref7.length;
  return length;
});

var ToggleInnerLabel = _styledComponents.default.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    font-size: 9px;\n    font-weight: 600;\n    color: ", ";\n    display: flex;\n    flex: 0.5;\n    justify-content: center;\n"])), function (_ref8) {
  var toggle = _ref8.toggle,
      color = _ref8.color;
  return toggle ? 'white' : color;
});

function SwitchToggleElement(_ref9) {
  var checked = _ref9.checked,
      onChange = _ref9.onChange,
      color = _ref9.color,
      colorOff = _ref9.colorOff,
      iconColor = _ref9.iconColor,
      iconOffColor = _ref9.iconOffColor,
      labelOn = _ref9.labelOn,
      labelOff = _ref9.labelOff,
      labelType = _ref9.labelType;

  var _useState = (0, _react.useState)(checked),
      _useState2 = _slicedToArray(_useState, 2),
      toggle = _useState2[0],
      setToggle = _useState2[1];

  var onClickCb = (0, _react.useCallback)(function () {
    setToggle(!toggle);
    onChange(!toggle);
  }, [onChange, toggle]);
  (0, _react.useEffect)(function () {
    setToggle(checked);
  }, [checked]);
  return /*#__PURE__*/_react.default.createElement(SwitchElementWrapper, {
    className: "ie-radio__element-wrapper"
  }, /*#__PURE__*/_react.default.createElement(Switch, {
    className: "ie-radio__element",
    toggle: toggle,
    color: color
  }, /*#__PURE__*/_react.default.createElement(Input, {
    color: color,
    className: "ie-radio__element__input",
    type: "checkbox",
    checked: toggle,
    readOnly: true
  }), /*#__PURE__*/_react.default.createElement(Slider, {
    toggle: toggle,
    color: color,
    colorOff: colorOff,
    className: "ie-radio__element__slider",
    onClick: onClickCb
  }, /*#__PURE__*/_react.default.createElement(ToggleInnerLabel, {
    toggle: toggle,
    color: color,
    className: "ie-radio__element__slider__label"
  }, labelType === _types.ToggleLabelType.label ? toggle ? labelOn : labelOff : toggle ? /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _Icon.IconList.check,
    color: iconColor,
    fontSize: _types.IconSize.xs
  }) : /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _Icon.IconList.close,
    color: iconOffColor,
    fontSize: _types.IconSize.xs
  })))));
}

var SwitchToggle = function SwitchToggle(props) {
  var className = props.className,
      checked = props.checked,
      color = props.color,
      colorOff = props.colorOff,
      iconColor = props.iconColor,
      iconOffColor = props.iconOffColor,
      label = props.label,
      labelPosition = props.labelPosition,
      simpleElement = props.simpleElement,
      align = props.align,
      labelType = props.labelType,
      labelOn = props.labelOn,
      labelOff = props.labelOff,
      shadow = props.shadow,
      length = props.length,
      onChange = props.onChange;
  var id = (0, _react.useRef)((0, _helpers.generateID)());
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, simpleElement ? /*#__PURE__*/_react.default.createElement(_Element.default, {
    className: (0, _helpers.mergeClasses)('ie-radio', className),
    id: id.current,
    align: align,
    label: label,
    labelPosition: labelPosition
  }, /*#__PURE__*/_react.default.createElement(SwitchToggleElement, {
    checked: checked,
    color: color,
    labelOn: labelOn,
    labelOff: labelOff,
    labelType: labelType,
    colorOff: colorOff,
    iconColor: iconColor,
    iconOffColor: iconOffColor,
    onChange: onChange
  })) : /*#__PURE__*/_react.default.createElement(SwitchToggleAdvancedWrapper, {
    shadow: shadow,
    length: length,
    className: (0, _helpers.mergeClasses)('ie-radio', className)
  }, /*#__PURE__*/_react.default.createElement(SwitchToggleAdvancedLabel, {
    className: "ie-radio__label",
    htmlFor: id.current,
    length: length
  }, label), /*#__PURE__*/_react.default.createElement(SwitchToggleElement, {
    checked: checked,
    color: color,
    labelOn: labelOn,
    labelOff: labelOff,
    labelType: labelType,
    colorOff: colorOff,
    iconColor: iconColor,
    iconOffColor: iconOffColor,
    onChange: onChange
  })));
};

var defaultProps = {
  checked: true,
  className: '',
  color: _colors.allColors['Dim Gray'],
  colorOff: _colors.allColors['White'],
  iconColor: _colors.allColors['White'],
  iconOffColor: _colors.allColors['Dim Gray'],
  label: 'Label',
  labelPosition: undefined,
  simpleElement: false,
  labelOn: 'YES',
  labelOff: 'NO',
  shadow: true,
  labelType: _types.ToggleLabelType.label,
  length: _types.ElementLength.m,
  onChange: function onChange() {}
};
SwitchToggle.defaultProps = defaultProps;
SwitchToggleElement.defaultProps = defaultProps;
var _default = SwitchToggle;
exports.default = _default;