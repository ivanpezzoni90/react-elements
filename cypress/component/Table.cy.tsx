import React from 'react';
import { Table } from '../../src/lib';

type TableData = {
    id: number,
    name: string,
    age: number
}
describe('', () => {
    it('', () => {
        cy.mount(<Table<TableData>
            data={[{
                id: 1,
                name: 'Mario',
                age: 21
            }, {
                id: 2,
                name: 'Luigi',
                age: 22
            }]}
            columns={[{
                key: 'id',
                header: 'ID'
            }, {
                key: 'name',
                header: 'Name'
            }, {
                key: 'age',
                header: 'Age'
            }]}
            paginated
            striped
            selectable
            verticalBorders
            selectColumn
        />);
    });
});