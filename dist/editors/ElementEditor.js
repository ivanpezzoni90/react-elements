"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ElementEditor;

var _react = _interopRequireWildcard(require("react"));

var _EditorBuilder = _interopRequireDefault(require("./EditorBuilder"));

var _Element = _interopRequireDefault(require("../ui/Element"));

var _types = require("../types");

var _hooks = require("../hooks");

var _commons = require("./commons");

var _Checkbox = require("../ui/Checkbox");

var _SwitchToggle = require("../ui/SwitchToggle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var editorJson = [{
  type: 'input',
  default: 'Label',
  label: 'Label',
  prop: 'label'
}, {
  type: 'select',
  label: 'Label Position',
  default: _types.LabelPositions.horizontal,
  prop: 'labelPosition',
  options: [{
    label: 'Horizontal',
    value: _types.LabelPositions.horizontal
  }, {
    label: 'Vertical',
    value: _types.LabelPositions.vertical
  }]
}, {
  type: 'select',
  label: 'Alignment',
  default: _types.AlignPositions.left,
  prop: 'align',
  options: [{
    label: 'Left',
    value: _types.AlignPositions.left
  }, {
    label: 'Center',
    value: _types.AlignPositions.center
  }, {
    label: 'Right',
    value: _types.AlignPositions.right
  }]
}, {
  label: 'Child',
  type: 'select',
  default: 'checkbox',
  prop: 'children',
  options: [{
    label: 'Checkbox',
    value: 'checkbox'
  }, {
    label: 'Switch Toggle',
    value: 'switchToggle'
  }]
}];

var getElement = function getElement(element) {
  switch (element) {
    case 'checkbox':
    default:
      return /*#__PURE__*/_react.default.createElement(_Checkbox.CheckboxElement, {
        className: "",
        checked: false,
        onChange: function onChange() {}
      });

    case 'switchToggle':
      return /*#__PURE__*/_react.default.createElement(_SwitchToggle.SwitchToggleElement, {
        checked: false,
        onChange: function onChange() {}
      });
  }
};

function ElementEditor() {
  return function ElementEditorFn() {
    var _useEditorInit = (0, _hooks.useEditorInit)(_Element.default.defaultProps),
        onChangeProp = _useEditorInit.onChangeProp,
        elementProps = _useEditorInit.props; // Get child to render inside element


    var elementToRender = getElement(elementProps.children);
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_commons.ElementContainer, null, /*#__PURE__*/_react.default.createElement(_Element.default, elementProps, elementToRender)), /*#__PURE__*/_react.default.createElement(_EditorBuilder.default, {
      json: editorJson,
      onChange: onChangeProp
    }));
  };
}