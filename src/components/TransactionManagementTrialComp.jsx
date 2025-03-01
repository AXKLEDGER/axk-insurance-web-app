'use client';

import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    CircularProgress,
    FormHelperText
} from '@mui/material';
import { Add, Edit, Eye } from 'iconsax-react';

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

const truncateText = (text) => `${text.slice(0, 6)}...${text.slice(-4)}`;

const mockData = Array.from({ length: 20 }, (_, i) => ({
    id: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
    type: i % 2 === 0 ? 'Send' : 'Receive',
    from: `0x${Math.random().toString(16).slice(2, 10)}`,
    to: `0x${Math.random().toString(16).slice(2, 10)}`,
    value: `${(Math.random() * 10).toFixed(2)} ETH`,
    status: ['Completed', 'Pending', 'Failed'][i % 3],
    timestamp: `2025-01-${String(i + 1).padStart(2, '0')} 14:${String(i % 60).padStart(2, '0')}:23`,
}));

function TransactionManagement() {
    const [transactions, setTransactions] = useState(mockData);
    const [activeTab, setActiveTab] = useState('All');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const filteredData = useMemo(() => {
        return activeTab === 'All'
            ? transactions
            : transactions.filter((txn) => txn.status === activeTab);
    }, [activeTab, transactions]);

    const tabs = ['All', 'Completed', 'Pending', 'Failed'];

    const handleAddTransaction = () => {
        setEditData(null);
        setOpenModal(true);
    };

    const handleSaveTransaction = (newTransaction) => {
        if (editData) {
            setTransactions((prev) =>
                prev.map((txn) => (txn.id === editData.id ? newTransaction : txn))
            );
        } else {
            setTransactions((prev) => [...prev, newTransaction]);
        }
        setSnackbarMessage('Transaction saved successfully!');
        setSnackbarOpen(true);
        setOpenModal(false);
    };

    return (
        <Box>
            <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{ mb: 2 }}>
                {tabs.map((tab) => (
                    <Tab key={tab} label={tab} value={tab} />
                ))}
            </Tabs>

            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddTransaction}
                sx={{ mb: 2 }}
            >
                Add Transaction
            </Button>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Transaction Hash</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>To</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Tooltip title={row.id} arrow>
                                        <Typography
                                            onClick={() => {
                                                navigator.clipboard.writeText(row.id);
                                                setSnackbarMessage('Transaction Hash copied to clipboard!');
                                                setSnackbarOpen(true);
                                            }}
                                            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            {truncateText(row.id)}
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{truncateText(row.from)}</TableCell>
                                <TableCell>{truncateText(row.to)}</TableCell>
                                <TableCell>{row.value}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        color={
                                            row.status === 'Completed'
                                                ? 'success'
                                                : row.status === 'Pending'
                                                    ? 'warning'
                                                    : 'error'
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setEditData(row)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton>
                                        <Eye />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={modalStyle}>
                    <TransactionForm
                        initialData={editData}
                        onSubmit={(values) => handleSaveTransaction(values)}
                    />
                </Box>
            </Modal>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Box>
    );
}

function TransactionForm({ initialData, onSubmit }) {
    const [formData, setFormData] = useState(
        initialData || {
            id: '',
            type: '',
            from: '',
            to: '',
            value: '',
            status: '',
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    name="id"
                    label="Transaction Hash"
                    value={formData.id}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select name="type" value={formData.type} onChange={handleChange}>
                        <MenuItem value="Send">Send</MenuItem>
                        <MenuItem value="Receive">Receive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="from"
                    label="From Address"
                    value={formData.from}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    name="to"
                    label="To Address"
                    value={formData.to}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    name="value"
                    label="Value"
                    value={formData.value}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Failed">Failed</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained">
                    Save
                </Button>
            </Stack>
        </form>
    );
}

TransactionForm.propTypes = {
    initialData: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

ReactTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
};

export default TransactionManagement;