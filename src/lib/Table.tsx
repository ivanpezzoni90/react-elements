import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';
import { IconList } from './constants/icons';
import { allColors } from './constants/colors';
import { Padding } from './types';
import { CheckboxElement } from './Checkbox';

type TableColumn<T> = {
  key: keyof T;
  header: string;
  width?: string;
};

type TableProps<T extends { id: number }> = {
    data: T[];
    columns: TableColumn<T>[];
    sortable?: boolean;
    selectable?: boolean;
    selectedColor?: string;
    hoverColor?: string;
    striped?: boolean;
    stripedColor?: string;
    paginated?: boolean;
    verticalBorders?: boolean;
    selectColumn?: boolean;
    itemsPerPage: number | string;
};

const TableContainer = styled.div`
    padding: ${Padding.l};
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
`;

const THead = styled.thead`
    text-align: left;
`;

const TableHeader = styled.th<{ width?: string }>`
    padding: ${Padding.s};
    border-bottom: 2px solid ${allColors['Quick Silver']};
    cursor: pointer;
    width: ${(props) => props.width || 'auto'};
`;

const TableHeaderContent = styled.div`
    position: relative;

    & > div {
        position: absolute;
        top: 0;
        right: 0;
    }
`;

const CurrentPage = styled.span`
    padding: ${Padding.s};
`;

interface TableRowInterface {
    hoverColor?: string;
    selectedColor?: string;
    stripedColor?: string;
    striped?: boolean;
    selectable?: boolean;
    verticalBorders?: boolean;
}
const TableRow = styled.tr<TableRowInterface>`
    ${props => props.striped ? `
        &:nth-child(even) {
            background-color: ${props.stripedColor};
        }
    ` : ''}

    &:hover {
        background-color: ${props => props.hoverColor};
    }

    ${props => props.selectable ? `
        &.selected {
            background-color: ${props.selectedColor};
        }
    ` : ''}

    ${props => props.verticalBorders
        ? `
            > :first-child {
                border-left: 1px solid ${allColors['Silver Sand']};
                border-right: 1px solid ${allColors['Silver Sand']};
            }
            > :not(:first-child){
                border-right: 1px solid ${allColors['Silver Sand']};
            }
        `
        : ''}
`;

const TableCell = styled.td<{ width?: string }>`
    padding: ${Padding.s};
    border-bottom: 1px solid ${allColors['Silver Sand']};
    width: ${(props) => props.width || 'auto'}; // Set width based on the prop or 'auto' if not provided
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: ${Padding.l};
`;

const Table = <T extends { id: number }>({
    data,
    columns,
    sortable,
    selectable,
    selectedColor,
    hoverColor,
    striped,
    stripedColor,
    paginated,
    verticalBorders,
    selectColumn,
    itemsPerPage = 10
}: TableProps<T>
) => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectAllRows, setSelectAllRows] = useState(false); // State to manage checkbox in the header

    const handleRowClick = useCallback((rowId: number) => {
        if (!selectable) return;

        const isSelected = selectedRows.includes(rowId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter((id) => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    }, [selectable, selectedRows]);

    const handleHeaderClick = useCallback((columnKey: keyof T) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    }, [sortColumn, sortDirection]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    // Sort the data based on the current sort column and direction
    const sortedData = useMemo(() => {
        if (!sortable) return data;

        return data.sort((a, b) => {
            if (sortColumn) {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];
    
                if (aValue < bValue) {
                    return sortDirection === 'asc' ? -1 : 1;
                } else if (aValue > bValue) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
            }
    
            return 0;
        });
    }, [data, sortColumn, sortDirection, sortable]);

    const parsedItemPerPage = typeof itemsPerPage === 'number'
        ? itemsPerPage
        : parseInt(itemsPerPage, 10);

    // Paginate the data
    const startIndex = (currentPage - 1) * parsedItemPerPage;
    const endIndex = startIndex + parsedItemPerPage;
    const paginatedData = paginated ? sortedData.slice(startIndex, endIndex) : sortedData;
    const lastPage = Math.floor(data.length / parsedItemPerPage) + 1;

    const handleSelectAllRows = (value: boolean) => {
        setSelectAllRows(value);

        if (value) {
            const allRowIds = data.map((row) => row.id);
            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowCheckboxChange = (rowId: number) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(rowId)) {
                return prevSelectedRows.filter((id) => id !== rowId);
            } else {
                return [...prevSelectedRows, rowId];
            }
        });
    };

    return (
        <TableContainer>
            <StyledTable>
                <THead>
                    <tr>
                        {selectColumn && (
                            <TableHeader
                                width="2em"
                            >
                                <CheckboxElement
                                    checked={selectAllRows}
                                    onChange={handleSelectAllRows}
                                />
                            </TableHeader>
                        )}
                        {columns.map((column, i) => (
                            <TableHeader
                                key={`thead-c-${column.header}-${i}`}
                                onClick={() => handleHeaderClick(column.key)}
                            >
                                <TableHeaderContent>
                                    {column.header}
                                    {sortColumn === column.key && (
                                        <Icon
                                            icon={sortDirection === 'asc'
                                                ? IconList.sortAscending
                                                : IconList.sortDescending
                                            }
                                        />
                                    )}
                                </TableHeaderContent>
                            </TableHeader>
                        ))}
                    </tr>
                </THead>
                <tbody>
                    {paginatedData.map((row) => (
                        <TableRow
                            key={row.id}
                            onClick={() => handleRowClick(row.id)}
                            className={selectedRows.includes(row.id) ? 'selected' : ''}
                            hoverColor={hoverColor}
                            selectedColor={selectedColor}
                            stripedColor={stripedColor}
                            striped={striped}
                            selectable={selectable}
                            verticalBorders={verticalBorders}
                        >
                            {selectColumn && (
                                <TableCell
                                    width="2em"
                                >
                                    <CheckboxElement
                                        checked={selectedRows.includes(row.id)}
                                        onChange={() => handleRowCheckboxChange(row.id)}
                                    />
                                </TableCell>
                            )}
                            {columns.map((column, i) => (
                                <TableCell
                                    width={column.width} 
                                    key={`tbody-c-${column.header}-${i}`}
                                >
                                    {row[column.key] as unknown as ReactNode}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </tbody>
            </StyledTable>
            {paginated ? (
                <PaginationContainer>
                    <Icon
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(1)}
                        icon={IconList.outlineDoubleLeft}
                        padding={Padding.s}
                    />
                    <Icon
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        icon={IconList.outlineLeft}
                        padding={Padding.s}
                    />
                    <CurrentPage>{currentPage}</CurrentPage>
                    <Icon
                        disabled={endIndex >= data.length}
                        onClick={() => handlePageChange(currentPage + 1)}
                        icon={IconList.outlineRight}
                        padding={Padding.s}
                    />
                    <Icon
                        disabled={endIndex >= data.length}
                        onClick={() => handlePageChange(lastPage)}
                        icon={IconList.outlineDoubleRight}
                        padding={Padding.s}
                    />
                </PaginationContainer>
            ): null}
        </TableContainer>
    );
};

Table.defaultProps = {
    data: [],
    columns: [],
    sortable: true,
    selectable: false,
    selectColumn: false,
    selectedColor: allColors['Silver Sand'],
    hoverColor: allColors['Platinum'],
    striped: false,
    stripedColor: allColors['Cultured'],
    paginated: false,
    verticalBorders: false,
    itemsPerPage: 10
};

export {Table};
export type { TableProps };
