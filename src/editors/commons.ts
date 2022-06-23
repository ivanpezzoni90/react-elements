import styled from 'styled-components';
import { allColors } from '../lib/constants/colors';
import {
    BorderRadius,
    Editor,
    ElementLength,
    ElementSize,
    FontWeight,
    IconSize,
    Option,
    Padding,
    Positions
} from '../lib/types';
import { AlignPositions, LabelPositions } from '../lib/types';
import { IconList } from '../lib/Icon';

export const EditorContainer = styled.div.attrs({
    className: 'ie__workarea__editor'
})`
    display: flex;
    padding: 0.5em 1em 0.5em 0.5em;
    flex-direction: column;
`;

export const ElementContainer = styled.div.attrs({
    className: 'ie__workarea__element'
})`
    padding: 1em 1em 2em 1em;
    border-bottom: 1px solid #c3c3c3
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

export const positionEditor: Editor = {
    type: 'select',
    label: 'Position',
    default: Positions.vertical,
    prop: 'position',
    options: [{
        label: 'Horizontal',
        value: Positions.horizontal
    }, {
        label: 'Vertical',
        value: Positions.vertical
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

export const shadowEditor: Editor = {
    label: 'Shadow',
    type: 'toggle',
    default: true,
    prop: 'shadow'
};

export const colorEditors: Editor[] = [
    {
        type: 'color',
        label: 'Text Color',
        prop: 'textColor',
        default: allColors['Dim Gray']
    },
    {
        type: 'color',
        label: 'Label Color',
        prop: 'labelColor',
        default: allColors['Dim Gray']
    },
    {
        type: 'color',
        label: 'Border Color',
        prop: 'borderColor',
        default: allColors['Dim Gray']
    },
];

export const lengthEditor = (def = ElementLength.full): Editor => ({
    label: 'Length',
    type: 'select',
    default: def,
    prop: 'length',
    options: [{
        label: 'Full',
        value: ElementLength.full
    }, {
        label: 'S',
        value: ElementLength.s
    }, {
        label: 'M',
        value: ElementLength.m
    }, {
        label: 'L',
        value: ElementLength.l
    }, {
        label: 'Squared',
        value: ElementLength.squared
    }]
});

export const paddingEditor: Editor = {
    label: 'Padding',
    type: 'select',
    default: Padding.m,
    prop: 'padding',
    options: [{
        label: 'S',
        value: Padding.s
    }, {
        label: 'M',
        value: Padding.m
    }, {
        label: 'L',
        value: Padding.l
    }]
};

export const fontWeightEditor: Editor = {
    label: 'Font Weight',
    type: 'select',
    default: FontWeight.light,
    prop: 'fontWeight',
    options: [{
        label: 'Lighter',
        value: FontWeight.lighter
    }, {
        label: 'Light',
        value: FontWeight.light
    }, {
        label: 'Semibold',
        value: FontWeight.semibold
    }, {
        label: 'Bold',
        value: FontWeight.bold
    }, {
        label: 'Bolder',
        value: FontWeight.bolder
    }]
};

export const borderRadiusEditor: Editor = {
    label: 'Border Radius',
    type: 'select',
    default: BorderRadius.s,
    prop: 'borderRadius',
    options: [{
        label: 'No',
        value: BorderRadius.no
    }, {
        label: 'XS',
        value: BorderRadius.xs
    }, {
        label: 'S',
        value: BorderRadius.s
    }, {
        label: 'M',
        value: BorderRadius.m
    }, {
        label: 'L',
        value: BorderRadius.l
    }, {
        label: 'XL',
        value: BorderRadius.xl
    }, {
        label: 'XXL',
        value: BorderRadius.xxl
    }]
};

export const fontSizeEditor: Editor = {
    label: 'Element Size',
    type: 'select',
    default: ElementSize.m,
    prop: 'fontSize',
    options: [{
        label: 'XXS',
        value: ElementSize.xxs
    }, {
        label: 'XS',
        value: ElementSize.xs
    }, {
        label: 'S',
        value: ElementSize.s
    }, {
        label: 'M',
        value: ElementSize.m
    }, {
        label: 'L',
        value: ElementSize.l
    }, {
        label: 'XL',
        value: ElementSize.xl
    }, {
        label: 'XXL',
        value: ElementSize.xxl
    }]
};


const iconOptions: Option[] = Object.values(IconList).map(v => ({
    label: v,
    value: v,
    icon: v
}));

export const iconEditor: Editor = {
    type: 'select',
    default: IconList.check,
    label: 'Icon',
    prop: 'icon',
    options: iconOptions,
    resettable: true
};

const sizeOptions: Option[] = Object.entries(IconSize).map(([k,v]) => ({
    label: k,
    value: v
}));

export const iconSizeEditor: Editor = {
    label: 'Size',
    type: 'select',
    default: IconSize.xs,
    prop: 'fontSize',
    options: sizeOptions
};