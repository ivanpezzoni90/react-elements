"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleLabelType = exports.RadioTypes = exports.Positions = exports.Padding = exports.LabelPositions = exports.IconSize = exports.IconPosition = exports.FontWeight = exports.ElementSize = exports.ElementLength = exports.ButtonIconSize = exports.BorderRadius = exports.AlignPositions = void 0;
var ElementLength;
exports.ElementLength = ElementLength;

(function (ElementLength) {
  ElementLength["squared"] = "4em";
  ElementLength["s"] = "8em";
  ElementLength["m"] = "16em";
  ElementLength["l"] = "32em";
  ElementLength["full"] = "100%";
})(ElementLength || (exports.ElementLength = ElementLength = {}));

var Padding;
exports.Padding = Padding;

(function (Padding) {
  Padding["s"] = "0.5em";
  Padding["m"] = "1em";
  Padding["l"] = "1.5em";
})(Padding || (exports.Padding = Padding = {}));

var BorderRadius;
exports.BorderRadius = BorderRadius;

(function (BorderRadius) {
  BorderRadius["no"] = "0";
  BorderRadius["xs"] = ".25em";
  BorderRadius["s"] = ".5em";
  BorderRadius["m"] = ".75em";
  BorderRadius["l"] = "1em";
  BorderRadius["xl"] = "1.25em";
  BorderRadius["xxl"] = "1.5em";
})(BorderRadius || (exports.BorderRadius = BorderRadius = {}));

var FontWeight;
exports.FontWeight = FontWeight;

(function (FontWeight) {
  FontWeight["lighter"] = "300";
  FontWeight["light"] = "400";
  FontWeight["semibold"] = "500";
  FontWeight["bold"] = "600";
  FontWeight["bolder"] = "900";
})(FontWeight || (exports.FontWeight = FontWeight = {}));

var IconSize;
exports.IconSize = IconSize;

(function (IconSize) {
  IconSize["xxs"] = "12px";
  IconSize["xs"] = "16px";
  IconSize["s"] = "20px";
  IconSize["m"] = "24px";
  IconSize["l"] = "28px";
  IconSize["xl"] = "32px";
  IconSize["xxl"] = "36px";
})(IconSize || (exports.IconSize = IconSize = {}));

var ButtonIconSize;
exports.ButtonIconSize = ButtonIconSize;

(function (ButtonIconSize) {
  ButtonIconSize[ButtonIconSize["auto"] = 1] = "auto";
  ButtonIconSize[ButtonIconSize["xs"] = 0.5] = "xs";
  ButtonIconSize[ButtonIconSize["s"] = 0.8] = "s";
  ButtonIconSize[ButtonIconSize["m"] = 1.3] = "m";
  ButtonIconSize[ButtonIconSize["l"] = 2] = "l";
  ButtonIconSize[ButtonIconSize["xl"] = 3] = "xl";
})(ButtonIconSize || (exports.ButtonIconSize = ButtonIconSize = {}));

var ElementSize;
exports.ElementSize = ElementSize;

(function (ElementSize) {
  ElementSize["xxs"] = "10px";
  ElementSize["xs"] = "12px";
  ElementSize["s"] = "14px";
  ElementSize["m"] = "16px";
  ElementSize["l"] = "18px";
  ElementSize["xl"] = "20px";
  ElementSize["xxl"] = "22px";
})(ElementSize || (exports.ElementSize = ElementSize = {}));

var LabelPositions;
exports.LabelPositions = LabelPositions;

(function (LabelPositions) {
  LabelPositions["vertical"] = "vertical";
  LabelPositions["horizontal"] = "horizontal";
})(LabelPositions || (exports.LabelPositions = LabelPositions = {}));

var Positions;
exports.Positions = Positions;

(function (Positions) {
  Positions["vertical"] = "vertical";
  Positions["horizontal"] = "horizontal";
})(Positions || (exports.Positions = Positions = {}));

var IconPosition;
exports.IconPosition = IconPosition;

(function (IconPosition) {
  IconPosition["left"] = "left";
  IconPosition["right"] = "right";
})(IconPosition || (exports.IconPosition = IconPosition = {}));

var AlignPositions;
exports.AlignPositions = AlignPositions;

(function (AlignPositions) {
  AlignPositions["left"] = "flex-start";
  AlignPositions["center"] = "center";
  AlignPositions["right"] = "flex-end";
})(AlignPositions || (exports.AlignPositions = AlignPositions = {}));

var ToggleLabelType;
exports.ToggleLabelType = ToggleLabelType;

(function (ToggleLabelType) {
  ToggleLabelType["label"] = "label";
  ToggleLabelType["icon"] = "icon";
})(ToggleLabelType || (exports.ToggleLabelType = ToggleLabelType = {}));

var RadioTypes;
exports.RadioTypes = RadioTypes;

(function (RadioTypes) {
  RadioTypes["checkbox"] = "checkbox";
  RadioTypes["toggle"] = "toggle";
  RadioTypes["button"] = "button";
})(RadioTypes || (exports.RadioTypes = RadioTypes = {}));