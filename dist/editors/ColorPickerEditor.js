"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColorPickerEditor;

var _react = _interopRequireWildcard(require("react"));

var _EditorBuilder = _interopRequireDefault(require("./EditorBuilder"));

var _ColorPicker = _interopRequireDefault(require("../ui/ColorPicker"));

var _types = require("../types");

var _hooks = require("../hooks");

var _commons = require("./commons");

var _colors = require("../constants/colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getEditor = function getEditor(props) {
  var editorJson = [{
    type: 'input',
    default: 'Label',
    label: 'Label',
    prop: 'label'
  }, (0, _commons.lengthEditor)(_types.ElementLength.m), {
    type: 'checkbox',
    default: false,
    label: 'Simple Element',
    prop: 'simpleElement'
  }];

  if (props.simpleElement) {
    editorJson.push(_commons.labelPositionEditor, _commons.alignPositionEditor);
  } else {
    editorJson.push(_commons.shadowEditor);
  }

  return editorJson;
};

function ColorPickerEditor() {
  return function ColorPickerEditorFn() {
    var _useEditorInit = (0, _hooks.useEditorInit)(_ColorPicker.default.defaultProps),
        onChangeProp = _useEditorInit.onChangeProp,
        pickerProps = _useEditorInit.props;

    var editorJson = getEditor(pickerProps);
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_commons.ElementContainer, null, /*#__PURE__*/_react.default.createElement(_ColorPicker.default, _extends({}, pickerProps, {
      value: pickerProps.value || _colors.allColors['Ruby Red']
    }))), /*#__PURE__*/_react.default.createElement(_EditorBuilder.default, {
      json: editorJson,
      onChange: onChangeProp
    }));
  };
}