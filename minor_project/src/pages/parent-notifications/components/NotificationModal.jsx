import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationModal = ({ notification, onClose }) => {
  if (!notification) return null;

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

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-xl border border-border max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={getTypeIcon(notification?.type)} size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Notification Details</h2>
              <p className="text-xs text-muted-foreground">
                {new Date(notification.timestamp)?.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} color="var(--color-muted-foreground)" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(notification?.status)}`}>
              {notification?.status}
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
              {notification?.type}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Message</h3>
            <p className="text-sm text-foreground leading-relaxed">
              {notification?.message}
            </p>
          </div>

          {notification?.details && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Additional Details</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {notification?.details}
              </p>
            </div>
          )}

          {notification?.status === 'delivered' && (
            <div className="p-3 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center gap-2 text-success">
                <Icon name="CheckCircle2" size={16} />
                <span className="text-xs font-medium">Successfully delivered</span>
              </div>
            </div>
          )}

          {notification?.status === 'failed' && (
            <div className="p-3 bg-error/10 rounded-lg border border-error/20">
              <div className="flex items-center gap-2 text-error mb-2">
                <Icon name="AlertCircle" size={16} />
                <span className="text-xs font-medium">Delivery failed</span>
              </div>
              <p className="text-xs text-muted-foreground">
                The notification could not be delivered. Please check your contact information and try again.
              </p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex items-center justify-end gap-2">
          {notification?.status === 'failed' && (
            <Button variant="outline" iconName="RefreshCw" iconPosition="left">
              Retry Delivery
            </Button>
          )}
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;