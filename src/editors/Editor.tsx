import React from 'react';

import styled from 'styled-components';
import { Editor as EditorType } from '../types';
import Checkbox from '../ui/Checkbox';
import { LabelPositions } from '../ui/Element';
import Input from '../ui/Input';
import Select from '../ui/Select';
import SwitchToggle from '../ui/SwitchToggle';

const EditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const EditorElement = styled.div`
    padding: 0.5em 0.25em 0.5em 0.25em;
`;

export default function Editor({
    json,
    onChange
}: {
    json: Array<EditorType>,
    onChange: Function
}) {
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
                                    active
                                    error={''} 
                                    value={e.default as string}
                                    label={e.label}
                                    onBlur={() => {}} 
                                    onChange={(newValue: string) => {
                                        onChange(e.prop, newValue);
                                    }}
                                />),
                                select: (<Select
                                    options={e.options ? e.options : []}
                                    // value={Array.isArray(e.default)
                                    //     ? e.default as Array<string>
                                    //     : e.default as string
                                    // }
                                    value={e.default as string}
                                    label={e.label}
                                    onChange={(newValue: string | Array<string>) => {
                                        onChange(e.prop, newValue);
                                    }}
                                />),
                                checkbox: (<Checkbox
                                    className=""
                                    checked={e.default as boolean}
                                    label={e.label}
                                    labelPosition={LabelPositions.vertical}
                                    onChange={(newValue: boolean) => {
                                        onChange(e.prop, newValue);
                                    }}                                
                                />),
                                toggle: (<SwitchToggle
                                    checked={e.default as boolean}
                                    label={e.label}
                                    color="#666"
                                    labelPosition={LabelPositions.vertical}
                                    onChange={(newValue: boolean) => {
                                        onChange(e.prop, newValue);
                                    }}
                                />)
                            }[e.type]
                        }
                    </EditorElement>
                );
            })}
        </EditorWrapper>
    );

}