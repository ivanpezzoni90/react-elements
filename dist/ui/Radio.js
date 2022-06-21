"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../helpers");

var _types = require("../types");

var _Checkbox = require("./Checkbox");

var _SwitchToggle = require("./SwitchToggle");

var _Button = _interopRequireDefault(require("./Button"));

var _colors = require("../constants/colors");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

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

var Label = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: flex-start;\n    flex: 1;\n    padding: 0 1em 0 1em;\n\n    font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    line-height: 24px;\n    color: #666;\n    opacity: 1;\n    pointer-events: none;\n    transition: 0.1s all ease-in-out;\n"])));

var RadioWrapper = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n    padding: 0.5em;\n"])));

var RadioContainer = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    display: flex;\n    ", "\n    ", "\n    padding-left: 1.5em;\n"])), function (_ref) {
  var position = _ref.position;
  return position === _types.Positions.horizontal ? "\n            flex-direction: row;\n        " : '';
}, function (_ref2) {
  var position = _ref2.position;
  return position === _types.Positions.vertical ? "\n            flex-direction: column;\n            max-width: 8em;\n        " : '';
});

var RadioElement = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    padding: 0.25em ", " 0.25em 0;\n"])), function (_ref3) {
  var type = _ref3.type;
  return type === _types.RadioTypes.button ? '1em' : '0';
});

var RadioLabel = _styledComponents.default.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    padding: 0 1em 0 0;\n    font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n    font-size: 14px;\n    font-weight: 400;\n    line-height: 24px;\n    color: #666;\n\n    display: flex;\n    flex: 1;\n\n    max-width: 6em;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n"])));

var getRadioElement = function getRadioElement(o, type, value, onRadioChange) {
  var element = /*#__PURE__*/_react.default.createElement("div", null);

  switch (type) {
    case _types.RadioTypes.checkbox:
      element = /*#__PURE__*/_react.default.createElement(_Checkbox.CheckboxElement, {
        className: 'ie-radio__element__checkbox',
        checked: value === o.value,
        onChange: function onChange() {
          onRadioChange(o.value);
        }
      });
      break;

    case _types.RadioTypes.toggle:
      element = /*#__PURE__*/_react.default.createElement(_SwitchToggle.SwitchToggleElement, {
        checked: value === o.value,
        onChange: function onChange() {
          onRadioChange(o.value);
        }
      });
      break;

    case _types.RadioTypes.button:
      element = /*#__PURE__*/_react.default.createElement(_Button.default, {
        label: "",
        icon: o.icon,
        borderRadius: _types.BorderRadius.m,
        length: _types.ElementLength.squared,
        fontSize: _types.ElementSize.xxs,
        buttonIconSize: _types.ButtonIconSize.xl,
        color: value === o.value ? _colors.allColors['Gray Web'] : _colors.allColors['Quick Silver'],
        onClick: function onClick() {
          onRadioChange(o.value);
        }
      });
      break;

    default:
      break;
  }

  return /*#__PURE__*/_react.default.createElement(RadioElement, {
    key: "key_".concat(o.value),
    type: type,
    className: "ie-radio__element"
  }, /*#__PURE__*/_react.default.createElement(RadioLabel, {
    className: "ie-radio__element__label"
  }, o.label), element);
};

function Radio(props) {
  var className = props.className,
      label = props.label,
      position = props.position,
      valueFromProps = props.value,
      type = props.type,
      options = props.options,
      onChange = props.onChange;
  var id = (0, _react.useRef)((0, _helpers.generateID)());

  var _useState = (0, _react.useState)(valueFromProps),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var onRadioChange = function onRadioChange(newValue) {
    setValue(newValue);
    onChange(newValue);
  };

  return /*#__PURE__*/_react.default.createElement(RadioWrapper, {
    className: (0, _helpers.mergeClasses)('ie-radio', className)
  }, /*#__PURE__*/_react.default.createElement(Label, {
    className: "ie-radio__label",
    htmlFor: id.current
  }, label), /*#__PURE__*/_react.default.createElement(RadioContainer, {
    className: "ie-radio__container",
    position: position
  }, options.map(function (o) {
    return getRadioElement(o, type, value, onRadioChange);
  })));
}

var defaultProps = {
  className: '',
  label: 'Label',
  position: _types.Positions.vertical,
  value: '',
  type: _types.RadioTypes.checkbox,
  options: [],
  onChange: function onChange() {}
};
Radio.defaultProps = defaultProps;
var _default = Radio;
exports.default = _default;