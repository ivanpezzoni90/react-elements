import React from 'react';

import { Fragment } from 'react';
import Editor from './EditorBuilder';
import {Checkbox} from '../lib/Checkbox';
import { EditorSection, EditorSectionTypes, ElementLength, PropsObjectInterface } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { alignPositionEditor, bordersAndShadowSection, ElementContainer, labelPositionEditor, labelSection, lengthEditor } from './commons';
import { allColors } from '../lib/constants/colors';

const getEditor = (props: PropsObjectInterface) => {

    const editorJson: EditorSection[] = [
        labelSection(),
        {
            type: EditorSectionTypes.section,
            label: 'Colors',
            editors: [
                {
                    type: 'color',
                    default: allColors['Dim Gray'],
                    label: 'Color',
                    prop: 'color'
                },
                {
                    type: 'color',
                    default: allColors['White'],
                    label: 'Icon Color',
                    prop: 'colorOff'
                },
            ]
        },
        bordersAndShadowSection(props.simpleElement),
        {
            type: EditorSectionTypes.section,
            label: 'Others',
            editors: [
                lengthEditor(ElementLength.m),
                alignPositionEditor
            ]
        }
    ];

    return editorJson;
};

export default function CheckboxEditor() {
    return function CheckboxEditorFn () {
        const {
            onChangeProp,
            props: checkboxProps
        } = useEditorInit(Checkbox.defaultProps);

        const editorJson: EditorSection[] = getEditor(checkboxProps);

        return (
            <Fragment>
                <ElementContainer>
                    <Checkbox
                        {...checkboxProps}
                    />
                </ElementContainer>
                <Editor
                    element="Checkbox"
                    defaultProps={Checkbox.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}