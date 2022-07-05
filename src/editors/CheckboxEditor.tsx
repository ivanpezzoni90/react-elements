import React from 'react';

import { Fragment } from 'react';
import Editor from './EditorBuilder';
import {Checkbox, CheckboxProps} from '../lib/Checkbox';
import { EditorSection, EditorSectionTypes, EditorTypes, ElementLength } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { alignPositionEditor, bordersAndShadowSection, labelSection, lengthEditor } from './commons/editors';
import { ElementContainer } from './commons/ElementContainer';

import { allColors } from '../lib/constants/colors';

const getEditor = (props: CheckboxProps) => {

    const editorJson: EditorSection[] = [
        labelSection(),
        {
            type: EditorSectionTypes.section,
            label: 'Colors',
            editors: [
                {
                    type: EditorTypes.color,
                    default: allColors['Dim Gray'],
                    label: 'Color',
                    prop: 'color'
                },
                {
                    type: EditorTypes.color,
                    default: allColors['White'],
                    label: 'Icon Color',
                    prop: 'colorOff'
                },
            ]
        },
        bordersAndShadowSection(),
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