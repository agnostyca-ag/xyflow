import React from 'react';
import Plot from 'react-plotly.js';

interface BoxplotWidgetProps {
  theme: string;
}

const BoxplotWidget: React.FC<BoxplotWidgetProps> = ({ theme }) => {
  // Mock survey data: AI Human Perception vs AI Execution Performance
  const aiApplications = [
    'Healthcare Diagnosis', 
    'Financial Trading', 
    'Content Creation', 
    'Customer Service', 
    'Data Analysis', 
    'Image Recognition'
  ];

  // Sample data for boxplot - Human Perception scores (1-10 scale)
  const humanPerceptionData = [
    [8.2, 7.8, 8.5, 8.1, 7.9, 8.3, 8.0, 8.4, 7.7, 8.2], // Healthcare
    [6.5, 6.8, 6.2, 6.9, 6.4, 6.7, 6.3, 6.6, 6.1, 6.8], // Financial
    [7.2, 7.5, 7.1, 7.8, 7.3, 7.6, 7.4, 7.7, 7.0, 7.5], // Content
    [8.8, 8.5, 8.9, 8.7, 8.6, 8.4, 8.8, 8.3, 8.7, 8.5], // Customer Service
    [9.1, 8.9, 9.2, 8.8, 9.0, 8.7, 9.1, 8.9, 8.8, 9.0], // Data Analysis
    [8.9, 8.7, 9.1, 8.8, 8.6, 8.9, 8.5, 8.8, 8.7, 9.0]  // Image Recognition
  ];

  // Sample data for AI Execution Performance (1-10 scale)
  const aiExecutionData = [
    [7.8, 8.2, 7.9, 8.1, 7.7, 8.0, 7.8, 8.3, 7.6, 8.1], // Healthcare
    [8.9, 9.1, 8.8, 9.0, 8.7, 8.9, 9.2, 8.8, 8.9, 9.1], // Financial
    [6.8, 7.1, 6.9, 7.0, 6.7, 7.2, 6.8, 7.0, 6.9, 7.1], // Content
    [7.2, 7.5, 7.3, 7.4, 7.1, 7.6, 7.2, 7.3, 7.0, 7.4], // Customer Service
    [8.8, 9.0, 8.9, 8.7, 8.8, 8.9, 8.6, 8.8, 8.7, 8.9], // Data Analysis
    [9.2, 9.4, 9.1, 9.3, 9.0, 9.2, 9.1, 9.3, 8.9, 9.2]  // Image Recognition
  ];

  const getThemeColors = () => {
    switch (theme) {
      case 'light-theme':
        return {
          text: '#24292f',
          grid: '#d1d5da'
        };
      case 'matterhorn-theme':
        return {
          text: '#ffffff',
          grid: '#30363d'
        };
      default:
        return {
          text: '#f0f6fc',
          grid: '#30363d'
        };
    }
  };

  const themeColors = getThemeColors();

  const plotData = [
    // Human Perception Boxplots
    ...aiApplications.map((app, index) => ({
      y: humanPerceptionData[index],
      type: 'box' as const,
      name: `${app} (Human Perception)`,
      marker: { color: '#3b82f6' },
      boxpoints: 'outliers' as const,
      xaxis: 'x',
      yaxis: 'y',
      offsetgroup: index * 2,
      showlegend: false
    })),
    // AI Execution Boxplots
    ...aiApplications.map((app, index) => ({
      y: aiExecutionData[index],
      type: 'box' as const,
      name: `${app} (AI Execution)`,
      marker: { color: '#22c55e' },
      boxpoints: 'outliers' as const,
      xaxis: 'x',
      yaxis: 'y',
      offsetgroup: index * 2 + 1,
      showlegend: false
    }))
  ];

  const layout = {
    title: {
      text: 'AI Survey Results: Human Perception vs AI Execution Performance',
      font: { 
        color: themeColors.text,
        size: 14
      }
    },
    xaxis: {
      title: { text: 'AI Application Domains' },
      tickvals: aiApplications.map((_, index) => index * 2 + 0.5),
      ticktext: aiApplications.map(app => app.replace(' ', '<br>')),
      color: themeColors.text,
      gridcolor: themeColors.grid + '50'
    },
    yaxis: {
      title: { text: 'Score (1-10 Scale)' },
      range: [5, 10],
      color: themeColors.text,
      gridcolor: themeColors.grid + '50'
    },
    plot_bgcolor: 'transparent',
    paper_bgcolor: 'transparent',
    font: { color: themeColors.text },
    margin: { l: 60, r: 20, t: 80, b: 100 },
    height: 400,
    annotations: [
      {
        x: 0.25,
        y: 1.05,
        xref: 'paper' as const,
        yref: 'paper' as const,
        text: '🔵 Human Perception',
        showarrow: false,
        font: { color: '#3b82f6', size: 12 }
      },
      {
        x: 0.75,
        y: 1.05,
        xref: 'paper' as const,
        yref: 'paper' as const,
        text: '🟢 AI Execution',
        showarrow: false,
        font: { color: '#22c55e', size: 12 }
      }
    ]
  };

  const config = {
    displayModeBar: false,
    responsive: true
  };

  return (
    <div className="widget-content">
      <h5 className="widget-title">AI Performance Analysis</h5>
      
      <div className="boxplot-container" style={{ width: '100%', height: '400px' }}>
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      <div className="analysis-summary">
        <p style={{ fontSize: '10px', margin: '10px 0', color: 'var(--muted-text)' }}>
          <strong>Key Findings:</strong> Image Recognition demonstrates the highest AI execution performance (9.1±0.2), while Data Analysis exhibits the best alignment between human perception and AI execution. Financial Trading is notably underestimated in human perception compared to its actual performance.
        </p>
      </div>
      
      <div className="widget-links">
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Full Report</a>
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Raw Data</a>
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Export</a>
      </div>
    </div>
  );
};

export default BoxplotWidget;