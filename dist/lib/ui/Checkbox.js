"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxElement = CheckboxElement;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../helpers");

var _Element = _interopRequireDefault(require("./Element"));

var _types = require("../types");

var _colors = require("../constants/colors");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;

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

var CheckboxContainer = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: inline-block;\n    vertical-align: middle;\n    padding: 0.25em 1em 0 0.25em;\n"])));

var Icon = _styledComponents.default.svg(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    fill: none;\n    stroke: ", ";\n    stroke-width: 2px;\n"])), function (_ref) {
  var colorOff = _ref.colorOff;
  return colorOff;
});

var HiddenCheckbox = _styledComponents.default.input.attrs({
  type: 'checkbox'
})(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    border: 0;\n    clip: rect(0 0 0 0);\n    clippath: inset(50%);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    white-space: nowrap;\n    width: 1px;\n"])));

var StyledCheckbox = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    display: inline-block;\n    width: 1.5em;\n    height: 1.5em;\n    background: ", ";\n    border-radius: 3px;\n    border: 1px solid #666;\n    transition: all 150ms;\n\n    ", ":focus + & {\n        box-shadow: 0 0 0 3px #dedede;\n    }\n\n    ", " {\n        visibility: ", "\n    }\n"])), function (_ref2) {
  var checked = _ref2.checked,
      color = _ref2.color,
      colorOff = _ref2.colorOff;
  return checked ? color : colorOff;
}, HiddenCheckbox, Icon, function (_ref3) {
  var checked = _ref3.checked;
  return checked ? 'visible' : 'hidden';
});

var CheckboxAdvancedWrapper = _styledComponents.default.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    min-width: 7em;\n    width: ", ";\n    height: 3.5em;\n    position: relative;\n    background-color: rgba(255, 255, 255, 0.3);\n    border: none;\n    border-bottom: 1px solid #666;\n    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;\n    background-color: #ffffff;\n    ", "\n\n    &:hover{\n        background-color: rgba(255, 255, 255, 0.45);\n        ", "\n    }\n"])), function (props) {
  return props.length;
}, function (_ref4) {
  var shadow = _ref4.shadow;
  return shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);' : '';
}, function (_ref5) {
  var shadow = _ref5.shadow;
  return shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : '';
});

var CheckboxAdvancedLabel = _styledComponents.default.label(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: flex-start;\n    flex: 1;\n    padding: 0 1em 0 1em;\n\n    font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    line-height: 24px;\n    color: #666;\n    opacity: 1;\n    pointer-events: none;\n    transition: 0.1s all ease-in-out;\n\n    max-width: ", ";\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n"])), function (_ref6) {
  var length = _ref6.length;
  return length;
});

function CheckboxElement(_ref7) {
  var className = _ref7.className,
      checkedFromProps = _ref7.checked,
      color = _ref7.color,
      colorOff = _ref7.colorOff,
      onChange = _ref7.onChange;

  var _useState = (0, _react.useState)(checkedFromProps),
      _useState2 = _slicedToArray(_useState, 2),
      checked = _useState2[0],
      setChecked = _useState2[1];

  function onCheckboxChange() {
    setChecked(!checked);
    onChange(!checked);
  }

  (0, _react.useEffect)(function () {
    setChecked(checkedFromProps);
  }, [checkedFromProps]);
  return <CheckboxContainer className={(0, _helpers.mergeClasses)('ie-checkbox', className)}>
        <HiddenCheckbox className="ie-checkbox__input" />
        <StyledCheckbox className="ie-checkbox__checkbox" checked={checked} color={color} colorOff={colorOff} onClick={onCheckboxChange}>
            <Icon viewBox="0 0 24 24" className="ie-checkbox__checkbox__icon" colorOff={colorOff}>
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    </CheckboxContainer>;
}

function Checkbox(props) {
  var className = props.className,
      checkedFromProps = props.checked,
      label = props.label,
      labelPosition = props.labelPosition,
      align = props.align,
      simpleElement = props.simpleElement,
      shadow = props.shadow,
      length = props.length,
      color = props.color,
      colorOff = props.colorOff,
      onChange = props.onChange;
  var id = (0, _react.useRef)((0, _helpers.generateID)());
  return <_react.Fragment>
            {simpleElement ? <_Element.default id={id.current} align={align} label={label} labelPosition={labelPosition}>
                    <CheckboxElement className={className} checked={checkedFromProps} color={color} colorOff={colorOff} onChange={onChange} />
                </_Element.default> : <CheckboxAdvancedWrapper shadow={shadow} length={length}>
                    <CheckboxAdvancedLabel htmlFor={id.current} length={length}>
                        {label}
                    </CheckboxAdvancedLabel>
                    <CheckboxElement className={className} checked={checkedFromProps} color={color} colorOff={colorOff} onChange={onChange} />
                </CheckboxAdvancedWrapper>}
        </_react.Fragment>;
}

var defaultProps = {
  className: '',
  checked: false,
  color: _colors.allColors['Dim Gray'],
  colorOff: _colors.allColors['White'],
  label: 'Label',
  simpleElement: false,
  shadow: true,
  labelPosition: _types.LabelPositions.horizontal,
  length: _types.ElementLength.m,
  onChange: function onChange() {}
};
Checkbox.defaultProps = defaultProps;
CheckboxElement.defaultProps = defaultProps;
var _default = Checkbox;
exports.default = _default;