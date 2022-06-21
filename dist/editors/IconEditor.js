"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconEditor;

var _react = _interopRequireWildcard(require("react"));

var _EditorBuilder = _interopRequireDefault(require("./EditorBuilder"));

var _Icon = _interopRequireWildcard(require("../ui/Icon"));

var _hooks = require("../hooks");

var _commons = require("./commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getEditor = function getEditor() {
  var editorJson = [_commons.iconEditor, {
    type: 'color',
    default: '#666',
    label: 'Color',
    prop: 'color'
  }, _commons.iconSizeEditor];
  return editorJson;
};

function IconEditor() {
  return function IconEditorFn() {
    var _useEditorInit = (0, _hooks.useEditorInit)(_Icon.default.defaultProps),
        onChangeProp = _useEditorInit.onChangeProp,
        props = _useEditorInit.props;

    var iconProps = props.icon ? props : Object.assign({}, props, {
      icon: _Icon.IconList.check
    });
    var editorJson = getEditor();
    return <_react.Fragment>
                <_commons.ElementContainer>
                    <_Icon.default {...iconProps} />
                </_commons.ElementContainer>
                <_EditorBuilder.default json={editorJson} onChange={onChangeProp} />
            </_react.Fragment>;
  };
}