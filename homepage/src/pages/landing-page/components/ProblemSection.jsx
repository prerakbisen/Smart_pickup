import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProblemSection = () => {
  const [activeHotspot, setActiveHotspot] = useState(null);

  const painPoints = [
    {
      id: 'staff',
      title: 'Staff Overwhelm',
      description: 'Teachers spending 2+ hours daily coordinating pickups instead of focusing on education',
      icon: 'Users',
      position: { top: '30%', left: '20%' }
    },
    {
      id: 'parent',
      title: 'Parent Frustration',
      description: 'Average 15-minute wait times causing stress and schedule conflicts',
      icon: 'Clock',
      position: { top: '50%', left: '35%' }
    },
    {
      id: 'safety',
      title: 'Safety Risks',
      description: 'Manual verification prone to errors and unauthorized pickup attempts',
      icon: 'AlertTriangle',
      position: { top: '40%', left: '65%' }
    }
  ];

  return (
    <section id="problem" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Pickup Problem Schools Face Daily
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Traditional pickup processes create chaos, consume valuable time, and compromise safety
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                <Icon name="XCircle" size={24} color="var(--color-error)" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Manual Process</h3>
                <p className="text-sm text-muted-foreground">Current Reality</p>
              </div>
            </div>

            <div className="relative bg-muted/50 rounded-lg p-6 min-h-[300px]">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-error mb-2">15:00</div>
                <p className="text-sm text-muted-foreground">Average Wait Time</p>
              </div>

              {painPoints?.map((point) => (
                <div
                  key={point?.id}
                  className="absolute cursor-pointer"
                  style={{ top: point?.position?.top, left: point?.position?.left }}
                  onMouseEnter={() => setActiveHotspot(point?.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-error rounded-full flex items-center justify-center animate-pulse">
                      <Icon name={point?.icon} size={16} color="white" />
                    </div>
                    {activeHotspot === point?.id && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-4 shadow-xl w-64 z-10 animate-fade-in">
                        <h4 className="font-semibold text-foreground mb-2">{point?.title}</h4>
                        <p className="text-sm text-muted-foreground">{point?.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon name="X" size={16} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
                <span>Staff manually calling student names over walkie-talkies</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon name="X" size={16} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
                <span>Parents waiting in long queues with engines running</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon name="X" size={16} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
                <span>Risk of students going to wrong vehicles</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" size={24} color="var(--color-success)" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Automated Process</h3>
                <p className="text-sm text-muted-foreground">With VoiceGate</p>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-success/5 to-primary/5 rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-success mb-2">04:30</div>
                <p className="text-sm text-muted-foreground">Average Wait Time</p>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Camera" size={28} color="var(--color-primary)" />
                </div>
                <Icon name="ArrowRight" size={24} color="var(--color-muted-foreground)" />
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Icon name="Database" size={28} color="var(--color-secondary)" />
                </div>
                <Icon name="ArrowRight" size={24} color="var(--color-muted-foreground)" />
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Radio" size={28} color="var(--color-accent)" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium text-success">70% Faster Pickups</p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span>Automatic license plate detection and student matching</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span>Instant voice announcements to classrooms</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span>Secure verification with complete audit trail</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;