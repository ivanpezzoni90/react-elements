import React from 'react';
import { Fragment } from 'react';
import Editor from './EditorBuilder';
import { SwitchToggle } from '../lib/SwitchToggle';
import { EditorSection, EditorSectionTypes, EditorTypes, ElementLength, PropsObjectInterface, ToggleLabelType } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { alignPositionEditor, bordersAndShadowSection, ElementContainer, labelSection, lengthEditor } from './commons';

const getEditor = (props: PropsObjectInterface) => {
    const editorJson: EditorSection[] = [
        labelSection(),
        {
            type: EditorSectionTypes.section,
            label: 'Colors',
            editors: [
                {
                    type: EditorTypes.color,
                    default: '#666',
                    label: 'Color',
                    prop: 'color'
                },
                {
                    type: EditorTypes.color,
                    default: 'white',
                    label: 'Off Color',
                    prop: 'colorOff'
                },
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Type',
            editors: [
                {
                    type: EditorTypes.select,
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
                ... props.labelType === ToggleLabelType.label
                    ? [{
                        type: EditorTypes.input,
                        default: 'YES',
                        label: 'Label ON',
                        prop: 'labelOn'
                    }, {
                        type: EditorTypes.input,
                        default: 'NO',
                        label: 'Label OFF',
                        prop: 'labelOff'
                    }] : [],
                ... props.labelType === ToggleLabelType.icon
                    ? [{
                        type: EditorTypes.color,
                        default: 'white',
                        label: 'Icon Color',
                        prop: 'iconColor'
                    }, {
                        type: EditorTypes.color,
                        default: '#666',
                        label: 'Icon Off Color',
                        prop: 'iconOffColor'
                    }] : []
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Others',
            editors: [
                lengthEditor(ElementLength.m),
                alignPositionEditor
            ]
        },
        bordersAndShadowSection(props.simpleElement)
    ];
    return editorJson;
};


export default function SwitchToggleEditor() {
    return function SwitchToggleEditorFn () {
        const {
            onChangeProp,
            props: switchToggleProps
        } = useEditorInit(SwitchToggle.defaultProps);

        const editorJson: EditorSection[] = getEditor(switchToggleProps);

        return (
            <Fragment>
                <ElementContainer>
                    <SwitchToggle
                        {...switchToggleProps}
                    />
                </ElementContainer>
                <Editor
                    element="SwitchToggle"
                    defaultProps={SwitchToggle.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}