import React from 'react';

import Editor from './EditorBuilder';
import { EditorSection, EditorSectionTypes, EditorTypes, IconSize } from '../lib/types';
import { Fragment } from 'react';
import { Spinner } from '../lib/Spinner';
import { useEditorInit } from '../lib/hooks';
import { iconEditor, iconSizeEditor, spinnerSpeedEditor, spinnerStepsEditor } from './commons/editors';
import { ElementContainer } from './commons/ElementContainer';
import { allColors } from '../lib/constants/colors';
import { IconList } from '../lib/constants/icons';

const getEditor = () => {
    const editorJson: EditorSection[] = [
        {
            type: EditorSectionTypes.section,
            label: 'Icon',
            editors: [
                iconEditor(IconList.spinner, false),
                {
                    type: EditorTypes.color,
                    default: allColors['Dim Gray'],
                    label: 'Color',
                    prop: 'color'
                },
                iconSizeEditor(IconSize.m)
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Spinner',
            editors: [
                spinnerSpeedEditor(),
                spinnerStepsEditor(),
            ]
        }
    ];

    return editorJson;
};

export default function IconEditor() {
    return function IconEditorFn () {
        const {
            onChangeProp,
            props
        } = useEditorInit(Spinner.defaultProps);

        const spinnerProps = props.icon ? props : Object.assign({}, props, {
            icon: IconList.check
        });
        const editorJson: EditorSection[] = getEditor();

        return (
            <Fragment>
                <ElementContainer>
                    <Spinner
                        {...spinnerProps}
                    />
                </ElementContainer>
                <Editor
                    element="Spinner"
                    defaultProps={Spinner.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}