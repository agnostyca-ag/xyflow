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
  theme: string;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ theme }) => {
  const getThemeColors = () => {
    switch (theme) {
      case 'light-theme':
        return {
          text: '#24292f',
          grid: '#d1d5da',
          background: '#f6f8fa'
        };
      case 'matterhorn-theme':
        return {
          text: '#ffffff',
          grid: '#30363d',
          background: 'transparent'
        };
      default:
        return {
          text: '#f0f6fc',
          grid: '#30363d',
          background: 'transparent'
        };
    }
  };

  const themeColors = getThemeColors();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance Curve',
        data: [65, 59, 80, 81, 90, 95], // Improved performance for demo
        fill: false,
        backgroundColor: 'rgba(88, 166, 255, 0.4)',
        borderColor: 'rgba(88, 166, 255, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
          color: themeColors.text,
        },
        ticks: {
          color: themeColors.text,
        },
        grid: {
          color: themeColors.grid + '50',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Scores',
          color: themeColors.text,
        },
        ticks: {
          color: themeColors.text,
        },
        grid: {
          color: themeColors.grid + '50',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Turn off the legend
      },
      tooltip: {
        backgroundColor: themeColors.background,
        titleColor: themeColors.text,
        bodyColor: themeColors.text,
        borderColor: themeColors.grid,
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="widget-content">
      <h5 className="widget-title">Performance Development</h5>
      <div style={{ width: '100%', height: '250px', marginBottom: '15px' }}>
        <Line data={data} options={options} />
      </div>
      <div className="widget-links">
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Study Materials</a>
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Exam Schedule</a>
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Assignment Tracker</a>
      </div>
    </div>
  );
};

export default ChartWidget;