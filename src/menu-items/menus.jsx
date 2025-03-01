import { FormattedMessage } from 'react-intl';

export const adminMenu = [
    {
        id: 'management',
        title: <FormattedMessage id="management" defaultMessage="Management" />,
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
                type: 'item',
                url: '/admin/dashboard',
                icon: 'dashboard-icon',
                breadcrumbs: true
            },
            {
                id: 'user-management',
                title: <FormattedMessage id="user-management" defaultMessage="User Management" />,
                type: 'item',
                url: '/admin/users',
                icon: 'users-icon',
                breadcrumbs: true
            },
            {
                id: 'listings',
                title: <FormattedMessage id="listings" defaultMessage="Listings" />,
                type: 'item',
                url: '/admin/listings',
                icon: 'listings-icon',
                breadcrumbs: true
            },
            {
                id: 'market-analysis',
                title: <FormattedMessage id="market-analysis" defaultMessage="Market Analysis" />,
                type: 'item',
                url: '/admin/market-trends',
                icon: 'analysis-icon',
                breadcrumbs: true
            },
            {
                id: 'audit-logs',
                title: <FormattedMessage id="audit-logs" defaultMessage="Audit Logs" />,
                type: 'item',
                url: '/admin/audit-logs',
                icon: 'logs-icon',
                breadcrumbs: true
            },
            {
                id: 'system-settings',
                title: <FormattedMessage id="system-settings" defaultMessage="System Settings" />,
                type: 'item',
                url: '/admin/system-settings',
                icon: 'settings-icon',
                breadcrumbs: true
            },
        ],
    },
    {
        id: 'reports',
        title: <FormattedMessage id="reports" defaultMessage="Reports" />,
        type: 'group',
        children: [
            {
                id: 'user-reports',
                title: <FormattedMessage id="user-reports" defaultMessage="User Reports" />,
                type: 'item',
                url: '/admin/user-reports',
                icon: 'user-reports-icon',
                breadcrumbs: true
            },
            {
                id: 'financial-reports',
                title: <FormattedMessage id="financial-reports" defaultMessage="Financial Reports" />,
                type: 'item',
                url: '/admin/financial-reports',
                icon: 'finance-icon',
                breadcrumbs: true
            },
            {
                id: 'activity-reports',
                title: <FormattedMessage id="activity-reports" defaultMessage="Activity Reports" />,
                type: 'item',
                url: '/admin/activity-reports',
                icon: 'activity-icon',
                breadcrumbs: true
            },
        ],
    },
];

export const regularUserMenu = [
    {
        id: 'dashboard',
        title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
                type: 'item',
                url: '/retail-portal/dashboard',
                icon: 'dashboard-icon',
                breadcrumbs: true
            },
            {
                id: 'transactions',
                title: <FormattedMessage id="transactions" defaultMessage="Transactions" />,
                type: 'item',
                url: '/retail-portal/transactions',
                icon: 'transactions-icon',
                breadcrumbs: true
            },
            // {
            //     id: 'wallet',
            //     title: <FormattedMessage id="wallet" defaultMessage="Wallet" />,
            //     type: 'item',
            //     url: '/retail-portal/wallet',
            //     icon: 'wallet-icon',
            //     breadcrumbs: true
            // },
            {
                id: 'profile',
                title: <FormattedMessage id="profile" defaultMessage="Profile" />,
                type: 'item',
                url: '/retail-portal/profile/personal',
                icon: 'profile-icon',
                breadcrumbs: true
            },
            {
                id: 'wallet',
                title: <FormattedMessage id="wallet" defaultMessage="Wallet" />,
                type: 'item',
                url: '/retail-portal/profile/wallet',
                icon: 'payments-icon',
                breadcrumbs: true
            },
            {
                id: 'password',
                title: <FormattedMessage id="password" defaultMessage="Password" />,
                type: 'item',
                url: '/retail-portal/profile/password',
                icon: 'passwords-icon',
                breadcrumbs: true
            },
            {
                id: 'settings',
                title: <FormattedMessage id="settings" defaultMessage="Settings" />,
                type: 'item',
                url: '/retail-portal/profile/settings',
                icon: 'settings-icon',
                breadcrumbs: false
            },
            // {
            //     id: 'profile',
            //     title: <FormattedMessage id="profile" defaultMessage="Profile" />,
            //     type: 'collapse',
            //     icon: 'profile-icon',
            //     breadcrumbs: true,
            //     children: [
            //         {
            //             id: 'personal',
            //             title: 'Personal',
            //             type: 'item',
            //             url: 'profile/personal',
            //             breadcrumbs: false
            //         },
            //         {
            //             id: 'payment',
            //             title: 'Payment',
            //             type: 'item',
            //             url: 'profile/payment',
            //             breadcrumbs: false
            //         },
            //         {
            //             id: 'password',
            //             title: 'Password',
            //             type: 'item',
            //             url: 'profile/password',
            //             breadcrumbs: false
            //         },
            //         {
            //             id: 'settings',
            //             title: 'Settings',
            //             type: 'item',
            //             url: 'profile/settings',
            //             breadcrumbs: false
            //         },
            //     ]
            // },
            // {
            //     id: 'security',
            //     title: <FormattedMessage id="security" defaultMessage="Security" />,
            //     type: 'item',
            //     url: 'security',
            //     icon: 'security-icon',
            // },
        ],
    },
];

export const wholesaleTraderMenu = [
    {
        id: 'dashboard',
        title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
                type: 'item',
                url: '/trader-portal/dashboard',
                icon: 'dashboard-icon',
                breadcrumbs: true
            },
            {
                id: 'marketplace',
                title: <FormattedMessage id="marketplace" defaultMessage="Marketplace" />,
                type: 'item',
                url: '/trader-portal/marketplace',
                icon: 'marketplace-icon',
                breadcrumbs: true
            },
            {
                id: 'orders',
                title: <FormattedMessage id="my-orders" defaultMessage="My Orders" />,
                type: 'item',
                url: '/trader-portal/orders',
                icon: 'orders-icon',
                breadcrumbs: true
            },
            // {
            //     id: 'invoices',
            //     title: <FormattedMessage id="invoices" defaultMessage="Invoices" />,
            //     type: 'item',
            //     url: 'invoices',
            //     icon: 'invoices-icon',
            // },
            // {
            //     id: 'transactions',
            //     title: <FormattedMessage id="transactions" defaultMessage="Transactions" />,
            //     type: 'item',
            //     url: 'transactions',
            //     icon: 'transactions-icon',
            // },
            {
                id: 'profile',
                title: <FormattedMessage id="profile" defaultMessage="Profile" />,
                type: 'item',
                url: '/trader-portal/profile/settings',
                icon: 'profile-icon',
                breadcrumbs: true
            },
        ],
    },
];

export const cooperativeMenu = [
    {
        id: 'dashboard',
        title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
                type: 'item',
                url: '/alliance-portal/dashboard',
                icon: 'dashboard-icon',
                breadcrumbs: true
            },
            {
                id: 'bulk-orders',
                title: <FormattedMessage id="bulk-orders" defaultMessage="Bulk Orders" />,
                type: 'item',
                url: '/alliance-portal/bulk-orders',
                icon: 'bulk-icon',
                breadcrumbs: true
            },
            {
                id: 'team-management',
                title: <FormattedMessage id="team-management" defaultMessage="Team Management" />,
                type: 'item',
                url: '/alliance-portal/team-management',
                icon: 'team-icon',
                breadcrumbs: true
            },
            {
                id: 'inventory',
                title: <FormattedMessage id="inventory" defaultMessage="Inventory" />,
                type: 'item',
                url: '/alliance-portal/inventory',
                icon: 'inventory-icon',
                breadcrumbs: true
            },
            // {
            //     id: 'reports',
            //     title: <FormattedMessage id="reports" defaultMessage="Reports" />,
            //     type: 'item',
            //     url: 'reports',
            //     icon: 'reports-icon',
            // },
            {
                id: 'settings',
                title: <FormattedMessage id="settings" defaultMessage="Settings" />,
                type: 'item',
                url: '/alliance-portal/profile/settings',
                icon: 'settings-icon',
                breadcrumbs: true
            },
        ],
    },
];

export const largeScaleFarmerMenu = [
    {
        id: 'dashboard',
        title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
                type: 'item',
                url: '/farmer-portal/dashboard',
                icon: 'dashboard-icon',
                breadcrumbs: true
            },
            {
                id: 'marketplace',
                title: <FormattedMessage id="marketplace" defaultMessage="Marketplace" />,
                type: 'item',
                url: '/farmer-portal/marketplace',
                icon: 'produce-icon',
                breadcrumbs: true
            },
            {
                id: 'sales',
                title: <FormattedMessage id="sales-history" defaultMessage="Sales History" />,
                type: 'item',
                url: '/farmer-portal/sales',
                icon: 'sales-icon',
                breadcrumbs: true
            },
            // {
            //     id: 'inventory',
            //     title: <FormattedMessage id="inventory" defaultMessage="Inventory" />,
            //     type: 'item',
            //     url: '/farmer-portal/inventory',
            //     icon: 'inventory-icon',
            // },
            {
                id: 'profile',
                title: <FormattedMessage id="profile" defaultMessage="Profile" />,
                type: 'item',
                url: '/farmer-portal/profile/personal',
                icon: 'profile-icon',
                breadcrumbs: true
            },
        ],
    },
];
