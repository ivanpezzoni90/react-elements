import React from 'react';

import { Fragment } from 'react';
import Editor from './EditorBuilder';
import {ColorPicker} from '../lib/ColorPicker';
import { EditorSection, EditorSectionTypes, ElementLength, PropsObjectInterface } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { bordersAndShadowSection, ElementContainer, labelSection, lengthEditor, simpleElementSection } from './commons';
import { allColors } from '../lib/constants/colors';

const getEditor = (props: PropsObjectInterface) => {
    const editorJson: EditorSection[] = [
        labelSection(),
        simpleElementSection(props.simpleElement),
        bordersAndShadowSection(props.simpleElement),
        {
            type: EditorSectionTypes.section,
            label: 'Size',
            editors: [
                lengthEditor(ElementLength.m),
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