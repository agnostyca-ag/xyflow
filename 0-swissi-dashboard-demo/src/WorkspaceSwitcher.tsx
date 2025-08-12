import React from 'react';
import { WORKSPACES } from './constants';

interface WorkspaceSwitcherProps {
  activeWorkspace: keyof typeof WORKSPACES;
  onWorkspaceChange: (workspaceId: keyof typeof WORKSPACES) => void;
}

const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  activeWorkspace,
  onWorkspaceChange,
}) => {
  return (
    <div className="workspace-switcher">
      <div className="workspace-tabs">
        {Object.entries(WORKSPACES).map(([id, workspace]) => (
          <button
            key={id}
            className={`nav-link ${activeWorkspace === id ? 'active' : ''}`}
            onClick={() => onWorkspaceChange(id as keyof typeof WORKSPACES)}
          >
            {workspace.name}
          </button>
        ))}
        
        <button
          className="nav-link add-workspace-link"
          onClick={() => {
            // Handle create new workspace functionality
            console.log('Create new workspace clicked');
          }}
        >
          <img src="/assets/swissi-addwidget.svg" alt="Add Workspace" style={{ width: '14px', height: '14px', marginRight: '6px' }} />
          Add New Workspace
        </button>
        
        <button
          className="nav-link add-widget-link"
          onClick={() => {
            // Handle add widget functionality
            console.log('Add new widget clicked');
          }}
        >
          <img src="/assets/swissi-addwidget.svg" alt="Add Widget" style={{ width: '14px', height: '14px', marginRight: '6px' }} />
          Add New Widget
        </button>
      </div>
    </div>
  );
};

export default WorkspaceSwitcher;
