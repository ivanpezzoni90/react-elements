"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SwitchToggleEditor;

var _react = _interopRequireWildcard(require("react"));

var _EditorBuilder = _interopRequireDefault(require("./EditorBuilder"));

var _SwitchToggle = _interopRequireDefault(require("../ui/SwitchToggle"));

var _types = require("../types");

var _hooks = require("../hooks");

var _commons = require("./commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getEditor = function getEditor(props) {
  var editorJson = [{
    type: 'input',
    default: 'Label',
    label: 'Label',
    prop: 'label'
  }, {
    type: 'color',
    default: '#666',
    label: 'Color',
    prop: 'color'
  }, {
    type: 'color',
    default: 'white',
    label: 'Off Color',
    prop: 'colorOff'
  }, {
    type: 'select',
    default: _types.ToggleLabelType.label,
    label: 'Label type',
    prop: 'labelType',
    options: [{
      label: 'Label',
      value: _types.ToggleLabelType.label
    }, {
      label: 'Icon',
      value: _types.ToggleLabelType.icon
    }]
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

  if (props.labelType === _types.ToggleLabelType.label) {
    editorJson.push({
      type: 'input',
      default: 'YES',
      label: 'Label ON',
      prop: 'labelOn'
    }, {
      type: 'input',
      default: 'NO',
      label: 'Label OFF',
      prop: 'labelOff'
    });
  } else if (props.labelType === _types.ToggleLabelType.icon) {
    editorJson.push({
      type: 'color',
      default: 'white',
      label: 'Icon Color',
      prop: 'iconColor'
    }, {
      type: 'color',
      default: '#666',
      label: 'Icon Off Color',
      prop: 'iconOffColor'
    });
  }

  return editorJson;
};

function SwitchToggleEditor() {
  return function SwitchToggleEditorFn() {
    var _useEditorInit = (0, _hooks.useEditorInit)(_SwitchToggle.default.defaultProps),
        onChangeProp = _useEditorInit.onChangeProp,
        switchToggleProps = _useEditorInit.props;

    var editorJson = getEditor(switchToggleProps);
    return <_react.Fragment>
                <_commons.ElementContainer>
                    <_SwitchToggle.default {...switchToggleProps} />
                </_commons.ElementContainer>
                <_EditorBuilder.default json={editorJson} onChange={onChangeProp} />
            </_react.Fragment>;
  };
}