"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputElement = InputElement;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _helpers = require("../../helpers");

var _InputStyle = require("./InputStyle");

require("./style.css");

var _config = require("./config");

var _types = require("../../types");

var _colors = require("../../constants/colors");

var _Icon = _interopRequireWildcard(require("../Icon"));

var _hooks = require("../../hooks");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function InputElement(_ref) {
  var error = _ref.error,
      setError = _ref.setError,
      length = _ref.length,
      active = _ref.active,
      shadow = _ref.shadow,
      textColor = _ref.textColor,
      label = _ref.label,
      id = _ref.id,
      type = _ref.type,
      value = _ref.value,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      max = _ref.max,
      min = _ref.min,
      computedWidth = _ref.computedWidth;
  var checkValidators = (0, _react.useCallback)(function (newValue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    switch (type) {
      case _config.InputTypes.text:
        if (max && newValue.length > max) {
          return false;
        }

        if (min && newValue.length < min) {
          setError(true);
        } else {
          setError(false);
        }

        return true;

      case _config.InputTypes.number:
        {
          var parsedValue = parseFloat(newValue);

          if (max !== undefined && parsedValue > max || min !== undefined && parsedValue < min) {
            setError(true);

            if (opts.changeFromCaret) {
              return false;
            }
          } else {
            setError(false);
          }

          return true;
        }
    }

    return true;
  }, [max, min, type, setError]);
  var onChangeValue = (0, _react.useCallback)(function (event) {
    var newValue = event.target.value;

    if (checkValidators(newValue)) {
      onChange(newValue);
    }
  }, [onChange, checkValidators]);
  var onBlurInput = (0, _react.useCallback)(function (event) {
    var newValue = event.target.value;

    if (checkValidators(newValue)) {
      onBlur(newValue);
    }
  }, [onBlur, checkValidators]);
  var handleNumberCaret = (0, _react.useCallback)(function (type) {
    return function () {
      var parsedValue = parseFloat(value || '0');
      var newValue = (type === 'up' ? parsedValue + 1 : parsedValue - 1).toString();

      if (checkValidators(newValue, {
        changeFromCaret: true
      })) {
        onChange(newValue);
      }
    };
  }, [checkValidators, onChange, value]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_InputStyle.InputElementStyle, {
    error: error,
    length: length,
    active: active,
    shadow: shadow,
    textColor: textColor,
    id: id,
    type: type,
    value: value,
    placeholder: label,
    computedWidth: computedWidth,
    onChange: onChangeValue,
    onFocus: onFocus,
    onBlur: onBlurInput
  }), type === _config.InputTypes.number ? /*#__PURE__*/_react.default.createElement(_InputStyle.InputNumberIcons, null, /*#__PURE__*/_react.default.createElement(_InputStyle.IconWrapper, {
    onClick: handleNumberCaret('up')
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    color: textColor,
    icon: _Icon.IconList.caretUp
  })), /*#__PURE__*/_react.default.createElement(_InputStyle.IconWrapper, {
    onClick: handleNumberCaret('down')
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    color: textColor,
    icon: _Icon.IconList.caretDown
  }))) : null);
}

function Input(_ref2) {
  var locked = _ref2.locked,
      errorFromProps = _ref2.error,
      errorMessage = _ref2.errorMessage,
      valueFromProps = _ref2.value,
      label = _ref2.label,
      shadow = _ref2.shadow,
      onBlur = _ref2.onBlur,
      onChange = _ref2.onChange,
      length = _ref2.length,
      activeFromProps = _ref2.active,
      labelColor = _ref2.labelColor,
      textColor = _ref2.textColor,
      borderColor = _ref2.borderColor,
      max = _ref2.max,
      min = _ref2.min,
      type = _ref2.type;

  // active = focused or with value
  var _useState = (0, _react.useState)(activeFromProps || valueFromProps !== ''),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var _useState3 = (0, _react.useState)(valueFromProps),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = (0, _react.useState)(errorFromProps),
      _useState6 = _slicedToArray(_useState5, 2),
      error = _useState6[0],
      setError = _useState6[1];

  (0, _react.useEffect)(function () {
    setValue(valueFromProps);
  }, [valueFromProps]);
  (0, _react.useEffect)(function () {
    setError(errorFromProps);
  }, [errorFromProps]);
  var id = (0, _react.useRef)((0, _helpers.generateID)());
  var onChangeCb = (0, _react.useCallback)(function (newValue) {
    if (newValue !== '') setActive(true);
    setValue(newValue);
    onChange(newValue);
  }, [onChange]);
  var setFocusFromDiv = (0, _react.useCallback)(function () {
    var inputEl = document.getElementById(id.current);
    inputEl && inputEl.focus();
  }, []);
  var onFocusCb = (0, _react.useCallback)(function () {
    if (!locked) setActive(true);
  }, [locked]);
  var onBlurCb = (0, _react.useCallback)(function (newValue) {
    if (newValue === '') setActive(false);
    onBlur(newValue);
  }, [onBlur]);
  var inputWrapperRef = (0, _react.useRef)(null);
  var inputElementWidth = (0, _helpers.elaborateComputedWidth)((0, _hooks.useComputedWidth)(inputWrapperRef));
  return /*#__PURE__*/_react.default.createElement(_InputStyle.InputWrapper, {
    ref: inputWrapperRef,
    length: length,
    active: active,
    locked: locked,
    shadow: shadow,
    borderColor: borderColor,
    onClick: setFocusFromDiv
  }, /*#__PURE__*/_react.default.createElement(_InputStyle.Label, {
    htmlFor: id.current,
    error: error,
    length: length // Type date is always "active"
    ,
    active: active || type === _config.InputTypes.date,
    labelColor: labelColor
  }, error && errorMessage || label), /*#__PURE__*/_react.default.createElement(InputElement, {
    error: error,
    setError: setError,
    length: length // Type date is always "active"
    ,
    active: active || type === _config.InputTypes.date,
    shadow: shadow,
    textColor: textColor,
    label: label,
    id: id.current,
    type: type,
    value: value,
    onChange: onChangeCb,
    onFocus: onFocusCb,
    onBlur: onBlurCb,
    max: max,
    min: min,
    computedWidth: inputElementWidth
  }));
}

var defaultProps = {
  locked: false,
  error: false,
  errorMessage: undefined,
  value: '',
  label: 'Label',
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  shadow: true,
  length: _types.ElementLength.full,
  active: undefined,
  labelColor: _colors.allColors['Dim Gray'],
  textColor: _colors.allColors['Dim Gray'],
  borderColor: _colors.allColors['Dim Gray'],
  min: undefined,
  max: undefined,
  type: _config.InputTypes.text
};
Input.defaultProps = defaultProps;
var _default = Input;
exports.default = _default;