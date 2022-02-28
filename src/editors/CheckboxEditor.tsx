import React from 'react';

import { Fragment } from 'react';
import Editor from './Editor';
import Checkbox from '../ui/Checkbox';
import { Editor as EditorType } from '../types';
import { useEditorInit } from '../hooks';
import { EditorContainer, ElementContainer } from './commons';
import { LabelPositions, AlignPositions } from '../ui/Element';


const editorJson: EditorType[] = [
    {
        type: 'input',
        default: 'Label',
        label: 'Label',
        prop: 'label'
    },
    {
        type: 'select',
        label: 'Label Position',
        default: LabelPositions.horizontal,
        prop: 'labelPosition',
        options: [{
            label: 'Horizontal',
            value: LabelPositions.horizontal
        }, {
            label: 'Vertical',
            value: LabelPositions.vertical
        }]
    },
    {
        type: 'select',
        label: 'Alignment',
        default: AlignPositions.left,
        prop: 'align',
        options: [{
            label: 'Left',
            value: AlignPositions.left
        }, {
            label: 'Center',
            value: AlignPositions.center
        }, {
            label: 'Right',
            value: AlignPositions.right
        }]
    },
];

export default function CheckboxEditor() {
    return function CheckboxEditorFn () {
        const {
            onChangeProp,
            props: checkboxProps
        } = useEditorInit(Checkbox.defaultProps);

        return (
            <Fragment>
                <EditorContainer>
                    <Editor
                        json={editorJson}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <Checkbox
                        {...checkboxProps}
                    />
                </ElementContainer>
            </Fragment>
        );
    };
       
}