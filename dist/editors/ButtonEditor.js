"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ButtonEditor;

var _react = _interopRequireWildcard(require("react"));

var _EditorBuilder = _interopRequireDefault(require("./EditorBuilder"));

var _Button = _interopRequireDefault(require("../ui/Button"));

var _types = require("../types");

var _hooks = require("../hooks");

var _commons = require("./commons");

var _colors = require("../constants/colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getEditor = function getEditor() {
  var editorJson = [{
    type: 'input',
    default: 'Label',
    label: 'Label',
    prop: 'label'
  }, {
    type: 'color',
    default: _colors.allColors['Firebrick'],
    label: 'Color',
    prop: 'color'
  }, {
    type: 'color',
    default: _colors.allColors['White'],
    label: 'Text Color',
    prop: 'textColor'
  }, (0, _commons.lengthEditor)(), {
    type: 'toggle',
    default: false,
    label: 'Disabled',
    prop: 'disabled'
  }, _commons.borderRadiusEditor, _commons.fontWeightEditor, _commons.fontSizeEditor];
  editorJson.push(_commons.iconEditor, {
    type: 'color',
    default: _colors.allColors['White'],
    label: 'Icon Color',
    prop: 'iconColor'
  }, {
    type: 'select',
    default: _types.ButtonIconSize.auto,
    label: 'Icon Size',
    prop: 'buttonIconSize',
    options: [{
      label: 'Auto',
      value: _types.ButtonIconSize.auto
    }, {
      label: 'XS',
      value: _types.ButtonIconSize.xs
    }, {
      label: 'S',
      value: _types.ButtonIconSize.s
    }, {
      label: 'M',
      value: _types.ButtonIconSize.m
    }, {
      label: 'L',
      value: _types.ButtonIconSize.l
    }, {
      label: 'XL',
      value: _types.ButtonIconSize.xl
    }]
  }, {
    type: 'select',
    default: _types.IconPosition.left,
    label: 'Icon Position',
    prop: 'iconPosition',
    options: [{
      label: 'Left',
      value: _types.IconPosition.left
    }, {
      label: 'Right',
      value: _types.IconPosition.right
    }]
  });
  return editorJson;
};

function ButtonEditor() {
  return function ButtonEditorFn() {
    var _useEditorInit = (0, _hooks.useEditorInit)(_Button.default.defaultProps),
        onChangeProp = _useEditorInit.onChangeProp,
        buttonProps = _useEditorInit.props;

    var editorJson = getEditor();
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_commons.ElementContainer, null, /*#__PURE__*/_react.default.createElement(_Button.default, _extends({}, buttonProps, {
      icon: buttonProps.icon
    }))), /*#__PURE__*/_react.default.createElement(_EditorBuilder.default, {
      json: editorJson,
      onChange: onChangeProp
    }));
  };
}