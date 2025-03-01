'use client';
import PropTypes from 'prop-types';

import { useMemo, useState, Fragment } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// third-party
import { flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';

// project-import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

import {
  CSVExport,
  DebouncedInput,
  HeaderSort,
  IndeterminateCheckbox,
  RowSelection,
  SelectColumnSorting,
  TablePagination
} from 'components/third-party/react-table';
import EmptyTables from 'views/forms-tables/tables/react-table/EmptyTable';

const mockTransactions = [
  {
    txnHash: '0x0b2505B77e183E029F42237550ca658D1387DB8F',
    from: '0x123...abcd',
    to: '0x987...wxyz',
    amount: '50 USDT',
    type: 'Send',
    date: '2025-01-09'
  },
  {
    txnHash: '0x9f2505B77e183E029F42237550ca658D1387DC7E',
    from: '0x456...efgh',
    to: '0x654...mnop',
    amount: '120 USDT',
    type: 'Receive',
    date: '2025-01-08'
  },
  {
    txnHash: '0x8a1505B77e183E029F42237550ca658D1387DB3F',
    from: '0x789...ijkl',
    to: '0x321...qrst',
    amount: '75 USDT',
    type: 'Send',
    date: '2025-01-07'
  }
];

// ==============================|| REACT TABLE - TRANSACTIONS ||============================== //

function ReactTable({ data, columns }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [sorting, setSorting] = useState([{ id: 'date', desc: true }]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <MainCard content={false}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" sx={{ padding: 3 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} transactions...`}
        />
        <CSVExport
          {...{
            data: table.getSelectedRowModel().flatRows.map((row) => row.original),
            filename: 'transactions.csv'
          }}
        />
      </Stack>
      <ScrollX>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && <HeaderSort column={header.column} />}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === 'txnHash' || cell.column.id === 'from' || cell.column.id === 'to' ? (
                        <Tooltip title={cell.getValue()} arrow>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                              sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: theme.palette.primary.main,
                                fontWeight: 500,
                                transition: 'color 0.2s',
                                '&:hover': { color: theme.palette.primary.dark },
                              }}
                            >
                              {cell.getValue().substring(0, 6)}...{cell.getValue().substring(cell.getValue().length - 4)}
                            </Typography>
                            <IconButton size="small" onClick={() => handleCopy(cell.getValue())}>
                              <ContentCopyIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                            </IconButton>
                          </Box>
                        </Tooltip>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
      <Box sx={{ p: 2 }}>
        <TablePagination
          {...{
            setPageSize: table.setPageSize,
            setPageIndex: table.setPageIndex,
            getState: table.getState,
            getPageCount: table.getPageCount
          }}
        />
      </Box>
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message="Copied to clipboard!"
        autoHideDuration={3000}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CheckCircleOutlineIcon fontSize="small" />
          </IconButton>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </MainCard>
  );
}

// ==============================|| TRANSACTION LIST ||============================== //

export default function TransactionList() {
  const columns = useMemo(
    () => [
      {
        header: 'Txn Hash',
        accessorKey: 'txnHash',
        cell: ({ getValue }) => getValue()
      },
      {
        header: 'From',
        accessorKey: 'from',
        cell: ({ getValue }) => getValue()
      },
      {
        header: 'To',
        accessorKey: 'to',
        cell: ({ getValue }) => getValue()
      },
      {
        header: 'Amount',
        accessorKey: 'amount'
      },
      {
        header: 'Type',
        accessorKey: 'type'
      },
      {
        header: 'Date',
        accessorKey: 'date'
      }
    ],
    []
  );

  return <ReactTable data={mockTransactions} columns={columns} />;
}

ReactTable.propTypes = { data: PropTypes.array, columns: PropTypes.array };
