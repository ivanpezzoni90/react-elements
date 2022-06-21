"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPickerElement = ColorPickerElement;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../helpers");

var _Element = _interopRequireDefault(require("./Element"));

var _types = require("../types");

var _hooks = require("../hooks");

var _colors = require("../constants/colors");

var _Input = _interopRequireDefault(require("./Input"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13;

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

var ColorPickerContainer = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding-right: 1em;\n\n    vertical-align: middle;\n    padding: 0.25em 1em 0 0.25em;\n\n    display: flex;\n"])));

var StyledColorPicker = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    display: inline-block;\n    width: 1.5em;\n    height: 1.5em;\n    border-radius: 3px;\n    border: 1px solid #666;\n    background: ", ";\n"])), function (props) {
  return props.color;
});

var ColorPickerAdvancedWrapper = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    min-width: 7em;\n    width: ", ";\n    height: 3.5em;\n    position: relative;\n    background-color: rgba(255, 255, 255, 0.3);\n    border: none;\n    border-bottom: 1px solid #666;\n    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;\n    background-color: #ffffff;\n    ", "\n\n    &:hover{\n        background-color: rgba(255, 255, 255, 0.45);\n        ", "\n    }\n"])), function (props) {
  return props.length;
}, function (_ref) {
  var shadow = _ref.shadow;
  return shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);' : '';
}, function (_ref2) {
  var shadow = _ref2.shadow;
  return shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : '';
});

var ColorPickerAdvancedLabel = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: flex-start;\n    flex: 1;\n    padding: 0 1em 0 1em;\n\n    font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    line-height: 24px;\n    color: #666;\n    opacity: 1;\n    pointer-events: none;\n    transition: 0.1s all ease-in-out;\n\n    max-width: ", ";\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n"])), function (_ref3) {
  var length = _ref3.length;
  return length;
});

var DropDownListContainer = (0, _styledComponents.default)('div')(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    position: absolute;\n    ", ";\n    margin-top: 2em;\n"])), function (props) {
  return props.zIndex ? "z-index: ".concat(props.zIndex) : '';
});

var DropDownList = _styledComponents.default.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    margin: 0;\n    margin-top: 0.25em;\n    padding: 0.5em;\n    background-color: #ebebeb;\n    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);\n    box-sizing: border-box;\n    color: #666;\n    font-size: 1em;\n    font-weight: 500;\n    text-align: left;\n\n    display: flex;\n    flex-direction: column;\n"])));

var ColorListColumn = _styledComponents.default.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n\n"])));

var ColorListRow = _styledComponents.default.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n    display: flex;\n"])));

var ColorListItem = _styledComponents.default.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n    display: inline-block;\n    width: 1.5em;\n    height: 1.5em;\n    background: ", ";\n    ", "\n    ", "\n    margin-right: 1px;\n    margin-bottom: 1px;\n"])), function (props) {
  return props.color;
}, function (props) {
  return props.hovered ? "\n        -webkit-box-shadow:inset 0px 0px 0px 1px ".concat(props.borderColor, ";\n        -moz-box-shadow:inset 0px 0px 0px 10px ").concat(props.borderColor, ";\n        box-shadow:inset 0px 0px 0px 1px ").concat(props.borderColor, ";\n    ") : '';
}, function (props) {
  return props.selected ? "\n        -webkit-box-shadow:inset 0px 0px 0px 1px ".concat(props.borderColor, ";\n        -moz-box-shadow:inset 0px 0px 0px 10px ").concat(props.borderColor, ";\n        box-shadow:inset 0px 0px 0px 1px ").concat(props.borderColor, ";\n    ") : '';
});

var ColorListFooter = _styledComponents.default.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n    display: flex;\n    padding-top: 1em;\n"])));

var ColorPickerInfoContainer = _styledComponents.default.div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n    font-size: 10px;\n    color: ", ";\n    padding-right: 0.5em;\n"])), _colors.allColors['Dim Gray']);

var SelectedColor = _styledComponents.default.div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n"])));

var SelectedColorLabel = _styledComponents.default.div(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n"])));

function ColorPickerElement(_ref4) {
  var className = _ref4.className,
      valueFromProps = _ref4.valueFromProps,
      onChange = _ref4.onChange;

  var _useState = (0, _react.useState)(valueFromProps),
      _useState2 = _slicedToArray(_useState, 2),
      selectedColor = _useState2[0],
      setSelectedColor = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isOpen = _useState4[0],
      setIsOpen = _useState4[1];

  var selectedColorLabel = (0, _colors.getColorNameByHex)(selectedColor);

  var toggling = function toggling() {
    return setIsOpen(!isOpen);
  };

  var ref = (0, _react.useRef)(null);
  var dropDownZIndex = (0, _hooks.useComputedZIndex)(ref);

  var onChangeColor = function onChangeColor(newColor) {
    return function () {
      setSelectedColor(newColor);
      onChange(newColor);
    };
  };

  var onCustomColorChange = function onCustomColorChange(newColor) {
    setSelectedColor(newColor);
    onChange(newColor);
  };

  var emptyColorObj = {
    name: '',
    hex: '',
    rgb: []
  };

  var _useState5 = (0, _react.useState)(emptyColorObj),
      _useState6 = _slicedToArray(_useState5, 2),
      hoverColor = _useState6[0],
      setHoverColor = _useState6[1];

  var onMouseEnter = function onMouseEnter(color) {
    return function () {
      return setHoverColor(color);
    };
  };

  var onMouseLeave = function onMouseLeave() {
    return setHoverColor(emptyColorObj);
  };

  return <ColorPickerContainer className={(0, _helpers.mergeClasses)('ie-color-picker', className)}>
        <ColorPickerInfoContainer>
            <SelectedColor>
                {selectedColor}
            </SelectedColor>
            <SelectedColorLabel>
                {selectedColorLabel}
            </SelectedColorLabel>
        </ColorPickerInfoContainer>
        <StyledColorPicker className="ie-color-picker__picker" ref={ref} color={selectedColor} onClick={toggling} />
        {isOpen && <DropDownListContainer zIndex={dropDownZIndex}>
                <DropDownList>
                    <ColorListColumn // Reset hoverColor when leaving palette div
        onMouseLeave={onMouseLeave}>
                        {Object.values(_colors.palette).map(function (colorArray) {
            return <ColorListRow key={Math.random()}>
                                {colorArray.map(function (colorObj) {
                return <ColorListItem key={"".concat(colorObj.name, "_").concat(colorObj.hex)} color={colorObj.hex} selected={colorObj.hex === selectedColor} hovered={colorObj.hex === hoverColor.hex} onClick={onChangeColor(colorObj.hex)} onMouseEnter={onMouseEnter(colorObj)} borderColor={(0, _helpers.fontColorFromBackground)(colorObj.hex)} />;
              })}
                            </ColorListRow>;
          })}
                    </ColorListColumn>
                    <ColorListFooter>
                        <_Input.default active shadow={false} value={hoverColor.hex !== '' ? hoverColor.hex : selectedColor} label={hoverColor.name !== '' ? hoverColor.name : selectedColorLabel || ''} onChange={onCustomColorChange} />

                    </ColorListFooter>
                </DropDownList>
            </DropDownListContainer>}
    </ColorPickerContainer>;
}

function ColorPicker(props) {
  var className = props.className,
      valueFromProps = props.value,
      label = props.label,
      labelPosition = props.labelPosition,
      align = props.align,
      simpleElement = props.simpleElement,
      shadow = props.shadow,
      length = props.length,
      onChange = props.onChange;
  var id = (0, _react.useRef)((0, _helpers.generateID)());
  return <_react.Fragment>
            {simpleElement ? <_Element.default id={id.current} align={align} label={label} labelPosition={labelPosition}>
                    <ColorPickerElement className={className} valueFromProps={valueFromProps} onChange={onChange} />
                </_Element.default> : <ColorPickerAdvancedWrapper shadow={shadow} length={length}>
                    <ColorPickerAdvancedLabel htmlFor={id.current} length={length}>
                        {label}
                    </ColorPickerAdvancedLabel>
                    <ColorPickerElement className={className} valueFromProps={valueFromProps} onChange={onChange} />
                </ColorPickerAdvancedWrapper>}
        </_react.Fragment>;
}

var defaultProps = {
  className: '',
  value: '',
  label: 'Label',
  simpleElement: false,
  shadow: true,
  labelPosition: _types.LabelPositions.horizontal,
  length: _types.ElementLength.m,
  onChange: function onChange() {}
};
ColorPicker.defaultProps = defaultProps;
var _default = ColorPicker;
exports.default = _default;