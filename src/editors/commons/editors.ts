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
    type: EditorTypes.radioButton,
    label: 'Label Position',
    default: def,
    prop: 'labelPosition',
    options: [{
        label: 'Horizontal',
        value: LabelPositions.horizontal,
        icon: IconList.horizontalLabel
    }, {
        label: 'Vertical',
        value: LabelPositions.vertical,
        icon: IconList.verticalLabel
    }]
});

export const positionEditor: Editor = {
    type: EditorTypes.radioButton,
    label: 'Position',
    default: Positions.vertical,
    prop: 'position',
    options: [{
        label: 'Horizontal',
        value: Positions.horizontal,
        icon: IconList.horizontalDots
    }, {
        label: 'Vertical',
        value: Positions.vertical,
        icon: IconList.verticalDots
    }]
};

export const alignPositionEditor = (
    def = AlignPositions.center,
    prop = 'align',
    label = 'Alignment'
): Editor => ({
    type: EditorTypes.radioButton,
    label,
    default: def,
    prop,
    options: [{
        label: 'Left',
        value: AlignPositions.left,
        icon: IconList.alignLeft
    }, {
        label: 'Center',
        value: AlignPositions.center,
        icon: IconList.alignCenter
    }, {
        label: 'Right',
        value: AlignPositions.right,
        icon: IconList.alignRight
    }]
});

export const shadowEditor = (def = true): Editor => ({
    label: 'Shadow',
    type: EditorTypes.toggle,
    default: def,
    prop: 'shadow'
});

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
    type: EditorTypes.radioButton,
    default: def,
    prop: 'length',
    options: [
        {
            value: ElementLength.squared,
            label: 'Squared',
            icon: IconList.square
        },
        {
            value: ElementLength.xxs,
            label: 'xxs'
        },
        {
            value: ElementLength.xs,
            label: 'xs'
        },
        {
            value: ElementLength.s,
            label: 's'
        },
        {
            value: ElementLength.m,
            label: 'm'
        },
        {
            value: ElementLength.l,
            label: 'l'
        },
        {
            value: ElementLength.xl,
            label: 'xl'
        },
        {
            value: ElementLength.xxl,
            label: 'xxl'
        },
        {
            value: ElementLength.full,
            label: 'Full',
            icon: IconList.fullScreen
        },
    ]
});

const heightOptions: Option[] = Object.entries(ElementHeight).map(([k,v]) => ({
    label: k,
    value: v,
}));
export const heightEditor = (def = ElementHeight.m): Editor => ({
    label: 'Height',
    type: EditorTypes.radioButton,
    default: def,
    prop: 'height',
    options: heightOptions
});

export const labelLengthEditor = (def = LabelLength.auto): Editor => ({
    label: 'Label length',
    type: EditorTypes.radioButton,
    default: def,
    prop: 'labelLength',
    options: [
        {
            value: LabelLength.xxs,
            label: 'xxs'
        },
        {
            value: LabelLength.xs,
            label: 'xs'
        },
        {
            value: LabelLength.s,
            label: 's'
        },
        {
            value: LabelLength.m,
            label: 'm'
        },
        {
            value: LabelLength.l,
            label: 'l'
        },
        {
            value: LabelLength.xl,
            label: 'xl'
        },
        {
            value: LabelLength.xxl,
            label: 'xxl'
        },
        {
            value: LabelLength.auto,
            label: 'Auto',
            icon: IconList.auto
        },
    ]
});

const paddingOptions: Option[] = Object.entries(Padding).map(([k,v]) => ({
    label: k,
    value: v,
}));
export const paddingEditor = (def = Padding.m): Editor => ({
    label: 'Padding',
    type: EditorTypes.radioButton,
    default: def,
    prop: 'padding',
    options: paddingOptions
});

export const cursorEditor = (def = Cursors.auto): Editor => ({
    label: 'Cursor type',
    type: EditorTypes.radioButton,
    default: def,
    prop: 'cursor',
    options: [{
        label: 'Auto',
        value: Cursors.auto,
        icon: IconList.auto
    },{
        label: 'Pointer',
        value: Cursors.pointer,
        icon: IconList.pointer
    }]
});

export const fontWeightEditor: Editor = {
    label: 'Font Weight',
    type: EditorTypes.radioButton,
    default: FontWeight.light,
    prop: 'fontWeight',
    options: [{
        label: 'xs',
        value: FontWeight.lighter
    }, {
        label: 's',
        value: FontWeight.light
    }, {
        label: 'm',
        value: FontWeight.semibold
    }, {
        label: 'l',
        value: FontWeight.bold
    }, {
        label: 'xl',
        value: FontWeight.bolder
    }]
};

type borderRadiusEditorType = (
    _default: BorderRadius,
    label?: string,
    prop?: string
) => Editor;

const borderRadiusOptions: Option[] = Object.entries(BorderRadius).map(([k,v]) => ({
    label: k,
    value: v,
}));

export const borderRadiusEditor: borderRadiusEditorType =
(_default: BorderRadius, label = 'Border Radius', prop = 'borderRadius') => ({
    label,
    type: EditorTypes.radioButton,
    default: _default,
    prop,
    options: borderRadiusOptions
} as Editor);

const elementSizeOptions: Option[] = Object.entries(ElementSize).map(([k,v]) => ({
    label: k,
    value: v,
}));
export const fontSizeEditor = (
    def = ElementSize.m,
    label = 'Element Size',
    prop = 'fontSize'
) => ({
    label,
    type: EditorTypes.radioButton,
    default: def,
    prop,
    options: elementSizeOptions
});


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

export const iconEditor = (
    def: IconList | undefined,
    resettable = true,
    prop = 'icon',
    label = 'Icon'
):Editor => ({
    type: EditorTypes.select,
    default: def,
    label,
    prop,
    options: iconOptions,
    resettable,
    filterable: true
});

const sizeOptions: Option[] = Object.entries(IconSize).map(([k,v]) => ({
    label: k,
    value: v,
}));

export const iconSizeEditor = (def = IconSize.xs, prop = 'fontSize'): Editor =>  ({
    label: 'Size',
    type: EditorTypes.radioButton,
    default: def,
    prop,
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
    type: EditorTypes.radioButton,
    default: def,
    label,
    prop: 'elementPosition',
    options: [{
        label: 'Left',
        value: ElementPosition.left,
        icon: IconList.arrowLeft
    }, {
        label: 'Right',
        value: ElementPosition.right,
        icon: IconList.arrowRight
    }]
});

export const bordersAndShadowSection = (): EditorSection => ({
    type: EditorSectionTypes.section,
    label: 'Borders and Shadow',
    editors: [
        shadowEditor(),
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
        labelLengthEditor(),
        labelPositionEditor(defaultPosition)
    ]
});

