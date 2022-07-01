import React from 'react';

import Editor from './EditorBuilder';

import { EditorSection, EditorSectionTypes, LabelPositions, PropsObjectInterface, RadioTypes } from '../lib/types';
import { Fragment } from 'react';
import { useEditorInit } from '../lib/hooks';
import { ElementContainer, labelSection, positionEditor } from './commons';
import { InputTypes } from '../lib/Input/config';
import { Radio } from '../lib/Radio';
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

const getEditor = (props: PropsObjectInterface) => {
    const editorJson: EditorSection[] = [
        labelSection(LabelPositions.vertical),
        {
            type: EditorSectionTypes.section,
            label: 'Type',
            editors: [
                {
                    type: 'select',
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
                        label: 'Button',
                        value: RadioTypes.button
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
                    type: 'input',
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