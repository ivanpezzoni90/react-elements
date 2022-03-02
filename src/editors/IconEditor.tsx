import React from 'react';

import Editor from './Editor';
import { Editor as EditorType, IconSize, Option } from '../types';
import { Fragment } from 'react';
import Icon, { IconList } from '../ui/Icon';
import { useEditorInit } from '../hooks';
import { EditorContainer, ElementContainer } from './commons';

const getEditor = () => {
    const iconOptions: Option[] = Object.values(IconList).map(v => ({
        label: v,
        value: v,
        icon: v
    }));

    const sizeOptions: Option[] = Object.entries(IconSize).map(([k,v]) => ({
        label: k,
        value: v
    }));

    const editorJson: EditorType[] = [
        {
            type: 'select',
            default: IconList.check,
            label: 'Icon',
            prop: 'icon',
            options: iconOptions
        },
        {
            type: 'color',
            default: '#666',
            label: 'Color',
            prop: 'color'
        },
        {
            label: 'Size',
            type: 'select',
            default: IconSize.xs,
            prop: 'fontSize',
            options: sizeOptions
        },
    ];
    
    return editorJson;
}

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