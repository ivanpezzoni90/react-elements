"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderElement = SliderElement;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../helpers");

var _Element = _interopRequireDefault(require("./Element"));

var _types = require("../types");

var _colors = require("../constants/colors");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;

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

var SliderContainer = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    vertical-align: middle;\n    padding: 0.25em 1em 0 0.25em;\n    flex: 1;\n"])));

var SliderAdvancedWrapper = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    min-width: 7em;\n    width: ", ";\n    height: 3.5em;\n    position: relative;\n    background-color: rgba(255, 255, 255, 0.3);\n    border: none;\n    border-bottom: 1px solid #666;\n    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;\n    background-color: #ffffff;\n    ", "\n\n    &:hover{\n        background-color: rgba(255, 255, 255, 0.45);\n        ", "\n    }\n"])), function (props) {
  return props.length;
}, function (_ref) {
  var shadow = _ref.shadow;
  return shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);' : '';
}, function (_ref2) {
  var shadow = _ref2.shadow;
  return shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : '';
});

var SliderAdvancedLabel = _styledComponents.default.label(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: flex-start;\n    flex: 0.2;\n    padding: 0 1em 0 1em;\n\n    font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    line-height: 24px;\n    color: #666;\n    opacity: 1;\n    pointer-events: none;\n    transition: 0.1s all ease-in-out;\n\n    max-width: ", ";\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n"])), function (_ref3) {
  var length = _ref3.length;
  return length;
}); // TODO: REMOVE ANY


var getSliderCursorStyles = function getSliderCursorStyles(color) {
  return "\n    width: 1em;\n    height: 2em;\n    background: ".concat(color, ";\n    cursor: pointer;\n\n    outline: none;\n    \n    border-radius: 18px;\n\n    transition: outline 0.5s ease-in-out;\n\n    &:hover {\n        outline: ").concat(getOutlineColor((0, _helpers.lightenDarkenColor)(color, 80)), " solid 4px;\n        transition: outline 0.5s ease-in-out;\n    }\n");
};

var SliderElementContainer = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    display: flex;\n    flex: 1;\n    align-items: center;\n    color: #888;\n"])));

var SliderTooltip = _styledComponents.default.span(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    visibility: hidden;\n    opacity: 0;\n    transition: visibility 0s 0.5s, opacity 0.5s;\n\n    width: 4em;\n    background-color: ", ";\n    color: ", ";\n    text-align: center;\n    padding: 5px 0;\n    border-radius: 6px;\n\n    position: absolute;\n    z-index: 1;\n\n    bottom: 100%;\n    margin-bottom: 16px;\n\n    margin-left: ", ";\n    left: ", "%;\n\n    ::after {\n        content: \"\";\n        position: absolute;\n        top: 100%;\n        left: 50%;\n        margin-left: -5px;\n        border-width: 5px;\n        border-style: solid;\n        border-color: ", " transparent transparent transparent;\n    }\n"])), _colors.allColors['Dim Gray'], _colors.allColors['White'], function (_ref4) {
  var percentage = _ref4.percentage;
  return calculateTooltipMarginByPercentage(percentage);
}, function (_ref5) {
  var percentage = _ref5.percentage;
  return percentage;
}, _colors.allColors['Dim Gray']);

var SliderInput = _styledComponents.default.input(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    -webkit-appearance: none;\n    width: 100%;\n    height: 1em;\n    border-radius: 5px;\n    background: ", ";\n    outline: none;\n\n    padding-bottom: 0.25em;\n\n    &::-webkit-slider-thumb {\n        -webkit-appearance: none;\n        appearance: none;\n        ", "\n    }\n\n    &::-moz-range-thumb {\n        ", "\n    }\n"])), _colors.allColors['Platinum'], function (_ref6) {
  var color = _ref6.color;
  return getSliderCursorStyles(color);
}, function (_ref7) {
  var color = _ref7.color;
  return getSliderCursorStyles(color);
});

var SliderInputWrapper = _styledComponents.default.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n\n    position: relative;\n\n    &:hover ", " {\n        visibility: visible;\n        opacity: 1;\n        transition: opacity 0.5s;\n    }\n"])), SliderTooltip);

var SliderInputStepWrapper = _styledComponents.default.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n    display: flex;\n    margin-right: 0.3em;\n    margin-left: 0.5em;\n    height: 0.3em;\n"])));

var SliderInputStep = _styledComponents.default.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n    border-left: 1px solid ", ";\n    width: ", "%;\n    ", "\n"])), _colors.allColors['Dim Gray'], function (_ref8) {
  var width = _ref8.width;
  return width;
}, function (_ref9) {
  var last = _ref9.last;
  return last ? "border-right: 1px solid ".concat(_colors.allColors['Dim Gray'], ";") : '';
});

var SliderValue = _styledComponents.default.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n    font-size: ", ";\n    color: ", ";\n    padding-right: 0.5em;\n    align-items: center;\n    display: flex;\n    width: ", ";\n"])), function (_ref10) {
  var length = _ref10.length;
  return length === _types.ElementLength.l || length === _types.ElementLength.full ? '14px' : '11px';
}, _colors.allColors['Dim Gray'], function (_ref11) {
  var length = _ref11.length;
  return length === _types.ElementLength.l || length === _types.ElementLength.full ? '2em' : '1.5em';
});

var calculateSteps = function calculateSteps(min, max, step) {
  var nOfSteps = Math.floor((max - min) / step);
  var width = (0, _helpers.round)(100 / nOfSteps);
  console.log('max', max, 'min', min, 'step', step);
  console.log('nOfSteps', nOfSteps, 'width', width);
  return [nOfSteps, width];
};

var getDefaultValue = function getDefaultValue(valueFromProps, min, steps) {
  return (// When value from props is not defined, choose first step when steps are defined, choose min value instead
    !valueFromProps || valueFromProps === '' ? steps && steps.length > 0 ? steps[0] : min : valueFromProps
  );
};

var parseUnavailableValues = function parseUnavailableValues(min, max, step) {
  // Parse step value when below 0
  var newStep = step <= 0 ? 1 : step; // Parse max value when minor than min value

  var newMax = max < min ? min : max;
  return {
    newStep: newStep,
    newMax: newMax,
    newMin: min
  };
};

var calculateTooltipPosition = function calculateTooltipPosition(min, max, value) {
  var difference = max - min;
  var parsedValue = typeof value === 'string' ? parseInt(value, 10) : value;
  var percentage = parsedValue / difference * 100;
  return percentage;
};

var calculateTooltipMarginByPercentage = function calculateTooltipMarginByPercentage(percentage) {
  var margin;

  if (percentage < 20) {
    margin = '-1.5em';
  } else if (percentage < 40) {
    margin = '-1.7em';
  } else if (percentage < 60) {
    margin = '-1.8em';
  } else if (percentage < 80) {
    margin = '-2em';
  } else if (percentage < 100) {
    margin = '-2.3em';
  } else {
    margin = '-2.4em';
  }

  return margin;
};

function getOutlineColor(color) {
  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0.5';
  var rgb = (0, _helpers.rgbFromHex)(color);
  return "rgba(".concat(rgb.r, ",").concat(rgb.g, ",").concat(rgb.b, ",").concat(opacity, ")");
}

function SliderElement(_ref12) {
  var className = _ref12.className,
      valueFromProps = _ref12.value,
      cursorColor = _ref12.cursorColor,
      min = _ref12.min,
      max = _ref12.max,
      step = _ref12.step,
      steps = _ref12.steps,
      showValue = _ref12.showValue,
      showTooltip = _ref12.showTooltip,
      length = _ref12.length,
      onChange = _ref12.onChange;
  // Calculate default slider value
  var defaultValue = getDefaultValue(valueFromProps, min, steps);

  var _useState = (0, _react.useState)(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var onSliderChange = (0, _react.useCallback)(function (event) {
    var newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  }, [onChange]);
  (0, _react.useEffect)(function () {
    setValue(getDefaultValue(valueFromProps, min, steps));
  }, [min, steps, valueFromProps]);

  var _parseUnavailableValu = parseUnavailableValues(min, max, step),
      newStep = _parseUnavailableValu.newStep,
      newMax = _parseUnavailableValu.newMax,
      newMin = _parseUnavailableValu.newMin;

  var _calculateSteps = calculateSteps(newMin, newMax, newStep),
      _calculateSteps2 = _slicedToArray(_calculateSteps, 2),
      nOfSteps = _calculateSteps2[0],
      width = _calculateSteps2[1];

  return <SliderContainer className={(0, _helpers.mergeClasses)('ie-slider', className)}>
        {showValue && <SliderValue className="ie-slider__value" length={length}>
                {value}
            </SliderValue>}
        <SliderElementContainer className="ie-slider__element">
            <SliderInputWrapper className="ie-slider__element__input">
                <SliderInput className="ie-slider__element__input__element" color={cursorColor} type="range" step={newStep} min={newMin} max={newMax} value={value} onChange={onSliderChange} />
                {showTooltip && <SliderTooltip percentage={calculateTooltipPosition(newMin, newMax, value)}>
                        {value}
                    </SliderTooltip>}
                <SliderInputStepWrapper className="ie-slider__element__input__steps">
                    {Array.from(Array(nOfSteps)).map(function (e, i) {
            return <SliderInputStep key={i} last={i === nOfSteps - 1} width={width} />;
          })}
                </SliderInputStepWrapper>
            </SliderInputWrapper>
        </SliderElementContainer>
    </SliderContainer>;
}

function Slider(props) {
  var className = props.className,
      value = props.value,
      label = props.label,
      labelPosition = props.labelPosition,
      simpleElement = props.simpleElement,
      shadow = props.shadow,
      length = props.length,
      cursorColor = props.cursorColor,
      min = props.min,
      max = props.max,
      step = props.step,
      steps = props.steps,
      showValue = props.showValue,
      showTooltip = props.showTooltip,
      onChange = props.onChange;
  var id = (0, _react.useRef)((0, _helpers.generateID)());
  return <_react.Fragment>
            {simpleElement ? <_Element.default id={id.current} label={label} labelPosition={labelPosition}>
                    <SliderElement className={className} value={value} cursorColor={cursorColor} min={min} max={max} step={step} steps={steps} showValue={showValue} showTooltip={showTooltip} length={length} onChange={onChange} />
                </_Element.default> : <SliderAdvancedWrapper shadow={shadow} length={length}>
                    <SliderAdvancedLabel htmlFor={id.current} length={length}>
                        {label}
                    </SliderAdvancedLabel>
                    <SliderElement className={className} value={value} cursorColor={cursorColor} min={min} max={max} step={step} steps={steps} showValue={showValue} showTooltip={showTooltip} length={length} onChange={onChange} />
                </SliderAdvancedWrapper>}
        </_react.Fragment>;
}

var defaultProps = {
  className: '',
  value: '',
  cursorColor: _colors.allColors['Dim Gray'],
  label: 'Label',
  simpleElement: false,
  shadow: true,
  labelPosition: _types.LabelPositions.horizontal,
  min: 0,
  max: 100,
  step: 20,
  steps: [],
  length: _types.ElementLength.l,
  showValue: true,
  showTooltip: true,
  onChange: function onChange() {}
};
Slider.defaultProps = defaultProps;
SliderElement.defaultProps = defaultProps;
var _default = Slider;
exports.default = _default;