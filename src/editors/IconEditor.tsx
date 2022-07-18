import React from 'react';

import Editor from './EditorBuilder';
import { BorderRadius, Cursors, EditorSection, EditorSectionTypes, EditorTypes, Padding } from '../lib/types';
import { Fragment } from 'react';
import { IconList, Icon } from '../lib/Icon';
import { useEditorInit } from '../lib/hooks';
import { borderRadiusEditor, cursorEditor, iconEditor, iconSizeEditor, paddingEditor } from './commons/editors';
import { ElementContainer } from './commons/ElementContainer';
import { allColors } from '../lib/constants/colors';

const getEditor = () => {
    const editorJson: EditorSection[] = [
        {
            type: EditorSectionTypes.section,
            label: 'Icon',
            editors: [
                iconEditor(IconList.check, false),
                {
                    type: EditorTypes.color,
                    default: allColors['Dim Gray'],
                    label: 'Color',
                    prop: 'color'
                },
                iconSizeEditor()
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Container',
            editors: [
                {
                    prop: 'backgroundColor',
                    type: EditorTypes.color,
                    label: 'Container color',
                    default: allColors['Transparent'],
                },
                borderRadiusEditor(BorderRadius.no),
                paddingEditor(Padding.xs),
                cursorEditor(Cursors.auto)
            ]
        }
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
        const editorJson: EditorSection[] = getEditor();

        return (
            <Fragment>
                <ElementContainer>
                    <Icon
                        {...iconProps}
                    />
                </ElementContainer>
                <Editor
                    element="Icon"
                    defaultProps={Icon.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}