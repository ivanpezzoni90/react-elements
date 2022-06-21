"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InputEditor;

var _react = _interopRequireWildcard(require("react"));

var _EditorBuilder = _interopRequireDefault(require("./EditorBuilder"));

var _Input = _interopRequireDefault(require("../ui/Input"));

var _hooks = require("../hooks");

var _commons = require("./commons");

var _config = require("../ui/Input/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getEditor = function getEditor(props) {
  var editorJson = [{
    type: 'input',
    default: 'Label',
    label: 'Label',
    prop: 'label'
  }, {
    type: 'select',
    default: _config.InputTypes.text,
    label: 'Type',
    prop: 'type',
    options: [{
      label: 'Text',
      value: _config.InputTypes.text
    }, {
      label: 'Number',
      value: _config.InputTypes.number
    }, {
      label: 'Date',
      value: _config.InputTypes.date
    }]
  }, {
    label: 'Locked',
    type: 'toggle',
    default: false,
    prop: 'locked'
  }, {
    label: 'Error',
    type: 'toggle',
    default: false,
    prop: 'error'
  }]; // Error message

  if (props.error) {
    editorJson.push({
      label: 'Error Message',
      type: 'input',
      default: '',
      prop: 'errorMessage'
    });
  } // max/min


  editorJson.push({
    type: 'input',
    inputType: props.type,
    label: props.type === _config.InputTypes.text ? 'Max length' : 'Max',
    prop: 'max',
    default: undefined
  }, {
    type: 'input',
    label: props.type === _config.InputTypes.text ? 'Min length' : 'Min',
    inputType: props.type,
    prop: 'min',
    default: undefined
  });
  editorJson.push.apply(editorJson, [(0, _commons.lengthEditor)()].concat(_toConsumableArray(_commons.colorEditors), [_commons.shadowEditor]));
  return editorJson.filter(Boolean);
};

function InputEditor() {
  return function InputEditorFn() {
    var _useEditorInit = (0, _hooks.useEditorInit)(_Input.default.defaultProps),
        onChangeProp = _useEditorInit.onChangeProp,
        inputProps = _useEditorInit.props;

    var max = inputProps.max || inputProps.max === 0 ? inputProps.max.toString() : '';
    var parsedMax = parseFloat(max);
    var min = inputProps.min || inputProps.min === 0 ? inputProps.min.toString() : '';
    var parsedMin = parseFloat(min);
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_commons.ElementContainer, null, /*#__PURE__*/_react.default.createElement(_Input.default, _extends({}, inputProps, {
      type: inputProps.type,
      max: inputProps.max ? parsedMax : undefined,
      min: inputProps.min ? parsedMin : undefined,
      value: inputProps.value
    }))), /*#__PURE__*/_react.default.createElement(_EditorBuilder.default, {
      json: getEditor(inputProps),
      onChange: onChangeProp
    }));
  };
}