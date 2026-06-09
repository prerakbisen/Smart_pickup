import React from 'react';
import AnchorNavigation from '../../components/ui/AnchorNavigation';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import ROICalculator from './components/ROICalculator';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import DemoSection from './components/DemoSection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnchorNavigation />
      
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        
        <TestimonialsSection />
        
        <FAQSection />
        <DemoSection />
      </main>

      <FooterSection />
    </div>
  );
};

export default LandingPage;