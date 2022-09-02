import { Option } from '../types';
import { hexToRgb } from './colorHelpers';

// Calculate current step value (number) when needed
export const getStepValue = (min: number, step: number, i: number) => {
    if (i === 0) {
        return min;
    }
    return min + (step * (i));
};

// Get slider defaut value
export const getDefaultValue = (
    valueFromProps: string | number,
    min: number,
    options: Array<Option>
): string | number =>
    // When value from props is not defined, choose first option when options are defined, choose min value instead
    !valueFromProps || valueFromProps === ''
        ? options && options.length > 0
            ? options[0].label
            : min
        : valueFromProps;


// Parse min/max/step values
export const parseUnavailableValues = (
    min: number,
    max: number,
    step: number
) => {
    // Parse step value when below 0
    const newStep = step <= 0 ? 1 : step;
    // Parse max value when minor than min value
    const newMax = max < min ? min : max;

    return {
        newStep,
        newMax,
        newMin: min
    };
};

// Calculate floating tooltip position based on current input range cursor position
export const calculateTooltipPosition = (min: number, max: number, value: string | number) => {
    const parsedValue = typeof value === 'string' ? parseInt(value, 10) : value;
    const newVal = Number(((parsedValue - min) * 100) / (max - min));
    const left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    return left;
};

// Calculate outline color with alpha
export function getOutlineColor(color: string, opacity = '0.5'): string {
    const rgb = hexToRgb(color);
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
}
