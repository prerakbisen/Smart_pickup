import React from 'react';
import Icon from '../../../components/AppIcon';

const QueueStatsCard = ({ icon, label, value, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    accent: 'bg-accent/10 text-accent'
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-card hover:shadow-elevated transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={`w-12 h-12 rounded-lg ${colorClasses?.[color]} flex items-center justify-center mb-4`}>
            <Icon name={icon} size={24} />
          </div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-semibold text-foreground">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <Icon 
                name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                color={trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'} 
              />
              <span className={`text-sm ${trend === 'up' ? 'text-success' : 'text-error'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueStatsCard;