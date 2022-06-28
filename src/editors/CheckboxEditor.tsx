import React from 'react';

import { Fragment } from 'react';
import Editor from './EditorBuilder';
import {Checkbox} from '../lib/Checkbox';
import { BorderRadius, Editor as EditorType, ElementLength, PropsObjectInterface } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { alignPositionEditor, borderRadiusEditor, bordersEditor, ElementContainer, labelPositionEditor, lengthEditor, shadowEditor } from './commons';
import { allColors } from '../lib/constants/colors';

const getEditor = (props: PropsObjectInterface) => {
    const editorJson: EditorType[] = [
        {
            type: 'input',
            default: 'Label',
            label: 'Label',
            prop: 'label'
        },
        {
            type: 'color',
            default: allColors['Dim Gray'],
            label: 'Color',
            prop: 'color'
        },
        {
            type: 'color',
            default: allColors['White'],
            label: 'Icon Color',
            prop: 'colorOff'
        },
        {
            type: 'checkbox',
            default: false,
            label: 'Simple Element',
            prop: 'simpleElement'
        },
        lengthEditor(ElementLength.m)
    ];

    if (props.simpleElement) {
        editorJson.push(labelPositionEditor, alignPositionEditor);
    } else {
        editorJson.push(
            shadowEditor,
            {
                type: 'color',
                label: 'Border Color',
                prop: 'borderColor',
                default: allColors['Silver Sand']
            },
            ...bordersEditor,
            borderRadiusEditor(BorderRadius.no)
        );
    }
    return editorJson;
};

export default function CheckboxEditor() {
    return function CheckboxEditorFn () {
        const {
            onChangeProp,
            props: checkboxProps
        } = useEditorInit(Checkbox.defaultProps);

        const editorJson: EditorType[] = getEditor(checkboxProps);

        return (
            <Fragment>
                <ElementContainer>
                    <Checkbox
                        {...checkboxProps}
                    />
                </ElementContainer>
                <Editor
                    element="Checkbox"
                    defaultProps={Checkbox.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}