import { setAlphaToHex } from './colorHelpers';

export const getClickAnimationStyles = (
    showAnimation: boolean,
    color: string,
    alpha = 20
) => `
    position: relative;
    overflow: hidden;
    ${showAnimation
        ? (`
            &:after {
                content: "";
                background: ${setAlphaToHex(color,alpha)};

                display: block;
                position: absolute;
                padding-top: 300%;
                padding-left: 350%;
                margin-left: -20px!important;
                margin-top: -120%;
                opacity: 0;
                transition: all 0.8s
            }
            :active:after {
                padding: 0;
                margin: 0;
                opacity: 1;
                transition: 0s
            }
        `)
        : ''}
`;