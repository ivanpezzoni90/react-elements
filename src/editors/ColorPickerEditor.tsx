import React from 'react';

import { Fragment } from 'react';
import Editor from './EditorBuilder';
import {ColorPicker} from '../lib/ColorPicker';
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
        lengthEditor(ElementLength.m),
        {
            type: 'checkbox',
            default: false,
            label: 'Simple Element',
            prop: 'simpleElement'
        }
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

export default function ColorPickerEditor() {
    return function ColorPickerEditorFn () {
        const {
            onChangeProp,
            props: pickerProps
        } = useEditorInit(ColorPicker.defaultProps);

        const editorJson: EditorType[] = getEditor(pickerProps);

        return (
            <Fragment>
                <ElementContainer>
                    <ColorPicker
                        {...pickerProps}
                        value={pickerProps.value as string || allColors['Ruby Red']}
                    />
                </ElementContainer>
                <Editor
                    element="ColorPicker"
                    defaultProps={ColorPicker.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}