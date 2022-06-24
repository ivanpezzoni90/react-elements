import React from 'react';

import Editor from './EditorBuilder';
import { Fragment } from 'react';
import { colorEditors, ElementContainer, lengthEditor, shadowEditor } from './commons';

import { Editor as EditorType } from '../lib/types';
import { Select } from '../lib/Select';
import { useEditorInit } from '../lib/hooks';
import { allColors } from '../lib/constants/colors';

const editorJson: EditorType[] = [
    {
        type: 'input',
        default: 'Label',
        label: 'Label',
        prop: 'label'
    },
    lengthEditor(),
    ...colorEditors,
    {
        type: 'color',
        label: 'Option Selected Color',
        prop: 'optionSelectedColor',
        default: allColors['Quick Silver']
    },
    shadowEditor,
    {
        type: 'toggle',
        label: 'Resettable',
        prop: 'resettable',
        default: false
    },
    {
        type: 'toggle',
        label: 'Multiple',
        prop: 'multiple',
        default: false
    }
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
                <ElementContainer>
                    <Select
                        {...selectProps}
                        value={selectProps.value as string}
                    />
                </ElementContainer>
                <Editor
                    element="Select"
                    defaultProps={Select.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}