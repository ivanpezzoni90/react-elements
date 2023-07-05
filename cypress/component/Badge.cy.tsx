import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../src/lib';
import { Badge } from '../../src/lib/Badge';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { IconList } from '../../src/lib/constants/icons';
import { BadgePositions, ElementSize, IconSize } from '../../src/lib/types';
import { verifyElementRgbColorProp, verifyElementRgbColor } from '../modules/assertions';
import { selectBadgeWrapper, selectBadgeElement } from '../modules/selectors';
import { log } from '../modules/utils';

const BadgeTestContainer = styled.div`
    padding: 3em;
`;

describe('Badge', () => {

    it('Bdage props', () => {
        cy.mount(
            <BadgeTestContainer>
                <Badge>
                    <Icon
                        icon={IconList.cog}
                        fontSize={IconSize.xl}
                    />
                </Badge>
            </BadgeTestContainer>
        );

        log('Verify default props');

        // background
        verifyElementRgbColorProp(selectBadgeElement(), allRgbColors['Teal'], 'background-color');
        // color
        verifyElementRgbColor(selectBadgeElement(), allRgbColors['White']);
        // content
        selectBadgeElement().should('have.text', '');
        // size
        selectBadgeElement().should('have.css', 'font-size').and('eq', ElementSize.xs);
        // children
        selectBadgeWrapper().children().should('have.length', 2);
        // position
        selectBadgeElement().should('have.css', 'top').and('eq', '0px');
        selectBadgeElement().should('have.css', 'right').and('eq', '0px');
        // TODO: Unstable transform prop
        // selectBadgeElement().should('have.css', 'transform').and('eq', 'matrix(1, 0, 0, 1, 4.25, -4.5)');

        // height
        selectBadgeElement().should('have.css', 'height').and('eq', '9px'); // Height is 0.75em because content is void

        log('Verify default behavior when content is 0');
        cy.mount(
            <BadgeTestContainer>
                <Badge
                    content="0"
                >
                    <Icon
                        icon={IconList.cog}
                        fontSize={IconSize.xl}
                    />
                </Badge>
            </BadgeTestContainer>
        );
        selectBadgeElement().should('not.exist');


        log('Verify default max value');
        cy.mount(
            <BadgeTestContainer>
                <Badge
                    content="444"
                >
                    <Icon
                        icon={IconList.cog}
                        fontSize={IconSize.xl}
                    />
                </Badge>
            </BadgeTestContainer>
        );
        selectBadgeElement().should('have.text', '99+');


        cy.mount(
            <BadgeTestContainer>
                <Badge
                    content="4"
                    background={allColors['Teal']}
                    color={allColors['Platinum']}
                    size={ElementSize.m}
                    position={BadgePositions.bottomLeft}
                    outline
                    className="additional-class"
                >
                    <Icon
                        icon={IconList.cog}
                        fontSize={IconSize.xl}
                    />
                </Badge>
            </BadgeTestContainer>
        );
        log('Verify custom props');
        
        // background
        verifyElementRgbColorProp(selectBadgeElement(), allRgbColors['Teal'], 'background-color');
        // color
        verifyElementRgbColor(selectBadgeElement(), allRgbColors['Platinum']);
        // content
        selectBadgeElement().should('have.text', '4');
        // size
        selectBadgeElement().should('have.css', 'font-size').and('eq', ElementSize.m);
        // position
        selectBadgeElement().should('have.css', 'bottom').and('eq', '0px');
        selectBadgeElement().should('have.css', 'left').and('eq', '0px');
        selectBadgeElement().should('have.css', 'transform').and('eq', 'matrix(1, 0, 0, 1, -12, 12)');
        // outline
        selectBadgeElement().should('have.css', 'outline-style').and('eq', 'solid');
        // className
        selectBadgeWrapper().should('have.class', 'additional-class');
        // height
        selectBadgeElement().should('have.css', 'height').and('eq', '24px');

        cy.mount(
            <BadgeTestContainer>
                <Badge
                    content="55"
                    maxValue={50}
                >
                    <Icon
                        icon={IconList.cog}
                        fontSize={IconSize.xl}
                    />
                </Badge>
            </BadgeTestContainer>
        );
        log('Verify custom max value');
        selectBadgeElement().should('have.text', '50+');
    
        cy.mount(
            <BadgeTestContainer>
                <Badge
                    showBadge={false}
                >
                    <Icon
                        icon={IconList.cog}
                        fontSize={IconSize.xl}
                    />
                </Badge>
            </BadgeTestContainer>
        );
        log('Verify showBadge');
        selectBadgeElement().should('not.exist');


        cy.mount(
            <BadgeTestContainer>
                <Badge
                    content="0"
                    showWhenZero
                >
                    <Icon
                        icon={IconList.cog}
                        fontSize={IconSize.xl}
                    />
                </Badge>
            </BadgeTestContainer>
        );
        log('Verify showWhenZero');
        selectBadgeElement().should('have.text', '0');

        cy.mount(
            <BadgeTestContainer>
                <Badge
                    content="40"
                    showAsDot
                >
                    <Icon
                        icon={IconList.cog}
                        fontSize={IconSize.xl}
                    />
                </Badge>
            </BadgeTestContainer>
        );
        log('Verify showAsDot');
        selectBadgeElement().should('have.css', 'height').and('eq', '9px');
    });
});