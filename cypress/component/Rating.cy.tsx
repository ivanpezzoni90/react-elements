import React from 'react';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { IconList } from '../../src/lib/constants/icons';
import { Rating } from '../../src/lib/Rating';
import { BorderRadius, IconSize, LabelLength, LabelPositions } from '../../src/lib/types';
import { checkCustomElementProps, checkDefaultElementProps } from '../modules/actions';
import { verifyElementRgbColor } from '../modules/assertions';
import {
    selectIcon,
    selectRatingElement,
    selectRatingElementNthIcon,
    selectRatingElementNthItem,
    selectRatingLabel,
    selectRatingWrapper,
} from '../modules/selectors';
import { log } from '../modules/utils';

const mouseoverNthItem = (nth: number, position?: 'left' | 'right') => {
    return selectRatingElementNthItem(nth)
        .trigger('mouseover', position);
};
const realMouseoverNthItem = (nth: number, position?: 'left' | 'right' | 'center') => {
    return selectRatingElementNthItem(nth)
        .realHover({ position, pointer: 'mouse' });
};
const realClickNthItem = (nth: number, position?: 'left' | 'right' | 'center') => {
    return selectRatingElementNthItem(nth)
        .realClick({ position, pointer: 'mouse' });
};

const verifyNthIconColor = (nth: number, color: string) => {
    verifyElementRgbColor(
        selectIcon(() => selectRatingElementNthIcon(nth))
        , color
    );
};

describe('Rating', () => {

    it('Rating props', () => {
        cy.mount(<Rating
        />);

        log('Verify default rating component');
        checkDefaultElementProps(
            selectRatingWrapper,
            selectRatingLabel,
            {
                labelPosition: 'row',
                labelLength: 'none',
            }
        );

        selectRatingElement().should('have.attr', 'data-value').and('eq', '0');

        log('Verify default colors when not hovered');
        verifyNthIconColor(0, allRgbColors['Dim Gray']);
        verifyNthIconColor(1, allRgbColors['Dim Gray']);
        verifyNthIconColor(2, allRgbColors['Dim Gray']);
        verifyNthIconColor(3, allRgbColors['Dim Gray']);
        verifyNthIconColor(4, allRgbColors['Dim Gray']);

        log('Verify hovered items and previous items are colored');
        mouseoverNthItem(0);
        verifyNthIconColor(0, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(1, allRgbColors['Dim Gray']);

        mouseoverNthItem(1);
        verifyNthIconColor(0, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(1, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(2, allRgbColors['Dim Gray']);
        
        mouseoverNthItem(3);
        verifyNthIconColor(0, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(1, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(2, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(3, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(4, allRgbColors['Dim Gray']);

        cy.mount(<Rating
            defaultValue={3}
        />);
        log('Verify rating with passed value');

        log('Verify first 3 icons are colored and 4th is not');
        verifyNthIconColor(0, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(1, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(2, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(3, allRgbColors['Dim Gray']);

        log('Hover second item and verify the other icons are no more colored');
        mouseoverNthItem(1);
        verifyNthIconColor(0, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(1, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(2, allRgbColors['Dim Gray']);
        verifyNthIconColor(3, allRgbColors['Dim Gray']);


        log('Verify on mouse leave, the selected rating colors are back');
        selectRatingElementNthItem(1).trigger('mouseout');

        verifyNthIconColor(0, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(1, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(2, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(3, allRgbColors['Dim Gray']);

        log('Verify selecting a new rating and verify colors');
        mouseoverNthItem(3).click();
        verifyNthIconColor(0, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(1, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(2, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(3, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(4, allRgbColors['Dim Gray']);

        log('Verify highlight only selected');
        cy.mount(<Rating
            defaultValue={2}
            highlightSelectedOnly
        />);

        log('Verify only the selected icon is colored');
        verifyNthIconColor(0, allRgbColors['Dim Gray']);
        verifyNthIconColor(1, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(3, allRgbColors['Dim Gray']);
        verifyNthIconColor(4, allRgbColors['Dim Gray']);
        
        mouseoverNthItem(3);
        verifyNthIconColor(0, allRgbColors['Dim Gray']);
        verifyNthIconColor(1, allRgbColors['Dim Gray']);
        verifyNthIconColor(2, allRgbColors['Dim Gray']);
        verifyNthIconColor(3, allRgbColors['Cyber Yellow']);
        verifyNthIconColor(4, allRgbColors['Dim Gray']);

        log('Verify custom props');
        cy.mount(<Rating
            className="additional-class"
            length={10}
            label="Name"
            shadow={false}
            labelColor={allColors['Teal']}
            borderColor={allColors['Teal']}
            labelPosition={LabelPositions.vertical}
            labelLength={LabelLength.l}
            showBorders
            borderRadius={BorderRadius.l}

            iconSelected={IconList.heartFill}
            iconNotSelected={IconList.heart}
            iconHalf={IconList.heartHalf}
            colorSelected={allColors['Firebrick']}
            colorNotSelected={allColors['Teal']}
            size={IconSize.xl}
        />);

        checkCustomElementProps(
            selectRatingWrapper,
            selectRatingLabel,
            {
                length: '474px',
                labelLength: `${parseFloat(LabelLength.l)*16}px`,
                labelPosition: 'column'
            }
        );
        selectRatingWrapper().should('have.class', 'additional-class');

        log('Verify not selected color');
        verifyNthIconColor(0, allRgbColors['Teal']);

        log('Verify selected color');
        mouseoverNthItem(0);
        verifyNthIconColor(0, allRgbColors['Firebrick']);

        log('Verify icon size');
        selectIcon(() => selectRatingElementNthIcon(1))
            .should('have.css', 'font-size')
            .and('eq', IconSize.xl);

        log('Verify hovered icon scale');
        selectRatingElementNthItem(0)
            .should('have.css', 'transform')
            .and('eq', 'matrix(1.2, 0, 0, 1.2, 0, 0)');

        log('Verify half rating');
        cy.mount(<Rating
            displayHalfValue
        />);

        realMouseoverNthItem(0, 'center');
        realClickNthItem(0, 'center');
        selectRatingElement().should('have.attr', 'data-value').and('eq', '0.5');
    });

    it('Rating callbacks', () => {
        log('Verify onchange called');
        const onChange = cy.stub().as('onChangeHandler');
        cy.mount(<Rating
            onChange={onChange}
        />);
        selectRatingElementNthItem(2).click();
        cy.get('@onChangeHandler').should('have.been.called');

        log('Verify onchange values');
        let count = 0;
        cy.mount(<Rating
            onChange={(newValue) => {
                if (count === 0) expect(newValue).eq(2);
                else expect(newValue).eq(4);
                count++;
            }}
        />);
        selectRatingElementNthItem(1).click();
        selectRatingElementNthItem(3).click();


        log('Verify onchange values with half ratings');
        cy.mount(<Rating
            displayHalfValue
            onChange={(newValue) => {
                expect(newValue).eq(0.5);
            }}
        />);

        realMouseoverNthItem(0, 'center');
        realClickNthItem(0, 'center');
    });
});