import React from 'react';

import styled from 'styled-components';
import { ChangeEditorPropType, ChangeElementValueType, Editor as EditorType } from '../types';
import Checkbox from '../ui/Checkbox';
import { LabelPositions } from '../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import SwitchToggle from '../ui/SwitchToggle';
import ColorPicker from '../ui/ColorPicker';

const EditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const EditorElement = styled.div`
    padding: 0.5em 0.25em 0.5em 0.25em;
`;

type ChangeEditorValueType = (prop: string) => ChangeElementValueType;

export default function Editor({
    json,
    onChange
}: {
    json: Array<EditorType>,
    onChange: ChangeEditorPropType
}) {
    const onChangeValue: ChangeEditorValueType = (prop) => {
        const innerOnChange: ChangeElementValueType = (newValue) => {
            onChange(prop, newValue);
        };
        return innerOnChange;
    };
    return (
        <EditorWrapper>
            {json.map((e: EditorType) => {
                return (
                    <EditorElement
                        key={`${e.prop}_${e.label}`}
                    >
                        {
                            {
                                input: (<Input
                                    locked={false}
                                    value={e.default as string}
                                    label={e.label}
                                    onBlur={() => {}} 
                                    onChange={onChangeValue(e.prop)}
                                />),
                                select: (<Select
                                    options={e.options ? e.options : []}
                                    // value={Array.isArray(e.default)
                                    //     ? e.default as Array<string>
                                    //     : e.default as string
                                    // }
                                    value={e.default as string}
                                    label={e.label}
                                    onChange={onChangeValue(e.prop)}
                                />),
                                checkbox: (<Checkbox
                                    className=""
                                    checked={e.default as boolean}
                                    label={e.label}
                                    labelPosition={LabelPositions.vertical}
                                    onChange={onChangeValue(e.prop)}                               
                                />),
                                toggle: (<SwitchToggle
                                    checked={e.default as boolean}
                                    label={e.label}
                                    color="#666"
                                    labelPosition={LabelPositions.vertical}
                                    onChange={onChangeValue(e.prop)}
                                />),
                                color: (<ColorPicker
                                    value={e.default as string}
                                    label={e.label}
                                    onChange={onChangeValue(e.prop)}
                                />)
                            }[e.type]
                        }
                    </EditorElement>
                );
            })}
        </EditorWrapper>
    );

}