import React from 'react';

import { Fragment } from 'react';
import Editor from './EditorBuilder';
import {ColorPicker} from '../lib/ColorPicker';
import { EditorSection, EditorSectionTypes, EditorTypes, ElementLength, PropsObjectInterface } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { alignPositionEditor, bordersAndShadowSection, labelSection, lengthEditor } from './commons/editors';
import { ElementContainer } from './commons/ElementContainer';

import { allColors } from '../lib/constants/colors';

const getEditor = (props: PropsObjectInterface) => {
    const editorJson: EditorSection[] = [
        labelSection(),
        bordersAndShadowSection(props.simpleElement),
        {
            type: EditorSectionTypes.section,
            label: 'Size',
            editors: [
                lengthEditor(ElementLength.m),
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Others',
            editors: [
                {
                    type: EditorTypes.toggle,
                    label: 'Close dropdown on click outside',
                    prop: 'closeOnClickOutside',
                    default: true
                },
                alignPositionEditor
            ]
        }
    ];
    return editorJson;
};

export default function ColorPickerEditor() {
    return function ColorPickerEditorFn () {
        const {
            onChangeProp,
            props: pickerProps
        } = useEditorInit(ColorPicker.defaultProps);

        const editorJson: EditorSection[] = getEditor(pickerProps);

        return (
            <Fragment>
                <ElementContainer>
                    <ColorPicker
                        {...pickerProps}
                        value={pickerProps.value as string || allColors['Ruby Red']}
                    />
                </ElementContainer>
                <Editor
                    element="ColorPicker"
                    defaultProps={ColorPicker.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}