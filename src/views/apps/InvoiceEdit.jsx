'use client';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// material-ui
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import Box from '@mui/material/Box';

// third-party
import { v4 as UIDV4 } from 'uuid';
import { format } from 'date-fns';
import { FieldArray, Form, Formik } from 'formik';
import * as yup from 'yup';

// project-imports
import MainCard from 'components/MainCard';
import CircularLoader from 'components/CircularLoader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import InvoiceModal from 'sections/apps/invoice/InvoiceModal';
import AddressModal from 'sections/apps/invoice/AddressModal';

// Replace external APIs with static data
const dummyInvoiceMaster = {
  countries: [
    { code: 'US', label: 'United States', prefix: '$' },
    { code: 'RW', label: 'Rwanda', prefix: 'FRw' },
  ],
  country: { code: 'US', label: 'United States', prefix: '$' },
  isOpen: false,
  isCustomerOpen: false,
};

const dummyInvoices = [
  {
    id: '1',
    invoice_id: 'INV-001',
    status: 'Paid',
    date: '2023-12-20',
    due_date: '2024-01-20',
    cashierInfo: { name: 'John Doe', address: '123 Street', phone: '123456789', email: 'john@example.com' },
    customerInfo: { name: 'Jane Doe', address: '456 Avenue', phone: '987654321', email: 'jane@example.com' },
    invoice_detail: [
      { id: UIDV4(), name: 'Item 1', description: 'Description 1', qty: 2, price: 100 },
      { id: UIDV4(), name: 'Item 2', description: 'Description 2', qty: 1, price: 200 },
    ],
    discount: 10,
    tax: 5,
    notes: 'Thank you for your business!',
  },
];

const validationSchema = yup.object({
  date: yup.date().required('Invoice date is required'),
  due_date: yup
    .date()
    .when('date', (date, schema) => date && schema.min(date, "Due date can't be before invoice date"))
    .nullable()
    .required('Due date is required'),
  customerInfo: yup.object({
    name: yup.string().required('Invoice receiver information is required'),
  }).required('Invoice receiver information is required'),
  country: yup.object().nullable().required('Please select a currency'),
  status: yup.string().required('Status selection is required'),
  invoice_detail: yup.array()
    .of(yup.object({ name: yup.string().required('Product name is required') }))
    .min(1, 'Invoice must have at least 1 item')
    .required('Invoice details are required'),
});

// ==============================|| INVOICE EDIT - FORM ||============================== //

function EditForm({ list, invoiceMaster }) {
  const router = useRouter();

  const handlerEdit = (values) => {
    console.log('Updated Invoice:', values);
    router.push('/apps/invoice/list');
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: list.id || '',
        invoice_id: list.invoice_id || '',
        status: list.status || '',
        date: new Date(list.date) || null,
        due_date: new Date(list.due_date) || null,
        cashierInfo: list.cashierInfo || {},
        customerInfo: list.customerInfo || {},
        invoice_detail: list.invoice_detail || [],
        discount: list.discount || 0,
        tax: list.tax || 0,
        notes: list.notes || '',
        country: invoiceMaster.country || null,
      }}
      validationSchema={validationSchema}
      onSubmit={handlerEdit}
    >
      {({ handleChange, handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Invoice fields */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Status</InputLabel>
              <FormControl fullWidth>
                <Select name="status" value={values.status} onChange={handleChange}>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Unpaid">Unpaid</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="primary" variant="contained">
                Update Invoice
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

// ==============================|| INVOICE - EDIT ||============================== //

export default function EditInvoice({ id }) {
  const [list, setList] = useState(null);

  useEffect(() => {
    if (id) {
      setList(dummyInvoices.find((invoice) => invoice.id === id) || null);
    }
  }, [id]);

  const breadcrumbLinks = [
    { title: 'Home', to: '/' },
    { title: 'Invoice', to: '/apps/invoice/dashboard' },
    { title: 'Edit' },
  ];

  return (
    <>
      <Breadcrumbs custom heading="Edit Invoice" links={breadcrumbLinks} />
      <MainCard>{list ? <EditForm list={list} invoiceMaster={dummyInvoiceMaster} /> : <CircularLoader />}</MainCard>
    </>
  );
}

EditForm.propTypes = { list: PropTypes.object, invoiceMaster: PropTypes.object };
EditInvoice.propTypes = { id: PropTypes.string };
