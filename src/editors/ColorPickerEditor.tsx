import React from 'react';

import { Fragment } from 'react';
import Editor from './EditorBuilder';
import {ColorPicker} from '../lib/ColorPicker';
import { Editor as EditorType, ElementLength, PropsObjectInterface } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { alignPositionEditor, ElementContainer, labelPositionEditor, lengthEditor, shadowEditor } from './commons';
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
        },
    ];

    if (props.simpleElement) {
        editorJson.push(labelPositionEditor, alignPositionEditor);
    } else {
        editorJson.push(shadowEditor);
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
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}