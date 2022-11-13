/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Pagination from '../pagination/Pagination';
import { ITableHeader, ITable, ITableCell } from './TableInterface';
import { Input } from '../inputs/Input';

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
    className += cells.length === index + 1 ? 'text-right pr-7 ' : 'text-left ';

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
    } = props;
    const isChecked = typeof checkedAll === 'boolean' ? checkedAll : false;

    return (
        <>
            <div className="table-outer overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-lite bg-white mb-2 w-full">
                    <thead>
                        <tr className="h-12">
                            {headers.map((header, index) => (
                                <th
                                    key={header.key}
                                    className={getHeaderRowClassName(
                                        header,
                                        index,
                                        headers
                                    )}
                                >
                                    {header.key === 'checkbox' ? (
                                        <Input
                                            type="checkbox"
                                            value={isChecked ? '1' : '0'}
                                            onChange={() =>
                                                typeof onCheckAll ===
                                                    'function' &&
                                                onCheckAll(!isChecked)
                                            }
                                        />
                                    ) : (
                                        header.title
                                    )}
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
                        {rows.map((row, index) => (
                            <tr key={index} className="h-12">
                                {row.cells.map(
                                    (cell: ITableCell, indexCell: number) => (
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
