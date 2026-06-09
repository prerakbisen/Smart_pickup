import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSection = () => {
  const [studentCount, setStudentCount] = useState(500);

  const pricingTiers = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small schools',
      studentRange: '50-250',
      basePrice: 199,
      pricePerStudent: 0.50,
      features: [
        'License plate recognition',
        'Voice announcements',
        'Basic analytics dashboard',
        'Email support',
        '1 pickup location',
        'Standard implementation',
        '2 hours training',
        'Monthly system updates'
      ],
      implementation: '1-2 weeks',
      support: 'Email (24hr response)',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Most popular for medium schools',
      studentRange: '251-750',
      basePrice: 399,
      pricePerStudent: 0.40,
      features: [
        'Everything in Starter',
        'Advanced analytics & reports',
        'Multi-location support (up to 3)',
        'Priority phone support',
        'Custom announcement formats',
        'Integration with SIS',
        '4 hours training',
        'Dedicated account manager'
      ],
      implementation: '2-3 weeks',
      support: 'Phone & Email (4hr response)',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large schools & districts',
      studentRange: '750+',
      basePrice: 'Custom',
      pricePerStudent: 'Custom',
      features: [
        'Everything in Professional',
        'Unlimited pickup locations',
        '24/7 priority support',
        'Custom integrations',
        'Advanced security features',
        'District-wide deployment',
        'Unlimited training',
        'Dedicated technical team'
      ],
      implementation: 'Custom timeline',
      support: '24/7 Phone & Email (1hr response)',
      popular: false
    }
  ];

  const calculatePrice = (tier) => {
    if (tier?.basePrice === 'Custom') return 'Custom';
    const total = tier?.basePrice + (studentCount * tier?.pricePerStudent);
    return `$${total?.toFixed(0)}`;
  };

  return (
    <section id="pricing" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that fits your school's size and needs
          </p>

          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-foreground mb-3">
              Number of Students: {studentCount}
            </label>
            <input
              type="range"
              min="50"
              max="1500"
              step="50"
              value={studentCount}
              onChange={(e) => setStudentCount(parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>50</span>
              <span>750</span>
              <span>1500+</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers?.map((tier) => (
            <div
              key={tier?.id}
              className={`relative bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                tier?.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border'
              }`}
            >
              {tier?.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${tier?.popular ? 'pt-14' : ''}`}>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {tier?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {tier?.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-foreground">
                      {calculatePrice(tier)}
                    </span>
                    {tier?.basePrice !== 'Custom' && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For {tier?.studentRange} students
                  </p>
                </div>

                <Button
                  variant={tier?.popular ? 'default' : 'outline'}
                  size="lg"
                  fullWidth
                  className={tier?.popular ? 'bg-primary hover:bg-primary/90' : ''}
                >
                  {tier?.basePrice === 'Custom' ? 'Schedule Consultation' : 'Get Started'}
                </Button>

                <div className="mt-8 space-y-4">
                  <h4 className="font-semibold text-foreground text-sm">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {tier?.features?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Icon
                          name="Check"
                          size={16}
                          color="var(--color-success)"
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Implementation:</span>
                    <span className="font-medium text-foreground">{tier?.implementation}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Support:</span>
                    <span className="font-medium text-foreground">{tier?.support}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            All plans include free 30-day trial • No credit card required • Cancel anytime
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span>FERPA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Lock" size={16} color="var(--color-success)" />
              <span>COPPA Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Award" size={16} color="var(--color-success)" />
              <span>SOC 2 Type II</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;