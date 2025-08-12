import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SurveyResultsWidgetProps {
  theme: string;
}

const SurveyResultsWidget: React.FC<SurveyResultsWidgetProps> = ({ theme }) => {
  const getThemeColors = () => {
    switch (theme) {
      case 'light-theme':
        return {
          text: '#24292f',
          grid: '#d1d5da',
          primary: '#0969da',
          secondary: '#1f883d'
        };
      case 'matterhorn-theme':
        return {
          text: '#ffffff',
          grid: '#30363d',
          primary: '#58a6ff',
          secondary: '#3fb950'
        };
      default:
        return {
          text: '#f0f6fc',
          grid: '#30363d',
          primary: '#58a6ff',
          secondary: '#3fb950'
        };
    }
  };

  const themeColors = getThemeColors();

  // Dual curve data matching MVP survey data structure
  const surveyData = [
    { week: 'Week 1', responses: 45, cumulative: 45, satisfaction: 4.2 },
    { week: 'Week 2', responses: 89, cumulative: 134, satisfaction: 4.1 },
    { week: 'Week 3', responses: 156, cumulative: 290, satisfaction: 4.3 },
    { week: 'Week 4', responses: 203, cumulative: 493, satisfaction: 4.4 },
    { week: 'Week 5', responses: 178, cumulative: 671, satisfaction: 4.2 },
    { week: 'Week 6', responses: 134, cumulative: 805, satisfaction: 4.3 },
    { week: 'Week 7', responses: 42, cumulative: 847, satisfaction: 4.5 }
  ];

  return (
    <div className="widget-content">
      <h5 className="widget-title">Survey Results: Student Platform Usage</h5>
      
      {/* Dual Area Chart */}
      <div style={{ width: '100%', height: '280px', marginBottom: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={surveyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke={themeColors.grid + '50'} />
            <XAxis 
              dataKey="week" 
              stroke={themeColors.text}
              fontSize={12}
            />
            <YAxis 
              stroke={themeColors.text}
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--background-color)',
                border: `1px solid ${themeColors.grid}`,
                borderRadius: '8px',
                color: themeColors.text
              }}
            />
            
            {/* Weekly Responses - Green curve */}
            <Area
              type="monotone"
              dataKey="responses"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorResponses)"
              strokeWidth={2}
              name="Weekly Responses"
            />
            
            {/* Cumulative Total - Blue curve */}
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#3b82f6"
              fillOpacity={0.3}
              fill="url(#colorCumulative)"
              strokeWidth={2}
              name="Cumulative Total"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Vendor-Agnostic Statistical Tools Integration */}
      <div className="analysis-tools" style={{ marginBottom: '15px' }}>
        <div className="tool-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '8px',
          fontSize: '9px'
        }}>
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()} style={{ 
            padding: '6px', 
            textAlign: 'center',
            textDecoration: 'none',
            display: 'block'
          }}>
            <div style={{ fontWeight: 'bold' }}>Swissi Statistik Studio</div>
            <div style={{ color: 'var(--muted-text)' }}>Advanced Analytics</div>
          </a>
          
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()} style={{ 
            padding: '6px', 
            textAlign: 'center',
            textDecoration: 'none',
            display: 'block'
          }}>
            <div style={{ fontWeight: 'bold' }}>Python Jupyter</div>
            <div style={{ color: 'var(--muted-text)' }}>Data Science</div>
          </a>
          
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()} style={{ 
            padding: '6px', 
            textAlign: 'center',
            textDecoration: 'none',
            display: 'block'
          }}>
            <div style={{ fontWeight: 'bold' }}>Julia Computing</div>
            <div style={{ color: 'var(--muted-text)' }}>High Performance</div>
          </a>
          
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()} style={{ 
            padding: '6px', 
            textAlign: 'center',
            textDecoration: 'none',
            display: 'block'
          }}>
            <div style={{ fontWeight: 'bold' }}>Stata Integration</div>
            <div style={{ color: 'var(--muted-text)' }}>Econometrics</div>
          </a>
        </div>
      </div>

      {/* Executive Summary - Data Collection Progress */}
      <div className="report-section" style={{ 
        marginBottom: '15px',
        marginTop: '5px',
        padding: '12px',
        border: `1px solid ${themeColors.grid}`,
        borderRadius: '8px',
        backgroundColor: 'var(--background-color)'
      }}>
        <h6 style={{ 
          fontSize: '12px', 
          fontWeight: 'bold', 
          marginTop: '0px',
          marginBottom: '12px',
          color: themeColors.text 
        }}>
          Executive Summary - Data Collection Progress
        </h6>
        
        <div style={{ fontSize: '10px', lineHeight: '1.5', color: 'var(--muted-text)' }}>
          <p style={{ margin: '8px 0' }}>
            <strong>Study Overview:</strong> This longitudinal study investigates organizational behavior patterns across <span className="bold-green">847 participants</span> from multinational corporations. Response progression shows steady engagement from Week 1 (<span className="bold-green">45 participants</span>) to peak participation in Week 4 (<span className="bold-green">203 responses</span>), demonstrating sustained academic interest in federated AI research methodologies.
          </p>
          
          <p style={{ margin: '8px 0' }}>
            <strong>Statistical Validity:</strong> Current sample size (n=<span className="bold-green">847</span>) provides statistically significant results with margin of error <span className="bold-green">±3.4%</span>. Response rate of <span className="bold-green">68.2%</span> exceeds industry standards (30-40%) for academic surveys, indicating high participant engagement and data reliability for thesis-level research.
          </p>
          
          <p style={{ margin: '8px 0' }}>
            <strong>Response Pattern Analysis:</strong> Weekly participation patterns show consistent engagement curves with satisfaction ratings averaging <span className="bold-green">4.3/5.0</span>. Platform efficiency metrics demonstrate <span className="bold-green">30.9%</span> improvement in research workflow completion times when using integrated statistical tools versus traditional methods.
          </p>
          
          <p style={{ margin: '8px 0' }}>
            <strong>Recommended Next Steps:</strong> Advanced statistical analysis using Swissi AI Statistics/R, qualitative thematic analysis on open-ended responses (n=<span className="bold-green">312</span>), follow-up interviews with <span className="bold-green">15-20</span> high-engagement participants, Chapter 4 drafting recommendations, and supervisor meeting scheduling for preliminary findings review.
          </p>
        </div>
      </div>

      {/* Action Links */}
      <div className="widget-links">
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
          Launch Analysis
        </a>
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
          Export Data
        </a>
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
          Full Report
        </a>
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
          Share Results
        </a>
      </div>
    </div>
  );
};

export default SurveyResultsWidget;