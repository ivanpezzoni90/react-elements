import React from 'react';
import { Fragment } from 'react';
import Editor from './EditorBuilder';
import {Button} from '../lib/Button';
import { BorderRadius, ButtonIconSize, EditorSection, EditorSectionTypes, EditorTypes, IconPosition } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import {
    alignPositionEditor,
    borderRadiusEditor,
    fontSizeEditor,
    fontWeightEditor,
    heightEditor,
    iconEditor,
    lengthEditor,
} from './commons/editors';
import { ElementContainer } from './commons/ElementContainer';

import { allColors } from '../lib/constants/colors';
import { IconList } from '../lib/Icon';

const getEditor = () => {

    const editorJson: EditorSection[] = [
        {
            type: EditorSectionTypes.section,
            label: 'Label',
            editors: [
                {
                    type: EditorTypes.input,
                    default: 'Label',
                    label: 'Label',
                    prop: 'label'
                }
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Size and Weight',
            editors: [
                lengthEditor(),
                heightEditor(),
                fontWeightEditor,
                fontSizeEditor,
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Colors',
            editors: [
                {
                    type: EditorTypes.color,
                    default: allColors['Firebrick'],
                    label: 'Color',
                    prop: 'color'
                },
                {
                    type: EditorTypes.color,
                    default: allColors['White'],
                    label: 'Text Color',
                    prop: 'textColor'
                },
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Icon',
            editors: [
                iconEditor(undefined, true),
                {
                    type: EditorTypes.color,
                    default: allColors['White'],
                    label: 'Icon Color',
                    prop: 'iconColor'
                },
                {
                    type: EditorTypes.select,
                    default: ButtonIconSize.auto,
                    label: 'Icon Size',
                    prop: 'buttonIconSize',
                    options: [{
                        label: 'Auto',
                        value: ButtonIconSize.auto
                    }, {
                        label: 'XS',
                        value: ButtonIconSize.xs
                    }, {
                        label: 'S',
                        value: ButtonIconSize.s
                    }, {
                        label: 'M',
                        value: ButtonIconSize.m
                    }, {
                        label: 'L',
                        value: ButtonIconSize.l
                    }, {
                        label: 'XL',
                        value: ButtonIconSize.xl
                    }]
                },
                {
                    type: EditorTypes.select,
                    default: IconPosition.left,
                    label: 'Icon Position',
                    prop: 'iconPosition',
                    options: [{
                        label: 'Left',
                        value: IconPosition.left
                    }, {
                        label: 'Right',
                        value: IconPosition.right
                    }]
                }
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Others',
            editors: [
                {
                    type: EditorTypes.toggle,
                    default: false,
                    label: 'Disabled',
                    prop: 'disabled'
                },
                alignPositionEditor,
                borderRadiusEditor(BorderRadius.s),
            ]
        }
    ];

    return editorJson;
};


export default function ButtonEditor() {
    return function ButtonEditorFn () {
        const {
            onChangeProp,
            props: buttonProps
        } = useEditorInit(Button.defaultProps);

        const editorJson: EditorSection[] = getEditor();

        return (
            <Fragment>
                <ElementContainer>
                    <Button
                        {...buttonProps}
                        icon={buttonProps.icon as IconList}
                    />
                </ElementContainer>
                <Editor
                    element="Button"
                    defaultProps={Button.defaultProps}

                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}