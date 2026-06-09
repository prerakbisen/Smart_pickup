import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AdvanceStageModal = ({ student, onConfirm, onCancel }) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getNextStage = (currentStatus) => {
    const stages = {
      'Arrived': 'Called',
      'Called': 'In Progress',
      'In Progress': 'Completed'
    };
    return stages?.[currentStatus] || currentStatus;
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onConfirm(student, getNextStage(student?.status), reason);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevated max-w-md w-full border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="ArrowRight" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Advance Pickup Stage</h3>
              <p className="text-sm text-muted-foreground">Confirm stage progression</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onCancel}
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {student?.studentName?.split(' ')?.map(n => n?.[0])?.join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{student?.studentName}</p>
                <p className="text-sm text-muted-foreground">Grade {student?.grade}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Vehicle</p>
                <p className="font-mono font-medium text-foreground">{student?.vehicle_number}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Guardian</p>
                <p className="font-medium text-foreground">{student?.guardianName}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Current:</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20">
                {student?.status}
              </span>
            </div>
            <Icon name="ArrowRight" size={20} color="var(--color-primary)" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Next:</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                {getNextStage(student?.status)}
              </span>
            </div>
          </div>

          <Input
            label="Reason (Optional)"
            type="text"
            placeholder="Enter reason for manual advancement"
            value={reason}
            onChange={(e) => setReason(e?.target?.value)}
            description="Provide context for audit logs"
          />
        </div>

        <div className="flex items-center gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            fullWidth
            loading={isSubmitting}
            onClick={handleConfirm}
          >
            Confirm Advancement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvanceStageModal;