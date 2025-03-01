import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import { ThemeMode } from 'config';

// chart options for User Retention
const areaChartOptions = {
  chart: {
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  grid: {
    strokeDashArray: 4
  }
};

// ==============================|| CHART - USER RETENTION CHART ||============================== //

export default function UserRetentionChart() {
  const theme = useTheme();

  const mode = theme.palette.mode;
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.secondary.main],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            colors: Array(12).fill(secondary)
          }
        },
        axisBorder: {
          show: false,
          color: line
        },
        axisTicks: {
          show: false
        },
        tickAmount: 11
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  // Example retention data
  const [series] = useState([
    {
      name: 'User Retention (%)',
      data: [45, 50, 48, 55, 60, 58, 62, 65, 68, 70, 72, 75] // Monthly retention percentages
    }
  ]);

  return <ReactApexChart options={options} series={series} type="area" height={260} />;
}
