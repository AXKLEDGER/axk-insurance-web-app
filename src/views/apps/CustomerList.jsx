'use client';
import PropTypes from 'prop-types';

import { useMemo, useState, Fragment, useCallback, useEffect } from 'react';

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

// third-party
import { PatternFormat } from 'react-number-format';
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
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';

import CustomerModal from 'sections/apps/customer/CustomerModal';
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';
import CustomerView from 'sections/apps/customer/CustomerView';

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

import { ThemeMode } from 'config';

// assets
import { Add, Edit, Eye, Trash } from 'iconsax-react';

// Mock data
const mockCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    contact: '1234567890',
    age: 30,
    country: 'USA',
    status: 1,
    avatar: 1
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    contact: '9876543210',
    age: 25,
    country: 'Canada',
    status: 2,
    avatar: 2
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    contact: '5432167890',
    age: 35,
    country: 'UK',
    status: 1,
    avatar: 3
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    contact: '6574839201',
    age: 28,
    country: 'Australia',
    status: 2,
    avatar: 4
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    contact: '5639281045',
    age: 40,
    country: 'USA',
    status: 1,
    avatar: 5
  },
  {
    id: 6,
    name: 'Sophia Martinez',
    email: 'sophia.martinez@example.com',
    contact: '9123048576',
    age: 22,
    country: 'Mexico',
    status: 2,
    avatar: 6
  },
  {
    id: 7,
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    contact: '7401827593',
    age: 38,
    country: 'USA',
    status: 1,
    avatar: 7
  },
  {
    id: 8,
    name: 'Olivia Taylor',
    email: 'olivia.taylor@example.com',
    contact: '6438925710',
    age: 26,
    country: 'Canada',
    status: 2,
    avatar: 8
  },
  {
    id: 9,
    name: 'William Moore',
    email: 'william.moore@example.com',
    contact: '9301876342',
    age: 45,
    country: 'Germany',
    status: 1,
    avatar: 9
  },
  {
    id: 10,
    name: 'Ava Jackson',
    email: 'ava.jackson@example.com',
    contact: '5867320914',
    age: 29,
    country: 'USA',
    status: 2,
    avatar: 10
  },
  {
    id: 11,
    name: 'Lucas Martin',
    email: 'lucas.martin@example.com',
    contact: '7453826197',
    age: 32,
    country: 'Brazil',
    status: 1,
    avatar: 11
  },
  {
    id: 12,
    name: 'Charlotte Lee',
    email: 'charlotte.lee@example.com',
    contact: '5478291038',
    age: 24,
    country: 'UK',
    status: 2,
    avatar: 12
  },
  {
    id: 13,
    name: 'Elijah Harris',
    email: 'elijah.harris@example.com',
    contact: '6348597201',
    age: 36,
    country: 'Australia',
    status: 1,
    avatar: 13
  },
  {
    id: 14,
    name: 'Amelia Clark',
    email: 'amelia.clark@example.com',
    contact: '7594832160',
    age: 27,
    country: 'New Zealand',
    status: 2,
    avatar: 14
  },
  {
    id: 15,
    name: 'Ethan Lewis',
    email: 'ethan.lewis@example.com',
    contact: '4129537860',
    age: 31,
    country: 'USA',
    status: 1,
    avatar: 15
  },
  {
    id: 16,
    name: 'Mason Walker',
    email: 'mason.walker@example.com',
    contact: '5029173846',
    age: 33,
    country: 'Canada',
    status: 1,
    avatar: 16
  },
  {
    id: 17,
    name: 'Isabella Young',
    email: 'isabella.young@example.com',
    contact: '6823419573',
    age: 27,
    country: 'Australia',
    status: 2,
    avatar: 17
  },
  {
    id: 18,
    name: 'Jackson King',
    email: 'jackson.king@example.com',
    contact: '9182306475',
    age: 40,
    country: 'USA',
    status: 1,
    avatar: 18
  },
  {
    id: 19,
    name: 'Mia Scott',
    email: 'mia.scott@example.com',
    contact: '5246093182',
    age: 31,
    country: 'UK',
    status: 2,
    avatar: 19
  },
  {
    id: 20,
    name: 'Sebastian White',
    email: 'sebastian.white@example.com',
    contact: '6725480391',
    age: 29,
    country: 'Germany',
    status: 1,
    avatar: 20
  },
  {
    id: 21,
    name: 'Zoe Adams',
    email: 'zoe.adams@example.com',
    contact: '9136540287',
    age: 25,
    country: 'Brazil',
    status: 2,
    avatar: 21
  },
  {
    id: 22,
    name: 'Liam Nelson',
    email: 'liam.nelson@example.com',
    contact: '7439261584',
    age: 34,
    country: 'France',
    status: 1,
    avatar: 22
  },
  {
    id: 23,
    name: 'Amos Robinson',
    email: 'amos.robinson@example.com',
    contact: '6198357420',
    age: 39,
    country: 'South Africa',
    status: 2,
    avatar: 23
  },
  {
    id: 24,
    name: 'Layla Evans',
    email: 'layla.evans@example.com',
    contact: '5037682190',
    age: 28,
    country: 'USA',
    status: 1,
    avatar: 24
  },
  {
    id: 25,
    name: 'Oliver Harris',
    email: 'oliver.harris@example.com',
    contact: '6728395041',
    age: 32,
    country: 'New Zealand',
    status: 2,
    avatar: 25
  }
];

// Constants
const AVATAR_PATH = '/assets/images/users';
const STATUS_CONFIG = {
  1: { color: 'success', label: 'Verified' },
  2: { color: 'warning', label: 'Pending' },
  3: { color: 'error', label: 'Rejected' },
  default: { color: 'default', label: 'Unknown' }
};

// PropTypes
const CustomerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  status: PropTypes.oneOf([1, 2, 3]).isRequired,
  avatar: PropTypes.number.isRequired
});

const TablePropTypes = {
  data: PropTypes.arrayOf(CustomerType).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      accessorKey: PropTypes.string,
      cell: PropTypes.func
    })
  ).isRequired,
  modalToggler: PropTypes.func.isRequired
};

function ReactTable({ data, columns, modalToggler }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (statusFilter !== '') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    if (globalFilter) {
      const searchTerm = globalFilter.toLowerCase();
      filtered = filtered.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm) ||
          item.contact.includes(searchTerm) ||
          item.country.toLowerCase().includes(searchTerm) ||
          item.age.toString().includes(searchTerm)
        );
      });
    }

    return filtered;
  }, [data, statusFilter, globalFilter]);

  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      pageIndex: 0
    }));
  }, [globalFilter, statusFilter, columnFilters]);

  const headers = useMemo(() =>
    columns
      .filter(col => col.accessorKey)
      .map(col => ({
        label: typeof col.header === 'string' ? col.header : '#',
        key: col.accessorKey
      }))
    , [columns]);

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
    manualPagination: false,
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
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      size: 150,
      minSize: 50,
      maxSize: 400,
    }
  });

  const handleGlobalFilter = useCallback((value) => {
    setGlobalFilter(String(value));
  }, []);

  const handleStatusFilter = useCallback((event) => {
    setStatusFilter(event.target.value);
  }, []);

  const getExportData = useCallback(() => {
    const selectedRows = table.getSelectedRowModel().flatRows;
    return selectedRows.length === 0
      ? data
      : selectedRows.map(row => row.original);
  }, [table, data]);

  return (
    <MainCard content={false}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        sx={{
          padding: 3,
          ...(matchDownSM && {
            '& .MuiOutlinedInput-root, & .MuiFormControl-root': {
              width: '100%'
            }
          })
        }}
      >
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={handleGlobalFilter}
          placeholder={`Search ${filteredData.length} records...`}
          aria-label="Search records"
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          spacing={2}
        >
          <Select
            value={statusFilter}
            onChange={handleStatusFilter}
            displayEmpty
            aria-label="Status Filter"
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value={1}>Verified</MenuItem>
            <MenuItem value={2}>Pending</MenuItem>
            <MenuItem value={3}>Rejected</MenuItem>
          </Select>

          <SelectColumnSorting
            {...{
              getState: table.getState,
              getAllColumns: table.getAllColumns,
              setSorting
            }}
          />

          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={modalToggler}
              size="large"
              aria-label="Add Customer"
            >
              Add Customer
            </Button>

            <CSVExport
              data={getExportData()}
              headers={headers}
              filename="customer-list.csv"
            />
          </Stack>
        </Stack>
      </Stack>

      <ScrollX>
        <Stack>
          <RowSelection selected={Object.keys(rowSelection).length} />
          <TableContainer>
            <Table aria-label="Customer table">
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
                        aria-sort={header.column.getIsSorted() || undefined}
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
                      <Typography variant="h6">No matching records found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                      <TableRow>
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          sx={{ p: 2.5 }}
                        >
                          <CustomerView data={row.original} />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                )))}
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
export default function CustomerListPage() {
  const [open, setOpen] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerDeleteId, setCustomerDeleteId] = useState('');

  const handleClose = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleEdit = useCallback((customer) => {
    setSelectedCustomer(customer);
    setCustomerModal(true);
  }, []);

  const handleDelete = useCallback((id) => {
    setCustomerDeleteId(id);
    setOpen(true);
  }, []);

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              alt={row.original.name}
              src={`${AVATAR_PATH}/${row.original.avatar}`}
              size="sm"
            />
            <Typography variant="subtitle1">{row.original.name}</Typography>
          </Stack>
        )
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: ({ row }) => (
          <Typography variant="subtitle1">{row.original.email}</Typography>
        )
      },
      {
        header: 'Contact',
        accessorKey: 'contact',
        cell: ({ row }) => (
          <Typography variant="subtitle1">
            <PatternFormat
              displayType="text"
              format="+1 (###) ###-####"
              value={row.original.contact}
            />
          </Typography>
        )
      },
      {
        header: 'Age',
        accessorKey: 'age',
        cell: ({ row }) => (
          <Typography variant="subtitle1">{row.original.age}</Typography>
        )
      },
      {
        header: 'Country',
        accessorKey: 'country',
        cell: ({ row }) => (
          <Typography variant="subtitle1">{row.original.country}</Typography>
        )
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const { color, label } = STATUS_CONFIG[row.original.status] ||
            STATUS_CONFIG.default;

          return (
            <Chip
              color={color}
              label={label}
              size="small"
              variant="light"
              aria-label={`Status: ${label}`}
            />
          );
        }
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="View">
              <IconButton
                color="secondary"
                onClick={() => row.toggleExpanded()}
                aria-label="View customer details"
              >
                <Eye />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                onClick={() => handleEdit(row.original)}
                aria-label="Edit customer"
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => handleDelete(row.original.id)}
                aria-label="Delete customer"
              >
                <Trash />
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
        data={mockCustomers}
        columns={columns}
        modalToggler={() => {
          setCustomerModal(true);
          setSelectedCustomer(null);
        }}
      />
      <AlertCustomerDelete
        id={Number(customerDeleteId)}
        title={customerDeleteId}
        open={open}
        handleClose={handleClose}
      />
      <CustomerModal
        open={customerModal}
        modalToggler={setCustomerModal}
        customer={selectedCustomer}
      />
    </>
  );
}