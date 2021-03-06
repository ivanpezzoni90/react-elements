import React, { useState } from 'react';

import styled from 'styled-components';
import { ChangeEditorPropType, Editor, EditorSection, EditorTypes, ElementLength } from '../lib/types';
import { Checkbox } from '../lib/Checkbox';
import { Input } from '../lib/Input';
import { Select } from '../lib/Select';
import { SwitchToggle } from '../lib/SwitchToggle';
import { ColorPicker } from '../lib/ColorPicker';
import { InputTypes } from '../lib/Input/config';
import { splitArrayInGroups } from '../lib/helpers';
import { CodeBlock } from '../components/CodeBlock';
import { allColors } from '../lib/constants/colors';

interface EditorElementInterface {
    className: string,
    key: string, 
    group: number
}

const Section = styled.div`
    display: flex;
    padding: 0.5em 1em 0.5em 0.5em;
    flex-direction: column;
`;

const EditorContainer = styled.div`
    display: flex;
    padding: 0.5em 1em 0.5em 0.5em;
    flex-direction: column;
`;

const EditorElement = styled.div<EditorElementInterface>`
    padding: 0.5em;
    display: flex;
    flex: ${({group}) => group === 4 ? '1' : '0.245'};
`;
const EditorRow = styled.div`
    display: flex;
`;

const SectionTitle = styled.div`
    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    text-transform: uppercase;
    font-weight: 700;
    color: ${allColors['Dark Turquoise']};
    font-size: 18px;
    padding-right: 0.5em;
`;
const Separator = styled.div`
    border-bottom: 1px solid ${allColors['Dark Turquoise']};
    display: flex;
    flex: 1;
`;
const SectionsWrapper = styled.div`
    padding-top: 2em;
    display: flex;
    flex-direction: column;

    height: 70vh;
    overflow: auto;
`;

const CodeBlockWrapper = styled.div`
    padding: 2em 0;
`;

type InnerOnChange = (value: string | boolean | Array<string> | number | null) => void;
type ChangeEditorValueType = (prop: string) => InnerOnChange;
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

export default function EditorFunction({
    json,
    onChange,
    element,
    defaultProps
}: {
    json: EditorSection[],
    onChange: ChangeEditorPropType,
    element?: string,
    defaultProps?: any
}) {
    const [changedProps, setChangedProps] = useState(defaultChangedProps);

    const onChangeValue: ChangeEditorValueType = (prop) => {
        const innerOnChange: InnerOnChange = (newValue) => {
            onChange(prop, newValue);
            // Update changedProps obj
            setChangedProps(Object.assign({}, changedProps, {
                [prop]: newValue
            }));
        };
        return innerOnChange;
    };

    const outputJsx = buildOutputJsx(changedProps, element, defaultProps);
    // const editorGroups = splitArrayInGroups<EditorType>(json, 4);

    return (
        <SectionsWrapper
            className="ie__workarea__editor"
        >
            {json.map((s, i) => {
                if (s.type === 'section') {
                    const editorGroups = splitArrayInGroups<Editor>(s.editors, 4);

                    return (<Section
                        className="ie__workarea__editor__section"
                        key={`${s.type}_${i}`}
                    >
                        <SectionTitle
                            className="ie__workarea__editor__section__title"
                        >
                            <Title>
                                {s.label}
                            </Title>
                            <Separator/>
                        </SectionTitle>
                        <EditorContainer
                            className="ie__workarea__editor__section__editors"
                        >
                            {editorGroups.map((group, i) => {
                                if (group) {
                                    return (
                                        <EditorRow
                                            className="ie__workarea__editor__section__editors__row"
                                            key={`group_${i}`}
                                        >
                                            {group.map((e: Editor) => {
                                                return (
                                                    <EditorElement
                                                        className="ie__workarea__editor__section__editors__row__element"
                                                        key={`${e.prop}_${e.label}`}
                                                        group={group.length}
                                                    >
                                                        {{
                                                            [EditorTypes.input]: (<Input
                                                                labelColor={allColors['Teal']}
                                                                className="ie__workarea__editor__section__editors__row__element__input"
                                                                locked={false}
                                                                value={e.default as string}
                                                                type={e.inputType as InputTypes || InputTypes.text}
                                                                label={e.label}
                                                                onBlur={() => { } }
                                                                shadow={false}
                                                                length={ElementLength.full}
                                                                onChange={onChangeValue(e.prop)} />),
                                                            [EditorTypes.select]: (<Select
                                                                labelColor={allColors['Teal']}
                                                                className="ie__workarea__editor__section__editors__row__element__select"
                                                                options={e.options ? e.options : []}
                                                                value={Array.isArray(e.default)
                                                                    ? e.default as Array<string>
                                                                    : e.default as string
                                                                }
                                                                label={e.label}
                                                                length={ElementLength.full}
                                                                resettable={e.resettable}
                                                                filterable={e.filterable}
                                                                shadow={false}
                                                                onChange={onChangeValue(e.prop)} />),
                                                            [EditorTypes.checkbox]: (<Checkbox
                                                                labelColor={allColors['Teal']}
                                                                className="ie__workarea__editor__section__editors__row__element__checkbox"
                                                                checked={e.default as boolean}
                                                                label={e.label}
                                                                shadow={false}
                                                                length={ElementLength.full}
                                                                onChange={onChangeValue(e.prop)} />),
                                                            [EditorTypes.toggle]: (<SwitchToggle
                                                                labelColor={allColors['Teal']}
                                                                className="ie__workarea__editor__section__editors__row__element__toggle"
                                                                checked={e.default as boolean}
                                                                label={e.label}
                                                                color={allColors['Teal']}
                                                                shadow={false}
                                                                length={ElementLength.full}
                                                                onChange={onChangeValue(e.prop)} />),
                                                            [EditorTypes.color]: (<ColorPicker
                                                                labelColor={allColors['Teal']}
                                                                className="ie__workarea__editor__section__editors__row__element__color"
                                                                value={e.default as string}
                                                                label={e.label}
                                                                shadow={false}
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
                    </Section>);
                }
            })}
            <Title>
                Code
            </Title>
            <Separator/>
            <CodeBlockWrapper
                className=""
            >
                <CodeBlock
                    code={outputJsx}
                />
            </CodeBlockWrapper>
        </SectionsWrapper>
    );
}