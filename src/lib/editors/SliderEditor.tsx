import React from 'react';

import { Fragment } from 'react';
import Editor from './EditorBuilder';
import Slider from '../ui/Slider';
import { Editor as EditorType, ElementLength, PropsObjectInterface } from '../types';
import { useEditorInit } from '../hooks';
import { alignPositionEditor, ElementContainer, labelPositionEditor, lengthEditor, shadowEditor } from './commons';
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
            type: 'color',
            default: allColors['Dim Gray'],
            label: 'Color',
            prop: 'cursorColor'
        },
        {
            type: 'checkbox',
            default: false,
            label: 'Simple Element',
            prop: 'simpleElement'
        },
        lengthEditor(ElementLength.l),
    ];

    // max/min
    editorJson.push({
        type: 'input',
        inputType: InputTypes.number,
        label: 'Max',
        prop: 'max',
        default: 100
    },
    {
        type: 'input',
        label: 'Min',
        inputType: InputTypes.number,
        prop: 'min',
        default: 0
    },  {
        type: 'input',
        label: 'Step',
        inputType: InputTypes.number,
        prop: 'step',
        default: 20
    }, {
        type: 'toggle',
        label: 'Show value',
        prop: 'showValue',
        default: true
    }, {
        type: 'toggle',
        label: 'Show value tooltip',
        prop: 'showTooltip',
        default: true
    });

    if (props.simpleElement) {
        editorJson.push(labelPositionEditor, alignPositionEditor);
    } else {
        editorJson.push(shadowEditor);
    }
    return editorJson;
};

export default function CheckboxEditor() {
    return function CheckboxEditorFn () {
        const {
            onChangeProp,
            props: sliderProps
        } = useEditorInit(Slider.defaultProps);

        const editorJson: EditorType[] = getEditor(sliderProps);

        const max:string = sliderProps.max || sliderProps.max === 0 ? sliderProps.max.toString() : '0';
        const parsedMax: number = parseFloat(max);
    
        const min:string = sliderProps.min || sliderProps.min === 0 ? sliderProps.min.toString() : '0';
        const parsedMin: number = parseFloat(min);

        const step:string = sliderProps.step || sliderProps.step === 0 ? sliderProps.step.toString() : '0';
        const parsedStep: number = parseFloat(step);

        return (
            <Fragment>
                <ElementContainer>
                    <Slider
                        {...sliderProps}
                        max={parsedMax}
                        min={parsedMin}
                        step={parsedStep}
                        value={sliderProps.value  as string | number}
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