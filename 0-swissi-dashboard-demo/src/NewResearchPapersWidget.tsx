import React from 'react';

interface ResearchPaper {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  relevance: number;
  url: string;
}

const mockPapers: ResearchPaper[] = [
  {
    title: "Federated Learning with Differential Privacy: A Comprehensive Survey",
    authors: ["Zhang, L.", "Kumar, A.", "Schmidt, M."],
    journal: "IEEE Transactions on AI",
    year: 2024,
    relevance: 95,
    url: "#"
  },
  {
    title: "DAG-based Consensus Mechanisms for Decentralized AI Training",
    authors: ["Chen, W.", "Rodriguez, M.", "Patel, S."],
    journal: "Nature Machine Intelligence",
    year: 2024,
    relevance: 92,
    url: "#"
  },
  {
    title: "Privacy-Preserving Multi-Party Computation in Educational Data Mining",
    authors: ["Thompson, K.", "Lee, J.", "Martinez, A."],
    journal: "Computers & Education",
    year: 2024,
    relevance: 88,
    url: "#"
  },
  {
    title: "Swarm Intelligence for Distributed Learning Systems",
    authors: ["Anderson, R.", "Kim, H.", "Brown, D."],
    journal: "Journal of AI Research",
    year: 2024,
    relevance: 85,
    url: "#"
  }
];

interface NewResearchPapersWidgetProps {
  onClose?: () => void;
}

export const NewResearchPapersWidget: React.FC<NewResearchPapersWidgetProps> = ({ onClose }) => {
  return (
    <>
      {onClose && (
        <button className="container-close-button" onClick={onClose}>
          <img src="/assets/swissi-close-x.svg" alt="Close" />
        </button>
      )}
      <h5 className="widget-title">AI Research Assistant</h5>
      
      <div className="assistant-message">
        <p><strong>Michel</strong>, I found some papers related to your research on federated AI and privacy-preserving learning systems.</p>
      </div>
      
      <div className="papers-list">
        {mockPapers.map((paper, index) => (
          <div key={index} className="paper-item">
            <div className="paper-title">{paper.title}</div>
            <div className="paper-meta">
              <span className="authors">{paper.authors.join(', ')}</span>
              <span className="journal-year">{paper.journal} ({paper.year})</span>
              <span className="relevance">{paper.relevance}% match</span>
            </div>
            <div className="widget-links">
              <a href="#" className="nav-link">Save</a>
              <a href="#" className="nav-link">Read</a>
              <a href="#" className="nav-link">Cite</a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="widget-links">
        <a href="#" className="nav-link">View All Recommendations</a>
        <a href="#" className="nav-link">Configure Alerts</a>
      </div>
    </>
  );
};
