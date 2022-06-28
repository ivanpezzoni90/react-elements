import React, { useRef } from 'react';

import styled from 'styled-components';
import { ChangeEditorPropType, ChangeElementValueType, Editor as EditorType, ElementLength } from '../lib/types';
import { Checkbox } from '../lib/Checkbox';
import { LabelPositions } from '../lib/types';
import { Input } from '../lib/Input';
import { Select } from '../lib/Select';
import { SwitchToggle } from '../lib/SwitchToggle';
import { ColorPicker } from '../lib/ColorPicker';
import { InputTypes } from '../lib/Input/config';
import { EditorContainer } from './commons';
import { splitArrayInGroups } from '../lib/helpers';
import { CodeBlock } from '../components/CodeBlock';

interface EditorElementInterface {
    className: string,
    key: string, 
    group: number
}

const EditorElement = styled.div<EditorElementInterface>`
    padding: 0.5em;
    display: flex;
    flex: ${({group}) => group === 4 ? '1' : '0.245'};
`;
const EditorRow = styled.div`
    display: flex;
`;

type ChangeEditorValueType = (prop: string) => ChangeElementValueType;
type ChangedPropsType = {[key: string]: string | number | boolean | string[] | null};
const defaultChangedProps: ChangedPropsType = {};

const buildOutputJsx = (
    changedProps: ChangedPropsType,
    element: string | undefined,
    defaultProps: any
) => {
    let p = `<${element}>`;
    Object.entries(changedProps).forEach(([k,v]) => {
        if (defaultProps[k] !== v && v !== null) {
            let value;
            // Convert true and false values to JSX syntax
            if (v === true) {
                value = '';
            } else if (v === false) {
                value = '={false}';
            } else {
                value = `="${v}"`;
            }
            p = `${p}
            ${k}${value}`;
        }
    });
    return `${p}
  />`;
};

export default function Editor({
    json,
    onChange,
    element,
    defaultProps
}: {
    json: Array<EditorType>,
    onChange: ChangeEditorPropType,
    element?: string,
    defaultProps?: any
}) {
    const changedProps = useRef(defaultChangedProps);
    const onChangeValue: ChangeEditorValueType = (prop) => {
        const innerOnChange: ChangeElementValueType = (newValue) => {
            onChange(prop, newValue);
            // Update changedProps obj
            changedProps.current[prop] = newValue;
        };
        return innerOnChange;
    };

    const outputJsx = buildOutputJsx(changedProps.current, element, defaultProps);
    const editorGroups = splitArrayInGroups<EditorType>(json, 4);

    return (
        <>
            <EditorContainer>
                {editorGroups.map((group, i) => {
                    if (group) {
                        return (
                            <EditorRow
                                className="ie__workarea__editor__row"
                                key={`group_${i}`}
                            >
                                {group.map((e: EditorType) => {
                                    return (
                                        <EditorElement
                                            className="ie__workarea__editor__element"
                                            key={`${e.prop}_${e.label}`}
                                            group={group.length}
                                        >
                                            {{
                                                input: (<Input
                                                    locked={false}
                                                    value={e.default as string}
                                                    type={e.inputType as InputTypes || InputTypes.text}
                                                    label={e.label}
                                                    onBlur={() => { } }
                                                    length={ElementLength.full}
                                                    onChange={onChangeValue(e.prop)} />),
                                                select: (<Select
                                                    options={e.options ? e.options : []}
                                                    // value={Array.isArray(e.default)
                                                    //     ? e.default as Array<string>
                                                    //     : e.default as string
                                                    // }
                                                    value={e.default as string}
                                                    label={e.label}
                                                    length={ElementLength.full}
                                                    resettable={e.resettable}
                                                    onChange={onChangeValue(e.prop)} />),
                                                checkbox: (<Checkbox
                                                    className=""
                                                    checked={e.default as boolean}
                                                    label={e.label}
                                                    length={ElementLength.full}
                                                    labelPosition={LabelPositions.vertical}
                                                    onChange={onChangeValue(e.prop)} />),
                                                toggle: (<SwitchToggle
                                                    checked={e.default as boolean}
                                                    label={e.label}
                                                    color="#666"
                                                    length={ElementLength.full}
                                                    labelPosition={LabelPositions.vertical}
                                                    onChange={onChangeValue(e.prop)} />),
                                                color: (<ColorPicker
                                                    value={e.default as string}
                                                    label={e.label}
                                                    length={ElementLength.full}
                                                    onChange={onChangeValue(e.prop)} />)
                                            }[e.type]}
                                        </EditorElement>
                                    );
                                })}
                            </EditorRow>
                        );
                    }
                })}
            </EditorContainer>
            <div>
                <CodeBlock
                    code={outputJsx}
                />
            </div>
        </>
    );

}