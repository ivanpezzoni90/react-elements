"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../helpers");

var _types = require("../types");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ElementLabel = _styledComponents.default.label(_templateObject || (_templateObject = _taggedTemplateLiteral([""])));

var ElementWrapper = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: 0.5em;\n"])));

var LabelTextWrapper = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    ", "\n"])), function (_ref) {
  var position = _ref.position;
  return position === 'vertical' ? 'padding-bottom: 0.25em;' : 'padding-right: 0.5em;';
});

var FlexWrapper = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: ", "\n"])), function (_ref2) {
  var position = _ref2.position;
  return position === 'vertical' ? 'column' : 'row';
});

var ChildWrapper = _styledComponents.default.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: ", "\n"])), function (_ref3) {
  var align = _ref3.align;
  return _types.AlignPositions[align];
});

var Element = function Element(props) {
  var id = props.id,
      label = props.label,
      _props$labelPosition = props.labelPosition,
      labelPosition = _props$labelPosition === void 0 ? _types.LabelPositions.horizontal : _props$labelPosition,
      _props$align = props.align,
      align = _props$align === void 0 ? _types.AlignPositions.left : _props$align,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      children = props.children;
  return <ElementWrapper className={(0, _helpers.mergeClasses)('ie-element', className)}>
            <ElementLabel className="ie-element__label" htmlFor={id}>
                <FlexWrapper position={labelPosition}>
                    <LabelTextWrapper className="ie-element__label__text" position={labelPosition}>
                        {label}
                    </LabelTextWrapper>
                    <ChildWrapper className="ie-element__label__child" align={align}>
                        {children}
                    </ChildWrapper>
                </FlexWrapper>
            </ElementLabel>
        </ElementWrapper>;
};

var defaultProps = {
  id: '',
  label: 'Label',
  labelPosition: _types.LabelPositions.horizontal,
  align: _types.AlignPositions.left,
  className: '',
  children: []
};
Element.defaultProps = defaultProps;
var _default = Element;
exports.default = _default;