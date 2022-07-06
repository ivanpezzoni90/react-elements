import React from 'react';

import Editor from './EditorBuilder';

import { EditorSection, EditorSectionTypes, EditorTypes, LabelPositions, RadioTypes } from '../lib/types';
import { Fragment } from 'react';
import { useEditorInit } from '../lib/hooks';
import { labelSection, positionEditor } from './commons/editors';
import { ElementContainer } from './commons/ElementContainer';

import { InputTypes } from '../lib/Input/config';
import { Radio, RadioProps } from '../lib/Radio';
import { IconList } from '../lib/Icon';

const defaultOptions = [{
    label: 'Option 1',
    value: '1',
    icon: IconList.close
}, {
    label: 'Option 2',
    value: '2',
    icon: IconList.check
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
                    default: RadioTypes.checkbox,
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
                    }]
                },
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Others',
            editors: [
                positionEditor,
                // Workaround to change number of options using value prop
                {
                    type: EditorTypes.input,
                    inputType: InputTypes.number,
                    default: 2,
                    label: 'Number of elements',
                    prop: 'value'
                }
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

        console.log('radioProps', radioProps);

        return (
            <Fragment>
                <ElementContainer>
                    <Radio
                        {...radioProps}
                        type={radioProps.type as RadioTypes}
                        // Workaround to change number of options using value prop
                        options={radioProps.value ? generateOptions(radioProps.value as string) : defaultOptions}
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