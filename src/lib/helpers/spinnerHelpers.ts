import { SpinnerSteps } from '../types';

export const buildKeyframesAnimation = (steps: SpinnerSteps) => {
    const numberOfSteps = (steps - 1);
    const degreeStep = 360 / numberOfSteps;
    const percentStep = 100 / numberOfSteps;

    let animationSteps = '';

    Array.from(Array(numberOfSteps)).forEach((e, i) => {
        animationSteps = `${animationSteps}
        ${percentStep * i}% {
            transform: rotate(${degreeStep * i}deg);
        }
        `;
    });

    return `
    @keyframes spin-animation {
    ${animationSteps}
        100% {
            transform: rotate(359deg);
        }
    }`;
};