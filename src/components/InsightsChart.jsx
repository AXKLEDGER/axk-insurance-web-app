'use client';

import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import MainCard from 'components/MainCard';

export default function InsightsChart() {
    const theme = useTheme();

    const chartOptions = {
        chart: { type: 'donut' },
        labels: ['Onramp', 'Offramp', 'Marketplace', 'Rewards'],
        colors: [theme.palette.primary.main, theme.palette.warning.main, theme.palette.success.main, theme.palette.info.main],
        legend: { position: 'bottom' },
    };

    const chartSeries = [40, 30, 20, 10];

    return (
        <MainCard title="Spending Insights">
            <ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={300} />
        </MainCard>
    );
}
