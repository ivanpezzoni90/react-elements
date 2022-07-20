import React, { useState } from 'react';

import Editor from './EditorBuilder';
import { AlignPositions, Cursors, EditorSection, EditorSectionTypes, EditorTypes, ElementLength, ElementPosition, ModalHeight, ModalWidth } from '../lib/types';
import { Fragment } from 'react';
import { Modal, ModalProps, ModalElement } from '../lib/Modal';
import { useEditorInit } from '../lib/hooks';
import { ElementContainer } from './commons/ElementContainer';
import { Button, Icon } from '../lib';
import { alignPositionEditor } from './commons/editors';
import { IconList } from '../lib/constants/icons';
import { allColors } from '../lib/constants/colors';

const getEditor = () => {
    const editorJson: EditorSection[] = [
        {
            type: EditorSectionTypes.section,
            label: 'Size',
            editors: [
                {
                    type: EditorTypes.select,
                    default: ModalWidth.m,
                    prop: 'width',
                    label: 'Width',
                    options: [{
                        label: 'Auto',
                        value: ModalWidth.auto
                    }, {
                        label: 'Full',
                        value: ModalWidth.full
                    }, {
                        label: 'S',
                        value: ModalWidth.s
                    }, {
                        label: 'M',
                        value: ModalWidth.m
                    }, {
                        label: 'L',
                        value: ModalWidth.l
                    }]
                },
                {
                    type: EditorTypes.select,
                    default: ModalHeight.auto,
                    prop: 'height',
                    label: 'Height',
                    options: [{
                        label: 'Auto',
                        value: ModalHeight.auto
                    }, {
                        label: 'Full',
                        value: ModalHeight.full
                    }, {
                        label: 'S',
                        value: ModalHeight.s
                    }, {
                        label: 'M',
                        value: ModalHeight.m
                    }, {
                        label: 'L',
                        value: ModalHeight.l
                    }]
                }
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Show/Hide',
            editors: [
                {
                    prop: 'showHeader',
                    type: EditorTypes.toggle,
                    label: 'Show header',
                    default: true
                },
                {
                    prop: 'showFooter',
                    type: EditorTypes.toggle,
                    label: 'Show footer',
                    default: true
                },
                {
                    prop: 'showCloseButton',
                    type: EditorTypes.toggle,
                    label: 'Show close button',
                    default: true
                },
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Buttons',
            editors: [
                {
                    type: EditorTypes.select,
                    default: ElementPosition.left,
                    label: 'Header buttons position',
                    prop: 'headerButtonsPosition',
                    options: [{
                        label: 'Left',
                        value: ElementPosition.left
                    }, {
                        label: 'Right',
                        value: ElementPosition.right
                    }]
                },
                alignPositionEditor(
                    AlignPositions.right,
                    'footerButtonsAlign',
                    'Footer buttons align'
                )
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Others',
            editors: [
                {
                    type: EditorTypes.toggle,
                    label: 'Close on click outside',
                    prop: 'closeOnClickOutside',
                    default: false
                },
                {
                    type: EditorTypes.input,
                    default: 'Modal Title',
                    label: 'Title',
                    prop: 'title'
                },
            ]
        }
    ];

    return editorJson;
};

export const ModalWithButton = (props: ModalProps) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                className="modal-with-button"
                label="Open modal"
                onClick={() => setOpen(true)}
            />
            <Modal
                // Props spread to avoid fixes to this wrapper every time Modal props are added/changed
                {...props}
                onClose={() => {
                    setOpen(false);
                    props.onClose();
                }}
                open={open}
            />
        </>
    );
};
ModalWithButton.defaultProps = Modal.defaultProps;

export default function ModalEditor() {
    return function ModalEditorFn () {
        const {
            onChangeProp,
            props: modalProps
        } = useEditorInit(Modal.defaultProps);

        const editorJson: EditorSection[] = getEditor();
        const headerButtons = [
            <Icon
                key='1'
                icon={IconList.heart}
                cursor={Cursors.pointer}
            />,
            <Icon
                key='2'
                icon={IconList.broadsword}
                cursor={Cursors.pointer}
            />
        ];
    
        const footerButtons = [
            <Button
                key='1'
                label="Reset"
                color={allColors['Silver Sand']}
                length={ElementLength.s}
            />,
            <Button
                key='2'
                label="Confirm"
                color={allColors['Firebrick']}
                length={ElementLength.s}
            />
        ];
    
        const body = (<div>
            <div>Modal body content</div>
            <div>Create body content using Modal <b>children</b></div>
            <div>Add header buttons with <b>headerButtons</b> prop</div>
            <div>Add footer buttons with <b>footerButtons</b> prop</div>
        </div>);
        return (
            <Fragment>
                <ElementContainer>
                    <ModalElement
                        {...modalProps}
                        headerButtons={headerButtons}
                        footerButtons={footerButtons}
                    >
                        {body}
                    </ModalElement>
                </ElementContainer>
                <Editor
                    element="Modal"
                    defaultProps={Modal.defaultProps}
                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}