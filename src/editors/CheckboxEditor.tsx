import { Fragment } from 'react';
import Editor from './Editor';
import Checkbox from '../ui/Checkbox';
import { Editor as EditorType } from '../types';
import { useEditorInit } from '../hooks';
import { EditorContainer, ElementContainer } from './commons';


const editorJson: EditorType[] = [
    {
        type: 'input',
        default: 'Label',
        label: 'Label',
        prop: 'label'
    },
];

export default function CheckboxEditor() {
    return function CheckboxEditorFn () {
        const {
            onChangeProp,
            props: checkboxProps
        } = useEditorInit(Checkbox.defaultProps);

        return (
            <Fragment>
                <EditorContainer>
                    <Editor
                        json={editorJson}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <Checkbox
                        {...checkboxProps}
                    />
                </ElementContainer>
            </Fragment>
        );
    }
       
}