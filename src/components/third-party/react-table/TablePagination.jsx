'use client';
import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import {
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  TextField
} from '@mui/material';

export default function TablePagination({
  getPageCount,
  setPageIndex,
  setPageSize,
  getState,
  initialPageSize = 10,
  totalRecords = 0
}) {
  const [open, setOpen] = useState(false);
  const [goToPage, setGoToPage] = useState('');

  // Calculate valid options for rows per page
  const options = useMemo(() => {
    const defaultOptions = [10, 25, 50, 100];
    if (totalRecords === 0) return defaultOptions;
    return defaultOptions.filter(option => option <= Math.max(totalRecords, 10));
  }, [totalRecords]);

  // Initialize page size
  useEffect(() => {
    if (!getState().pagination?.pageSize) {
      const defaultPageSize = Math.min(initialPageSize, Math.max(totalRecords, 10));
      setPageSize(defaultPageSize);
    }
  }, [initialPageSize, totalRecords, setPageSize, getState]);

  const handleChangePagination = (event, value) => {
    if (value > 0 && value <= getPageCount()) {
      setPageIndex(value - 1);
    }
  };

  const handleChange = (event) => {
    const newSize = Number(event.target.value);
    if (newSize > 0) {
      setPageSize(newSize);
      setPageIndex(0);
    }
  };

  const handleGoToPageChange = (event) => {
    const value = event.target.value;
    setGoToPage(value);

    const pageNumber = parseInt(value, 10);
    if (pageNumber > 0 && pageNumber <= getPageCount()) {
      setPageIndex(pageNumber - 1);
    }
  };

  // Get current pagination state
  const pagination = getState().pagination || { pageSize: initialPageSize, pageIndex: 0 };
  const currentPageSize = pagination.pageSize || initialPageSize;
  const currentPageIndex = pagination.pageIndex || 0;
  const pageCount = Math.max(1, getPageCount());

  // Calculate displayed rows range
  const startRecord = currentPageIndex * currentPageSize + 1;
  const endRecord = Math.min((currentPageIndex + 1) * currentPageSize, totalRecords);

  return (
    <Grid container alignItems="center" justifyContent="space-between" sx={{ width: 'auto' }}>
      <Grid item>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="secondary">
              Rows per page
            </Typography>
            <FormControl sx={{ minWidth: 80 }}>
              <Select
                id="rows-per-page-select"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                value={currentPageSize}
                onChange={handleChange}
                size="small"
                sx={{ '& .MuiSelect-select': { py: 0.75, px: 1.25 } }}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="secondary">
              Go to page
            </Typography>
            <TextField
              size="small"
              value={goToPage}
              onChange={handleGoToPageChange}
              sx={{
                width: '60px',
                '& .MuiInputBase-input': {
                  py: 0.75,
                  px: 1.25,
                  textAlign: 'center'
                }
              }}
              inputProps={{
                min: 1,
                max: pageCount,
                type: 'number'
              }}
            />
          </Stack>
          <Typography variant="caption" color="secondary">
            {startRecord}-{endRecord} of {totalRecords}
          </Typography>
        </Stack>
      </Grid>
      <Grid item>
        <Pagination
          count={pageCount}
          page={currentPageIndex + 1}
          onChange={handleChangePagination}
          color="primary"
          variant="combined"
          showFirstButton
          showLastButton
          siblingCount={1}
        />
      </Grid>
    </Grid>
  );
}

TablePagination.propTypes = {
  getPageCount: PropTypes.func.isRequired,
  setPageIndex: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  initialPageSize: PropTypes.number,
  totalRecords: PropTypes.number
};