/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, Fragment } from '@wordpress/element';
import useWindowWidth from '../../hooks/use-window-width';

/**
 * Internal dependencies
 */
import Pagination from '../pagination/Pagination';
import { ITableHeader, ITable, ITableCell } from './TableInterface';
import { findIndex } from 'lodash';
// import { Input } from '../inputs/Input';

/**
 * Generate Default Props for Table component.
 */
export const defaultTableProps = {
    headers: [],
    rows: [],
    showPagination: true,
    totalItems: 0,
    perPage: 10,
    currentPage: 1,
    checkedAll: false,
    onChangePage: () => {},
    onCheckAll: () => {},
    noDataMessage: __('Sorry ! No data found.', 'jobplace'),
};

/**
 * Get Header Row class name.
 *
 * @param  header  Table Header Definition
 * @param  index   Table Header Index
 * @param  headers
 *
 * @return string
 */
export const getHeaderRowClassName = (
    header: ITableHeader,
    index: number,
    headers: Array<object>
) => {
    let className = `border-b border-gray-lite text-sm px-3 py-4  uppercase ${header.className}`;

    // Add style for first header
    className += `${index === 0 ? ' pl-6 w-0 ' : ' '}`;

    // Add style for last header
    className += headers.length === index + 1 ? 'text-right pr-7' : 'text-left';

    // Add custom style
    className += ` ${header.className ? header.className : ''}`;

    return className;
};

/**
 * Get Body Row class name.
 *
 * @param  cells
 * @param  index       int
 * @param  customClass string|undefined
 *
 * @return string
 */
export const getBodyCellClassName = (
    cells: Array<ITableCell>,
    index: number,
    customClass: string | undefined
) => {
    let className = `border-b border-gray-lite text-sm p-3 text-left`;

    // Add style for first cell
    className += `${index === 0 ? ' pl-6 w-0 ' : ' '}`;

    // Add style for last cell
    className +=
        cells.length === index + 1
            ? 'text-right pr-7 '
            : 'text-center md:text-left ';

    // Add custom class
    className += typeof customClass !== 'undefined' ? customClass : '';

    return className;
};

/**
 * Table Component.
 *
 * Handles table component rendering.
 *
 * @param  props
 */
const Table = (props: ITable) => {
    const {
        headers,
        rows,
        showPagination,
        totalItems,
        perPage,
        onChangePage,
        currentPage,
        checkedAll,
        onCheckAll,
        noDataMessage,
        responsiveColumns = [],
    } = props;
    // const isChecked = typeof checkedAll === 'boolean' ? checkedAll : false;

    const width = useWindowWidth();
    const isMobile = width < 600;

    const tableHeaders =
        isMobile && responsiveColumns.length
            ? headers.filter((header) => responsiveColumns.includes(header.key))
            : headers;

    const rowCellsForMobile = (cells: Array<ITableCell>) => {
        return isMobile && responsiveColumns.length
            ? cells.filter((cell) => responsiveColumns.includes(cell.key))
            : cells;
    };

    const [expandedRows, setExpandedRows] = useState<Array<number>>([]);
    const toggleRow = (index: number) => {
        if (expandedRows.includes(index)) {
            const updatedRows = [...expandedRows];
            updatedRows.splice(findIndex(expandedRows, index), 1);
            setExpandedRows(updatedRows);
        } else {
            setExpandedRows([...expandedRows, index]);
        }
    };

    return (
        <>
            <div className="table-outer">
                <table className="table-auto border-collapse border border-gray-lite bg-white mb-2 w-full">
                    <thead>
                        <tr className="h-12">
                            {tableHeaders.map((header, index) => (
                                <th
                                    key={header.key}
                                    className={getHeaderRowClassName(
                                        header,
                                        index,
                                        headers
                                    )}
                                >
                                    {header.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={headers.length}>
                                    <div className="text-center text-gray-dark p-3">
                                        <p>{noDataMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {rows.map((row, index: number) => (
                            <Fragment key={index}>
                                <tr
                                    key={index}
                                    className={`h-12 ${
                                        isMobile ? 'cursor-pointer' : ''
                                    }`}
                                    onClick={() => {
                                        if (isMobile) {
                                            toggleRow(index);
                                        }
                                    }}
                                >
                                    {rowCellsForMobile(row.cells).map(
                                        (
                                            cell: ITableCell,
                                            indexCell: number
                                        ) => (
                                            <td
                                                key={indexCell}
                                                className={getBodyCellClassName(
                                                    row.cells,
                                                    indexCell,
                                                    cell.className
                                                )}
                                            >
                                                {cell.value}
                                            </td>
                                        )
                                    )}
                                </tr>

                                {expandedRows.includes(index) && (
                                    <tr key={'expand-row-' + index}>
                                        <td colSpan={responsiveColumns.length}>
                                            {row.cells.map(
                                                (cell, indexCell) => {
                                                    if (
                                                        !responsiveColumns.includes(
                                                            cell.key
                                                        )
                                                    ) {
                                                        return (
                                                            <div
                                                                key={indexCell}
                                                                className="p-1.5 border-b border-solid border-slate-50 ml-5"
                                                            >
                                                                <p>
                                                                    <b>
                                                                        {
                                                                            headers.filter(
                                                                                (
                                                                                    header
                                                                                ) =>
                                                                                    header.key ===
                                                                                    cell.key
                                                                            )[0]
                                                                                .title
                                                                        }{' '}
                                                                        &nbsp;
                                                                    </b>
                                                                </p>
                                                                <div>
                                                                    {cell.value}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                }
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            {showPagination && (
                <Pagination
                    perPage={
                        typeof perPage !== 'undefined'
                            ? perPage
                            : defaultTableProps.perPage
                    }
                    currentPage={
                        typeof currentPage !== 'undefined'
                            ? currentPage
                            : defaultTableProps.currentPage
                    }
                    total={
                        typeof totalItems !== 'undefined'
                            ? totalItems
                            : defaultTableProps.totalItems
                    }
                    paginate={(page: number) => {
                        typeof onChangePage === 'function'
                            ? onChangePage(page)
                            : '';
                    }}
                />
            )}
        </>
    );
};

Table.defaultProps = defaultTableProps;

export default Table;
