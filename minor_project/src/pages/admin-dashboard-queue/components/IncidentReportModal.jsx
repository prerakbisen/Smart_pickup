import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IncidentReportModal = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    incidentType: '',
    severity: '',
    description: '',
    actionTaken: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incidentTypes = [
    { value: 'delay', label: 'Pickup Delay' },
    { value: 'unauthorized', label: 'Unauthorized Person' },
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'behavioral', label: 'Behavioral Issue' },
    { value: 'vehicle', label: 'Vehicle Issue' },
    { value: 'other', label: 'Other' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low - Minor Issue' },
    { value: 'medium', label: 'Medium - Requires Attention' },
    { value: 'high', label: 'High - Urgent Action Needed' },
    { value: 'critical', label: 'Critical - Emergency' }
  ];

  const handleSubmit = async () => {
    if (!formData?.incidentType || !formData?.severity || !formData?.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const report = {
      ...formData,
      studentId: student?.id,
      studentName: student?.studentName,
      timestamp: new Date()?.toISOString(),
      reportedBy: 'Admin User'
    };
    
    onSubmit(report);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevated max-w-2xl w-full border border-border max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Report Incident</h3>
              <p className="text-sm text-muted-foreground">Document pickup-related incident</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onCancel}
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {student?.studentName?.split(' ')?.map(n => n?.[0])?.join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{student?.studentName}</p>
                <p className="text-sm text-muted-foreground">Grade {student?.grade} • Vehicle: {student?.vehicle_number}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Incident Type"
              required
              options={incidentTypes}
              value={formData?.incidentType}
              onChange={(value) => setFormData({ ...formData, incidentType: value })}
              placeholder="Select incident type"
            />

            <Select
              label="Severity Level"
              required
              options={severityLevels}
              value={formData?.severity}
              onChange={(value) => setFormData({ ...formData, severity: value })}
              placeholder="Select severity"
            />
          </div>

          <Input
            label="Incident Description"
            type="text"
            required
            placeholder="Describe what happened in detail"
            value={formData?.description}
            onChange={(e) => setFormData({ ...formData, description: e?.target?.value })}
            description="Provide clear details for documentation"
          />

          <Input
            label="Action Taken"
            type="text"
            placeholder="Describe immediate actions taken"
            value={formData?.actionTaken}
            onChange={(e) => setFormData({ ...formData, actionTaken: e?.target?.value })}
            description="Optional: Document response measures"
          />

          <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={18} color="var(--color-warning)" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Important Notice</p>
                <p className="text-xs text-muted-foreground">
                  All incident reports are permanently logged and may be reviewed by school administration. Ensure accuracy and completeness. For critical emergencies, contact emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-6 border-t border-border sticky bottom-0 bg-card">
          <Button
            variant="outline"
            fullWidth
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            fullWidth
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentReportModal;