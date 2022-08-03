import { allColors } from '../../lib/constants/colors';
import {
    BorderRadius,
    Cursors,
    Editor,
    EditorSection,
    EditorSectionTypes,
    EditorTypes,
    ElementHeight,
    ElementLength,
    ElementPosition,
    ElementSize,
    FontWeight,
    IconSize,
    LabelLength,
    Option,
    Padding,
    Positions,
    SpinnerSpeed,
    SpinnerSteps
} from '../../lib/types';
import { AlignPositions, LabelPositions } from '../../lib/types';
import { IconList } from '../../lib/constants/icons';

export const labelPositionEditor: (def?: LabelPositions) => Editor = (
    def = LabelPositions.horizontal
) => ({
    type: EditorTypes.select,
    label: 'Label Position',
    default: def,
    prop: 'labelPosition',
    options: [{
        label: 'Horizontal',
        value: LabelPositions.horizontal
    }, {
        label: 'Vertical',
        value: LabelPositions.vertical
    }]
});

export const positionEditor: Editor = {
    type: EditorTypes.select,
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

export const alignPositionEditor = (
    def = AlignPositions.center,
    prop = 'align',
    label = 'Alignment'
): Editor => ({
    type: EditorTypes.select,
    label,
    default: def,
    prop,
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
});

export const shadowEditor: Editor = {
    label: 'Shadow',
    type: EditorTypes.toggle,
    default: true,
    prop: 'shadow'
};

export const colorEditors: Editor[] = [
    {
        type: EditorTypes.color,
        label: 'Text Color',
        prop: 'textColor',
        default: allColors['Dim Gray']
    },
    {
        type: EditorTypes.color,
        label: 'Border Color',
        prop: 'borderColor',
        default: allColors['Silver Sand']
    },
];

export const labelColorEditor: Editor =  {
    type: EditorTypes.color,
    label: 'Label Color',
    prop: 'labelColor',
    default: allColors['Dim Gray']
};

export const lengthEditor = (def = ElementLength.full): Editor => ({
    label: 'Length',
    type: EditorTypes.select,
    default: def,
    prop: 'length',
    options: [
        {
            value: ElementLength.squared,
            label: 'Squared'
        },
        {
            value: ElementLength.xxs,
            label: 'XXS'
        },
        {
            value: ElementLength.xs,
            label: 'XS'
        },
        {
            value: ElementLength.s,
            label: 'S'
        },
        {
            value: ElementLength.m,
            label: 'M'
        },
        {
            value: ElementLength.l,
            label: 'L'
        },
        {
            value: ElementLength.xl,
            label: 'XL'
        },
        {
            value: ElementLength.xxl,
            label: 'XXL'
        },
        {
            value: ElementLength.full,
            label: 'Full'
        },
    ]
});

export const heightEditor = (def = ElementHeight.m): Editor => ({
    label: 'Height',
    type: EditorTypes.select,
    default: def,
    prop: 'height',
    options: [
        {
            label: 'XS',
            value: ElementHeight.xs
        },
        {
            label: 'S',
            value: ElementHeight.s
        },
        {
            label: 'M',
            value: ElementHeight.m
        },
        {
            label: 'L',
            value: ElementHeight.l
        },
        {
            label: 'XL',
            value: ElementHeight.xl
        },
    ]
});

export const labelLengthEditor = (def = LabelLength.auto): Editor => ({
    label: 'Label length',
    type: EditorTypes.select,
    default: def,
    prop: 'labelLength',
    options: [
        {
            value: LabelLength.xxs,
            label: 'XXS'
        },
        {
            value: LabelLength.xs,
            label: 'XS'
        },
        {
            value: LabelLength.s,
            label: 'S'
        },
        {
            value: LabelLength.m,
            label: 'M'
        },
        {
            value: LabelLength.l,
            label: 'L'
        },
        {
            value: LabelLength.xl,
            label: 'XL'
        },
        {
            value: LabelLength.xxl,
            label: 'XXL'
        },
        {
            value: LabelLength.auto,
            label: 'Auto'
        },
    ]
});

export const paddingEditor = (def = Padding.m): Editor => ({
    label: 'Padding',
    type: EditorTypes.select,
    default: def,
    prop: 'padding',
    options: [{
        label: 'No',
        value: Padding.no
    },{
        label: 'XS',
        value: Padding.xs
    },{
        label: 'S',
        value: Padding.s
    }, {
        label: 'M',
        value: Padding.m
    }, {
        label: 'L',
        value: Padding.l
    }, {
        label: 'XL',
        value: Padding.xl
    }]
});

export const cursorEditor = (def = Cursors.auto): Editor => ({
    label: 'Cursor type',
    type: EditorTypes.select,
    default: def,
    prop: 'cursor',
    options: [{
        label: 'Auto',
        value: Cursors.auto
    },{
        label: 'Pointer',
        value: Cursors.pointer
    }]
});

export const fontWeightEditor: Editor = {
    label: 'Font Weight',
    type: EditorTypes.select,
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

type borderRadiusEditorType = (
    _default: BorderRadius,
    label?: string,
    prop?: string
) => Editor

export const borderRadiusEditor: borderRadiusEditorType =
(_default: BorderRadius, label = 'Border Radius', prop = 'borderRadius') => ({
    label,
    type: EditorTypes.select,
    default: _default,
    prop,
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
} as Editor);

export const fontSizeEditor: Editor = {
    label: 'Element Size',
    type: EditorTypes.select,
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

export const spinnerSpeedEditor = () => ({
    type: EditorTypes.select,
    default: SpinnerSpeed.normal,
    label: 'Speed',
    prop: 'speed',
    options: [{
        label: 'Very fast',
        value: SpinnerSpeed.veryFast
    }, {
        label: 'Fast',
        value: SpinnerSpeed.fast
    }, {
        label: 'Normal',
        value: SpinnerSpeed.normal
    }, {
        label: 'Slow',
        value: SpinnerSpeed.slow
    }, {
        label: 'Very Slow',
        value: SpinnerSpeed.verySlow
    }]
});

export const spinnerStepsEditor = () => ({
    type: EditorTypes.select,
    default: SpinnerSteps.continuous,
    label: 'Steps',
    prop: 'steps',
    options: [{
        label: 'Continuous',
        value: SpinnerSteps.continuous
    }, {
        label: 'Single spin',
        value: SpinnerSteps.single
    }, {
        label: 'Sixteen steps spin',
        value: SpinnerSteps.sixteenSteps
    }, {
        label: 'Eight steps spin',
        value: SpinnerSteps.eightSteps
    }, {
        label: 'Four steps spin',
        value: SpinnerSteps.fourSteps
    }, {
        label: 'Two steps spin',
        value: SpinnerSteps.twoSteps
    }]
});

export const iconEditor = (def: IconList | undefined, resettable = true):Editor => ({
    type: EditorTypes.select,
    default: def,
    label: 'Icon',
    prop: 'icon',
    options: iconOptions,
    resettable,
    filterable: true
});

const sizeOptions: Option[] = Object.entries(IconSize).map(([k,v]) => ({
    label: k,
    value: v
}));

export const iconSizeEditor = (def = IconSize.xs): Editor =>  ({
    label: 'Size',
    type: EditorTypes.select,
    default: def,
    prop: 'fontSize',
    options: sizeOptions
});

export const bordersEditor: Editor[] = [
    {
        label: 'Show all borders',
        type: EditorTypes.toggle,
        default: false,
        prop: 'showBorders'
    },
    {
        label: 'Hide bottom border',
        type: EditorTypes.toggle,
        default: false,
        prop: 'hideBottomBorder'
    }
];

export const elementPositionEditor = (
    def = ElementPosition.left,
    label = 'Element Position'
) => ({
    type: EditorTypes.select,
    default: def,
    label,
    prop: 'elementPosition',
    options: [{
        label: 'Left',
        value: ElementPosition.left
    }, {
        label: 'Right',
        value: ElementPosition.right
    }]
});

export const bordersAndShadowSection = (): EditorSection => ({
    type: EditorSectionTypes.section,
    label: 'Borders and Shadow',
    editors: [
        shadowEditor,
        {
            type: EditorTypes.color,
            label: 'Border Color',
            prop: 'borderColor',
            default: allColors['Silver Sand']
        },
        ...bordersEditor,
        borderRadiusEditor(BorderRadius.no)
    ]
});

export const labelSection = (defaultPosition?: LabelPositions): EditorSection => ({
    type: EditorSectionTypes.section,
    label: 'Label',
    editors: [
        {
            type: EditorTypes.input,
            default: 'Label',
            label: 'Label',
            prop: 'label'
        },
        {
            type: EditorTypes.toggle,
            default: false,
            label: 'Hide label',
            prop: 'hideLabel'
        },
        labelColorEditor,
        labelPositionEditor(defaultPosition),
        labelLengthEditor()
    ]
});

