'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Typography from '@mui/material/Typography';

const data = [
  { name: 'Produce', sales: 12000 },
  { name: 'Land', sales: 8000 },
  { name: 'Other', sales: 5000 }
];

export default function MarketplaceOverview() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <Typography variant="subtitle1" gutterBottom>
        Marketplace Overview
      </Typography>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#2aa1af" />
      </BarChart>
    </div>
  );
}
