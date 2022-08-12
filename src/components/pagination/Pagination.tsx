/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import ReactPaginate from 'react-paginate';

interface IPagination {
    /**
     * How many items per page.
     */
    perPage: number;

    /**
     * Total items.
     */
    total: number;

    /**
     * Current page.
     */
    currentPage: number;

    /**
     * Paginate handler.
     */
    paginate: Function;
}

const defaultProps = {
    perPage: 10,
    total: 0,
    currentPage: 1,
    paginate: () => {},
};

const Pagination = (props: IPagination) => {
    const { perPage, total, paginate, currentPage } = props;
    const [current, setCurrent] = useState(currentPage);
    const boxClassName = `relative inline-flex items-center border text-sm font-medium`;
    const activeClassName = `bg-white border-slate-300 text-primary hover:text-primary-dark hover:bg-blue-200`;
    const inactiveClassName = `bg-white border-slate-300 text-gray-500 hover:bg-blue-200 hover:text-primary-dark`;
    const totalPage = Math.ceil(total / perPage);

    return (
        <div className="py-2 flex">
            <div className="flex-1 text-left">
                <p className="text-sm text-gray-700">
                    <span>
                        <span className="font-medium"> {total} </span> items -{' '}
                    </span>
                    <span>
                        Page <span className="font-medium"> {current} </span>
                    </span>
                    {totalPage > 0 && (
                        <span>
                            of{' '}
                            <span className="font-medium"> {totalPage} </span>
                        </span>
                    )}
                </p>
            </div>

            {totalPage > 1 && (
                <nav className="flex flex-1 justify-end justify-items-end">
                    <ul className="flex pl-0 rounded list-none flex-wrap">
                        <li>
                            <ReactPaginate
                                pageCount={Math.ceil(total / perPage)}
                                onPageChange={(page) => {
                                    paginate(page.selected + 1);
                                    setCurrent(page.selected + 1);
                                }}
                                initialPage={current - 1}
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={`${boxClassName} ${inactiveClassName} `}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                containerClassName={'flex'}
                                activeClassName={`${boxClassName} ${activeClassName} `}
                                pageClassName={`${boxClassName} ${inactiveClassName} `}
                                pageLinkClassName="px-4 py-2 text-[#cdcccc]"
                                activeLinkClassName="px-4 py-2 text-primary-dark"
                                nextClassName={`${boxClassName} ${activeClassName} `}
                                nextLinkClassName="px-4 py-2"
                                previousClassName={`${boxClassName} ${activeClassName} `}
                                previousLinkClassName="px-4 py-2"
                                disabledClassName="bg-white"
                                disabledLinkClassName="disabled:opacity-75 text-gray cursor-not-allowed hover:bg-opacity-75"
                                disableInitialCallback
                            />
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

Pagination.defaultProps = defaultProps;

export default Pagination;
