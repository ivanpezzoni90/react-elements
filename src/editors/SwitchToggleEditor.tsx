import React from 'react';

import { Fragment } from 'react';
import Editor from './Editor';
import SwitchToggle from '../ui/SwitchToggle';
import { Editor as EditorType } from '../types';
import { useEditorInit } from '../hooks';
import { EditorContainer, ElementContainer } from './commons';
import { AlignPositions, LabelPositions } from '../ui/Element';

const editorJson: EditorType[] = [
    {
        type: 'input',
        default: 'Label',
        label: 'Label',
        prop: 'label'
    },
    {
        type: 'input',
        default: '#ba0c2f',
        label: 'Color',
        prop: 'color'
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
    }
];

export default function SwitchToggleEditor() {
    return function SwitchToggleEditorFn () {
        const {
            onChangeProp,
            props: switchToggleProps
        } = useEditorInit(SwitchToggle.defaultProps);

        return (
            <Fragment>
                <EditorContainer>
                    <Editor
                        json={editorJson}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <SwitchToggle
                        {...switchToggleProps}
                    />
                </ElementContainer>
            </Fragment>
        );
    };
       
}