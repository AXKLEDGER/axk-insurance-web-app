'use client';

import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Modal,
    Select,
    Snackbar,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Tooltip,
    Typography,
    FormControl,
    InputLabel,
    FormHelperText,
    Badge,
    Backdrop,
    CircularProgress,
    Fade,
    Grow,
    useTheme
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';

import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from '@tanstack/react-table';

import {
    CSVExport,
    DebouncedInput,
    HeaderSort,
    IndeterminateCheckbox,
    RowSelection,
    SelectColumnSorting,
    TablePagination
} from 'components/third-party/react-table';

import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { Copy, Eye, Edit, Add } from 'iconsax-react';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1300,
    padding: '20px',
    overflowY: 'auto',
};

// Utility function to truncate long text
const truncateText = (text) => `${text.slice(0, 6)}...${text.slice(-4)}`;

const mockData = Array.from({ length: 20 }, (_, i) => ({
    id: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
    type: i % 2 === 0 ? 'Send' : 'Receive',
    from: `0x${Math.random().toString(16).slice(2, 10)}`,
    to: `0x${Math.random().toString(16).slice(2, 10)}`,
    value: `${(Math.random() * 10).toFixed(2)} ETH`,
    status: ['Completed', 'Pending', 'Cancelled'][i % 3],
    timestamp: `2025-01-${String(i + 1).padStart(2, '0')} 14:${String(i % 60).padStart(2, '0')}:23`,
}));

const TransitionGrow = React.forwardRef((props, ref) => {
    return <Grow {...props} ref={ref} />;
});

const StyledAlert = styled(MuiAlert)(({ theme, severity }) => {
    const backgroundColor = {
        warning: theme.palette.warning.light,
        success: theme.palette.success.light,
        error: theme.palette.error.light,
        info: theme.palette.info.light,
    }[severity] || theme.palette.info.light;

    return {
        backgroundColor,
        color: theme.palette.getContrastText(backgroundColor),
        fontWeight: '600',
        borderRadius: '32px',
        padding: '10px 16px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        '& .MuiAlert-icon': {
            color: theme.palette.getContrastText(backgroundColor),
        },
        '&:hover': {
            boxShadow: '0 6px 14px rgba(0, 0, 0, 0.2)',
        },
    };
});

const DisabledMenuItem = styled(MenuItem)(({ theme }) => ({
    opacity: 0.5,
    pointerEvents: 'none',
    fontStyle: 'italic',
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
    '&:hover': {
        backgroundColor: theme.palette.action.disabledBackground,
    },
}));


function ReactTable({
    data,
    columns,
    pageSize,
    openAddModal,
    snackbarOpen,
    setSnackbarMessage,
    setSnackbarOpen,
}) {
    const [globalFilter, setGlobalFilter] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(pageSize);
    const [currentPage, setCurrentPage] = useState(0);
    const groups = ['All', ...new Set(data.map((item) => item.status))];
    const [activeTab, setActiveTab] = useState(groups[0]);

    const filteredData = useMemo(() => {
        const lowerFilter = globalFilter.toLowerCase();
        const tabFilteredData =
            activeTab === 'All'
                ? data
                : data.filter((item) => item.status === activeTab);
        return tabFilteredData.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(lowerFilter)
            )
        );
    }, [globalFilter, activeTab, data]);

    const paginatedData = useMemo(() => {
        const start = currentPage * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredData.slice(start, end);
    }, [filteredData, currentPage, rowsPerPage]);

    useEffect(() => {
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        if (currentPage >= totalPages) {
            setCurrentPage(0);
        }
    }, [filteredData.length, rowsPerPage, currentPage]);

    const table = useReactTable({
        data: paginatedData,
        columns,
        state: {
            globalFilter,
            pagination: { pageSize: rowsPerPage, pageIndex: currentPage },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
    });

    // useEffect(() => {
    //   console.log('Active Tab:', activeTab);
    //   console.log('Current Page:', currentPage);
    //   console.log('Rows Per Page:', rowsPerPage);
    //   console.log('Filtered Data Length:', filteredData.length);
    //   console.log('Paginated Data:', paginatedData);
    //   console.log('Table Rows:', table.getRowModel().rows);
    // }, [activeTab, currentPage, rowsPerPage, filteredData, paginatedData, table.getRowModel().rows]);

    return (
        <MainCard content={false}>
            <Box sx={{ p: 2.5, pb: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tabs
                    value={activeTab}
                    onChange={(e, value) => setActiveTab(value)}
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    {groups.map((status, index) => (
                        <Tab
                            key={index}
                            label={status}
                            value={status}
                            icon={
                                <Chip
                                    label={
                                        status === 'All'
                                            ? data.length
                                            : data.filter((item) => item.status === status).length
                                    }
                                    color={status === 'All' ? 'primary' : status === 'Completed' ? 'success' : status === 'Pending' ? 'warning' : 'error'}
                                    size="small"
                                />
                            }
                            iconPosition="end"
                        />
                    ))}
                </Tabs>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                        const userData = JSON.parse(localStorage.getItem('user'));
                        if (!userData || !userData.wallets || userData.wallets.length === 0) {
                            setSnackbarMessage('We have identified a potential issue with your account. Please re-login to restore full functionality.');
                            setSnackbarOpen(true);
                            return;
                        }
                        openAddModal();
                    }}
                    sx={{
                        bgcolor: 'success.main',
                        '&:hover': {
                            bgcolor: 'success.dark',
                        },
                    }}
                >
                    Send Money
                </Button>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ padding: 2.5 }}>
                <TextField
                    label="Search"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search transactions..."
                    variant="outlined"
                    size="small"
                />
            </Stack>
            <ScrollX>
                <TableContainer>
                    <Table>
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell key={header.id} sx={{ fontWeight: 'bold' }}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <Typography variant="subtitle1" color="textSecondary">
                                            No transactions found.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <TablePagination
                        getPageCount={() => Math.ceil(filteredData.length / rowsPerPage)}
                        setPageIndex={setCurrentPage}
                        setPageSize={setRowsPerPage}
                        getState={() => ({
                            pagination: { pageSize: rowsPerPage, pageIndex: currentPage },
                        })}
                        initialPageSize={pageSize}
                        totalRecords={filteredData.length}
                    />
                </Box>
            </ScrollX>
        </MainCard>
    );
}

function FarmersMarketplace() {
    const [transactions, setTransactions] = useState(mockData);
    const [activeTab, setActiveTab] = useState('All');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [openSendModal, setOpenSendModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const theme = useTheme();

    const filteredData = useMemo(
        () =>
            activeTab === 'All'
                ? transactions
                : transactions.filter((txn) => txn.status === activeTab),
        [activeTab, transactions]
    );

    const columns = useMemo(
        () => [
            {
                header: 'Transaction Hash',
                accessorKey: 'id',
                cell: ({ getValue }) => (
                    <Tooltip title={getValue()} arrow>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#4CAF50',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(getValue());
                                    setSnackbarMessage('Transaction Hash copied to clipboard!');
                                    setSnackbarOpen(true);
                                }}
                            >
                                {truncateText(getValue())}
                            </Typography>
                        </Stack>
                    </Tooltip>
                ),
            },
            {
                header: 'Type',
                accessorKey: 'type',
                cell: ({ getValue }) => (
                    <Chip
                        label={getValue()}
                        sx={{
                            backgroundColor: getValue() === 'Send' ? '#388E3C' : '#FFC107',
                            color: 'white',
                        }}
                        size="small"
                    />
                ),
            },
            {
                header: 'From',
                accessorKey: 'from',
                cell: ({ getValue }) => (
                    <Tooltip title={getValue()} arrow>
                        <Typography
                            onClick={() => {
                                navigator.clipboard.writeText(getValue());
                                setSnackbarMessage('From Address copied to clipboard!');
                                setSnackbarOpen(true);
                            }}
                            sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#4CAF50' }}
                        >
                            {truncateText(getValue())}
                        </Typography>
                    </Tooltip>
                ),
            },
            {
                header: 'To',
                accessorKey: 'to',
                cell: ({ getValue }) => (
                    <Tooltip title={getValue()} arrow>
                        <Typography
                            onClick={() => {
                                navigator.clipboard.writeText(getValue());
                                setSnackbarMessage('To Address copied to clipboard!');
                                setSnackbarOpen(true);
                            }}
                            sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#4CAF50' }}
                        >
                            {truncateText(getValue())}
                        </Typography>
                    </Tooltip>
                ),
            },
            {
                header: 'Value',
                accessorKey: 'value',
                cell: ({ getValue }) => <Typography sx={{ fontWeight: 'bold', color: '#2E7D32' }}>{getValue()}</Typography>,
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (cell) => {
                    const status = cell.getValue();
                    return (
                        <Chip
                            label={status}
                            sx={{
                                bgcolor:
                                    status === 'Completed'
                                        ? '#4CAF50'
                                        : status === 'Pending'
                                            ? '#FF9800'
                                            : '#F44336',
                                color: 'white',
                            }}
                            size="small"
                        />
                    );
                },
            },
            {
                header: 'Actions',
                cell: ({ row }) => (
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            color="primary"
                            // sx={{ bgcolor: '#81C784', '&:hover': { bgcolor: '#66BB6A' } }}
                            onClick={() => {
                                setEditData(row);
                                // setEditData(row.original);
                                setOpenEditModal(true);
                            }}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            color="secondary"
                            // sx={{ bgcolor: '#FF7043', '&:hover': { bgcolor: '#FF5722' } }}
                            onClick={() => {
                                setSelectedTransaction(row.original);
                                setShowOverlay(true);
                            }}
                        >
                            <Eye />
                        </IconButton>
                    </Stack>
                ),
            },
        ],
        []
    );

    const handleOpenSendMoneyModal = (transaction) => {
        setOpenSendModal(true);
    };


    const handleSendMoney = (transaction) => {
        setTransactions((prev) => [...prev, { ...transaction, type: 'Sent', status: 'Pending' }]);
        setOpenSendModal(false);
    };

    const handleEditTransaction = (updatedTransaction) => {
        setTransactions((prev) =>
            prev.map((txn) =>
                txn.id === updatedTransaction.id ? updatedTransaction : txn
            )
        );
        setOpenEditModal(false);
    };

    return (
        <>
            <Breadcrumbs custom heading="Transaction List" links={[{ title: 'Home', to: '/' }, { title: 'Transactions' }]} />
            <Grid item xs={12} sx={{ mt: 3 }}>
                <ReactTable
                    data={filteredData}
                    columns={columns}
                    pageSize={5}
                    openAddModal={handleOpenSendMoneyModal}
                    snackbarOpen={snackbarOpen}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                />
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={TransitionGrow}
            >
                <StyledAlert onClose={() => setSnackbarOpen(false)} severity="warning">
                    {snackbarMessage}
                </StyledAlert>
            </Snackbar>


            <SendMoneyModal open={openSendModal} onClose={() => setOpenSendModal(false)} onSubmit={handleSendMoney} />
            <EditTransactionModal open={openEditModal} onClose={() => setOpenEditModal(false)} transaction={editData} onSubmit={handleEditTransaction} />

            <Modal
                open={showOverlay}
                onClose={() => setShowOverlay(false)}
                sx={{
                    ...overlayStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.3s ease-in-out',
                }}
            >
                {selectedTransaction ? (
                    <Box
                        sx={{
                            width: '400px',
                            p: 3,
                            backgroundColor: 'background.paper',
                            borderRadius: 3,
                            boxShadow: 24,
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': { transform: 'scale(1.02)' },
                        }}
                    >
                        <Stack spacing={2} alignItems="center">
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{ fontWeight: 'bold', color: 'primary.main' }}
                            >
                                Transaction Details
                            </Typography>
                            <Divider sx={{ width: '100%', borderColor: 'primary.light' }} />
                            <Stack spacing={1.5} sx={{ width: '100%' }}>
                                <DetailRow label="Transaction Hash" value={selectedTransaction.id} copyable />
                                <DetailRow label="Type" value={selectedTransaction.type} chip />
                                <DetailRow label="From" value={selectedTransaction.from} copyable />
                                <DetailRow label="To" value={selectedTransaction.to} copyable />
                                <DetailRow label="Value" value={selectedTransaction.value} />
                                <DetailRow label="Status" value={selectedTransaction.status} chip />
                                <DetailRow label="Timestamp" value={selectedTransaction.timestamp} />
                            </Stack>
                        </Stack>
                    </Box>
                ) : (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" color="error">
                            No transaction selected.
                        </Typography>
                    </Box>
                )}
            </Modal>
        </>
    );
}

function DetailRow({ label, value, copyable, chip }) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                padding: 1,
                borderRadius: 1,
                backgroundColor: 'background.default',
                '&:hover': { backgroundColor: 'action.hover' },
            }}
        >
            <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                {label}:
            </Typography>
            {chip ? (
                <Chip
                    label={value}
                    color={
                        value === 'Completed' ? 'success' : value === 'Pending' ? 'warning' : 'error'
                    }
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                />
            ) : (
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                        {value}
                    </Typography>
                    {copyable && (
                        <Tooltip title="Copy to clipboard" arrow>
                            <IconButton
                                size="small"
                                onClick={() => navigator.clipboard.writeText(value)}
                                sx={{
                                    color: 'primary.main',
                                    '&:hover': { color: 'primary.dark' },
                                }}
                            >
                                <Copy fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            )}
        </Stack>
    );
}

const SendMoneyModal = ({ open, onClose, onSubmit }) => {
    const wallets = JSON.parse(localStorage.getItem('user')).wallets;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" gutterBottom>Send Money</Typography>
                <SendMoneyForm wallets={wallets} onSubmit={onSubmit} />
            </Box>
        </Modal>
    );
};

const EditTransactionModal = ({ open, onClose, transaction, onSubmit }) => (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
            <Typography variant="h6" gutterBottom>Edit Transaction</Typography>
            <EditTransactionForm initialData={transaction} onSubmit={onSubmit} />
        </Box>
    </Modal>
);

const SendMoneyForm = ({ wallets, onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            from: wallets.length === 1 ? wallets[0].wallet_address : '',
            to: '',
            value: '',
            token: '',
            motif: '',
        },
        validationSchema: Yup.object({
            from: Yup.string().required('From wallet is required'),
            to: Yup.string().required('Recipient address is required'),
            value: Yup.number().required('Amount is required').positive('Amount must be a positive number'),
            token: Yup.string().required('Token type is required'),
        }),
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel shrink>From</InputLabel>
                    {wallets.length > 1 ? (
                        <Select
                            name="from"
                            value={formik.values.from}
                            onChange={formik.handleChange}
                            error={formik.touched.from && !!formik.errors.from}
                        >
                            {wallets.map((wallet) => (
                                <MenuItem key={wallet.wallet_id} value={wallet.wallet_address}>
                                    {wallet.wallet_address}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        <TextField
                            name="from"
                            value={formik.values.from}
                            InputProps={{ readOnly: true }}
                            error={formik.touched.from && !!formik.errors.from}
                            helperText={formik.touched.from && formik.errors.from}
                            fullWidth
                        />
                    )}
                </FormControl>

                <TextField
                    name="to"
                    label="Recipient Address"
                    value={formik.values.to}
                    onChange={formik.handleChange}
                    error={formik.touched.to && !!formik.errors.to}
                    helperText={formik.touched.to && formik.errors.to}
                    fullWidth
                />

                <TextField
                    name="value"
                    label="Amount"
                    value={formik.values.value}
                    onChange={formik.handleChange}
                    error={formik.touched.value && !!formik.errors.value}
                    helperText={formik.touched.value && formik.errors.value}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel>Token</InputLabel>
                    <Select
                        name="token"
                        value={formik.values.token}
                        onChange={formik.handleChange}
                        error={formik.touched.token && !!formik.errors.token}
                    >
                        <MenuItem value="USDC">USDC</MenuItem>
                        <MenuItem value="EURC">EURC</MenuItem>
                        <MenuItem value="Tether">Tether</MenuItem>
                        <MenuItem value="Bitcoin">Bitcoin</MenuItem>
                        <MenuItem value="Ethereum">Ethereum</MenuItem>
                        <MenuItem value="XRP">XRP</MenuItem>
                        <MenuItem value="Lisk">Lisk</MenuItem>
                        <MenuItem value="AXKCoin" disabled>
                            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                <Typography>AXKCoin</Typography>
                                <Box display="flex" alignItems="center">
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: 'error.main',
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            ml: 2,
                                        }}
                                    >
                                        Unavailable
                                    </Typography>
                                    <ErrorOutlineIcon
                                        sx={{
                                            fontSize: '1rem',
                                            color: 'error.main',
                                            ml: 1
                                        }}
                                    />
                                </Box>
                            </Box>
                        </MenuItem>
                    </Select>
                    {formik.touched.token && formik.errors.token && (
                        <FormHelperText>{formik.errors.token}</FormHelperText>
                    )}
                </FormControl>

                <TextField
                    name="motif"
                    label="Transaction Note (Optional)"
                    value={formik.values.motif}
                    onChange={formik.handleChange}
                    fullWidth
                />

                <Button type="submit" variant="contained" color="primary">
                    Send Money
                </Button>
            </Stack>
        </form>
    );
};

const EditTransactionForm = ({ initialData, onSubmit }) => {
    const formik = useFormik({
        initialValues: initialData || {
            to: '',
            value: '',
            token: '',
            motif: '',
        },
        validationSchema: Yup.object({
            to: Yup.string().required('Recipient address is required'),
            value: Yup.number().required('Amount is required').positive('Amount must be positive'),
            token: Yup.string().required('Token type is required'),
        }),
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    name="to"
                    label="Recipient Address"
                    value={formik.values.to}
                    onChange={formik.handleChange}
                    error={formik.touched.to && !!formik.errors.to}
                    helperText={formik.touched.to && formik.errors.to}
                    fullWidth
                />

                <TextField
                    name="value"
                    label="Amount"
                    value={formik.values.value}
                    onChange={formik.handleChange}
                    error={formik.touched.value && !!formik.errors.value}
                    helperText={formik.touched.value && formik.errors.value}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel>Token</InputLabel>
                    <Select
                        name="token"
                        value={formik.values.token}
                        onChange={formik.handleChange}
                        error={formik.touched.token && !!formik.errors.token}
                    >
                        <MenuItem value="USDC">USDC</MenuItem>
                        <MenuItem value="EURC">EURC</MenuItem>
                        <MenuItem value="Tether">Tether</MenuItem>
                        <MenuItem value="Bitcoin">Bitcoin</MenuItem>
                        <MenuItem value="Ethereum">Ethereum</MenuItem>
                        <MenuItem value="XRP">XRP</MenuItem>
                        <MenuItem value="Lisk">Lisk</MenuItem>
                        <MenuItem value="AXKCoin" disabled>
                            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                <Typography>AXKCoin</Typography>
                                <Box display="flex" alignItems="center">
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: 'error.main',
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            ml: 2,
                                        }}
                                    >
                                        Unavailable
                                    </Typography>
                                    <ErrorOutlineIcon
                                        sx={{
                                            fontSize: '1rem',
                                            color: 'error.main',
                                            ml: 1
                                        }}
                                    />
                                </Box>
                            </Box>
                        </MenuItem>
                    </Select>
                    {formik.touched.token && formik.errors.token && (
                        <FormHelperText>{formik.errors.token}</FormHelperText>
                    )}
                </FormControl>

                <TextField
                    name="motif"
                    label="Transaction Note (Optional)"
                    value={formik.values.motif}
                    onChange={formik.handleChange}
                    fullWidth
                />

                <Button type="submit" variant="contained" color="primary">
                    Save Changes
                </Button>
            </Stack>
        </form>
    );
};

SendMoneyForm.propTypes = {
    wallets: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

EditTransactionForm.propTypes = {
    initialData: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

ReactTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
};

export default FarmersMarketplace;