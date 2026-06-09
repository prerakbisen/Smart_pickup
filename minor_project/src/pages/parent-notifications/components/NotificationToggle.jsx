import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationToggle = ({ 
  label, 
  description, 
  icon, 
  enabled, 
  onToggle,
  testId 
}) => {
  return (
    <div className="flex items-start justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-200">
      <div className="flex items-start gap-3 flex-1">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name={icon} size={20} color="var(--color-primary)" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground mb-1">{label}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          enabled ? 'bg-primary' : 'bg-muted'
        }`}
        role="switch"
        aria-checked={enabled}
        aria-label={`Toggle ${label}`}
        data-testid={testId}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default NotificationToggle;