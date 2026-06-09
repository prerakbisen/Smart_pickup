import React from 'react';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ 
  unreadCount, 
  totalCount, 
  onMarkAllRead, 
  onClearAll 
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {unreadCount} unread
          </p>
          <p className="text-xs text-muted-foreground">
            {totalCount} total notifications
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          iconName="CheckCheck"
          iconPosition="left"
        >
          Mark All Read
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          disabled={totalCount === 0}
          iconName="Trash2"
          iconPosition="left"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;