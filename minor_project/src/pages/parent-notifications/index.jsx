import React, { useState, useEffect } from 'react';
import RoleBasedSidebar from '../../components/navigation/RoleBasedSidebar';
import Icon from '../../components/AppIcon';

import NotificationToggle from './components/NotificationToggle';
import TimingPreference from './components/TimePreference';
import NotificationCard from './components/NotificationCard';
import NotificationModal from './components/NotificationModal';
import BulkActionsBar from './components/BulkActionsBar';
import TestNotificationSection from './components/TestNotificationSection';

const ParentNotifications = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [preferences, setPreferences] = useState({
    sms: true,
    email: true,
    push: false
  });

  const [timingPreferences, setTimingPreferences] = useState({
    pickupReminder: '15',
    queueUpdate: '5',
    completion: 'immediate'
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "SMS",
      message: "Your child Emma Rodriguez is ready for pickup",
      details: "Vehicle ABC-1234 has been matched. Please proceed to the pickup zone.",
      status: "delivered",
      timestamp: new Date(Date.now() - 300000),
      read: false
    },
    {
      id: 2,
      type: "Email",
      message: "Daily pickup summary for November 23, 2025",
      details: "Emma was picked up at 3:45 PM. Total wait time: 8 minutes.",
      status: "delivered",
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: 3,
      type: "Push",
      message: "Queue position update",
      details: "You are now 3rd in the pickup queue. Estimated wait: 5 minutes.",
      status: "delivered",
      timestamp: new Date(Date.now() - 7200000),
      read: true
    },
    {
      id: 4,
      type: "SMS",
      message: "Pickup reminder",
      details: "School dismissal in 15 minutes. Please prepare for pickup.",
      status: "failed",
      timestamp: new Date(Date.now() - 86400000),
      read: true
    },
    {
      id: 5,
      type: "Email",
      message: "Weekly pickup report",
      details: "Your average pickup time this week: 12 minutes. 5 successful pickups completed.",
      status: "delivered",
      timestamp: new Date(Date.now() - 172800000),
      read: true
    },
    {
      id: 6,
      type: "Push",
      message: "System maintenance notification",
      details: "The pickup system will undergo maintenance on November 25, 2025 from 2:00 AM to 4:00 AM.",
      status: "pending",
      timestamp: new Date(Date.now() - 259200000),
      read: true
    }
  ]);

  const timingOptions = {
    pickupReminder: [
      { value: '5', label: '5 minutes before' },
      { value: '10', label: '10 minutes before' },
      { value: '15', label: '15 minutes before' },
      { value: '30', label: '30 minutes before' }
    ],
    queueUpdate: [
      { value: '1', label: 'Every position change' },
      { value: '3', label: 'Every 3 positions' },
      { value: '5', label: 'Every 5 positions' },
      { value: 'none', label: 'No updates' }
    ],
    completion: [
      { value: 'immediate', label: 'Immediately' },
      { value: '5', label: '5 minutes after' },
      { value: '15', label: '15 minutes after' },
      { value: 'none', label: 'No notification' }
    ]
  };

  const handleTogglePreference = (type) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev?.[type]
    }));
    showSuccess();
  };

  const handleTimingChange = (type, value) => {
    setTimingPreferences(prev => ({
      ...prev,
      [type]: value
    }));
    showSuccess();
  };

  const handleViewNotification = (notification) => {
    setSelectedNotification(notification);
    setNotifications(prev =>
      prev?.map(n => n?.id === notification?.id ? { ...n, read: true } : n)
    );
  };

  const handleDeleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(prev => prev?.filter(n => n?.id !== id));
      showSuccess();
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev?.map(n => ({ ...n, read: true })));
    showSuccess();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications? This action cannot be undone.')) {
      setNotifications([]);
      showSuccess();
    }
  };

  const handleSendTest = async (type) => {
    const testNotification = {
      id: Date.now(),
      type: type,
      message: `Test ${type} notification`,
      details: `This is a test notification to verify your ${type} preferences are working correctly.`,
      status: "delivered",
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [testNotification, ...prev]);
    showSuccess();
  };

  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  useEffect(() => {
    document.title = 'Notification Settings - SchoolPickup Pro';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedSidebar
        userRole="parent"
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`main-content ${sidebarCollapsed ? 'with-collapsed-sidebar' : 'with-sidebar'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="Bell" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Notification Settings</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your communication preferences and message history
                </p>
              </div>
            </div>
          </div>

          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
              <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
              <p className="text-sm font-medium text-success">Settings saved successfully</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Settings" size={20} color="var(--color-primary)" />
                  <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
                </div>
                <div className="space-y-3">
                  <NotificationToggle
                    label="SMS Notifications"
                    description="Receive text messages for pickup updates, queue positions, and important alerts"
                    icon="MessageSquare"
                    enabled={preferences?.sms}
                    onToggle={() => handleTogglePreference('sms')}
                    testId="sms-toggle"
                  />
                  <NotificationToggle
                    label="Email Notifications"
                    description="Get detailed pickup summaries, weekly reports, and system announcements via email"
                    icon="Mail"
                    enabled={preferences?.email}
                    onToggle={() => handleTogglePreference('email')}
                    testId="email-toggle"
                  />
                  <NotificationToggle
                    label="Push Notifications"
                    description="Receive instant mobile app notifications for real-time pickup status updates"
                    icon="Bell"
                    enabled={preferences?.push}
                    onToggle={() => handleTogglePreference('push')}
                    testId="push-toggle"
                  />
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Clock" size={20} color="var(--color-accent)" />
                  <h2 className="text-lg font-semibold text-foreground">Timing Preferences</h2>
                </div>
                <div className="space-y-3">
                  <TimingPreference
                    label="Pickup Reminder"
                    description="When to receive reminder before school dismissal"
                    icon="AlarmClock"
                    value={timingPreferences?.pickupReminder}
                    onChange={(value) => handleTimingChange('pickupReminder', value)}
                    options={timingOptions?.pickupReminder}
                  />
                  <TimingPreference
                    label="Queue Position Updates"
                    description="How often to receive queue position notifications"
                    icon="ListOrdered"
                    value={timingPreferences?.queueUpdate}
                    onChange={(value) => handleTimingChange('queueUpdate', value)}
                    options={timingOptions?.queueUpdate}
                  />
                  <TimingPreference
                    label="Completion Confirmation"
                    description="When to receive pickup completion notification"
                    icon="CheckCircle"
                    value={timingPreferences?.completion}
                    onChange={(value) => handleTimingChange('completion', value)}
                    options={timingOptions?.completion}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <TestNotificationSection onSendTest={handleSendTest} />

              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Info" size={20} color="var(--color-primary)" />
                  <h2 className="text-lg font-semibold text-foreground">Quick Tips</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Enable SMS for fastest pickup notifications
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Email provides detailed pickup history and reports
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Test notifications to verify your settings
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Adjust timing preferences based on your schedule
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="History" size={20} color="var(--color-primary)" />
              <h2 className="text-lg font-semibold text-foreground">Recent Notifications</h2>
            </div>

            <BulkActionsBar
              unreadCount={unreadCount}
              totalCount={notifications?.length}
              onMarkAllRead={handleMarkAllRead}
              onClearAll={handleClearAll}
            />

            <div className="mt-4 space-y-3">
              {notifications?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Icon name="Bell" size={32} color="var(--color-muted-foreground)" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">No notifications yet</p>
                  <p className="text-xs text-muted-foreground">
                    You'll see pickup updates and system messages here
                  </p>
                </div>
              ) : (
                notifications?.map((notification) => (
                  <NotificationCard
                    key={notification?.id}
                    notification={notification}
                    onView={handleViewNotification}
                    onDelete={handleDeleteNotification}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}
    </div>
  );
};

export default ParentNotifications;