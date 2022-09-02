import { allColors } from '../constants/colors';

type HexToRgbType = (colorCode: string) => {
    r: number,
    g: number,
    b: number
};

export const darkOrLightColor = (colorCode: string): string => {
    const {
        r, g, b
    } = hexToRgb(colorCode);

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

export const hexToRgb: HexToRgbType = (colorCode) => {
    const code = colorCode.slice(1);
 
    const num = parseInt(code, 16);

    return {
        r: (num >> 16),
        g: ((num >> 8) & 0x00FF),
        b: (num & 0x0000FF),
    };
};

/**
 * Set given alpha percentage to a hex color code
 * 
 * @param {String} colorCode The color to transform
 * @param {Number} alphaPercentage The alpha percentage to apply
 * @returns {String} The result color
 */
export const setAlphaToHex = (colorCode: string, alphaPercentage: number) =>
    `${colorCode}${alphaPercentage < 10
        ? `0${alphaPercentage}`
        : alphaPercentage}
    `;

export function shadeColor(color: string, percent: number) {

    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = R * (100 + percent) / 100;
    G = G * (100 + percent) / 100;
    B = B * (100 + percent) / 100;

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    const RR = ((R.toString(16).length==1)?'0'+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length==1)?'0'+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length==1)?'0'+B.toString(16):B.toString(16));

    return '#'+RR+GG+BB;
}

/**
 * Lighten or darken the given color by a specified amount
 * 
 * Use amount positive to lighten color, negative to darken
 * 
 * @param {String} color The color to transform
 * @param {Number} amount Higher (positive) the amount, lighter the result color,
 * Higher (negative) the amount, darker the result color
 * @returns {String} The color lighter or darker
 */
export function lightenDarkenColor(color: string, amount: number) {
    return `#${color
        .replace(/^#/, '')
        .replace(/../g, color => (
            `0${
                Math.min(
                    255,
                    Math.max(
                        0,
                        parseInt(color, 16) + amount
                    )
                ).toString(16)
            }`
        ).slice(-2))
    }`;
    // return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2));
}
