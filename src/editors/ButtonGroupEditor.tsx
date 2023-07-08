import React, { Fragment } from 'react';
import { getButtonEditor } from './ButtonEditor';
import Editor from './EditorBuilder';

import { useEditorInit } from '../lib/hooks';
import { Button, ButtonGroup } from '../lib';
import { ElementContainer } from './commons/ElementContainer';
import { EditorSection } from '../lib/types';
import { IconList } from '../lib/constants/icons';
import { ButtonProps } from '../lib/Button';

const renderChildren = (buttonProps: ButtonProps) => Array.from(
    { length: 4 }
).map((_v, i) => (
    <Button
        key={`button-group-children-${buttonProps.label}-${i}`}
        {...buttonProps}
        label={buttonProps.label ? `${buttonProps.label} ${i + 1}` : ''}
        icon={buttonProps.icon as IconList}
    />
));

export default function ButtonGroupEditor() {
    return function ButtonGroupEditorFn () {
        const {
            onChangeProp,
            props: buttonProps
        } = useEditorInit(Button.defaultProps);

        const editorJson: EditorSection[] = getButtonEditor();

        return (
            <Fragment>
                <ElementContainer>
                    <ButtonGroup>
                        {renderChildren(buttonProps)}
                    </ButtonGroup>
                </ElementContainer>
                <Editor
                    element="Button"
                    defaultProps={Button.defaultProps}

                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}