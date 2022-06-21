"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditorInit = exports.useComputedZIndex = exports.useComputedWidth = void 0;

var _react = require("react");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useEditorInit = function useEditorInit(defaultProps) {
  var _useState = (0, _react.useState)(defaultProps),
      _useState2 = _slicedToArray(_useState, 2),
      props = _useState2[0],
      setProps = _useState2[1];

  var onChangeProp = function onChangeProp(prop, value) {
    setProps(Object.assign({}, props, _defineProperty({}, prop, value)));
  };

  return {
    onChangeProp: onChangeProp,
    props: props
  };
};

exports.useEditorInit = useEditorInit;

var useComputedZIndex = function useComputedZIndex(ref) {
  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      zIndex = _useState4[0],
      setZIndex = _useState4[1];

  (0, _react.useEffect)(function () {
    if (ref !== null) {
      var style = window.getComputedStyle(ref.current);
      var computedZIndex = style.zIndex;

      if (computedZIndex !== 'auto') {
        setZIndex(parseInt(computedZIndex, 10) + 1);
      }

      setZIndex(1);
    }
  }, [ref]);
  return zIndex;
};

exports.useComputedZIndex = useComputedZIndex;

var useComputedWidth = function useComputedWidth(ref) {
  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      width = _useState6[0],
      setWidth = _useState6[1];

  (0, _react.useEffect)(function () {
    if (ref !== null) {
      var style = window.getComputedStyle(ref.current);
      var computedWidth = style.width;
      setWidth(computedWidth);
    }
  }, [ref]);
  return width;
};

exports.useComputedWidth = useComputedWidth;