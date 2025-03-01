'use client';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const transactions = [
  { id: 1, type: 'Deposit', amount: '$500', status: 'Completed', date: '2024-11-27' },
  { id: 2, type: 'Withdrawal', amount: '$200', status: 'Pending', date: '2024-11-26' },
  { id: 3, type: 'Transfer', amount: '$1,000', status: 'Completed', date: '2024-11-25' }
];

export default function WalletTransactions() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Wallet Transactions
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
