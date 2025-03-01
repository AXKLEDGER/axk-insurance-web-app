'use client';
import PropTypes from 'prop-types';
import { useMemo, useState, Fragment, useCallback, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


import {
    Button,
    Box,
    Card,
    CardContent,
    Chip,
    Collapse,
    Divider,
    Grid,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';

// third-party
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    useReactTable
} from '@tanstack/react-table';

// project-import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';

import {
    CSVExport,
    DebouncedInput,
    HeaderSort,
    IndeterminateCheckbox,
    RowSelection,
    SelectColumnSorting,
    TablePagination
} from 'components/third-party/react-table';

// assets
import {
    Eye, DocumentDownload, Message, ArrowDown2,
    ArrowUp2
} from 'iconsax-react';
import InvestmentDetails from 'components/InvestmentDetails';
import { MarketplaceDetails, TradeFinanceDetails } from 'components/OrderDetailComponents';
import OrderViewModal from 'components/OrderViewModal';

const mockOrders = [
    // MARKETPLACE PURCHASES
    {
        id: 'MKT-001',
        type: 'marketplace',
        date: '2024-02-23',
        vendor: 'Organic Farms Ghana',
        vendorLocation: 'Kumasi, Ghana',
        items: [
            {
                name: 'Fresh Tomatoes',
                quantity: 500,
                unit: 'kg',
                price: 1.20,
                category: 'Vegetables',
                quality: 'Grade A',
                deliveryDate: '2024-02-25'
            },
            {
                name: 'Onions',
                quantity: 300,
                unit: 'kg',
                price: 0.80,
                category: 'Vegetables',
                quality: 'Premium',
                deliveryDate: '2024-02-24'
            }
        ],
        totalAmount: 840.00,
        status: 'processing',
        paymentStatus: 'pending',
        deliveryMethod: 'Local Delivery',
        orderType: 'Direct Purchase'
    },
    {
        id: 'MKT-002',
        type: 'marketplace',
        date: '2024-02-22',
        vendor: 'Savannah Grains Cooperative',
        vendorLocation: 'Kano, Nigeria',
        items: [
            {
                name: 'Rice (Local)',
                quantity: 1000,
                unit: 'kg',
                price: 1.50,
                category: 'Grains',
                quality: 'Standard',
                deliveryDate: '2024-02-28'
            }
        ],
        totalAmount: 1500.00,
        status: 'delivered',
        paymentStatus: 'paid',
        deliveryMethod: 'Pickup',
        orderType: 'Bulk Purchase'
    },

    // INVESTMENT OPPORTUNITIES
    {
        id: 'INV-001',
        type: 'investment',
        date: '2024-02-20',
        vendor: 'Coffee Estates Kenya',
        vendorLocation: 'Nyeri County, Kenya',
        items: [
            {
                name: 'Coffee Farm Expansion Project',
                quantity: 1,
                unit: 'project',
                price: 25000.00,
                category: 'Farm Development',
                projectDuration: '12 months',
                expectedYield: '5000 kg',
                landSize: '5 hectares'
            }
        ],
        totalAmount: 25000.00,
        status: 'approved',
        investmentType: 'Farm Expansion',
        returnRate: '15% p.a.',
        investmentTerm: '12 months',
        riskLevel: 'Medium'
    },
    {
        id: 'INV-002',
        type: 'investment',
        date: '2024-02-19',
        vendor: 'Golden Cocoa Farms',
        vendorLocation: 'Ashanti Region, Ghana',
        items: [
            {
                name: 'Cocoa Farm Rehabilitation',
                quantity: 1,
                unit: 'project',
                price: 15000.00,
                category: 'Farm Improvement',
                projectDuration: '18 months',
                expectedYield: '3000 kg',
                landSize: '3 hectares'
            }
        ],
        totalAmount: 15000.00,
        status: 'funded',
        investmentType: 'Rehabilitation',
        returnRate: '12% p.a.',
        investmentTerm: '18 months',
        riskLevel: 'Low'
    },

    // TRADE FINANCE REQUESTS
    {
        id: 'TRF-001',
        type: 'trade_finance',
        date: '2024-02-18',
        vendor: 'Superior Cocoa Producers',
        vendorLocation: 'Kumasi, Ghana',
        items: [
            {
                name: 'Cocoa Beans Export Finance',
                quantity: 10000,
                unit: 'kg',
                price: 2.50,
                category: 'Export Finance',
                harvestSeason: 'Main Crop 2024',
                gradeQuality: 'Grade A'
            }
        ],
        totalAmount: 25000.00,
        status: 'financed',
        financingType: 'Export Finance',
        financingTerm: '6 months',
        interestRate: '8%',
        collateral: 'Warehouse Receipt'
    },
    {
        id: 'TRF-002',
        type: 'trade_finance',
        date: '2024-02-17',
        vendor: 'Mali Cotton Cooperative',
        vendorLocation: 'Sikasso Region, Mali',
        items: [
            {
                name: 'Cotton Pre-harvest Finance',
                quantity: 8000,
                unit: 'kg',
                price: 1.80,
                category: 'Pre-harvest Finance',
                harvestSeason: 'Winter 2024',
                estimatedYield: '8000 kg'
            }
        ],
        totalAmount: 14400.00,
        status: 'assessing',
        financingType: 'Pre-harvest',
        financingTerm: '4 months',
        interestRate: '9%',
        collateral: 'Future Harvest'
    }
];

// Constants
const ORDER_STATUS = {
    // Marketplace Orders (Product Purchases)
    pending: { color: 'warning', label: 'Order Placed' },
    confirmed: { color: 'info', label: 'Confirmed' },
    processing: { color: 'warning', label: 'Being Processed' },
    ready: { color: 'info', label: 'Ready for Pickup' },
    shipped: { color: 'info', label: 'In Transit' },
    delivered: { color: 'success', label: 'Received' },
    completed: { color: 'success', label: 'Completed' },
    cancelled: { color: 'error', label: 'Cancelled' },
    rejected: { color: 'error', label: 'Rejected' },

    // Payment Status
    unpaid: { color: 'error', label: 'Payment Due' },
    partially_paid: { color: 'warning', label: 'Partially Paid' },
    paid: { color: 'success', label: 'Paid' },
    refund_pending: { color: 'warning', label: 'Refund Pending' },
    refunded: { color: 'info', label: 'Refunded' },

    // Quality Check
    quality_check: { color: 'warning', label: 'Quality Check' },
    quality_passed: { color: 'success', label: 'Quality Passed' },
    quality_failed: { color: 'error', label: 'Quality Failed' },

    // Contract Status
    contract_draft: { color: 'warning', label: 'Contract Draft' },
    contract_sent: { color: 'info', label: 'Contract Sent' },
    contract_signed: { color: 'success', label: 'Contract Signed' },
    contract_expired: { color: 'error', label: 'Contract Expired' },

    default: { color: 'default', label: 'Unknown' }
};

const PAYMENT_STATUS = {
    paid: { color: 'success', label: 'Paid' },
    pending: { color: 'warning', label: 'Pending' },
    failed: { color: 'error', label: 'Failed' },
    refunded: { color: 'info', label: 'Refunded' },
    default: { color: 'default', label: 'Unknown' }
};

// PropTypes
const OrderType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['marketplace', 'investment', 'trade_finance']).isRequired,
    date: PropTypes.string.isRequired,
    farmer: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired
    })).isRequired,
    totalAmount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    paymentStatus: PropTypes.string,
    deliveryMethod: PropTypes.string,
    orderType: PropTypes.string,
    investmentType: PropTypes.string,
    returnRate: PropTypes.string,
    investmentTerm: PropTypes.string,
    riskLevel: PropTypes.string,
    financingType: PropTypes.string,
    financingTerm: PropTypes.string,
    interestRate: PropTypes.string,
    collateral: PropTypes.string
});

const TablePropTypes = {
    data: PropTypes.arrayOf(OrderType).isRequired,
    columns: PropTypes.array.isRequired
};

const getTypeColor = (type) => {
    switch (type) {
        case 'marketplace': return 'primary';
        case 'investment': return 'secondary';
        case 'trade_finance': return 'success';
        default: return 'default';
    }
};

function ReactTable({ data, columns }) {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [orderStatusFilter, setOrderStatusFilter] = useState('');
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });

    const filteredData = useMemo(() => {
        let filtered = [...data];

        if (orderStatusFilter !== '') {
            filtered = filtered.filter((item) => item.status === orderStatusFilter);
        }

        if (globalFilter) {
            const searchTerm = globalFilter.toLowerCase();
            filtered = filtered.filter((item) => {
                return (
                    item.id.toLowerCase().includes(searchTerm) ||
                    item.customer.toLowerCase().includes(searchTerm) ||
                    item.shippingAddress.toLowerCase().includes(searchTerm) ||
                    item.amount.toString().includes(searchTerm)
                );
            });
        }

        return filtered;
    }, [data, orderStatusFilter, globalFilter]);

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));
    }, [globalFilter, orderStatusFilter, columnFilters]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            columnFilters,
            sorting,
            rowSelection,
            globalFilter,
            pagination
        },
        onPaginationChange: setPagination,
        pageCount: Math.ceil(filteredData.length / pagination.pageSize),
        enableRowSelection: true,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        getRowCanExpand: () => true,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    const handleGlobalFilter = useCallback((value) => {
        setGlobalFilter(String(value));
    }, []);

    const handleOrderStatusFilter = useCallback((event) => {
        setOrderStatusFilter(event.target.value);
    }, []);

    return (
        <MainCard content={false}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                sx={{ padding: 3 }}
            >
                <DebouncedInput
                    value={globalFilter ?? ''}
                    onFilterChange={handleGlobalFilter}
                    placeholder={`Search ${filteredData.length} orders...`}
                    aria-label="Search orders"
                />

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    spacing={2}
                >
                    <Select
                        value={orderStatusFilter}
                        onChange={handleOrderStatusFilter}
                        displayEmpty
                    >
                        <MenuItem value="">All Status</MenuItem>
                        <MenuItem value="processing">Processing</MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>

                    <CSVExport
                        data={filteredData}
                        filename="orders.csv"
                    />
                </Stack>
            </Stack>

            <ScrollX>
                <Stack>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableCell
                                                key={header.id}
                                                onClick={header.column.getToggleSortingHandler()}
                                                sx={{
                                                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                                                    userSelect: 'none'
                                                }}
                                            >
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Box>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                    </Box>
                                                    {header.column.getCanSort() && (
                                                        <HeaderSort column={header.column} />
                                                    )}
                                                </Stack>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>

                            <TableBody>
                                {table.getRowModel().rows.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            <Typography variant="h6">No orders found</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <TablePagination
                            {...{
                                setPageSize: table.setPageSize,
                                setPageIndex: table.setPageIndex,
                                getState: table.getState,
                                getPageCount: table.getPageCount,
                                totalRecords: filteredData.length,
                                initialPageSize: 10
                            }}
                        />
                    </Box>
                </Stack>
            </ScrollX>
        </MainCard>
    );
}

ReactTable.propTypes = TablePropTypes;

// Main Component
export default function BuyerOrdersPage() {
    const [viewOrder, setViewOrder] = useState(null);

    const columns = useMemo(
        () => [
            {
                header: 'Order ID',
                accessorKey: 'id',
                cell: ({ row }) => (
                    <Typography variant="subtitle1">{row.original.id}</Typography>
                )
            },
            {
                header: 'Date',
                accessorKey: 'date',
                cell: ({ row }) => (
                    <Typography variant="subtitle1">
                        {new Date(row.original.date).toLocaleDateString()}
                    </Typography>
                )
            },
            {
                header: 'Vendor',
                accessorKey: 'vendor',
                cell: ({ row }) => (
                    <Stack direction="column" spacing={0.5}>
                        <Typography variant="subtitle1">{row.original.vendor}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            {row.original.vendorLocation}
                        </Typography>
                    </Stack>
                )
            },
            {
                header: 'Type',
                accessorKey: 'type',
                cell: ({ row }) => {
                    const type = row.original.type;
                    const typeLabels = {
                        marketplace: { color: 'primary', label: 'Purchase Order' },
                        investment: { color: 'success', label: 'Investment' },
                        trade_finance: { color: 'warning', label: 'Trade Finance' }
                    };
                    const typeInfo = typeLabels[type] || { color: 'default', label: type };
                    return (
                        <Chip
                            color={typeInfo.color}
                            label={typeInfo.label}
                            size="small"
                            variant="light"
                        />
                    );
                }
            },
            {
                header: 'Order Details',
                accessorKey: 'items',
                cell: ({ row }) => {
                    const [expanded, setExpanded] = useState(false);
                    const items = row.original.items;
                    const type = row.original.type;
                    const typeColor = getTypeColor(type);

                    const getItemSummary = () => {
                        switch (type) {
                            case 'marketplace':
                                const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
                                return `${itemCount} ${itemCount === 1 ? 'item' : 'items'} • $${row.original.totalAmount.toFixed(2)}`;
                            case 'investment':
                                return `${row.original.investmentType} • ${row.original.returnRate}`;
                            case 'trade_finance':
                                return `${row.original.financingType} • ${row.original.interestRate}`;
                            default:
                                return 'View Details';
                        }
                    };

                    return (
                        <Paper
                            elevation={expanded ? 4 : 1}
                            sx={{
                                width: '100%',
                                minWidth: '250px',
                                transition: 'all 0.3s ease',
                                borderRadius: 3,
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                onClick={() => setExpanded(!expanded)}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    bgcolor: expanded ? `${typeColor}.50` : 'transparent',
                                    borderBottom: expanded ? '1px solid' : 'none',
                                    borderBottomColor: 'divider',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease'
                                }}
                            >
                                <Stack direction="column" spacing={0.5}>
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                        {getItemSummary()}
                                    </Typography>
                                    {type === 'marketplace' && (
                                        <Typography variant="caption" color="textSecondary">
                                            {items.map(item => item.category).join(' • ')}
                                        </Typography>
                                    )}
                                </Stack>
                                <IconButton
                                    size="small"
                                    sx={{
                                        ml: 1,
                                        color: expanded ? 'primary.main' : 'text.secondary',
                                        transition: 'transform 0.2s',
                                        transform: expanded ? 'rotate(-180deg)' : 'none'
                                    }}
                                >
                                    <ArrowDown2 size={16} />
                                </IconButton>
                            </Box>

                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <Box sx={{ mt: 2, mb: 1 }}>
                                    <Stack spacing={1}>
                                        {items.map((item, idx) => (
                                            <Box key={idx} sx={{ bgcolor: 'grey.50', borderRadius: 1 }}>
                                                {/* <Box sx={{ p: 2 }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={7}>
                                                            <Typography variant="subtitle2">{item.name}</Typography>
                                                            {type === 'marketplace' && (
                                                                <MarketplaceDetails
                                                                    item={item}
                                                                    vendor={row.original.vendor}
                                                                    vendorLocation={row.original.vendorLocation}
                                                                    deliveryTerms={row.original.deliveryTerms}
                                                                    paymentTerms={row.original.paymentTerms}
                                                                />
                                                            )}
                                                            {type === 'trade_finance' && (
                                                                <TradeFinanceDetails
                                                                    item={item}
                                                                    vendor={row.original.vendor}
                                                                    vendorLocation={row.original.vendorLocation}
                                                                    financingType={row.original.financingType}
                                                                    interestRate={row.original.interestRate}
                                                                    tenor={row.original.tenor}
                                                                />
                                                            )}
                                                        </Grid>
                                                        <Grid item xs={12} sm={5}>
                                                            <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {item.quantity} {item.unit}
                                                                </Typography>
                                                                <Typography variant="subtitle2" color="primary.main">
                                                                    ${(item.quantity * item.price).toFixed(2)}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </Box> */}
                                                {type === 'marketplace' && (
                                                    <MarketplaceDetails
                                                        item={item}
                                                        vendor={row.original.vendor}
                                                        vendorLocation={row.original.vendorLocation}
                                                        deliveryTerms={row.original.deliveryTerms}
                                                        paymentTerms={row.original.paymentTerms}
                                                    />
                                                )}
                                                {type === 'trade_finance' && (
                                                    <TradeFinanceDetails
                                                        item={item}
                                                        vendor={row.original.vendor}
                                                        vendorLocation={row.original.vendorLocation}
                                                        financingType={row.original.financingType}
                                                        interestRate={row.original.interestRate}
                                                        tenor={row.original.tenor}
                                                    />
                                                )}
                                                {type === 'investment' && (
                                                    <InvestmentDetails
                                                        item={item}
                                                        vendor={row.original.vendor}
                                                        vendorLocation={row.original.vendorLocation}
                                                        returnRate={row.original.returnRate}
                                                        investmentTerm={row.original.investmentTerm}
                                                        riskLevel={row.original.riskLevel}
                                                    />
                                                )}
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                            </Collapse>
                        </Paper>
                    );
                }
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: ({ row }) => {
                    const status = ORDER_STATUS[row.original.status] || ORDER_STATUS.default;
                    return (
                        <Chip
                            color={status.color}
                            label={status.label}
                            size="small"
                            variant="light"
                        />
                    );
                }
            },
            {
                header: 'Actions',
                cell: ({ row }) => (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Tooltip title="View Details">
                            <IconButton
                                color="secondary"
                                size="small"
                                onClick={() => setViewOrder(row.original)}
                            >
                                <Eye />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Invoice">
                            <IconButton color="primary" size="small">
                                <DocumentDownload />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Message Vendor">
                            <IconButton color="info" size="small">
                                <Message />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )
            }
        ],
        []
    );

    return (
        <>
            <ReactTable
                data={mockOrders}
                columns={columns}
            />
            <OrderViewModal
                open={Boolean(viewOrder)}
                onClose={() => setViewOrder(null)}
                order={viewOrder}
            />
        </>
    );
}