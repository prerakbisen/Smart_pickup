import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCard = ({ 
  notification, 
  onView, 
  onDelete 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-success bg-success/10';
      case 'failed':
        return 'text-error bg-error/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'SMS':
        return 'MessageSquare';
      case 'Email':
        return 'Mail';
      case 'Push':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`p-4 bg-card rounded-lg border transition-all duration-200 hover:shadow-md ${
      notification?.read ? 'border-border' : 'border-primary/30 bg-primary/5'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          notification?.read ? 'bg-muted' : 'bg-primary/10'
        }`}>
          <Icon 
            name={getTypeIcon(notification?.type)} 
            size={20} 
            color={notification?.read ? 'var(--color-muted-foreground)' : 'var(--color-primary)'} 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(notification?.status)}`}>
                {notification?.status}
              </span>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                {notification?.type}
              </span>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatTimestamp(notification?.timestamp)}
            </span>
          </div>
          
          <p className="text-sm text-foreground font-medium mb-1 line-clamp-2">
            {notification?.message}
          </p>
          
          {notification?.details && (
            <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
              {notification?.details}
            </p>
          )}
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="xs" 
              onClick={() => onView(notification)}
              iconName="Eye"
              iconPosition="left"
            >
              View
            </Button>
            <Button 
              variant="ghost" 
              size="xs" 
              onClick={() => onDelete(notification?.id)}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete
            </Button>
            {notification?.status === 'failed' && (
              <Button 
                variant="ghost" 
                size="xs"
                iconName="RefreshCw"
                iconPosition="left"
              >
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;