import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
  {
    id: 1,
    name: 'Dr. Rishank',
    role: 'Principal',
    school: 'Kendriya Vidyalaya',
    location: 'Bhopal, India',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_117cb52db-1763299573499.png",
    avatarAlt: 'Professional headshot of middle-aged woman with short brown hair wearing navy blazer and white blouse smiling warmly',
    quote: 'VoiceGate transformed our chaotic pickup process into a smooth, efficient operation. We went from 20-minute wait times to under 5 minutes. Parents are thrilled, and our staff can focus on what matters most - education.',
    metrics: [
    { label: 'Time Reduction', value: '75%' },
    { label: 'Parent Satisfaction', value: '98%' },
    { label: 'Students Served', value: '650' }],

    videoThumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1429c7606-1763999861520.png",
    videoThumbnailAlt: 'Modern elementary school building exterior with organized pickup lane and happy parents waving from cars during sunny afternoon'
  },
  {
    id: 2,
    name: 'Deepanshu Mehta',
    role: 'IT Director',
    school: 'Delhi International School',
    location: 'Delhi, India',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13a48293d-1763296098326.png",
    avatarAlt: 'Professional headshot of Asian man with black-rimmed glasses wearing gray suit and blue tie with confident smile',
    quote: 'The integration was seamless with our existing systems. The security features meet all our compliance requirements, and the analytics dashboard gives us insights we never had before. Best technology investment we\'ve made.',
    metrics: [
    { label: 'Implementation Time', value: '2 weeks' },
    { label: 'System Uptime', value: '99.9%' },
    { label: 'Students Served', value: '850' }],

    videoThumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_18efb59a4-1763999862758.png",
    videoThumbnailAlt: 'Modern school technology center with multiple computer screens displaying VoiceGate dashboard analytics and real-time pickup monitoring system'
  },
  {
    id: 3,
    name: 'Ritika Sharma',
    role: 'Assistant Principal',
    school: 'Public High School',
    location: 'Mumbai, India',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1631c1677-1763295642190.png",
    avatarAlt: 'Professional headshot of Hispanic woman with long dark hair wearing burgundy blazer and pearl necklace with warm professional smile',
    quote: 'Safety was our top concern, and VoiceGate exceeded our expectations. The automated verification system ensures only authorized individuals pick up students. The peace of mind for parents and staff is invaluable.',
    metrics: [
    { label: 'Security Incidents', value: '0' },
    { label: 'Staff Hours Saved', value: '15/week' },
    { label: 'Students Served', value: '1,200' }],

    videoThumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_19277a4f2-1763999862062.png",
    videoThumbnailAlt: 'High school security office with wall-mounted monitors showing live camera feeds of pickup area with vehicles and students walking safely'
  }];


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const currentTestimonial = testimonials?.[activeTestimonial];

  return (
    <section id="success-stories" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Schools Nationwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how VoiceGate is transforming school pickup processes across the country
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-5 gap-0">
              <div className="md:col-span-2 relative h-[400px] md:h-auto overflow-hidden">
                <Image
                  src={currentTestimonial?.videoThumbnail}
                  alt={currentTestimonial?.videoThumbnailAlt}
                  className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h4 className="font-bold text-lg mb-1">{currentTestimonial?.school}</h4>
                    <p className="text-sm opacity-90">{currentTestimonial?.location}</p>
                  </div>
                </div>
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-250">
                  <Icon name="Play" size={24} color="var(--color-primary)" />
                </button>
              </div>

              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={currentTestimonial?.avatar}
                    alt={currentTestimonial?.avatarAlt}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary" />

                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {currentTestimonial?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonial?.role}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <Icon name="Quote" size={32} color="var(--color-primary)" className="opacity-20 mb-4" />
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentTestimonial?.quote}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  {currentTestimonial?.metrics?.map((metric, index) =>
                  <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {metric?.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric?.label}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials?.map((_, index) =>
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
              activeTestimonial === index ?
              'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'}`
              }
              aria-label={`View testimonial ${index + 1}`} />

            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {testimonials?.map((testimonial, index) =>
            <button
              key={testimonial?.id}
              onClick={() => setActiveTestimonial(index)}
              className={`text-left bg-card border rounded-lg p-4 transition-all duration-300 ${
              activeTestimonial === index ?
              'border-primary shadow-md' :
              'border-border hover:border-primary/50'}`
              }>

                <div className="flex items-center gap-3 mb-3">
                  <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover" />

                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {testimonial?.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial?.school}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {testimonial?.quote}
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;