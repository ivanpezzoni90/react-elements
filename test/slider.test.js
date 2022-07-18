import {
    calculateTooltipPosition,
    getDefaultValue,
    getStepValue,
    parseUnavailableValues
} from '../src/lib/helpers/sliderHelpers';

test('getStepValue', () => {
    // Case i = 0 returns min
    expect(getStepValue(
        0,  // min
        20, // step
        0   // i
    )).toEqual(0);
    // Case i > 0 returns calculated step value based on i
    expect(getStepValue(
        0,  // min
        20, // step
        2   // i
    )).toEqual(40);
    // Case i > 0 returns calculated step value based on i
    expect(getStepValue(
        0,  // min
        10, // step
        3   // i
    )).toEqual(30);
});

test('getDefaultValue', () => {
    // Case valueFromProps defined
    expect(getDefaultValue(
        42, // valueFromProps
        0,  // min
        []  // options
    )).toEqual(42);
    // Case valueFromProps null, first option returned
    expect(getDefaultValue(
        null, // valueFromProps
        0,  // min
        [{label: 'foo', value: 'bar'}]  // options
    )).toEqual('foo');
    // Case valueFromProps empty string, min returned
    expect(getDefaultValue(
        null, // valueFromProps
        0,  // min
        []  // options
    )).toEqual(0);
});

test('parseUnavailableValues', () => {
    // Case step below zero and max < min
    expect(parseUnavailableValues(
        20, // min
        10, // max
        -20 // step
    )).toEqual({
        newStep: 1,
        newMax: 20,
        newMin: 20
    });
    // Case max > min, step > 0
    expect(parseUnavailableValues(
        20, // min
        30, // max
        5 // step
    )).toEqual({
        newStep: 5,
        newMax: 30,
        newMin: 20
    });
});

test('calculateTooltipPosition', () => {
    // Case value number
    expect(calculateTooltipPosition(
        0,  // min
        20, // max
        5   // value
    )).toEqual('calc(25% + (4.25px))');
    
    // Case value string
    expect(calculateTooltipPosition(
        -20,  // min
        20, // max
        '15'   // value
    )).toEqual('calc(87.5% + (-5.125px))');

    // Other values
    expect(calculateTooltipPosition(
        0,  // min
        5, // max
        '4'   // value
    )).toEqual('calc(80% + (-4px))');

    expect(calculateTooltipPosition(
        0,  // min
        100, // max
        100   // value
    )).toEqual('calc(100% + (-7px))');
    expect(calculateTooltipPosition(
        0,  // min
        100, // max
        0   // value
    )).toEqual('calc(0% + (8px))');


});

