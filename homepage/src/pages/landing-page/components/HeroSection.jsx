import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const metrics = [
    { value: '500+', label: 'Schools Served' },
    { value: '2M+', label: 'Safe Pickups' },
    { value: '12,847', label: "Today\'s Announcements" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Sparkles" size={16} />
            <span>Trusted by 500+ Schools Nationwide</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Smart Pickups, Safe Exits:<br />
            <span className="text-primary">Automate Your School's</span><br />
            Pickup Process
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            70% faster pickups with license plate recognition and instant voice announcements. Eliminate manual coordination and reduce wait times for parents and schools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
           
            <Button 
              variant="outline" 
              size="lg"
              iconName="LogIn"
              iconPosition="left"
              onClick={() => window.location.href = "https://smart-pickup-dashboard.vercel.app/"}
            >
              Login to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {metrics?.map((metric, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-primary mb-1">{metric?.value}</div>
                <div className="text-sm text-muted-foreground">{metric?.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </section>
  );
};

export default HeroSection;
