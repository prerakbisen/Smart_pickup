import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 'recognition',
      title: 'License Plate Recognition',
      description: 'Advanced AI-powered camera system captures and processes license plates with 99.8% accuracy',
      icon: 'Camera',
      color: 'primary',
      metrics: [
        { label: 'Accuracy Rate', value: '99.8%' },
        { label: 'Detection Range', value: '50 feet' },
        { label: 'Processing Speed', value: '<1 sec' }
      ],
      capabilities: [
        'Works in rain, snow, and fog',
        'Night vision enabled',
        'Multi-angle capture',
        'Damaged plate recognition'
      ]
    },
    {
      id: 'announcements',
      title: 'Voice Announcements',
      description: 'Crystal-clear automated voice notifications broadcast directly to classroom speakers',
      icon: 'Radio',
      color: 'accent',
      metrics: [
        { label: 'Audio Quality', value: 'HD' },
        { label: 'Languages', value: '12+' },
        { label: 'Volume Zones', value: 'Custom' }
      ],
      capabilities: [
        'Customizable announcement format',
        'Text-to-speech technology',
        'Multi-room broadcasting',
        'Emergency override system'
      ]
    },
    {
      id: 'analytics',
      title: 'Dashboard Analytics',
      description: 'Real-time insights and comprehensive reporting for data-driven decision making',
      icon: 'BarChart3',
      color: 'secondary',
      metrics: [
        { label: 'Real-time Updates', value: 'Live' },
        { label: 'Report Types', value: '15+' },
        { label: 'Data Export', value: 'CSV/PDF' }
      ],
      capabilities: [
        'Peak time analysis',
        'Average wait time tracking',
        'Parent satisfaction metrics',
        'Staff efficiency reports'
      ]
    },
    {
      id: 'security',
      title: 'Secure Logging',
      description: 'Complete audit trail with encrypted data storage meeting all educational compliance standards',
      icon: 'Shield',
      color: 'success',
      metrics: [
        { label: 'Encryption', value: 'AES-256' },
        { label: 'Compliance', value: 'FERPA/COPPA' },
        { label: 'Backup', value: 'Daily' }
      ],
      capabilities: [
        'Tamper-proof logs',
        'Role-based access control',
        'Automatic data retention',
        'Incident reporting'
      ]
    }
  ];

  return (
    <section id="features" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features for Modern Schools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to automate and secure your school's pickup process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              onMouseEnter={() => setHoveredFeature(feature?.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="p-6">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 bg-${feature?.color}/10 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon 
                    name={feature?.icon} 
                    size={28} 
                    color={`var(--color-${feature?.color})`}
                  />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {feature?.description}
                </p>

                <div className="space-y-2 mb-4">
                  {feature?.metrics?.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{metric?.label}</span>
                      <span className="font-semibold text-foreground">{metric?.value}</span>
                    </div>
                  ))}
                </div>

                <div className={`absolute inset-0 bg-${feature?.color}/5 backdrop-blur-sm p-6 flex flex-col justify-center transition-opacity duration-300 ${
                  hoveredFeature === feature?.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <h4 className="text-lg font-bold text-foreground mb-4">Key Capabilities</h4>
                  <ul className="space-y-2">
                    {feature?.capabilities?.map((capability, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Icon 
                          name="Check" 
                          size={16} 
                          color={`var(--color-${feature?.color})`}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span className="text-foreground">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={`h-1 bg-gradient-to-r from-${feature?.color} to-${feature?.color}/50 transform origin-left transition-transform duration-300 ${
                hoveredFeature === feature?.id ? 'scale-x-100' : 'scale-x-0'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;