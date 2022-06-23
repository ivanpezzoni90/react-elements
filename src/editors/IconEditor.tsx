import React from 'react';

import Editor from './EditorBuilder';
import { Editor as EditorType } from '../lib/types';
import { Fragment } from 'react';
import { IconList, Icon } from '../lib/Icon';
import { useEditorInit } from '../lib/hooks';
import { ElementContainer, iconEditor, iconSizeEditor } from './commons';

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
                <ElementContainer>
                    <Icon
                        {...iconProps}
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