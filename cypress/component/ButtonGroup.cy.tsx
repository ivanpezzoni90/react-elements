import React from 'react';
import { Button, ButtonGroup } from '../../src/lib';

describe('', () => {
    it('', () => {
        cy.mount(<ButtonGroup>
            <Button label="one" />
            <Button label="two" />
            <Button label="two1" />
            <Button label="two2" />
            <Button label="two3" />
            <Button label="three" />
        </ButtonGroup>);
    });
});