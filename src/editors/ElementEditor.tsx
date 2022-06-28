import React, { ReactChild } from 'react';

import Editor from './EditorBuilder';

import { EditorSection, EditorSectionTypes } from '../lib/types';
import { Fragment } from 'react';
import { Element } from '../lib/Element';
import { LabelPositions, AlignPositions } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { ElementContainer, labelSection } from './commons';
import { CheckboxElement } from '../lib/Checkbox';
import { SwitchToggleElement } from '../lib/SwitchToggle';

const editorJson: EditorSection[] = [
    labelSection(),
    {
        type: EditorSectionTypes.section,
        label: 'Position',
        editors: [
            {
                type: 'select',
                label: 'Label Position',
                default: LabelPositions.horizontal,
                prop: 'labelPosition',
                options: [{
                    label: 'Horizontal',
                    value: LabelPositions.horizontal
                }, {
                    label: 'Vertical',
                    value: LabelPositions.vertical
                }]
            },
            {
                type: 'select',
                label: 'Alignment',
                default: AlignPositions.left,
                prop: 'align',
                options: [{
                    label: 'Left',
                    value: AlignPositions.left
                }, {
                    label: 'Center',
                    value: AlignPositions.center
                }, {
                    label: 'Right',
                    value: AlignPositions.right
                }]
            },
        ]
    },
    {
        type: EditorSectionTypes.section,
        label: 'Child',
        editors: [
            {
                label: 'Child',
                type: 'select',
                default: 'checkbox',
                prop: 'children',
                options: [{
                    label: 'Checkbox',
                    value: 'checkbox'
                }, {
                    label: 'Switch Toggle',
                    value: 'switchToggle'
                }]
            }
        ]
    }
];

type GetElementType = (e: string) => ReactChild;

const getElement: GetElementType = (element: string) => {
    switch(element) {
        case 'checkbox':
        default:
            return (<CheckboxElement
                className=""
                checked={false}
                onChange={() => {}}
            />);
        case 'switchToggle':
            return (<SwitchToggleElement
                checked={false}
                onChange={() => {}}
            />);
    }
};

export default function ElementEditor() {
    return function ElementEditorFn () {
        const {
            onChangeProp,
            props: elementProps
        } = useEditorInit(Element.defaultProps);

        // Get child to render inside element
        const elementToRender: ReactChild = getElement(elementProps.children as string);

        return (
            <Fragment>
                <ElementContainer>
                    <Element
                        {...elementProps}
                    >
                        {elementToRender}
                    </Element>
                </ElementContainer>
                <Editor
                    element="Element"
                    defaultProps={Element.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}