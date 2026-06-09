import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationDropdown = ({ notifications, unreadCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getNotificationIcon = (type) => {
    const icons = {
      'pickup_ready': 'CheckCircle2',
      'queue_update': 'Clock',
      'schedule_change': 'Calendar',
      'system_alert': 'AlertCircle'
    };
    return icons?.[type] || 'Bell';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    return date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-200"
        aria-label="Notifications"
      >
        <Icon name="Bell" size={20} color="var(--color-foreground)" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card rounded-xl border border-border shadow-elevated z-50">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Inbox" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground text-sm">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`p-4 hover:bg-muted transition-colors duration-200 cursor-pointer ${
                      !notification?.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        notification?.type === 'pickup_ready' ? 'bg-success/10 text-success' :
                        notification?.type === 'queue_update' ? 'bg-warning/10 text-warning' :
                        notification?.type === 'schedule_change'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon name={getNotificationIcon(notification?.type)} size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground mb-1">{notification?.title}</p>
                        <p className="text-xs text-muted-foreground mb-1">{notification?.message}</p>
                        <p className="text-xs text-muted-foreground">{formatTime(notification?.timestamp)}</p>
                      </div>
                      {!notification?.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border">
            <Button
              variant="ghost"
              fullWidth
              onClick={() => {
                setIsOpen(false);
                navigate('/parent-notifications');
              }}
            >
              View All Notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;