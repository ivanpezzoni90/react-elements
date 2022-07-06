import React from 'react';

import Editor from './EditorBuilder';

import { EditorSection, EditorSectionTypes, EditorTypes, LabelPositions } from '../lib/types';
import { Fragment } from 'react';
import { Input } from '../lib/Input';
import { useEditorInit } from '../lib/hooks';
import { bordersAndShadowSection, colorEditors, heightEditor, labelSection, lengthEditor } from './commons/editors';
import { InputProps, InputTypes } from '../lib/Input/config';
import { ElementContainer } from './commons/ElementContainer';

const getEditor = (props: InputProps) => {
    const editorJson: EditorSection[] = [
        labelSection(LabelPositions.vertical),
        {
            type: EditorSectionTypes.section,
            label: 'Type',
            editors: [
                {
                    type: EditorTypes.select,
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
                    type: EditorTypes.input,
                    inputType: props.type,
                    label: props.type === InputTypes.text ? 'Max length' : 'Max',
                    prop: 'max',
                    default: undefined
                },
                {
                    type: EditorTypes.input,
                    label: props.type === InputTypes.text ? 'Min length' : 'Min',
                    inputType: props.type,
                    prop: 'min',
                    default: undefined
                }
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Colors',
            editors: [
                ...colorEditors,
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Error',
            editors: [
                {
                    label: 'Error',
                    type: EditorTypes.toggle,
                    default: false,
                    prop: 'error'
                },
                ... props.error ? [{
                    label: 'Error Message',
                    type: EditorTypes.input,
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
                heightEditor()
            ]
        },
        bordersAndShadowSection(),
        {
            type: EditorSectionTypes.section,
            label: 'Others',
            editors: [
                {
                    label: 'Locked',
                    type: EditorTypes.toggle,
                    default: false,
                    prop: 'locked'
                },
                {
                    label: 'Placeholder',
                    type: EditorTypes.input,
                    default: '',
                    prop: 'placeholder'
                }
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