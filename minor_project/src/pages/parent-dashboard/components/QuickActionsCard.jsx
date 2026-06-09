import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActionsCard = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Update Profile',
      icon: 'UserCog',
      variant: 'default',
      path: '/parent-history-profile',
      description: 'Manage your account details'
    },
    {
      label: 'Notification Settings',
      icon: 'Bell',
      variant: 'outline',
      path: '/parent-notifications',
      description: 'Configure your alerts'
    },
    {
      label: 'View History',
      icon: 'History',
      variant: 'outline',
      path: '/parent-history-profile',
      description: 'Check past pickups'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions?.map((action) => (
          <Button
            key={action?.label}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            onClick={() => navigate(action?.path)}
            className="justify-start h-auto py-4"
            fullWidth
          >
            <div className="text-left">
              <div className="font-medium">{action?.label}</div>
              <div className="text-xs opacity-70 mt-1">{action?.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;