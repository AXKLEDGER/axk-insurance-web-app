import ReactApexChart from 'react-apexcharts';

export default function TransactionPieChart() {
    const options = {
        chart: { type: 'donut' },
        labels: ['Onramp', 'Offramp', 'Marketplace', 'Rewards'],
        colors: ['#2aa1af', '#FF5733', '#3366CC', '#FFC300']
    };
    const series = [40, 30, 20, 10];

    return <ReactApexChart options={options} series={series} type="donut" height={300} />;
}
