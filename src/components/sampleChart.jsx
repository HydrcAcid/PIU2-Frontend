import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            display: false
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['01.06', '02.06', '03.06', '04.06', '05.06', '06.06', '07.06'];

export const data = {
    labels,
    datasets: [
    {
        label: 'Finished tasks',
        data: labels.map(() => Math.floor(Math.random() * 31)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

const SampleChart = () => {
    return (
        <Line options={options} data={data} />
    )
}

export default SampleChart;