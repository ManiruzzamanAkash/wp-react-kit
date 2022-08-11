/**
 * Table Header Definition.
 */
export interface ITableHeader {
    key: string;
    title: string;
    className?: string;
}

/**
 * Table Cell Definition.
 */
export interface ITableCell {
    key: string;
    value: string | number | JSX.Element;
    className?: string;
}

/**
 * Table Row Definition.
 */
export interface ITableRow {
    id: number;
    cells: Array<ITableCell>;
}

/**
 * Table Header Prop Definition.
 */
export interface ITableLoading {
    headers: Array<ITableHeader>;
    count?: number;
    showPagination?: boolean;
    hasCheckbox?: boolean;
}

/**
 * Table Prop Definition.
 */
export interface ITable {
    headers: Array<ITableHeader>;
    rows: Array<ITableRow>;
    showPagination?: boolean;
    totalItems?: number;
    perPage?: number;
    currentPage?: number;
    checkedAll?: boolean;
    onChangePage?: Function;
    onCheckAll?: Function;
    noDataMessage?: string;
}
