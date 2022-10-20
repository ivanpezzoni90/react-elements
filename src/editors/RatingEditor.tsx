import React from 'react';

import Editor from './EditorBuilder';
import { EditorSection, EditorSectionTypes, EditorTypes, IconSize } from '../lib/types';
import { Fragment } from 'react';
import { Rating, RatingProps } from '../lib/Rating';
import { useEditorInit } from '../lib/hooks';
import { alignPositionEditor, bordersAndShadowSection, iconEditor, iconSizeEditor, labelSection } from './commons/editors';
import { ElementContainer } from './commons/ElementContainer';
import { allColors } from '../lib/constants/colors';
import { IconList } from '../lib/constants/icons';
import { InputTypes } from '../lib/Input/config';

const getEditor = (props: RatingProps) => {
    const halfEditors = [];
    if (props.displayHalfValue) {
        halfEditors.push(
            iconEditor(IconList.starHalf, false, 'iconHalf', 'Icon half')
        );
    }

    const editorJson: EditorSection[] = [
        labelSection(),
        {
            type: EditorSectionTypes.section,
            label: 'Sizing',
            editors: [
                iconSizeEditor(IconSize.m, 'size'),
                {
                    type: EditorTypes.input,
                    inputType: InputTypes.number,
                    default: 5,
                    prop: 'length',
                    label: 'Length'
                }
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Icons',
            editors: [
                iconEditor(IconList.starFill, false, 'iconSelected', 'Icon selected'),
                iconEditor(IconList.star, false, 'iconNotSelected', 'Icon not selected'),
                ...halfEditors
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Colors',
            editors: [
                {
                    type: EditorTypes.color,
                    label: 'Color selected',
                    prop: 'colorSelected',
                    default: allColors['Cyber Yellow']
                },
                {
                    type: EditorTypes.color,
                    label: 'Color not selected',
                    prop: 'colorNotSelected',
                    default: allColors['Dim Gray']
                },
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Others',
            editors: [
                {
                    type: EditorTypes.toggle,
                    label: 'Color only selected',
                    default: false,
                    prop: 'highlightSelectedOnly'
                },
                {
                    type: EditorTypes.toggle,
                    label: 'Display half value',
                    default: false,
                    prop: 'displayHalfValue'
                },
                alignPositionEditor()
            ]
        },
        bordersAndShadowSection()
    ];

    return editorJson;
};

export default function RatingEditor() {
    return function RatingEditorFn () {
        const {
            onChangeProp,
            props
        } = useEditorInit(Rating.defaultProps);

        const editorJson: EditorSection[] = getEditor(props);

        return (
            <Fragment>
                <ElementContainer>
                    <Rating
                        {...props}
                    />
                </ElementContainer>
                <Editor
                    element="Rating"
                    defaultProps={Rating.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}