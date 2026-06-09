import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsCards = ({ stats }) => {
  const cards = [
    {
      label: 'Total Pickups',
      value: stats?.totalPickups,
      icon: 'Car',
      color: 'bg-primary/10 text-primary',
      trend: stats?.pickupTrend
    },
    {
      label: 'This Week',
      value: stats?.weeklyPickups,
      icon: 'Calendar',
      color: 'bg-success/10 text-success',
      trend: null
    },
    {
      label: 'Avg Wait Time',
      value: stats?.avgWaitTime,
      icon: 'Clock',
      color: 'bg-warning/10 text-warning',
      trend: stats?.waitTimeTrend
    },
    {
      label: 'On-Time Rate',
      value: stats?.onTimeRate,
      icon: 'TrendingUp',
      color: 'bg-accent/10 text-accent',
      trend: null
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards?.map((card) => (
        <div key={card?.label} className="bg-card rounded-xl border border-border p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${card?.color} flex items-center justify-center`}>
              <Icon name={card?.icon} size={20} />
            </div>
            {card?.trend && (
              <span className={`text-xs font-medium ${
                card?.trend > 0 ? 'text-success' : 'text-error'
              }`}>
                {card?.trend > 0 ? '+' : ''}{card?.trend}%
              </span>
            )}
          </div>
          <p className="text-2xl font-semibold text-foreground mb-1">{card?.value}</p>
          <p className="text-xs text-muted-foreground">{card?.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;