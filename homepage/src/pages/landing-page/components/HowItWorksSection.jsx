import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const steps = [
  {
    id: 'detect',
    title: 'Detect',
    subtitle: 'License Plate Recognition',
    description: 'Advanced AI cameras automatically scan and capture license plates as vehicles enter the pickup zone',
    icon: 'Camera',
    color: 'primary',
    image: "https://images.unsplash.com/photo-1681038352172-6de08ca45cb5",
    imageAlt: 'Modern security camera mounted on pole scanning vehicle license plate in school parking lot with clear blue sky background',
    details: [
    'Works in all weather conditions',
    '99.8% accuracy rate',
    'Captures plates from 50 feet away',
    'FERPA compliant data handling'],

    badge: 'FERPA Compliant'
  },
  {
    id: 'match',
    title: 'Match',
    subtitle: 'Database Verification',
    description: 'System instantly matches license plate to student database and verifies authorized pickup permissions',
    icon: 'Database',
    color: 'secondary',
    image: "https://images.unsplash.com/photo-1712095314194-14a55b81b29f",
    imageAlt: 'Digital dashboard screen displaying student database with profile photos and vehicle information in modern school office setting',
    details: [
    'Real-time database queries',
    'Multiple vehicle support per family',
    'Emergency contact verification',
    'Encrypted data transmission'],

    badge: 'COPPA Certified'
  },
  {
    id: 'announce',
    title: 'Announce',
    subtitle: 'Voice Notification',
    description: 'Clear voice announcement broadcasts student name to classroom speakers for immediate pickup preparation',
    icon: 'Radio',
    color: 'accent',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a6434a18-1763999861618.png",
    imageAlt: 'Modern classroom speaker system mounted on wall with teacher and diverse group of elementary students listening attentively',
    details: [
    'Crystal clear audio quality',
    'Customizable announcement format',
    'Multi-language support',
    'Volume control per location'],

    badge: 'Audio Sample Available'
  }];


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef?.current) {
      observer?.observe(sectionRef?.current);
    }

    return () => {
      if (sectionRef?.current) {
        observer?.unobserve(sectionRef?.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps?.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isVisible, steps?.length]);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Smart Pickup Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your school's pickup process
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-4 bg-muted rounded-full p-2">
              {steps?.map((step, index) =>
              <React.Fragment key={step?.id}>
                  <button
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeStep === index ?
                  'bg-card shadow-md' :
                  'hover:bg-card/50'}`
                  }>

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === index ?
                  `bg-${step?.color}/10` :
                  'bg-muted'}`
                  }>
                      <Icon
                      name={step?.icon}
                      size={20}
                      color={activeStep === index ? `var(--color-${step?.color})` : 'var(--color-muted-foreground)'} />

                    </div>
                    <span className={`font-medium ${
                  activeStep === index ? 'text-foreground' : 'text-muted-foreground'}`
                  }>
                      {step?.title}
                    </span>
                  </button>
                  {index < steps?.length - 1 &&
                <Icon name="ChevronRight" size={20} color="var(--color-muted-foreground)" />
                }
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-[400px] overflow-hidden">
                <Image
                  src={steps?.[activeStep]?.image}
                  alt={steps?.[activeStep]?.imageAlt}
                  className="w-full h-full object-cover" />

                <div className="absolute top-4 right-4">
                  <span className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground border border-border">
                    {steps?.[activeStep]?.badge}
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className={`inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full mb-6 bg-${steps?.[activeStep]?.color}/10`}>
                  <Icon
                    name={steps?.[activeStep]?.icon}
                    size={20}
                    color={`var(--color-${steps?.[activeStep]?.color})`} />

                  <span className={`text-sm font-medium`} style={{ color: `var(--color-${steps?.[activeStep]?.color})` }}>
                    Step {activeStep + 1} of 3
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {steps?.[activeStep]?.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {steps?.[activeStep]?.subtitle}
                </p>
                <p className="text-foreground mb-8">
                  {steps?.[activeStep]?.description}
                </p>

                <div className="space-y-3">
                  {steps?.[activeStep]?.details?.map((detail, index) =>
                  <div key={index} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-${steps?.[activeStep]?.color}/10`}>
                        <Icon
                        name="Check"
                        size={12}
                        color={`var(--color-${steps?.[activeStep]?.color})`} />

                      </div>
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {steps?.map((_, index) =>
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
              activeStep === index ?
              'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'}`
              }
              aria-label={`Go to step ${index + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

};

export default HowItWorksSection;