import React from 'react';

import Editor from './EditorBuilder';
import { Fragment } from 'react';
import { borderRadiusEditor, bordersAndShadowSection, colorEditors, ElementContainer, labelSection, lengthEditor } from './commons';

import { BorderRadius, EditorSection, EditorSectionTypes, LabelPositions, PropsObjectInterface } from '../lib/types';
import { Select } from '../lib/Select';
import { useEditorInit } from '../lib/hooks';
import { allColors } from '../lib/constants/colors';

const getEditor = (props: PropsObjectInterface): EditorSection[] => ([
    labelSection(LabelPositions.vertical),
    {
        type: EditorSectionTypes.section,
        label: 'Multiple',
        editors: [
            {
                type: 'toggle',
                label: 'Multiple',
                prop: 'multiple',
                default: false
            },
            ... props.multiple ? [
                borderRadiusEditor(BorderRadius.xs, 'Chip Border Radius', 'chipBorderRadius'),
            ]: []
        ]
    },
    {
        type: EditorSectionTypes.section,
        label: 'Colors',
        editors: [
            ...colorEditors,
            {
                type: 'color',
                label: 'Option Selected Color',
                prop: 'optionSelectedColor',
                default: allColors['Quick Silver']
            },
        ]
    },
    {
        type: EditorSectionTypes.section,
        label: 'Size',
        editors: [
            lengthEditor()
        ]
    },
    bordersAndShadowSection(false),
    {
        type: EditorSectionTypes.section,
        label: 'Others',
        editors: [
            {
                type: 'toggle',
                label: 'Resettable',
                prop: 'resettable',
                default: false
            },
            {
                type: 'toggle',
                label: 'Close dropdown on click outside',
                prop: 'closeOnClickOutside',
                default: true
            }
        ]
    },
]);

export default function SelectEditor() {
    return function SelectEditorFn () {
        const extendedProps = Object.assign({}, Select.defaultProps, {
            options: [{
                label: 'Option 1',
                value: 'option1'
            }, {
                label: 'Option 2',
                value: 'option2'
            }, {
                label: 'Option 3',
                value: 'option3'
            }, {
                label: 'Option 4',
                value: 'option4'
            }]
        });

        const {
            onChangeProp,
            props: selectProps
        } = useEditorInit(extendedProps);

        const editorJson: EditorSection[] = getEditor(selectProps);

        return (
            <Fragment>
                <ElementContainer>
                    <Select
                        {...selectProps}
                        value={selectProps.value as string}
                    />
                </ElementContainer>
                <Editor
                    element="Select"
                    defaultProps={Select.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}