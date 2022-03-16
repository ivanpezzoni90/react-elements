import React from 'react';

import Editor from './Editor';
import { Editor as EditorType, IconSize, Option } from '../types';
import { Fragment } from 'react';
import Icon, { IconList } from '../ui/Icon';
import { useEditorInit } from '../hooks';
import { EditorContainer, ElementContainer, iconEditor, iconSizeEditor } from './commons';

const getEditor = () => {
    const editorJson: EditorType[] = [
        iconEditor,
        {
            type: 'color',
            default: '#666',
            label: 'Color',
            prop: 'color'
        },
        iconSizeEditor
    ];
    
    return editorJson;
};

export default function IconEditor() {
    return function IconEditorFn () {
        const {
            onChangeProp,
            props
        } = useEditorInit(Icon.defaultProps);

        const iconProps = props.icon ? props : Object.assign({}, props, {
            icon: IconList.check
        });
        const editorJson: EditorType[] = getEditor();

        return (
            <Fragment>
                <EditorContainer>
                    <Editor
                        json={editorJson}
                        onChange={onChangeProp}
                    />
                </EditorContainer>
                <ElementContainer>
                    <Icon
                        {...iconProps}
                    />
                </ElementContainer>
            </Fragment>
        );
    };
       
}