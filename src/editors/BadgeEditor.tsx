import React from 'react';
import { Fragment } from 'react';
import Editor from './EditorBuilder';
import {Badge, BadgeProps} from '../lib/Badge';
import { BadgePositions, EditorSection, EditorSectionTypes, EditorTypes, IconSize } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import {
    fontSizeEditor,
} from './commons/editors';
import { ElementContainer } from './commons/ElementContainer';

import { IconList } from '../lib/constants/icons';
import { Icon } from '../lib';
import { InputTypes } from '../lib/Input/config';

const getEditor = (props: BadgeProps, defaultProps: BadgeProps) => {

    const editorJson: EditorSection[] = [
        {
            type: EditorSectionTypes.section,
            label: 'Design',
            editors: [
                {
                    prop: 'content',
                    default: defaultProps.content,
                    type: EditorTypes.input,
                    label: 'Value'
                },
                {
                    prop: 'background',
                    default: defaultProps.background,
                    type: EditorTypes.color,
                    label: 'Background color'
                },
                {
                    prop: 'color',
                    default: defaultProps.color,
                    type: EditorTypes.color,
                    label: 'Text color'
                },
                fontSizeEditor(defaultProps.size, 'Font size', 'size'),
                {
                    prop: 'position',
                    default: defaultProps.position,
                    type: EditorTypes.select,
                    label: 'Position',
                    options: Object.entries(BadgePositions).map(([k,v]) => ({
                        label: v,
                        value: k
                    }))
                },
                {
                    prop: 'outline',
                    default: defaultProps.outline,
                    type: EditorTypes.toggle,
                    label: 'Show badge outline'
                },
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Options',
            editors: [
                {
                    prop: 'showWhenZero',
                    label: 'Show badge when zero',
                    default: defaultProps.showWhenZero,
                    type: EditorTypes.toggle
                },
                {
                    prop: 'showBadge',
                    label: 'Show badge',
                    default: defaultProps.showBadge,
                    type: EditorTypes.toggle
                },
                {
                    prop: 'maxValue',
                    label: 'maxValue',
                    default: defaultProps.maxValue,
                    type: EditorTypes.input,
                    inputType: InputTypes.number
                },
                {
                    prop: 'showAsDot',
                    label: 'Show badge as dot',
                    default: defaultProps.showAsDot,
                    type: EditorTypes.toggle
                },
            ]
        }
    ];

    return editorJson;
};


export default function BadgeEditor() {
    return function BadgeEditorFn () {
        const {
            onChangeProp,
            props: badgeProps
        } = useEditorInit(Badge.defaultProps);

        const editorJson: EditorSection[] = getEditor(badgeProps, Badge.defaultProps);

        return (
            <Fragment>
                <ElementContainer>
                    <Badge
                        {...badgeProps}
                    >
                        <Icon
                            icon={IconList.cog}
                            fontSize={IconSize.xl}
                        />
                    </Badge>
                </ElementContainer>
                <Editor
                    element="Badge"
                    defaultProps={Badge.defaultProps}

                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}