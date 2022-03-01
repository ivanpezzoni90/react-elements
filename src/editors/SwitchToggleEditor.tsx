import React from 'react';
import { Fragment } from 'react';
import Editor from './Editor';
import SwitchToggle from '../ui/SwitchToggle';
import { Editor as EditorType, PropsObjectInterface, ToggleLabelType } from '../types';
import { useEditorInit } from '../hooks';
import { alignPositionEditor, EditorContainer, ElementContainer, labelPositionEditor } from './commons';

const getEditor = (props: PropsObjectInterface) => {
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
            default: ToggleLabelType.label,
            label: 'Label type',
            prop: 'labelType',
            options: [{
                label: 'Label',
                value: ToggleLabelType.label
            }, {
                label: 'Icon',
                value: ToggleLabelType.icon
            }]
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
    }
    if (props.labelType === ToggleLabelType.label) {
        editorJson.push({
            type: 'input',
            default: 'YES',
            label: 'Label ON',
            prop: 'labelOn'
        }, {
            type: 'input',
            default: 'NO',
            label: 'Label OFF',
            prop: 'labelOff'
        });
    }
    return editorJson;
}


export default function SwitchToggleEditor() {
    return function SwitchToggleEditorFn () {
        const {
            onChangeProp,
            props: switchToggleProps
        } = useEditorInit(SwitchToggle.defaultProps);

        const editorJson: EditorType[] = getEditor(switchToggleProps);

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