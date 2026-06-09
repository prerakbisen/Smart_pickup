import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'pickup_completed': 'CheckCircle2',
      'pickup_scheduled': 'Calendar',
      'queue_joined': 'Clock',
      'notification_sent': 'Bell',
      'profile_updated': 'UserCog'
    };
    return icons?.[type] || 'Info';
  };

  const getActivityColor = (type) => {
    const colors = {
      'pickup_completed': 'text-success',
      'pickup_scheduled': 'text-primary',
      'queue_joined': 'text-warning',
      'notification_sent': 'text-accent',
      'profile_updated': 'text-secondary'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Activity" size={20} color="var(--color-primary)" />
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">{activity?.title}</p>
                <p className="text-xs text-muted-foreground mb-1">{activity?.description}</p>
                <p className="text-xs text-muted-foreground">{formatTimestamp(activity?.timestamp)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivityFeed;