import React from 'react';

import { Fragment } from 'react';
import Editor from './Editor';
import ColorPicker from '../ui/ColorPicker';
import { Editor as EditorType, PropsObjectInterface } from '../types';
import { useEditorInit } from '../hooks';
import { alignPositionEditor, EditorContainer, ElementContainer, labelPositionEditor, shadowEditor } from './commons';
import { allColors } from '../constants/colors';

const getEditor = (props: PropsObjectInterface) => {
    const editorJson: EditorType[] = [
        {
            type: 'input',
            default: 'Label',
            label: 'Label',
            prop: 'label'
        },
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
                <EditorContainer>
                    <Editor
                        json={editorJson}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <ColorPicker
                        {...pickerProps}
                        value={pickerProps.value as string || allColors['Ruby Red']}
                    />
                </ElementContainer>
            </Fragment>
        );
    };
       
}