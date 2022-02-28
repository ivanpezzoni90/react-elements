import React from 'react';

import Editor from './Editor';

import { Editor as EditorType } from '../types';
import { Fragment } from 'react';
import Input from '../ui/Input';
import { useEditorInit } from '../hooks';
import { EditorContainer, ElementContainer } from './commons';


const editorJson: EditorType[] = [
    {
        type: 'input',
        default: 'Label',
        label: 'Label',
        prop: 'label'
    },
    {
        label: 'Locked',
        type: 'toggle',
        default: false,
        prop: 'locked'
    },
    {
        label: 'Error',
        type: 'input',
        default: '',
        prop: 'error'
    },
    {
        label: 'Length',
        type: 'select',
        default: 'full',
        prop: 'length',
        options: [{
            label: 'Full',
            value: 'full'
        }, {
            label: 'S',
            value: 's'
        }, {
            label: 'M',
            value: 'm'
        }, {
            label: 'L',
            value: 'l'
        }]
    }
];

export default function InputEditor() {
    return function InputEditorFn () {
        const {
            onChangeProp,
            props: inputProps
        } = useEditorInit(Input.defaultProps);

        return (
            <Fragment>
                <EditorContainer>
                    <Editor
                        json={editorJson}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <Input
                        {...inputProps}
                    />
                </ElementContainer>
            </Fragment>
        );
    };
       
}