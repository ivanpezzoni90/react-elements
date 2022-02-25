import styled from 'styled-components';
import { Editor as EditorType } from '../types';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Select from '../ui/Select';

const EditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
`;

const EditorElement = styled.div`
    padding: 1em 0.25em 1em 0.25em;
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
                    <EditorElement>
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
                                    length={'s'}                                    
                                />),
                                select: (<Select
                                        options={e.options ? e.options : []}
                                        value={Array.isArray(e.default)
                                            ? e.default as Array<string>
                                            : e.default as string
                                        }
                                        label={e.label}
                                        onChange={(newValue: string | Array<string>) => {
                                            onChange(e.prop, newValue);
                                        }}
                                    />),
                                checkbox: (<Checkbox
                                    className=""
                                    checked={e.default as boolean}
                                    label={e.label}
                                    onChange={(newValue: boolean) => {
                                        onChange(e.prop, newValue);
                                    }}                                
                                />)
                            }[e.type]
                        }
                    </EditorElement>
                )
            })}
        </EditorWrapper>
    )

}