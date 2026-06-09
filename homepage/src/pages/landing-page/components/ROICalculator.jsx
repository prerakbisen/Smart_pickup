import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    pickupDuration: 15,
    staffHours: 2,
    studentCount: 500
  });

  const [results, setResults] = useState({
    timeSaved: 0,
    costSaved: 0,
    efficiencyGain: 0
  });

  useEffect(() => {
    const currentTime = inputs?.pickupDuration;
    const newTime = currentTime * 0.3;
    const timeSaved = currentTime - newTime;
    
    const staffCostPerHour = 25;
    const dailySavings = (timeSaved / 60) * inputs?.staffHours * staffCostPerHour;
    const annualSavings = dailySavings * 180;
    
    const efficiencyGain = ((timeSaved / currentTime) * 100)?.toFixed(0);

    setResults({
      timeSaved: timeSaved?.toFixed(1),
      costSaved: annualSavings?.toFixed(0),
      efficiencyGain: efficiencyGain
    });
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much time and money your school can save with VoiceGate
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Icon name="Calculator" size={24} color="var(--color-primary)" />
                Your Current Situation
              </h3>

              <div className="space-y-6">
                <Input
                  label="Average Pickup Duration (minutes)"
                  type="number"
                  value={inputs?.pickupDuration}
                  onChange={(e) => handleInputChange('pickupDuration', e?.target?.value)}
                  min="5"
                  max="60"
                  description="How long does your current pickup process take?"
                />

                <Input
                  label="Staff Hours per Day"
                  type="number"
                  value={inputs?.staffHours}
                  onChange={(e) => handleInputChange('staffHours', e?.target?.value)}
                  min="1"
                  max="8"
                  description="Total staff hours spent on pickup coordination"
                />

                <Input
                  label="Number of Students"
                  type="number"
                  value={inputs?.studentCount}
                  onChange={(e) => handleInputChange('studentCount', e?.target?.value)}
                  min="50"
                  max="5000"
                  description="Total student enrollment"
                />
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <Icon name="Info" size={16} className="inline mr-1" />
                  Calculations based on 180 school days per year and $25/hour staff cost
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Icon name="TrendingUp" size={24} color="var(--color-success)" />
                Your Projected Savings
              </h3>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-lg p-6 border border-success/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Time Saved Per Pickup</span>
                    <Icon name="Clock" size={20} color="var(--color-success)" />
                  </div>
                  <div className="text-4xl font-bold text-success mb-1">
                    {results?.timeSaved} min
                  </div>
                  <p className="text-sm text-muted-foreground">
                    From {inputs?.pickupDuration} to {(inputs?.pickupDuration * 0.3)?.toFixed(1)} minutes
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Annual Cost Savings</span>
                    <Icon name="DollarSign" size={20} color="var(--color-primary)" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-1">
                    ${parseInt(results?.costSaved)?.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on staff time reduction
                  </p>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-6 border border-accent/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Efficiency Improvement</span>
                    <Icon name="Zap" size={20} color="var(--color-accent)" />
                  </div>
                  <div className="text-4xl font-bold text-accent mb-1">
                    {results?.efficiencyGain}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Faster pickup process
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      ROI Achieved in 6-8 Months
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Including implementation, training, and ongoing support costs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;