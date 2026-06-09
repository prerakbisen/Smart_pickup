import React from 'react';
import Icon from '../../../components/AppIcon';

const PickupStatusCard = ({ pickupData }) => {
  const getStatusColor = (status) => {
    const colors = {
      'In Queue': 'bg-warning/10 text-warning border-warning/20',
      'Ready for Pickup': 'bg-success/10 text-success border-success/20',
      'Completed': 'bg-muted text-muted-foreground border-border',
      'Scheduled': 'bg-primary/10 text-primary border-primary/20'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground border-border';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'In Queue': 'Clock',
      'Ready for Pickup': 'CheckCircle2',
      'Completed': 'Check',
      'Scheduled': 'Calendar'
    };
    return icons?.[status] || 'Info';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Car" size={20} color="var(--color-primary)" />
          Today's Pickup Status
        </h2>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(pickupData?.status)}`}>
          <Icon name={getStatusIcon(pickupData?.status)} size={14} className="inline mr-1" />
          {pickupData?.status}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={18} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Student Name</p>
              <p className="text-sm font-medium text-foreground">{pickupData?.studentName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={18} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Scheduled Time</p>
              <p className="text-sm font-medium text-foreground">{pickupData?.scheduledTime}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Hash" size={18} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Queue Position</p>
              <p className="text-sm font-medium text-foreground">{pickupData?.queuePosition}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Car" size={18} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Vehicle Number</p>
              <p className="text-sm font-medium text-foreground">{pickupData?.vehicle_number}</p>
            </div>
          </div>
        </div>
      </div>
      {pickupData?.estimatedTime && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Timer" size={16} color="var(--color-success)" />
            <span className="text-muted-foreground">Estimated pickup time:</span>
            <span className="font-medium text-success">{pickupData?.estimatedTime}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupStatusCard;