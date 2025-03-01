'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// material-ui
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// ==============================|| COLUMN SORTING - SELECT ||============================== //

export default function SelectColumnSorting({ sortBy, getAllColumns, setSorting }) {
  const [sort, setSort] = useState(sortBy || '');

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setSort(value);
    setSorting(value ? [{ id: value, desc: false }] : []);
  };

  return (
    <FormControl sx={{ width: 200 }}>
      <Select
        id="column-sorting"
        displayEmpty
        onChange={handleChange}
        value={sort}
        input={<OutlinedInput id="select-column-sorting" placeholder="select column" />}
        renderValue={(selected) => {
          if (!selected) {
            return <Typography variant="subtitle2">Sort By</Typography>;
          }

          const selectedColumn = getAllColumns().find((column) => column.id === selected);
          if (selectedColumn) {
            return (
              <Typography variant="subtitle2">
                Sort by ({typeof selectedColumn.columnDef.header === 'string' ? selectedColumn.columnDef.header : '#'})
              </Typography>
            );
          }

          return <Typography variant="subtitle2">Sort By</Typography>;
        }}
      >
        {getAllColumns()
          .filter((column) => column.columnDef.accessorKey && column.getCanSort())
          .map((column) => (
            <MenuItem key={column.id} value={column.id}>
              <ListItemText
                primary={typeof column.columnDef.header === 'string' ? column.columnDef.header : '#'}
              />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

SelectColumnSorting.propTypes = {
  sortBy: PropTypes.string,
  getAllColumns: PropTypes.func.isRequired,
  setSorting: PropTypes.func.isRequired
};