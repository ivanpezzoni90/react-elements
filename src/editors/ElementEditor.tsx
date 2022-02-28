import React, { ReactChild } from 'react';

import Editor from './Editor';

import { Editor as EditorType } from '../types';
import { Fragment } from 'react';
import Element, { AlignPositions, LabelPositions } from '../ui/Element';
import { useEditorInit } from '../hooks';
import { EditorContainer, ElementContainer } from './commons';
import { CheckboxElement } from '../ui/Checkbox';
import { SwitchToggleElement } from '../ui/SwitchToggle';

const editorJson: EditorType[] = [
    {
        type: 'input',
        default: 'Label',
        label: 'Label',
        prop: 'label'
    },
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
];

const getElement = (element: string) => {
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
        const elementToRender: ReactChild = getElement(elementProps.children);

        return (
            <Fragment>
                <EditorContainer>
                    <Editor
                        json={editorJson}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <Element
                        {...elementProps}
                    >
                        {elementToRender}
                    </Element>
                </ElementContainer>
            </Fragment>
        );
    };
       
}