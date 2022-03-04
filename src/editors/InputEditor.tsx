import React from 'react';

import Editor from './Editor';

import { Editor as EditorType, PropsObjectInterface } from '../types';
import { Fragment } from 'react';
import Input, { InputProps } from '../ui/Input';
import { useEditorInit } from '../hooks';
import { EditorContainer, ElementContainer, shadowEditor } from './commons';
import { allColors } from '../constants/colors';
import { InputTypes } from '../ui/Input/config';

const getEditor = (props: PropsObjectInterface) => {
    const editorJson: EditorType[] = [
        {
            type: 'input',
            default: 'Label',
            label: 'Label',
            prop: 'label'
        },
        {
            type: 'select',
            default: InputTypes.text,
            label: 'Type',
            prop: 'type',
            options: [{
                label: 'Text',
                value: InputTypes.text
            }, {
                label: 'Number',
                value: InputTypes.number
            }]
        },
        {
            label: 'Locked',
            type: 'toggle',
            default: false,
            prop: 'locked'
        },
        {
            label: 'Error',
            type: 'toggle',
            default: false,
            prop: 'error'
        }
    ];
    if (props.error) {
        editorJson.push({
            label: 'Error Message',
            type: 'input',
            default: '',
            prop: 'errorMessage'
        });
    }
    editorJson.push({
        label: 'Length',
        type: 'select',
        default: 'full',
        prop: 'length',
        options: [{
            label: 'Full',
            value: 'full'
        }, {
            label: 'S',
            value: 's'
        }, {
            label: 'M',
            value: 'm'
        }, {
            label: 'L',
            value: 'l'
        }]
    },
    {
        type: 'input',
        label: 'Max length',
        prop: 'max',
        default: undefined
    },
    {
        type: 'input',
        label: 'Min length',
        prop: 'min',
        default: undefined
    },
    {
        type: 'color',
        label: 'Text Color',
        prop: 'textColor',
        default: allColors['Dim Gray']
    },
    {
        type: 'color',
        label: 'Label Color',
        prop: 'labelColor',
        default: allColors['Dim Gray']
    },
    {
        type: 'color',
        label: 'Border Color',
        prop: 'borderColor',
        default: allColors['Dim Gray']
    },
    shadowEditor
    );
    return editorJson.filter(Boolean);
};

export default function InputEditor() {
    return function InputEditorFn () {
        const {
            onChangeProp,
            props: inputProps
        } = useEditorInit(Input.defaultProps);

        return (
            <Fragment>
                <EditorContainer>
                    <Editor
                        json={getEditor(inputProps)}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <Input
                        {...inputProps}
                        value={inputProps.value as string}
                    />
                </ElementContainer>
            </Fragment>
        );
    };
       
}