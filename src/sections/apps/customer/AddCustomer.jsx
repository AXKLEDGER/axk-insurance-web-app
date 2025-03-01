import { useEffect, useMemo, useState } from 'react';

// material-ui
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project-imports
import FormCustomerAdd from './FormCustomerAdd';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

export default function AddCustomer() {
  // Replace dynamic customer fetching with local state or mock data
  const [customerMasterLoading, setCustomerMasterLoading] = useState(false);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [customerMaster, setCustomerMaster] = useState({ modal: null });
  const [customers, setCustomers] = useState([]);
  const [list, setList] = useState(null);

  useEffect(() => {
    // Mock or load customer data
    const mockCustomerMaster = { modal: null }; // Replace with actual data or logic
    const mockCustomers = []; // Replace with actual data or logic

    setCustomerMaster(mockCustomerMaster);
    setCustomers(mockCustomers);
    setCustomerMasterLoading(false);
    setCustomersLoading(false);
  }, []);

  const isModal = customerMaster?.modal;

  useEffect(() => {
    if (customerMaster?.modal && typeof customerMaster.modal === 'number') {
      const newList = customers.find((info) => info.id === isModal);
      setList(newList || null);
    } else {
      setList(null);
    }
  }, [customerMaster, customers, isModal]);

  const closeModal = () => {
    setCustomerMaster({ ...customerMaster, modal: null });
  };

  const customerForm = useMemo(
    () =>
      !customersLoading &&
      !customerMasterLoading && (
        <FormCustomerAdd customer={list} closeModal={closeModal} />
      ),
    [list, customersLoading, customerMasterLoading]
  );

  return (
    <>
      {isModal && (
        <Modal
          open={true}
          onClose={closeModal}
          aria-labelledby="modal-customer-add-label"
          aria-describedby="modal-customer-add-description"
          sx={{ '& .MuiPaper-root:focus': { outline: 'none' } }}
        >
          <MainCard
            sx={{
              width: `calc(100% - 48px)`,
              minWidth: 340,
              maxWidth: 880,
              height: 'auto',
              maxHeight: 'calc(100vh - 48px)'
            }}
            modal
            content={false}
          >
            <SimpleBar
              sx={{
                maxHeight: `calc(100vh - 48px)`,
                '& .simplebar-content': {
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              {customersLoading && customerMasterLoading ? (
                <Box sx={{ p: 5 }}>
                  <Stack direction="row" justifyContent="center">
                    <CircularWithPath />
                  </Stack>
                </Box>
              ) : (
                customerForm
              )}
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
}