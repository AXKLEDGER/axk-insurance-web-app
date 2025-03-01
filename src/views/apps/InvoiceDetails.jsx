'use client';
import PropTypes from 'prop-types';

import { useEffect, useState, useRef } from 'react';

// next
import { useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';

// third-party
import ReactToPrint from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';

// project-imports
import MainCard from 'components/MainCard';
import LogoSection from 'components/logo';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import LoadingButton from 'components/@extended/LoadingButton';

import { APP_DEFAULT_PATH } from 'config';
import ExportPDFView from 'sections/apps/invoice/export-pdf';

// assets
import { DocumentDownload, Edit, Printer, Share } from 'iconsax-react';

function PDFIconButton({ list }) {
  const theme = useTheme();
  return (
    <PDFDownloadLink document={<ExportPDFView list={list} />} fileName={`${list.invoice_id}-${list.customer_name}.pdf`}>
      <IconButton>
        <DocumentDownload color={theme.palette.text.secondary} />
      </IconButton>
    </PDFDownloadLink>
  );
}

export default function Details({ id }) {
  const theme = useTheme();
  const router = useRouter();

  // Replace dynamic fetching with hardcoded data or local state
  const [invoiceLoading, setInvoiceLoading] = useState(true);
  const [invoiceMasterLoading, setInvoiceMasterLoading] = useState(true);
  const [invoice, setInvoice] = useState([]);
  const [invoiceMaster, setInvoiceMaster] = useState({});
  const [list, setList] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setInvoiceLoading(false);
      setInvoiceMasterLoading(false);
      setInvoice([{ id: id, invoice_id: 'INV123', customer_name: 'John Doe', date: '2023-12-01', due_date: '2023-12-10', tax: 10, discount: 5, invoice_detail: [{ name: 'Product A', description: 'Description A', qty: 2, price: 100 }] }]);
      setInvoiceMaster({ country: { prefix: '$' } });
      setList({ id: id, invoice_id: 'INV123', customer_name: 'John Doe', date: '2023-12-01', due_date: '2023-12-10', tax: 10, discount: 5, invoice_detail: [{ name: 'Product A', description: 'Description A', qty: 2, price: 100 }] });
    }, 1000);
  }, [id]);

  const today = new Date(`${list?.date}`).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  const due_dates = new Date(`${list?.due_date}`).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  const subtotal = list?.invoice_detail?.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  const taxRate = (Number(list?.tax) * subtotal) / 100;
  const discountRate = (Number(list?.discount) * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;
  const componentRef = useRef(null);

  const isLoader = invoiceLoading || invoiceMasterLoading || !invoiceMaster || list === null;

  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Invoice', to: '/apps/invoice/dashboard' },
    { title: 'Details' },
  ];

  const iconColor = theme.palette.text.secondary;

  return (
    <>
      <Breadcrumbs custom heading="Invoice Summary" links={breadcrumbLinks} />
      <MainCard content={false}>
        <Stack spacing={2.5}>
          <Box sx={{ p: 2.5, pb: 0 }}>
            <MainCard content={false} border={false} sx={{ p: 1.25, bgcolor: 'secondary.lighter' }}>
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <IconButton onClick={() => router.push(`/apps/invoice/edit/${id}`)}>
                  <Edit color={iconColor} />
                </IconButton>
                {isLoader ? <LoadingButton loading>X</LoadingButton> : <PDFIconButton {...{ list }} />}
                <ReactToPrint
                  trigger={() => (
                    <IconButton>
                      <Printer color={iconColor} />
                    </IconButton>
                  )}
                  content={() => componentRef.current}
                />
                <IconButton>
                  <Share color={iconColor} />
                </IconButton>
              </Stack>
            </MainCard>
          </Box>
          <Box sx={{ p: 2.5 }} id="print" ref={componentRef}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                  <Box>
                    <Stack direction="row" spacing={2}>
                      <LogoSection />
                      <Chip label="Paid" variant="light" color="success" size="small" />
                    </Stack>
                    <Typography color="secondary">{isLoader ? <Skeleton /> : `#${list.invoice_id}`}</Typography>
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Typography variant="subtitle1">Date</Typography>
                      <Typography color="secondary">{today}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Typography sx={{ overflow: 'hidden' }} variant="subtitle1">
                        Due Date
                      </Typography>
                      <Typography color="secondary">{due_dates}</Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Stack spacing={1}>
                    <Typography variant="h5">From:</Typography>
                    {isLoader ? (
                      <Stack spacing={0.5}>
                        <Skeleton />
                        <Skeleton width={60} />
                        <Skeleton />
                      </Stack>
                    ) : (
                      <FormControl sx={{ width: '100%' }}>
                        <Typography color="secondary">Company Name</Typography>
                        <Typography color="secondary">Company Address</Typography>
                        <Typography color="secondary">1234567890</Typography>
                        <Typography color="secondary">email@example.com</Typography>
                      </FormControl>
                    )}
                  </Stack>
                </MainCard>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Stack spacing={1}>
                    <Typography variant="h5">To:</Typography>
                    {isLoader ? (
                      <Stack spacing={0.5}>
                        <Skeleton />
                        <Skeleton width={60} />
                        <Skeleton />
                      </Stack>
                    ) : (
                      <FormControl sx={{ width: '100%' }}>
                        <Typography color="secondary">{list.customer_name}</Typography>
                        <Typography color="secondary">Customer Address</Typography>
                        <Typography color="secondary">1234567890</Typography>
                        <Typography color="secondary">customer@example.com</Typography>
                      </FormControl>
                    )}
                  </Stack>
                </MainCard>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </MainCard>
    </>
  );
}

PDFIconButton.propTypes = { list: PropTypes.any };

Details.propTypes = { id: PropTypes.string };
