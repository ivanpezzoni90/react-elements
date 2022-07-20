import React from 'react';

import Editor from './EditorBuilder';
import { Fragment } from 'react';
import { borderRadiusEditor, bordersAndShadowSection, colorEditors, labelSection, lengthEditor } from './commons/editors';
import { ElementContainer } from './commons/ElementContainer';

import { BorderRadius, EditorSection, EditorSectionTypes, EditorTypes, LabelPositions } from '../lib/types';
import { Select, SelectProps } from '../lib/Select';
import { useEditorInit } from '../lib/hooks';
import { allColors } from '../lib/constants/colors';
import { IconList } from '../lib/constants/icons';

const getEditor = (props: SelectProps): EditorSection[] => ([
    labelSection(LabelPositions.vertical),
    {
        type: EditorSectionTypes.section,
        label: 'Multiple',
        editors: [
            {
                type: EditorTypes.toggle,
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
                type: EditorTypes.color,
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
    bordersAndShadowSection(),
    {
        type: EditorSectionTypes.section,
        label: 'Others',
        editors: [
            {
                type: EditorTypes.toggle,
                label: 'Resettable',
                prop: 'resettable',
                default: false
            },
            {
                type: EditorTypes.toggle,
                label: 'Filterable',
                prop: 'filterable',
                default: false
            },
            {
                type: EditorTypes.toggle,
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
                label: 'Terra',
                value: 'terra',
                icon: IconList.aura
            }, {
                label: 'Locke',
                value: 'locke',
                icon: IconList.broadDagger
            }, {
                label: 'Edgar',
                value: 'edgar',
                icon: IconList.toolbox
            }, {
                label: 'Sabin',
                value: 'sabin',
                icon: IconList.wolverineClaws
            }, {
                label: 'Cyan',
                value: 'cyan',
                icon: IconList.broadsword
            }, {
                label: 'Setzer',
                value: 'setzer',
                icon: IconList.zeppelin
            }, {
                label: 'Celes',
                value: 'celes',
                icon: IconList.runeSword
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