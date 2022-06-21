"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Editor;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _types = require("../types");

var _Checkbox = _interopRequireDefault(require("../ui/Checkbox"));

var _Input = _interopRequireDefault(require("../ui/Input"));

var _Select = _interopRequireDefault(require("../ui/Select"));

var _SwitchToggle = _interopRequireDefault(require("../ui/SwitchToggle"));

var _ColorPicker = _interopRequireDefault(require("../ui/ColorPicker"));

var _config = require("../ui/Input/config");

var _commons = require("./commons");

var _helpers = require("../helpers");

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var EditorElement = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 0.5em;\n    display: flex;\n    flex: ", ";\n"])), function (_ref) {
  var group = _ref.group;
  return group === 4 ? '1' : '0.245';
});

var EditorRow = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n"])));

function Editor(_ref2) {
  var json = _ref2.json,
      onChange = _ref2.onChange;

  var onChangeValue = function onChangeValue(prop) {
    var innerOnChange = function innerOnChange(newValue) {
      onChange(prop, newValue);
    };

    return innerOnChange;
  };

  var editorGroups = (0, _helpers.splitArrayInGroups)(json, 4);
  return <_commons.EditorContainer>
            {editorGroups.map(function (group, i) {
      if (group) {
        return <EditorRow className="ie__workarea__editor__row" key={"group_".concat(i)}>
                            {group.map(function (e) {
            return <EditorElement className="ie__workarea__editor__element" key={"".concat(e.prop, "_").concat(e.label)} group={group.length}>
                                        {{
                input: <_Input.default locked={false} value={e.default} type={e.inputType || _config.InputTypes.text} label={e.label} onBlur={function () {}} length={_types.ElementLength.full} onChange={onChangeValue(e.prop)} />,
                select: <_Select.default options={e.options ? e.options : []} // value={Array.isArray(e.default)
                //     ? e.default as Array<string>
                //     : e.default as string
                // }
                value={e.default} label={e.label} length={_types.ElementLength.full} onChange={onChangeValue(e.prop)} />,
                checkbox: <_Checkbox.default className="" checked={e.default} label={e.label} length={_types.ElementLength.full} labelPosition={_types.LabelPositions.vertical} onChange={onChangeValue(e.prop)} />,
                toggle: <_SwitchToggle.default checked={e.default} label={e.label} color="#666" length={_types.ElementLength.full} labelPosition={_types.LabelPositions.vertical} onChange={onChangeValue(e.prop)} />,
                color: <_ColorPicker.default value={e.default} label={e.label} length={_types.ElementLength.full} onChange={onChangeValue(e.prop)} />
              }[e.type]}
                                    </EditorElement>;
          })}
                        </EditorRow>;
      }
    })}
        </_commons.EditorContainer>;
}