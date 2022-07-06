import { allColors } from '../constants/colors';

type RgbFromHexType = (colorCode: string) => {
    r: number,
    g: number,
    b: number
};

export const darkOrLightColor = (colorCode: string): string => {
    const {
        r, g, b
    } = rgbFromHex(colorCode);

    if ((r*0.299 + g*0.587 + b*0.114) > 186) {
        return 'light';
    } 
    return 'dark';
};

export const fontColorFromBackground = (colorCode: string): string => {
    return darkOrLightColor(colorCode) === 'light'
        ? allColors['Davys Grey']
        : allColors['Cultured'];
};

export const rgbFromHex: RgbFromHexType = (colorCode) => {
    const code = colorCode.slice(1);
 
    const num = parseInt(code, 16);

    return {
        r: (num >> 16),
        g: ((num >> 8) & 0x00FF),
        b: (num & 0x0000FF),
    };
};

/**
 * Lighten or darken the given color by a specified amount
 * 
 * Use amount positive to lighten color, negative to darken
 * 
 * @param {String} colorCode The color to transform
 * @param {Number} amount Higher (positive) the amount, lighter the result color,
 * Higher (negative) the amount, darker the result color
 * @returns {String} The color lighter or darker
 */
export function lightenDarkenColor(colorCode: string, amount: number) {
    const code = colorCode.slice(1);
 
    const num = parseInt(code, 16);

    let red = (num >> 16) + amount;
 
    if (red > 255) {
        red = 255;
    } else if (red < 0) {
        red = 0;
    }
 
    let blue = ((num >> 8) & 0x00FF) + amount;
 
    if (blue > 255) {
        blue = 255;
    } else if (blue < 0) {
        blue = 0;
    }
 
    let green = (num & 0x0000FF) + amount;
 
    if (green > 255) {
        green = 255;
    } else if (green < 0) {
        green = 0;
    }
 
    return '#' + (green | (blue << 8) | (red << 16)).toString(16);
}