"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RadioEditor;

var _react = _interopRequireWildcard(require("react"));

var _EditorBuilder = _interopRequireDefault(require("./EditorBuilder"));

var _types = require("../types");

var _hooks = require("../hooks");

var _commons = require("./commons");

var _config = require("../ui/Input/config");

var _Radio = _interopRequireDefault(require("../ui/Radio"));

var _Icon = require("../ui/Icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var defaultOptions = [{
  label: 'Option 1',
  value: '1',
  icon: _Icon.IconList.close
}, {
  label: 'Option 2',
  value: '2',
  icon: _Icon.IconList.check
}];

var getEditor = function getEditor(props) {
  var editorJson = [{
    type: 'input',
    default: 'Label',
    label: 'Label',
    prop: 'label'
  }, {
    type: 'select',
    default: _types.RadioTypes.checkbox,
    label: 'Type',
    prop: 'type',
    options: [{
      label: 'Checkbox',
      value: _types.RadioTypes.checkbox
    }, {
      label: 'Toggle',
      value: _types.RadioTypes.toggle
    }, {
      label: 'Button',
      value: _types.RadioTypes.button
    }]
  }, _commons.positionEditor, // Workaround to change number of options using value prop
  {
    type: 'input',
    inputType: _config.InputTypes.number,
    default: 2,
    label: 'Number of elements',
    prop: 'value'
  }];
  return editorJson.filter(Boolean);
};

var generateOptions = function generateOptions(n) {
  var i = 0;
  var parsedN = parseInt(n, 10);
  var options = [];

  while (i < parsedN) {
    options.push({
      label: "Option ".concat(i + 1),
      value: "".concat(i + 1),
      icon: i & 1 ? _Icon.IconList.check : _Icon.IconList.close
    });
    i++;
  }

  return options;
};

function RadioEditor() {
  return function RadioEditorFn() {
    var _useEditorInit = (0, _hooks.useEditorInit)(_Radio.default.defaultProps),
        onChangeProp = _useEditorInit.onChangeProp,
        radioProps = _useEditorInit.props;

    console.log('radioProps', radioProps);
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_commons.ElementContainer, null, /*#__PURE__*/_react.default.createElement(_Radio.default, _extends({}, radioProps, {
      type: radioProps.type // Workaround to change number of options using value prop
      ,
      options: radioProps.value ? generateOptions(radioProps.value) : defaultOptions,
      value: radioProps.value
    }))), /*#__PURE__*/_react.default.createElement(_EditorBuilder.default, {
      json: getEditor(radioProps),
      onChange: onChangeProp
    }));
  };
}