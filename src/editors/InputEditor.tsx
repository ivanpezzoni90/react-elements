import React from 'react';

import Editor from './EditorBuilder';

import { EditorSection, EditorSectionTypes, PropsObjectInterface } from '../lib/types';
import { Fragment } from 'react';
import { Input } from '../lib/Input';
import { useEditorInit } from '../lib/hooks';
import { bordersAndShadowSection, ElementContainer, labelSection, lengthEditor } from './commons';
import { InputTypes } from '../lib/Input/config';

const getEditor = (props: PropsObjectInterface) => {
    const editorJson: EditorSection[] = [
        labelSection(),
        {
            type: EditorSectionTypes.section,
            label: 'Type',
            editors: [
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
                    }, {
                        label: 'Date',
                        value: InputTypes.date
                    }]
                },
                {
                    type: 'input',
                    inputType: props.type,
                    label: props.type === InputTypes.text ? 'Max length' : 'Max',
                    prop: 'max',
                    default: undefined
                },
                {
                    type: 'input',
                    label: props.type === InputTypes.text ? 'Min length' : 'Min',
                    inputType: props.type,
                    prop: 'min',
                    default: undefined
                }
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Error',
            editors: [
                {
                    label: 'Error',
                    type: 'toggle',
                    default: false,
                    prop: 'error'
                },
                ... props.error ? [{
                    label: 'Error Message',
                    type: 'input',
                    default: '',
                    prop: 'errorMessage'
                }] : []
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Size',
            editors: [
                lengthEditor(),
            ]
        },
        bordersAndShadowSection(false),
        {
            type: EditorSectionTypes.section,
            label: 'Others',
            editors: [
                {
                    label: 'Locked',
                    type: 'toggle',
                    default: false,
                    prop: 'locked'
                },
            ]
        },
    ];
    return editorJson;
};

export default function InputEditor() {
    return function InputEditorFn () {
        const {
            onChangeProp,
            props: inputProps
        } = useEditorInit(Input.defaultProps);

        const max:string = inputProps.max || inputProps.max === 0 ? inputProps.max.toString() : '';
        const parsedMax: number = parseFloat(max);
    
        const min:string = inputProps.min || inputProps.min === 0 ? inputProps.min.toString() : '';
        const parsedMin: number = parseFloat(min);

        return (
            <Fragment>
                <ElementContainer>
                    <Input
                        {...inputProps}
                        type={inputProps.type as InputTypes}
                        max={inputProps.max ? parsedMax : undefined}
                        min={inputProps.min ? parsedMin : undefined}
                        value={inputProps.value as string}
                    />
                </ElementContainer>
                <Editor
                    element="Input"
                    defaultProps={Input.defaultProps}
                    json={getEditor(inputProps)}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}