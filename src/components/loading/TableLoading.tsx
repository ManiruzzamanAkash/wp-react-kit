/**
 * External dependencies
 */
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getHeaderRowClassName } from '../table/Table';
import { ITableHeader, ITableLoading } from '../table/TableInterface';
import useWindowWidth from '../../hooks/use-window-width';

const TableLoading = ({
    headers = [],
    count = 10,
    showPagination = true,
    hasCheckbox = true,
    responsiveColumns = [],
}: ITableLoading) => {
    const width = useWindowWidth();
    const isMobile = width < 600;
    const tableHeaders =
        isMobile && responsiveColumns.length
            ? headers.filter((header) => responsiveColumns.includes(header.key))
            : headers;

    const getTableRows = () => {
        const rows = [];
        for (let i = 0; i < count; i++) {
            rows.push(
                <tr key={i} className="h-12">
                    {tableHeaders.map((header: ITableHeader, index: number) => (
                        <Fragment key={index}>
                            {index === 0 && hasCheckbox ? (
                                <td className={`border-0`}></td>
                            ) : (
                                <>
                                    <td
                                        key={header.key}
                                        className={`${getHeaderRowClassName(
                                            header,
                                            index,
                                            headers
                                        )} border-0`}
                                    >
                                        <span
                                            className={`h-2 w-12 bg-gray ${
                                                index === headers.length - 1
                                                    ? 'text-right'
                                                    : ''
                                            }`}
                                        >
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </span>
                                    </td>
                                </>
                            )}
                        </Fragment>
                    ))}
                </tr>
            );
        }
        return rows;
    };

    return (
        <>
            <div className="bg-white shadow-xs rounded-sm">
                <table className="animate-pulse table-auto border-collapse border border-gray-lite bg-white mb-2 w-full">
                    <thead>
                        <tr className="h-12">
                            {tableHeaders.map(
                                (header: ITableHeader, index: number) => (
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
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>{getTableRows()}</tbody>
                </table>
            </div>

            {/* View Pagination */}
            {showPagination && (
                <div className="flex mt-5">
                    <div className="flex-1 text-left">
                        <div className="h-4 w-32 bg-gray"></div>
                    </div>
                    <div className="flex-1">
                        <div className="flex text-right justify-end">
                            <div className="flex-none bg-gray h-8 w-8 border-gray border-1 border-solid mr-2"></div>
                            <div className="flex-none bg-gray h-8 w-8 border-gray border-1 border-solid mr-2"></div>
                            <div className="flex-none bg-gray h-8 w-8 border-gray border-1 border-solid mr-2"></div>
                            <div className="flex-none bg-gray h-8 w-8 border-gray border-1 border-solid mr-2"></div>
                            <div className="flex-none bg-gray h-8 w-8 border-gray border-1 border-solid mr-2"></div>
                            <div className="flex-none bg-gray h-8 w-8 border-gray border-1 border-solid mr-2"></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TableLoading;
