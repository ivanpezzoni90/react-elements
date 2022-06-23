import React from 'react';
import { Fragment } from 'react';
import Editor from './EditorBuilder';
import { SwitchToggle } from '../lib/SwitchToggle';
import { Editor as EditorType, ElementLength, PropsObjectInterface, ToggleLabelType } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
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
            type: 'color',
            default: '#666',
            label: 'Color',
            prop: 'color'
        },
        {
            type: 'color',
            default: 'white',
            label: 'Off Color',
            prop: 'colorOff'
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
    } else if (props.labelType === ToggleLabelType.icon) {
        editorJson.push({
            type: 'color',
            default: 'white',
            label: 'Icon Color',
            prop: 'iconColor'
        }, {
            type: 'color',
            default: '#666',
            label: 'Icon Off Color',
            prop: 'iconOffColor'
        });
    }
    return editorJson;
};


export default function SwitchToggleEditor() {
    return function SwitchToggleEditorFn () {
        const {
            onChangeProp,
            props: switchToggleProps
        } = useEditorInit(SwitchToggle.defaultProps);

        const editorJson: EditorType[] = getEditor(switchToggleProps);

        return (
            <Fragment>
                <ElementContainer>
                    <SwitchToggle
                        {...switchToggleProps}
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