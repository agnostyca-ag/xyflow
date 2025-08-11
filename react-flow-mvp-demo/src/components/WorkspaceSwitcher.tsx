import React from 'react'
import { WORKSPACES, WorkspaceId } from '../constants'

interface WorkspaceSwitcherProps {
  activeWorkspace: WorkspaceId
  onWorkspaceChange: (workspaceId: WorkspaceId) => void
}

const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  activeWorkspace,
  onWorkspaceChange,
}) => {
  return (
    <div className="workspace-switcher">
      <div className="workspace-tabs">
        {/* Workspace Tabs */}
        {Object.entries(WORKSPACES).map(([id, workspace]) => (
          <button
            key={id}
            className={`nav-link workspace-tab ${activeWorkspace === id ? 'active' : ''}`}
            onClick={() => onWorkspaceChange(id as WorkspaceId)}
            title={workspace.description}
          >
            {workspace.name}
          </button>
        ))}
        
        {/* Add New Workspace */}
        <button
          className="nav-link add-workspace-link"
          onClick={() => {
            console.log('Create new workspace clicked')
          }}
          title="Create new workspace"
        >
          <img 
            src="/swissi-addwidget.svg" 
            alt="Add Workspace" 
            style={{ width: '14px', height: '14px', marginRight: '6px' }} 
          />
          Add New Workspace
        </button>
        
        {/* Add New Widget */}
        <button
          className="nav-link add-widget-link"
          onClick={() => {
            console.log('Add new widget clicked')
          }}
          title="Add widget to current workspace"
        >
          <img 
            src="/swissi-addwidget.svg" 
            alt="Add Widget" 
            style={{ width: '14px', height: '14px', marginRight: '6px' }} 
          />
          Add New Widget
        </button>
      </div>
    </div>
  )
}

export default WorkspaceSwitcher