import React from 'react';
import { Fragment } from 'react';
import Editor from './EditorBuilder';
import {Button} from '../lib/Button';
import { ButtonIconSize, Editor as EditorType, IconPosition } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { borderRadiusEditor, ElementContainer, fontSizeEditor, fontWeightEditor, iconEditor, lengthEditor } from './commons';
import { allColors } from '../lib/constants/colors';
import { IconList } from '../lib/Icon';

const getEditor = () => {
    const editorJson: EditorType[] = [
        {
            type: 'input',
            default: 'Label',
            label: 'Label',
            prop: 'label'
        },
        {
            type: 'color',
            default: allColors['Firebrick'],
            label: 'Color',
            prop: 'color'
        },
        {
            type: 'color',
            default: allColors['White'],
            label: 'Text Color',
            prop: 'textColor'
        },
        lengthEditor(),
        {
            type: 'toggle',
            default: false,
            label: 'Disabled',
            prop: 'disabled'
        },
        borderRadiusEditor,
        fontWeightEditor,
        fontSizeEditor,
    ];

    editorJson.push(
        iconEditor,
        {
            type: 'color',
            default: allColors['White'],
            label: 'Icon Color',
            prop: 'iconColor'
        },
        {
            type: 'select',
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
            type: 'select',
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
        });

    return editorJson;
};


export default function ButtonEditor() {
    return function ButtonEditorFn () {
        const {
            onChangeProp,
            props: buttonProps
        } = useEditorInit(Button.defaultProps);

        const editorJson: EditorType[] = getEditor();

        return (
            <Fragment>
                <ElementContainer>
                    <Button
                        {...buttonProps}
                        icon={buttonProps.icon as IconList}
                    />
                </ElementContainer>
                <Editor
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}