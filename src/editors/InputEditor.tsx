import Editor from './Editor';

import { Editor as EditorType } from '../types';
import { Fragment } from 'react';
import Input from '../ui/Input';
import { useEditorInit } from '../hooks';
import { EditorContainer, ElementContainer } from './commons';


const editorJson: EditorType[] = [
    {
        type: 'input',
        default: '',
        label: 'Value',
        prop: 'value'
    },
    {
        type: 'input',
        default: 'Label',
        label: 'Label',
        prop: 'label'
    },
    // {
    //     label: 'Locked',
    //     type: 'checkbox',
    //     default: false,
    //     prop: 'locked'
    // },
    // {
    //     label: 'Active',
    //     type: 'checkbox',
    //     default: true,
    //     prop: 'active'
    // },
    {
        label: 'Error',
        type: 'input',
        default: '',
        prop: 'error'
    },
    {
        label: 'Length',
        type: 'select',
        default: 'full',
        prop: 'length',
        options: [{
            label: 'full',
            value: 'full'
        }, {
            label: 'S',
            value: 'S'
        }, {
            label: 'M',
            value: 'M'
        }, {
            label: 'L',
            value: 'L'
        }]
    }
];

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
                        json={editorJson}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <Input
                        {...inputProps}
                    />
                </ElementContainer>
            </Fragment>
        );
    }
       
}