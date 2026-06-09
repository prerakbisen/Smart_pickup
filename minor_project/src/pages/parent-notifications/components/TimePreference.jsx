import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TimingPreference = ({ 
  label, 
  description, 
  icon, 
  value, 
  onChange, 
  options 
}) => {
  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon name={icon} size={20} color="var(--color-accent)" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground mb-1">{label}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder="Select timing"
      />
    </div>
  );
};

export default TimingPreference;