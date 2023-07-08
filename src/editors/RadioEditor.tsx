import React from 'react';

import Editor from './EditorBuilder';

import { EditorSection, EditorSectionTypes, EditorTypes, ElementPosition, LabelPositions, RadioTypes } from '../lib/types';
import { Fragment } from 'react';
import { useEditorInit } from '../lib/hooks';
import { elementPositionEditor, labelSection, positionEditor } from './commons/editors';
import { ElementContainer } from './commons/ElementContainer';

import { Radio, RadioProps } from '../lib/Radio';
import { IconList } from '../lib/constants/icons';
import { allColors } from '../lib/constants/colors';

const defaultOptions = [{
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
}];

const getEditor = (props: RadioProps) => {
    const editorJson: EditorSection[] = [
        labelSection(LabelPositions.vertical),
        {
            type: EditorSectionTypes.section,
            label: 'Type',
            editors: [
                {
                    type: EditorTypes.select,
                    default: RadioTypes.radio,
                    label: 'Type',
                    prop: 'type',
                    options: [{
                        label: 'Checkbox',
                        value: RadioTypes.checkbox
                    }, {
                        label: 'Toggle',
                        value: RadioTypes.toggle
                    }, {
                        label: 'Icon',
                        value: RadioTypes.icon
                    }, {
                        label: 'Radio',
                        value: RadioTypes.radio
                    }, {
                        label: 'Button',
                        value: RadioTypes.button
                    }]
                },
                {
                    type: EditorTypes.toggle,
                    label: 'Multiple',
                    prop: 'multiple',
                    default: false
                }
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Element',
            editors: [
                {
                    type: EditorTypes.color,
                    default: allColors['Teal'],
                    label: 'Primary color',
                    prop: 'primaryColor'
                },
                {
                    type: EditorTypes.color,
                    default: allColors['Silver Sand'],
                    label: 'Secondary color',
                    prop: 'secondaryColor'
                },
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Borders',
            editors: [
                {
                    type: EditorTypes.toggle,
                    default: true,
                    label: 'Hide bottom border',
                    prop: 'hideBottomBorder'
                },
                {
                    type: EditorTypes.color,
                    default: allColors['Silver Sand'],
                    label: 'Border color',
                    prop: 'borderColor'
                }
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Others',
            editors: [
                positionEditor,
                elementPositionEditor(ElementPosition.left, 'Radio element position')
            ]
        },
    ];

    return editorJson;
};

const generateOptions = (n: string) => {
    let i = 0;
    const parsedN = parseInt(n, 10);
    const options = [];
    while(i < parsedN) {
        options.push({
            label: `Option ${i + 1}`,
            value: `${i + 1}`,
            icon: i & 1 ? IconList.check : IconList.close
        });
        i++;
    }
    return options;
};

export default function RadioEditor() {
    return function RadioEditorFn () {
        const {
            onChangeProp,
            props: radioProps
        } = useEditorInit(Radio.defaultProps);

        return (
            <Fragment>
                <ElementContainer>
                    <Radio
                        {...radioProps}
                        type={radioProps.type as RadioTypes}
                        options={defaultOptions}
                        value={radioProps.value as string | boolean}
                    />
                </ElementContainer>
                <Editor
                    element="Radio"
                    defaultProps={Radio.defaultProps}
                    json={getEditor(radioProps)}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}