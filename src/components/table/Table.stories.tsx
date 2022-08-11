import { ComponentMeta } from '@storybook/react';
import Table from './Table';
import Badge from '../badge/Badge';
import { ITableRow } from '../../../interfaces/TableInterface';

export default {
    title: 'Common/Table',
    component: Table,
} as ComponentMeta<typeof Table>;

const getHeaders = () => {
    return [
        {
            key: 'checkbox',
            title: '',
            className: '',
        },
        {
            key: 'cart',
            title: 'Cart',
            className: '',
        },
        {
            key: 'customer',
            title: 'Customer',
            className: '',
        },
        {
            key: 'total',
            title: 'Total',
            className: '',
        },
        {
            key: 'status',
            title: 'Status',
            className: '',
        },
        {
            key: 'last_updated',
            title: 'Last Updated',
            className: '',
        },
    ];
};

/**
 * Get Cart badge type from cart type.
 *
 * @param  status string
 * @return string
 */
const getCartBadgeType = (status: string) => {
    switch (status) {
        case 'abandoned':
            return 'warning';

        case 'completed':
            return 'default';

        case 'recovered':
            return 'success';

        default:
            return 'default';
    }
};

const carts = [
    {
        id: 100200,
        customer_avatar:
            'https://lh3.googleusercontent.com/ogw/ADea4I4UE-t0iuqJus7pWw2H4Ua7hPAf7Hw27GNzeMLs_g=s32-c-mo',
        customer_name: 'Kelly Smith',
        customer_address: 'Portland, OR, United States',
        cart_total_amount: '$10,203',
        cart_total_items: '5 items',
        status: 'completed',
        order_id: 1337,
        order_url: 'http://wpex.test/wp-admin/post.php?post=1337&action=edit',
        last_updated: '1 hours ago',
    },
    {
        id: 200201,
        customer_avatar:
            'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
        customer_name: 'Fatih Baytekin',
        customer_address: 'Bursa, Turkey',
        cart_total_amount: '$1,210',
        cart_total_items: '100 items',
        status: 'abandoned',
        order_id: null,
        order_url: null,
        last_updated: '1 hours ago',
    },
    {
        id: 3,
        customer_avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRjiu7YrDulEiHgcvyxUqfqUQkD6ZBPr6gCQ&usqp=CAU',
        customer_name: 'Kelly Smith',
        customer_address: 'Portland, OR, United States',
        cart_total_amount: '$10,203',
        cart_total_items: '50 items',
        status: 'recovered',
        order_id: 120390,
        order_url: 'http://wpex.test/wp-admin/post.php?post=120390&action=edit',
        last_updated: '2 hours ago',
    },
    {
        id: 1,
        customer_avatar:
            'https://lh3.googleusercontent.com/ogw/ADea4I4UE-t0iuqJus7pWw2H4Ua7hPAf7Hw27GNzeMLs_g=s32-c-mo',
        customer_name: 'Kelly Smith',
        customer_address: 'Portland, OR, United States',
        cart_total_amount: '$10,203',
        cart_total_items: '5 items',
        status: 'completed',
        order_id: 120390,
        order_url: 'http://wpex.test/wp-admin/post.php?post=120390&action=edit',
        last_updated: '1 hours ago',
    },
    {
        id: 21212,
        customer_avatar:
            'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
        customer_name: 'Fatih Baytekin',
        customer_address: 'Bursa, Turkey',
        cart_total_amount: '$1,210',
        cart_total_items: '100 items',
        status: 'abandoned',
        order_id: null,
        order_url: null,
        last_updated: '1 hours ago',
    },
    {
        id: 90192,
        customer_avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRjiu7YrDulEiHgcvyxUqfqUQkD6ZBPr6gCQ&usqp=CAU',
        customer_name: 'Kelly Smith',
        customer_address: 'Portland, OR, United States',
        cart_total_amount: '$10,203',
        cart_total_items: '1 item',
        status: 'recovered',
        order_id: 120390,
        order_url: 'http://wpex.test/wp-admin/post.php?post=120390&action=edit',
        last_updated: '2 hours ago',
    },
    {
        id: 11212,
        customer_avatar:
            'https://lh3.googleusercontent.com/ogw/ADea4I4UE-t0iuqJus7pWw2H4Ua7hPAf7Hw27GNzeMLs_g=s32-c-mo',
        customer_name: 'Kelly Smith',
        customer_address: 'Portland, OR, United States',
        cart_total_amount: '$10,203',
        cart_total_items: '5 items',
        status: 'completed',
        order_id: 120390,
        order_url: 'http://wpex.test/wp-admin/post.php?post=120390&action=edit',
        last_updated: '1 hours ago',
    },
    {
        id: 2121212,
        customer_avatar:
            'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
        customer_name: 'Fatih Baytekin',
        customer_address: 'Bursa, Turkey',
        cart_total_amount: '$1,210',
        cart_total_items: '100 items',
        status: 'abandoned',
        order_id: null,
        order_url: null,
        last_updated: '1 hours ago',
    },
];

const getRows = () => {
    // let rowsData = [];
    const rowsData: ITableRow[] = [];

    carts.forEach((row, index) => {
        rowsData.push({
            id: row.id,
            cells: [
                {
                    key: 'checkbox',
                    value: <>-</>,
                    className: '',
                },
                {
                    key: 'cart',
                    value: (
                        <a
                            href={`/cart-view/${row.id}`}
                            className="text-primary hover:text-primary-dark font-medium"
                        >
                            #{row.id}
                        </a>
                    ),
                    className: '',
                },
                {
                    key: 'customer',
                    value: (
                        <>
                            <div className="flex">
                                <div className="flex-none">
                                    <img
                                        src={row.customer_avatar}
                                        alt=""
                                        className="w-10 h-10 rounded-full"
                                    />
                                </div>
                                <div className="flex-1 pl-3">
                                    <p className="text-primary font-semibold text-sm">
                                        {row.customer_name}
                                    </p>
                                    <p className="text-gray-dark text-[13px]">
                                        {row.customer_address}
                                    </p>
                                </div>
                            </div>
                        </>
                    ),
                    className: '',
                },
                {
                    key: 'total',
                    value: (
                        <>
                            <p className="text-black">
                                {row.cart_total_amount}
                            </p>
                            <p className="text-gray-dark text-[13px]">
                                {row.cart_total_items}
                            </p>
                        </>
                    ),
                    className: '',
                },
                {
                    key: 'status',
                    value: (
                        <Badge
                            text={
                                <span>
                                    <span className="capitalize">
                                        {row.status}{' '}
                                    </span>
                                    {(row.status === 'completed' ||
                                        row.status === 'recovered') && (
                                        <a
                                            href={row.order_url}
                                            className="text-primary font-medium"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            #{row.order_id}
                                        </a>
                                    )}
                                </span>
                            }
                            type={getCartBadgeType(row.status)}
                            hasIcon={true}
                        />
                    ),
                    className: '',
                },
                {
                    key: 'last_updated',
                    value: row.last_updated,
                    className: 'text-gray-dark',
                },
            ],
        });
    });

    return rowsData;
};

export const DefaultTable = () => {
    return (
        <Table
            headers={getHeaders()}
            rows={getRows()}
            perPage={3}
            totalItems={carts.length}
            showPagination={true}
            onChangePage={(page: number) => {}}
        />
    );
};
