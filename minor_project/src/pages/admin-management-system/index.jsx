import React, { useState } from 'react';
import RoleBasedSidebar from '../../components/navigation/RoleBasedSidebar';
import Icon from '../../components/AppIcon';
import StudentManagementTab from './components/StudentManagementTab';
import EventLogsTab from './components/EventsLogsTab';
import SettingsTab from './components/SettingsTab';

const AdminManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const tabs = [
    {
      id: 'students',
      label: 'Student Management',
      icon: 'Users',
      description: 'Manage students, guardians, and vehicle assignments'
    },
    {
      id: 'logs',
      label: 'Event Logs',
      icon: 'FileText',
      description: 'View system activity and audit trails'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: 'Settings',
      description: 'Configure system preferences and permissions'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentManagementTab />;
      case 'logs':
        return <EventLogsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <StudentManagementTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedSidebar
        userRole="admin"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`main-content ${isSidebarCollapsed ? 'with-collapsed-sidebar' : 'with-sidebar'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="Settings" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Management System</h1>
                <p className="text-muted-foreground mt-1">
                  Comprehensive system administration and configuration
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border mb-6">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 min-w-[200px] px-6 py-4 text-left border-b-2 transition-all ${
                    activeTab === tab?.id
                      ? 'border-primary bg-primary/5' :'border-transparent hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <Icon
                      name={tab?.icon}
                      size={20}
                      color={activeTab === tab?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                    />
                    <span className={`font-semibold ${
                      activeTab === tab?.id ? 'text-primary' : 'text-foreground'
                    }`}>
                      {tab?.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">{tab?.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminManagementSystem;