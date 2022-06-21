"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IEComponent;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _componentsMap = require("../constants/componentsMap");

var _AsideCaret = _interopRequireDefault(require("./AsideCaret"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

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

var Container = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: row;\n    padding: 1em;\n    flex: 1;\n    text-align: left;\n"])));

var Aside = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n    border-right: 1px solid #666;\n    padding: 1em 1em 1em 0em;\n\n    height: 30em;\n    overflow: auto;\n\n    transition: width 1s, opacity 1s;\n    width: 12em;\n    opacity: 1;\n\n    ", "\n"])), function (_ref) {
  var open = _ref.open;
  return open ? '' : 'width:0; opacity:0;';
});

var Workarea = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    position: relative;\n    padding: 2em;\n    display: flex;\n    flex: 1;\n    flex-direction: column;\n\n    height: 30em;\n    overflow: auto;\n"])));

var Component = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    display: flex;\n    padding: 0.5em 2em 0.5em 2em;\n    font-size: 20px;\n    font-weight: semibold;\n    cursor: pointer;\n    &:hover {\n        ", ";\n    }\n    ", "\n"])), function (_ref2) {
  var active = _ref2.active;
  return !active ? 'background: #dfdede' : '';
}, function (_ref3) {
  var active = _ref3.active;
  return active ? "background: #adadad;\n            color: #ffffff;" : '';
});

function IEAside(_ref4) {
  var currentComponentKey = _ref4.currentComponentKey,
      open = _ref4.open,
      _onClick = _ref4.onClick;
  return /*#__PURE__*/_react.default.createElement(Aside, {
    className: "ie__aside",
    open: open
  }, _componentsMap.Components.map(function (c) {
    return /*#__PURE__*/_react.default.createElement(Component, {
      active: currentComponentKey === c.key,
      key: "".concat(c.key, "_").concat(c.name),
      onClick: function onClick() {
        return _onClick(c.key);
      }
    }, c.name);
  }));
}

function IEWorkarea(_ref5) {
  var currentComponentKey = _ref5.currentComponentKey,
      getOpen = _ref5.getOpen;
  var currentComponent = (0, _componentsMap.getComponentByKey)(currentComponentKey);
  var Editor = currentComponent === null || currentComponent === void 0 ? void 0 : currentComponent.editor();
  return /*#__PURE__*/_react.default.createElement(Workarea, {
    className: "ie__workarea"
  }, /*#__PURE__*/_react.default.createElement(_AsideCaret.default, {
    getOpen: getOpen
  }), /*#__PURE__*/_react.default.createElement(Editor, null));
}

function IEComponent() {
  var _useState = (0, _react.useState)(_componentsMap.Components[0].key),
      _useState2 = _slicedToArray(_useState, 2),
      currentKey = _useState2[0],
      setCurrentKey = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      open = _useState4[0],
      setOpen = _useState4[1];

  var onClick = function onClick(key) {
    setCurrentKey(key);
  };

  var getOpen = function getOpen(open) {
    setOpen(open);
  };

  return /*#__PURE__*/_react.default.createElement(Container, {
    className: "ie"
  }, /*#__PURE__*/_react.default.createElement(IEAside, {
    currentComponentKey: currentKey,
    onClick: onClick,
    open: open
  }), /*#__PURE__*/_react.default.createElement(IEWorkarea, {
    currentComponentKey: currentKey,
    getOpen: getOpen
  }));
}