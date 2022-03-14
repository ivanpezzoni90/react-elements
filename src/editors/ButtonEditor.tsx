import React from 'react';
import { Fragment } from 'react';
import Editor from './Editor';
import Button from '../ui/Button';
import { Editor as EditorType } from '../types';
import { useEditorInit } from '../hooks';
import { borderRadiusEditor, EditorContainer, ElementContainer, fontSizeEditor, fontWeightEditor, lengthEditor } from './commons';
import { allColors } from '../constants/colors';

const getEditor = () => {
    const editorJson: EditorType[] = [
        {
            type: 'input',
            default: 'Label',
            label: 'Label',
            prop: 'label'
        },
        {
            type: 'color',
            default: allColors['Firebrick'],
            label: 'Color',
            prop: 'color'
        },
        {
            type: 'color',
            default: allColors['White'],
            label: 'Text Color',
            prop: 'textColor'
        },
        lengthEditor,
        {
            type: 'toggle',
            default: false,
            label: 'Disabled',
            prop: 'disabled'
        },
        borderRadiusEditor,
        fontWeightEditor,
        fontSizeEditor
    ];

    return editorJson;
};


export default function ButtonEditor() {
    return function ButtonEditorFn () {
        const {
            onChangeProp,
            props: buttonProps
        } = useEditorInit(Button.defaultProps);

        const editorJson: EditorType[] = getEditor();

        return (
            <Fragment>
                <EditorContainer>
                    <Editor
                        json={editorJson}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <Button
                        {...buttonProps}
                    />
                </ElementContainer>
            </Fragment>
        );
    };
       
}