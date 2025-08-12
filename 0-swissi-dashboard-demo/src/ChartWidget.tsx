import React from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartWidgetProps {
  onClose?: () => void;
}

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Performance Curve',
      data: [65, 59, 80, 81, 90, 95], // Improved performance for demo
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Months',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Scores',
      },
    },
  },
  plugins: {
    legend: {
      display: false, // Turn off the legend
    },
  },
};

export default function ChartWidget({ onClose }: ChartWidgetProps) {
  return (
    <>
      {onClose && (
        <button className="container-close-button" onClick={onClose}>
          <img src="/assets/swissi-close-x.svg" alt="Close" />
        </button>
      )}
      <h5 className="widget-title">Performance Development</h5>
      <div style={{ width: '90%', height: '65%' }}>
        <Line
          data={data}
          options={{
            ...options,
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
        <a href="#" className="dashboard-link">Study Materials</a>
        <a href="#" className="dashboard-link">Exam Schedule</a>
        <a href="#" className="dashboard-link">Assignment Tracker</a>
      </div>
    </>
  );
}
