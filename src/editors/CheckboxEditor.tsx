import React from 'react';

import { Fragment } from 'react';
import Editor from './EditorBuilder';
import Checkbox from '../ui/Checkbox';
import { Editor as EditorType, ElementLength, PropsObjectInterface } from '../types';
import { useEditorInit } from '../hooks';
import { alignPositionEditor, ElementContainer, labelPositionEditor, lengthEditor, shadowEditor } from './commons';

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
        lengthEditor(ElementLength.m)
    ];

    if (props.simpleElement) {
        editorJson.push(labelPositionEditor, alignPositionEditor);
    } else {
        editorJson.push(shadowEditor);
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
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}