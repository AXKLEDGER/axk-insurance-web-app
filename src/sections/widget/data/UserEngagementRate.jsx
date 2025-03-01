'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Typography from '@mui/material/Typography';

const data = [
  { week: 'Week 1', engagement: 30 },
  { week: 'Week 2', engagement: 45 },
  { week: 'Week 3', engagement: 60 },
  { week: 'Week 4', engagement: 75 }
];

export default function UserEngagementRate() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <Typography variant="subtitle1" gutterBottom>
        User Engagement Rate
      </Typography>
      <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="engagement" stroke="#2aa1af" fill="rgba(161, 211, 108, 0.5)" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}
