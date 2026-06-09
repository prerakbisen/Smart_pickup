import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContactModal = ({ student, onClose }) => {
  const [isCalling, setIsCalling] = useState(false);

  const emergencyContacts = [
    {
      id: 1,
      name: student?.guardianName,
      relationship: student?.relationship,
      phone_number: '+1 (555) 123-4567',
      isPrimary: true
    },
    {
      id: 2,
      name: 'Rishank',
      relationship: 'Mother',
      phone_number: '+1 (555) 234-5678',
      isPrimary: false
    },
    {
      id: 3,
      name: 'Emergency Services',
      relationship: 'School Office',
      phone_number: '+1 (555) 911-0000',
      isPrimary: false
    }
  ];

  const handleCall = (contact) => {
    setIsCalling(true);
    setTimeout(() => {
      window.location.href = `tel:${contact?.phone_number}`;
      setIsCalling(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevated max-w-md w-full border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
              <Icon name="phone_number" size={20} color="var(--color-error)" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Emergency Contacts</h3>
              <p className="text-sm text-muted-foreground">{student?.studentName}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {emergencyContacts?.map((contact) => (
              <div
                key={contact?.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${contact?.isPrimary ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Icon 
                      name="User" 
                      size={18} 
                      color={contact?.isPrimary ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{contact?.name}</p>
                      {contact?.isPrimary && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{contact?.relationship}</p>
                    <p className="text-sm font-mono text-foreground mt-1">{contact?.phone_number}</p>
                  </div>
                </div>
                <Button
                  variant={contact?.isPrimary ? 'default' : 'outline'}
                  size="sm"
                  iconName="phone_number"
                  iconPosition="left"
                  loading={isCalling}
                  onClick={() => handleCall(contact)}
                >
                  Call
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" size={18} color="var(--color-warning)" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Emergency Protocol</p>
                <p className="text-xs text-muted-foreground">
                  All emergency calls are logged. Contact primary guardian first unless immediate danger requires emergency services.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactModal;