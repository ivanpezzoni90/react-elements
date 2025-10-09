import React from 'react';
import { Fragment } from 'react';
import Editor from './EditorBuilder';
import { EditorSection, EditorSectionTypes, EditorTypes } from '../lib/types';
import { useEditorInit } from '../lib/hooks';
import { ElementContainer } from './commons/ElementContainer';

import { Table, TableProps } from '../lib/Table';
import { InputTypes } from '../lib/Input/config';

type TableData = {
    id: number,
    name: string,
    age: number
}

const getEditor = (
    props: TableProps<TableData>,
    defaultProps: TableProps<TableData>
) => {
    const editorJson: EditorSection[] = [
        {
            type: EditorSectionTypes.section,
            label: 'Features',
            editors: [
                {
                    prop: 'sortable',
                    type: EditorTypes.toggle,
                    default: defaultProps.sortable,
                    label: 'Sortable'
                },
                {
                    prop: 'selectable',
                    type: EditorTypes.toggle,
                    default: defaultProps.selectable,
                    label: 'Selectable'
                },
                {
                    prop: 'selectColumn',
                    type: EditorTypes.toggle,
                    default: defaultProps.selectColumn,
                    label: 'Enable select column'
                },
                {
                    prop: 'striped',
                    type: EditorTypes.toggle,
                    default: defaultProps.striped,
                    label: 'Striped'
                },
                {
                    prop: 'paginated',
                    type: EditorTypes.toggle,
                    default: defaultProps.paginated,
                    label: 'Paginated'
                },
                ... props.paginated ? [{
                    prop: 'itemsPerPage',
                    type: EditorTypes.input,
                    inputType: InputTypes.number,
                    default: defaultProps.itemsPerPage,
                    label: 'Items per page'
                }] : [],
                {
                    prop: 'verticalBorders',
                    type: EditorTypes.toggle,
                    default: defaultProps.verticalBorders,
                    label: 'Vertical borders'
                },
            ]
        },
        {
            type: EditorSectionTypes.section,
            label: 'Colors',
            editors: [
                {
                    prop: 'selectedColor',
                    type: EditorTypes.color,
                    default: defaultProps.selectedColor,
                    label: 'Selected color'
                },
                {
                    prop: 'hoverColor',
                    type: EditorTypes.color,
                    default: defaultProps.hoverColor,
                    label: 'Hover color'
                },
                {
                    prop: 'stripedColor',
                    type: EditorTypes.color,
                    default: defaultProps.stripedColor,
                    label: 'Striped color'
                },
            ]
        }
    ];

    return editorJson;
};

const data = (paginated: boolean) => [{
    id: 1,
    name: 'Terra',
    surname: 'Branford',
    type: 'Player character'
}, {
    id: 2,
    name: 'Locke',
    surname: 'Cole',
    type: 'Player character'
}, ... paginated ? [{
    id: 3,
    name: 'Edgar Roni',
    surname: 'Figaro',
    type: 'Player character'
}, {
    id: 4,
    name: 'Sabin Rene',
    surname: 'Figaro',
    type: 'Player character'
}, {
    id: 5,
    name: 'Cyan',
    surname: 'Garamonde',
    type: 'Player character'
}, {
    id: 6,
    name: 'Celes',
    surname: 'Chere',
    type: 'Player character'
}] : [],
{
    id: 7,
    name: 'Shadow',
    surname: '',
    type: 'Optional character'
}, {
    id: 8,
    name: 'Mog',
    surname: '',
    type: 'Optional character'
}, {
    id: 9,
    name: 'Kefka',
    surname: 'Palazzo',
    type: 'Antagonist'
}, ... paginated ? [{
    id: 10,
    name: 'Gestahl',
    surname: 'Emperor',
    type: 'Antagonist'
}, {
    id: 11,
    name: 'Ultros',
    surname: '',
    type: 'Antagonist'
}] : []];

export default function TableEditor() {
    return function TableEditorFn () {
        const {
            onChangeProp,
            props: tableProps
        } = useEditorInit(Table.defaultProps);

        const editorJson: EditorSection[] = getEditor(tableProps, Table.defaultProps);

        return (
            <Fragment>
                <ElementContainer>
                    <Table
                        {...tableProps}
                        data={data(tableProps.paginated)}
                        columns={[{
                            key: 'id',
                            header: 'ID'
                        }, {
                            key: 'name',
                            header: 'First name'
                        }, {
                            key: 'surname',
                            header: 'Last name'
                        }, {
                            key: 'type',
                            header: 'Type'
                        }]}
                    />
                </ElementContainer>
                <Editor
                    element="Table"
                    defaultProps={Table.defaultProps}

                    json={editorJson}
                    onChange={onChangeProp}
                />
            </Fragment>
        );
    };
       
}

export { getEditor as getButtonEditor };