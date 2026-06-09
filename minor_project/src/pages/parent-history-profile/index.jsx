import React, { useState } from 'react';
import RoleBasedSidebar from '../../components/navigation/RoleBasedSidebar';
import PickupHistoryTable from './components/PickupHistoryTable';
import ProfileManagement from './components/ProfileManagement';

const ParentHistoryProfile = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedSidebar
        userRole="parent"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className={`main-content ${isSidebarCollapsed ? 'with-collapsed-sidebar' : 'with-sidebar'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              History &amp; Profile
            </h1>
            <p className="text-muted-foreground">
              Review pickup history and manage your account information
            </p>
          </div>

          <div className="lg:hidden mb-6">
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'history' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'profile' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Profile
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`${activeTab === 'history' ? 'block' : 'hidden'} lg:block`}>
              <PickupHistoryTable />
            </div>

            <div className={`${activeTab === 'profile' ? 'block' : 'hidden'} lg:block`}>
              <ProfileManagement />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentHistoryProfile;