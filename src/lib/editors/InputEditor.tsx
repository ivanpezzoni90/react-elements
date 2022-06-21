import React from 'react';

import Editor from './EditorBuilder';

import { Editor as EditorType, PropsObjectInterface } from '../types';
import { Fragment } from 'react';
import Input from '../ui/Input';
import { useEditorInit } from '../hooks';
import { colorEditors, ElementContainer, lengthEditor, shadowEditor } from './commons';
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
            }, {
                label: 'Date',
                value: InputTypes.date
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
    
    // Error message
    if (props.error) {
        editorJson.push({
            label: 'Error Message',
            type: 'input',
            default: '',
            prop: 'errorMessage'
        });
    }

    // max/min
    editorJson.push({
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
    });

    editorJson.push(
        lengthEditor(),
        ...colorEditors,
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
                    json={getEditor(inputProps)}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}