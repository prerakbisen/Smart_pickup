import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ parentName, currentTime }) => {
  const getGreeting = () => {
    const hour = new Date(currentTime)?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6 mb-6 border border-primary/20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Icon name="User" size={32} color="var(--color-primary)" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">
              {getGreeting()}, {parentName}!
            </h1>
            <p className="text-muted-foreground">
              Welcome to your pickup dashboard
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border">
          <Icon name="Clock" size={18} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">
            {new Date(currentTime)?.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;