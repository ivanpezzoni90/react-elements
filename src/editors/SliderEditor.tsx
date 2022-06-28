import React from 'react';

import { Fragment } from 'react';
import Editor from './EditorBuilder';
import { Slider } from '../lib/Slider';
import { EditorSection, EditorSectionTypes, ElementLength, PropsObjectInterface } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { bordersAndShadowSection, ElementContainer, labelSection, lengthEditor, simpleElementSection } from './commons';
import { allColors } from '../lib/constants/colors';
import { InputTypes } from '../lib/Input/config';

const getEditor = (props: PropsObjectInterface) => {
    const editorJSON: EditorSection[] = [
        labelSection(),
        {
            type: EditorSectionTypes.section,
            label: 'Show/Hide',
            editors: [
                {
                    type: 'toggle',
                    label: 'Show value',
                    prop: 'showValue',
                    default: true
                }, {
                    type: 'toggle',
                    label: 'Show value tooltip',
                    prop: 'showTooltip',
                    default: true
                }, {
                    type: 'toggle',
                    label: 'Show step values',
                    prop: 'showStepValue',
                    default: false
                }, {
                    type: 'toggle',
                    label: 'Show steps',
                    prop: 'showSteps',
                    default: true
                }
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Values',
            editors: [
                {
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
                }
            ]
        },
        simpleElementSection(props.simpleElement),
        {
            type: EditorSectionTypes.section,
            label: 'Size',
            editors: [
                lengthEditor(ElementLength.l),
            ]
        },
        bordersAndShadowSection(props.simpleElement),
        {
            type: EditorSectionTypes.section,
            label: 'Colors',
            editors: [
                {
                    type: 'color',
                    default: allColors['Dim Gray'],
                    label: 'Color',
                    prop: 'cursorColor'
                },
            ]
        }
    ];

    return editorJSON;
};

export default function CheckboxEditor() {
    return function CheckboxEditorFn () {
        const {
            onChangeProp,
            props: sliderProps
        } = useEditorInit(Slider.defaultProps);

        const editorJson: EditorSection[] = getEditor(sliderProps);

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
                    element="Slider"
                    defaultProps={Slider.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };      
}