'use client';

import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';


export default function PerformanceMetrics() {
    return (
        <MainCard title="Your Performance">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <DonutChart />
                </Grid>
                <Grid item xs={12} md={6}>
                    <LineChart />
                </Grid>
            </Grid>
        </MainCard>
    );
}
