import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DemoSection = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    district: '',
    contactName: '',
    email: '',
    phone: '',
    studentCount: '',
    role: '',
    preferredDate: '',
    preferredTime: '',
    smsOptIn: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roleOptions = [
    { value: 'principal', label: 'Principal' },
    { value: 'assistant-principal', label: 'Assistant Principal' },
    { value: 'it-director', label: 'IT Director' },
    { value: 'superintendent', label: 'Superintendent' },
    { value: 'other', label: 'Other Administrator' }
  ];

  const studentCountOptions = [
    { value: '50-250', label: '50-250 students' },
    { value: '251-500', label: '251-500 students' },
    { value: '501-750', label: '501-750 students' },
    { value: '751-1000', label: '751-1,000 students' },
    { value: '1000+', label: '1,000+ students' }
  ];

  const timeOptions = [
    { value: '9am', label: '9:00 AM' },
    { value: '10am', label: '10:00 AM' },
    { value: '11am', label: '11:00 AM' },
    { value: '1pm', label: '1:00 PM' },
    { value: '2pm', label: '2:00 PM' },
    { value: '3pm', label: '3:00 PM' },
    { value: '4pm', label: '4:00 PM' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.schoolName?.trim()) {
      newErrors.schoolName = 'School name is required';
    }
    if (!formData?.contactName?.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData?.studentCount) {
      newErrors.studentCount = 'Please select student count';
    }
    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <section id="demo" className="py-16 bg-gradient-to-br from-success/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={48} color="var(--color-success)" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Demo Request Received!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your interest in VoiceGate. Our team will contact you within 24 hours to schedule your personalized demo.
            </p>
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Confirmation Email</h4>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a confirmation email with demo details within 5 minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Personalized Demo</h4>
                    <p className="text-sm text-muted-foreground">
                      30-minute live demo tailored to your school's specific needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Implementation Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive a custom implementation timeline and pricing proposal
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsSubmitted(false)}
            >
              Request Another Demo
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="demo" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See VoiceGate in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule a personalized demo and discover how VoiceGate can transform your school's pickup process
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                What You'll See in the Demo
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: 'Camera',
                    title: 'Live License Plate Recognition',
                    description: 'Watch real-time vehicle detection and identification'
                  },
                  {
                    icon: 'Radio',
                    title: 'Voice Announcement System',
                    description: 'Hear actual voice announcements in action'
                  },
                  {
                    icon: 'BarChart3',
                    title: 'Analytics Dashboard',
                    description: 'Explore comprehensive reporting and insights'
                  },
                  {
                    icon: 'Shield',
                    title: 'Security Features',
                    description: 'Review compliance and data protection measures'
                  }
                ]?.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item?.icon} size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item?.title}</h4>
                      <p className="text-sm text-muted-foreground">{item?.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Limited Availability</h4>
                    <p className="text-sm text-muted-foreground">
                      Only 3 demo slots available this week. Book now to secure your spot!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="School Name"
                  type="text"
                  placeholder="Enter your school name"
                  value={formData?.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e?.target?.value)}
                  error={errors?.schoolName}
                  required
                />

                <Input
                  label="District (Optional)"
                  type="text"
                  placeholder="Enter your district name"
                  value={formData?.district}
                  onChange={(e) => handleInputChange('district', e?.target?.value)}
                />

                <Input
                  label="Your Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData?.contactName}
                  onChange={(e) => handleInputChange('contactName', e?.target?.value)}
                  error={errors?.contactName}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your.email@school.edu"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  error={errors?.phone}
                  required
                />

                <Select
                  label="Your Role"
                  options={roleOptions}
                  value={formData?.role}
                  onChange={(value) => handleInputChange('role', value)}
                  error={errors?.role}
                  placeholder="Select your role"
                  required
                />

                <Select
                  label="Number of Students"
                  options={studentCountOptions}
                  value={formData?.studentCount}
                  onChange={(value) => handleInputChange('studentCount', value)}
                  error={errors?.studentCount}
                  placeholder="Select student count"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Preferred Date"
                    type="date"
                    value={formData?.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e?.target?.value)}
                    min={new Date()?.toISOString()?.split('T')?.[0]}
                  />

                  <Select
                    label="Preferred Time"
                    options={timeOptions}
                    value={formData?.preferredTime}
                    onChange={(value) => handleInputChange('preferredTime', value)}
                    placeholder="Select time"
                  />
                </div>

                <Checkbox
                  label="Send me SMS updates about my demo"
                  description="We'll text you appointment reminders and updates"
                  checked={formData?.smsOptIn}
                  onChange={(e) => handleInputChange('smsOptIn', e?.target?.checked)}
                />

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  fullWidth
                  className="bg-accent hover:bg-accent/90"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule My Demo
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;