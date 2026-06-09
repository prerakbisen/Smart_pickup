import React, { useState, useEffect } from 'react';
import RoleBasedSidebar from '../../components/navigation/RoleBasedSidebar';
import WelcomeSection from './components/WelcomeSection';
import PickupStatusCard from './components/PickupStatusCard';
import QuickActionsCard from './components/QuickActionsCard';
import RecentActivityFeed from './components/RecentActivityFeed';
import NotificationDropdown from './components/NotificationDropdown';
import StatisticsCards from './components/StatisticsCards';

const ParentDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const mockParentData = {
    name: "Rishank",
    email: "sarah.johnson@email.com"
  };

  const mockPickupData = {
    studentName: "Emma Johnson",
    scheduledTime: "3:15 PM",
    queuePosition: "5th in queue",
    vehicle_number: "ABC-1234",
    status: "In Queue",
    estimatedTime: "3:20 PM"
  };

  const mockStatistics = {
    totalPickups: 142,
    weeklyPickups: 5,
    avgWaitTime: "8 min",
    onTimeRate: "94%",
    pickupTrend: 12,
    waitTimeTrend: -5
  };

  const mockActivities = [
    {
      id: 1,
      type: "pickup_completed",
      title: "Pickup Completed",
      description: "Emma was picked up successfully at 3:18 PM",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      type: "queue_joined",
      title: "Joined Pickup Queue",
      description: "Your vehicle ABC-1234 entered the queue at position 5",
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      type: "notification_sent",
      title: "Reminder Sent",
      description: "Pickup reminder notification delivered via SMS",
      timestamp: new Date(Date.now() - 10800000)
    },
    {
      id: 4,
      type: "pickup_scheduled",
      title: "Pickup Scheduled",
      description: "Tomorrow\'s pickup scheduled for 3:15 PM",
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: 5,
      type: "profile_updated",
      title: "Profile Updated",
      description: "Vehicle information updated successfully",
      timestamp: new Date(Date.now() - 172800000)
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: "pickup_ready",
      title: "Pickup Ready",
      message: "Emma is ready for pickup. Please proceed to the pickup zone.",
      timestamp: new Date(Date.now() - 300000),
      read: false
    },
    {
      id: 2,
      type: "queue_update",
      title: "Queue Position Update",
      message: "You\'ve moved to position 3 in the queue.",
      timestamp: new Date(Date.now() - 900000),
      read: false
    },
    {
      id: 3,
      type: "schedule_change",
      title: "Schedule Change",
      message: "Tomorrow\'s pickup time has been updated to 3:30 PM.",
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: 4,
      type: "system_alert",
      title: "System Maintenance",
      message: "Scheduled maintenance tonight from 11 PM to 1 AM.",
      timestamp: new Date(Date.now() - 7200000),
      read: true
    }
  ];

  const unreadNotifications = mockNotifications?.filter(n => !n?.read)?.length;

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedSidebar
        userRole="parent"
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      <div className={`main-content ${isCollapsed ? 'with-collapsed-sidebar' : 'with-sidebar'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                {new Date(currentTime)?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <NotificationDropdown
              notifications={mockNotifications}
              unreadCount={unreadNotifications}
            />
          </div>

          <WelcomeSection
            parentName={mockParentData?.name}
            currentTime={currentTime}
          />

          <StatisticsCards stats={mockStatistics} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <PickupStatusCard pickupData={mockPickupData} />
            </div>
            <div>
              <RecentActivityFeed activities={mockActivities?.slice(0, 3)} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentActivityFeed activities={mockActivities} />
            </div>
            <div>
              <QuickActionsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;