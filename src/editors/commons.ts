import styled from 'styled-components';
import { Editor } from '../types';
import { AlignPositions, LabelPositions } from '../types';

export const EditorContainer = styled.div`
    display: flex;
    padding: 0.5em 1em 0.5em 0.5em;
    border-right: 1px solid #666;
    min-width: 15em;
`;

export const ElementContainer = styled.div`
    display: flex;
    padding: 3em;
    flex: 1;
`;

export const labelPositionEditor: Editor = {
    type: 'select',
    label: 'Label Position',
    default: LabelPositions.horizontal,
    prop: 'labelPosition',
    options: [{
        label: 'Horizontal',
        value: LabelPositions.horizontal
    }, {
        label: 'Vertical',
        value: LabelPositions.vertical
    }]
};

export const alignPositionEditor: Editor = {
    type: 'select',
    label: 'Alignment',
    default: AlignPositions.left,
    prop: 'align',
    options: [{
        label: 'Left',
        value: AlignPositions.left
    }, {
        label: 'Center',
        value: AlignPositions.center
    }, {
        label: 'Right',
        value: AlignPositions.right
    }]
};