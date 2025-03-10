'use client';
import PropTypes from 'prop-types';

import { useMemo, Fragment, useState } from 'react';

// next
import { useRouter } from 'next/navigation';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import capitalize from '@mui/utils/capitalize';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

// project-imports
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import ProductView from 'sections/apps/e-commerce/product-list/ProductView';
import EmptyTables from 'views/forms-tables/tables/react-table/EmptyTable';

import {
  DebouncedInput,
  HeaderSort,
  IndeterminateCheckbox,
  RowSelection,
  SelectColumnSorting,
  TablePagination
} from 'components/third-party/react-table';

// assets
import { Add, Edit, Eye, Trash } from 'iconsax-react';

const productImage = '/assets/images/e-commerce';

export const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta(itemRank);
  return itemRank.passed;
};

// ==============================|| REACT TABLE - LIST ||============================== //

function ReactTable({ data, columns }) {
  const theme = useTheme();
  const sortBy = { id: 'id', desc: false };

  const [sorting, setSorting] = useState([{ id: 'name', desc: false }]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, globalFilter },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getRowCanExpand: () => true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    globalFilterFn: fuzzyFilter,
    debugTable: true,
  });

  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  const router = useRouter();

  const handleAddProduct = () => {
    router.push(`/apps/e-commerce/add-new-product`);
  };

  return (
    <MainCard content={false}>
      <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap" justifyContent="space-between" sx={{ p: 3 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
        />
        <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center">
          <SelectColumnSorting
            sortBy={sortBy.id}
            {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }}
          />
          <Button variant="contained" sx={{ textWrap: 'nowrap' }} startIcon={<Add />} onClick={handleAddProduct} size="large">
            Add Product
          </Button>
        </Stack>
      </Stack>
      <ScrollX>
        <Stack>
          <RowSelection selected={Object.keys(rowSelection).length} />
          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} {...header.column.columnDef.meta}>
                        {header.isPlaceholder ? null : (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                            {header.column.getCanSort() && <HeaderSort column={header.column} />}
                          </Stack>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                      <TableRow sx={{ '&:hover': { bgcolor: `${backColor} !important` } }}>
                        <TableCell colSpan={row.getVisibleCells().length}>
                          <ProductView data={row.original} />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
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
                initialPageSize: 10,
              }}
            />
          </Box>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| PRODUCT LIST ||============================== //

export default function ProductList() {
  const mockProducts = [
    {
      id: 1,
      name: 'Product A',
      description: 'Description A',
      categories: ['electronics', 'home'],
      offerPrice: 100,
      quantity: 10,
      isStock: true,
      image: 'prod-11.png',
    },
    {
      id: 2,
      name: 'Product B',
      description: 'Description B',
      categories: ['fashion', 'clothing'],
      offerPrice: 50,
      quantity: 5,
      isStock: false,
      image: 'prod-12.png',
    },
  ];

  const columns = useMemo(
    () => [
      {
        id: 'Row Selection',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        header: '#',
        accessorKey: 'id',
      },
      {
        header: 'Product Detail',
        accessorKey: 'name',
        cell: ({ row, getValue }) => (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              variant="rounded"
              alt={getValue()}
              src={`${productImage}/thumbs/${row.original.image}`}
            />
            <Stack spacing={0}>
              <Typography variant="subtitle1">{getValue()}</Typography>
              <Typography variant="caption" color="text.secondary">
                {row.original.description}
              </Typography>
            </Stack>
          </Stack>
        ),
      },
      {
        header: 'Categories',
        accessorKey: 'categories',
        cell: ({ row }) => (
          <Stack direction="row" spacing={0.25}>
            {row.original.categories.map((item, index) => (
              <Typography key={index} variant="h6">
                {capitalize(item)}
                {index < row.original.categories.length - 1 ? ',' : ''}
              </Typography>
            ))}
          </Stack>
        ),
      },
      {
        header: 'Price',
        accessorKey: 'offerPrice',
        cell: ({ getValue }) => <NumericFormat value={getValue()} displayType="text" thousandSeparator prefix="$" />,
      },
      {
        header: 'Qty',
        accessorKey: 'quantity',
      },
      {
        header: 'Status',
        accessorKey: 'isStock',
        cell: ({ getValue }) => (
          <Chip color={getValue() ? 'success' : 'error'} label={getValue() ? 'In Stock' : 'Out of Stock'} />
        ),
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            <Tooltip title="View">
              <IconButton onClick={row.getToggleExpandedHandler()}>{row.getIsExpanded() ? <Add /> : <Eye />}</IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <Trash />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    []
  );

  return <ReactTable data={mockProducts} columns={columns} />;
}

ReactTable.propTypes = { data: PropTypes.array, columns: PropTypes.array };
