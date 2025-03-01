import ReactApexChart from 'react-apexcharts';

export default function TransactionAreaChart({ series }) {
    const options = {
        chart: { height: 350, type: 'area' },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }
    };

    return <ReactApexChart options={options} series={series} type="area" height={350} />;
}
