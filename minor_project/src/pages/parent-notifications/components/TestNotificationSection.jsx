import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TestNotificationSection = ({ onSendTest }) => {
  const [selectedType, setSelectedType] = useState('SMS');
  const [isSending, setIsSending] = useState(false);

  const notificationTypes = [
    { value: 'SMS', label: 'SMS Message' },
    { value: 'Email', label: 'Email' },
    { value: 'Push', label: 'Push Notification' }
  ];

  const handleSendTest = async () => {
    setIsSending(true);
    await onSendTest(selectedType);
    setTimeout(() => setIsSending(false), 1500);
  };

  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon name="Send" size={20} color="var(--color-accent)" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground mb-1">Test Notifications</h3>
          <p className="text-xs text-muted-foreground">
            Send a test notification to verify your preferences are working correctly
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Select
          label="Notification Type"
          options={notificationTypes}
          value={selectedType}
          onChange={setSelectedType}
        />

        <Button
          variant="default"
          fullWidth
          onClick={handleSendTest}
          loading={isSending}
          iconName="Send"
          iconPosition="left"
        >
          {isSending ? 'Sending...' : 'Send Test Notification'}
        </Button>
      </div>
    </div>
  );
};

export default TestNotificationSection;