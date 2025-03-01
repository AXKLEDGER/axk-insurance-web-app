'use client';

import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import Typography from '@mui/material/Typography';

const data = [
  { name: 'USDC', value: 20000 },
  { name: 'Bitcoin', value: 15000 },
  { name: 'Ethereum', value: 10000 },
  { name: 'AXK', value: 5000 }
];

const COLORS = ['#2aa1af', '#FFC107', '#FF5733', '#007BFF'];

export default function WalletBalanceChart() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <Typography variant="subtitle1" gutterBottom>
        Wallet Balances
      </Typography>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </div>
  );
}
