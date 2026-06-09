import React from 'react';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Success Stories', href: '#success-stories' },
      { label: 'Demo', href: '#demo' }
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' }
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Support Center', href: '#' },
      { label: 'System Status', href: '#' },
      { label: 'Training Videos', href: '#' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'FERPA Compliance', href: '#' },
      { label: 'COPPA Compliance', href: '#' },
      { label: 'Security', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: 'Facebook', href: '#', label: 'Facebook' },
    { icon: 'Twitter', href: '#', label: 'Twitter' },
    { icon: 'Linkedin', href: '#', label: 'LinkedIn' },
    { icon: 'Youtube', href: '#', label: 'YouTube' }
  ];

  const trustBadges = [
    { icon: 'Shield', label: 'FERPA Compliant' },
    { icon: 'Lock', label: 'COPPA Certified' },
    { icon: 'Award', label: 'SOC 2 Type II' },
    { icon: 'CheckCircle', label: 'ISO 27001' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <img src="/assets/images/icons8-university-64.png" alt="Smart Pickup Logo" />
              </div>
              <span className="text-xl font-bold text-foreground">Smart Pickup</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Transforming school pickup processes with intelligent automation and voice technology. Making schools safer and more efficient.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.href}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors duration-250"
                  aria-label={social?.label}
                >
                  <Icon name={social?.icon} size={20} color="var(--color-muted-foreground)" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-250"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-250"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks?.resources?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-250"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-250"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {trustBadges?.map((badge) => (
                <div key={badge?.label} className="flex items-center gap-2">
                  <Icon name={badge?.icon} size={16} color="var(--color-success)" />
                  <span className="text-xs text-muted-foreground">{badge?.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={16} />
                <a href="mailto:support@voicegate.com" className="hover:text-primary transition-colors duration-250">
                  support@voicegate.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Phone" size={16} />
                <a href="tel:+18005551234" className="hover:text-primary transition-colors duration-250">
                  1-800-555-1234
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} VoiceGate. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;