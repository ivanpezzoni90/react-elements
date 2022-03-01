import React from 'react';

import Editor from './Editor';
import { Fragment } from 'react';
import { EditorContainer, ElementContainer, shadowEditor } from './commons';

import { Editor as EditorType } from '../types';
import Select from '../ui/Select';
import { useEditorInit } from '../hooks';

const editorJson: EditorType[] = [
    {
        type: 'input',
        default: 'Label',
        label: 'Label',
        prop: 'label'
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
    },
    shadowEditor
];

export default function SelectEditor() {
    return function SelectEditorFn () {
        const extendedProps = Object.assign({}, Select.defaultProps, {
            options: [{
                label: 'Option 1',
                value: 'option1'
            }, {
                label: 'Option 2',
                value: 'option2'
            }, {
                label: 'Option 3',
                value: 'option3'
            }, {
                label: 'Option 4',
                value: 'option4'
            }]
        });

        const {
            onChangeProp,
            props: selectProps
        } = useEditorInit(extendedProps);

        return (
            <Fragment>
                <EditorContainer>
                    <Editor
                        json={editorJson}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <Select
                        {...selectProps}
                        value={selectProps.value as string}
                    />
                </ElementContainer>
            </Fragment>
        );
    };
       
}