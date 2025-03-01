'use client';
import PropTypes from 'prop-types';

import { useMemo, useEffect, useState } from 'react';

// next
import { useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

// third-party
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

// project-import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import EmptyTables from 'views/forms-tables/tables/react-table/EmptyTable';

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
import { Edit, Eye, InfoCircle } from 'iconsax-react';

export const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta(itemRank);
  return itemRank.passed;
};

const exactValueFilter = (row, columnId, filterValue) => {
  return String(row.getValue(columnId)) === String(filterValue);
};

function ExactValueFilter({ column: { filterValue, setFilter } }) {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder="Filter by exact value..."
    />
  );
}

function TableCellWithFilterComponent({ filterComponent, children, ...props }) {
  return (
    <TableCell {...props}>
      {children}
      {filterComponent && typeof filterComponent === 'object' && <Box mt={1}>{filterComponent}</Box>}
    </TableCell>
  );
}

const avatarImage = '/assets/images/users';

// ==============================|| REACT TABLE - LIST ||============================== //

function ReactTable({ data, columns }) {
  const groups = ['All', ...new Set(data.map((item) => item.transactionType))];

  const [activeTab, setActiveTab] = useState(groups[0]);
  const [sorting, setSorting] = useState([{ id: 'id', desc: false }]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
      rowSelection,
      globalFilter
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
    debugTable: true
  });

  useEffect(() => {
    setColumnFilters(activeTab === 'All' ? [] : [{ id: 'transactionType', value: activeTab }]);
  }, [activeTab]);

  return (
    <MainCard content={false}>
      <Box sx={{ p: 2.5, pb: 0, width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={(e, value) => setActiveTab(value)}
          sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTabs-scroller': { overflowX: 'auto !important' } }}
        >
          {groups.map((transactionType, index) => (
            <Tab key={index} label={transactionType} value={transactionType} />
          ))}
        </Tabs>
      </Box>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2.5 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
        />
      </Stack>
      <Stack>
        <RowSelection selected={Object.keys(rowSelection).length} />
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCellWithFilterComponent
                      key={header.id}
                      {...header.column.columnDef.meta}
                    >
                      {header.isPlaceholder ? null : (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                        </Stack>
                      )}
                    </TableCellWithFilterComponent>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCellWithFilterComponent key={cell.id} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCellWithFilterComponent>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </MainCard>
  );
}

// ==============================|| INVOICE - LIST ||============================== //

export default function List() {
  const mockData = [
    { id: 1, customer_name: 'John Doe', transactionType: 'Onramp', amount: 100, status: 'Completed', date: '2025-01-08' },
    { id: 2, customer_name: 'Jane Smith', transactionType: 'Offramp', amount: 200, status: 'Pending', date: '2025-01-07' },
    { id: 3, customer_name: 'Alex Brown', transactionType: 'Onramp', amount: 300, status: 'Failed', date: '2025-01-06' },
    { id: 4, customer_name: 'Emma Wilson', transactionType: 'Offramp', amount: 400, status: 'Completed', date: '2025-01-05' },
    { id: 5, customer_name: 'Liam Johnson', transactionType: 'Onramp', amount: 150, status: 'Completed', date: '2025-01-04' }
  ];

  const columns = useMemo(
    () => [
      {
        header: 'Transaction ID',
        accessorKey: 'id',
        meta: { className: 'cell-center' }
      },
      {
        header: 'User Info',
        accessorKey: 'customer_name'
      },
      {
        header: 'Transaction Type',
        accessorKey: 'transactionType'
      },
      {
        header: 'Amount ($)',
        accessorKey: 'amount'
      },
      {
        header: 'Status',
        accessorKey: 'status'
      },
      {
        header: 'Date',
        accessorKey: 'date'
      }
    ],
    []
  );

  return <ReactTable data={mockData} columns={columns} />;
}

ReactTable.propTypes = { data: PropTypes.array, columns: PropTypes.array };
