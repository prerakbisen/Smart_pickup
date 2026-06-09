import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How long does installation and setup take?',
      answer: 'Installation typically takes 1-3 weeks depending on your school size and existing infrastructure. Our team handles everything from camera installation to system configuration. We provide comprehensive training for your staff and ensure everything is working perfectly before going live.',
      category: 'Implementation'
    },
    {
      id: 2,
      question: 'Does VoiceGate integrate with our existing school management system?',
      answer: 'Yes! VoiceGate integrates seamlessly with major school information systems including PowerSchool, Infinite Campus, Skyward, and others. We can also work with custom systems through our API. The integration allows automatic syncing of student data, parent information, and vehicle registrations.',
      category: 'Integration'
    },
    {
      id: 3,
      question: 'What happens if the system doesn\'t recognize a license plate?',
      answer: 'Our system has a 99.8% accuracy rate, but we have multiple fallback options. Staff can manually verify vehicles through the dashboard, parents can use a mobile check-in option, or the system can alert staff for manual assistance. All interactions are logged for security purposes.',
      category: 'Technical'
    },
    {
      id: 4,
      question: 'How does the system perform in bad weather conditions?',
      answer: 'VoiceGate cameras are designed for all weather conditions including rain, snow, fog, and extreme temperatures. Our advanced AI can recognize plates even when partially obscured. The system also includes night vision capabilities for early morning or evening pickups.',
      category: 'Technical'
    },
    {
      id: 5,
      question: 'Is student data secure and compliant with privacy regulations?',
      answer: 'Absolutely. VoiceGate is fully FERPA and COPPA compliant. All data is encrypted both in transit and at rest using AES-256 encryption. We maintain SOC 2 Type II certification and conduct regular security audits. Only authorized school personnel have access to student information, and we never share data with third parties.',
      category: 'Security'
    },
    {
      id: 6,
      question: 'Can parents register multiple vehicles?',
      answer: 'Yes, parents can register unlimited vehicles for pickup authorization. The system recognizes all registered vehicles and announces the student accordingly. Parents can also designate emergency contacts and their vehicles for authorized pickup.',
      category: 'Features'
    },
    {
      id: 7,
      question: 'What kind of support do you provide after implementation?',
      answer: 'We provide ongoing support based on your plan tier. All plans include email support, software updates, and access to our knowledge base. Professional and Enterprise plans include phone support, dedicated account managers, and priority response times. We also offer optional on-site training refreshers.',
      category: 'Support'
    },
    {
      id: 8,
      question: 'Can we customize the voice announcements?',
      answer: 'Yes! You can customize announcement formats, choose from multiple voice options, adjust volume levels for different areas, and even support multiple languages. Professional and Enterprise plans include advanced customization options like custom messages for special circumstances.',
      category: 'Features'
    }
  ];

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFAQs = activeCategory === 'All' 
    ? faqs 
    : faqs?.filter(faq => faq?.category === activeCategory);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about VoiceGate
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-250 ${
                  activeCategory === category
                    ? 'bg-primary text-white' :'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredFAQs?.map((faq) => (
              <div
                key={faq?.id}
                className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(faq?.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {faq?.question}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {faq?.category}
                    </span>
                  </div>
                  <Icon
                    name={openFAQ === faq?.id ? 'ChevronUp' : 'ChevronDown'}
                    size={20}
                    color="var(--color-muted-foreground)"
                    className="flex-shrink-0"
                  />
                </button>

                {openFAQ === faq?.id && (
                  <div className="px-6 pb-6 animate-slide-down">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq?.answer}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <button className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Icon name="FileText" size={14} />
                        View Documentation
                      </button>
                      <button className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Icon name="Video" size={14} />
                        Watch Video
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 text-center">
            <Icon name="MessageCircle" size={48} color="var(--color-primary)" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you find the perfect solution for your school
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-250">
                <Icon name="Calendar" size={20} />
                Schedule a Call
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-lg hover:bg-muted transition-colors duration-250">
                <Icon name="Mail" size={20} />
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;