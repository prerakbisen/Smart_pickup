import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QueueTableRow = ({ 
  student, 
  onAdvanceStage, 
  onEmergencyContact, 
  onIncidentReport,
  isDragging,
  dragHandleProps 
}) => {
  const [showActions, setShowActions] = useState(false);

  const statusConfig = {
    'Arrived': { color: 'bg-warning/10 text-warning border-warning/20', icon: 'Clock' },
    'Called': { color: 'bg-primary/10 text-primary border-primary/20', icon: 'Volume2' },
    'In Progress': { color: 'bg-accent/10 text-accent border-accent/20', icon: 'Loader' },
    'Completed': { color: 'bg-success/10 text-success border-success/20', icon: 'CheckCircle' }
  };

  const currentStatus = statusConfig?.[student?.status] || statusConfig?.['Arrived'];

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <tr 
      className={`border-b border-border hover:bg-muted/50 transition-colors duration-150 ${isDragging ? 'opacity-50' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
            <Icon name="GripVertical" size={18} color="var(--color-muted-foreground)" />
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {student?.studentName?.split(' ')?.map(n => n?.[0])?.join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{student?.studentName}</p>
            <p className="text-sm text-muted-foreground">Grade {student?.grade}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Icon name="Car" size={16} color="var(--color-muted-foreground)" />
          <span className="font-mono font-medium text-foreground">{student?.vehicle_number}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <div>
          <p className="font-medium text-foreground">{student?.guardianName}</p>
          <p className="text-sm text-muted-foreground">{student?.relationship}</p>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-foreground">{formatTime(student?.arrivalTime)}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${currentStatus?.color}`}>
          <Icon name={currentStatus?.icon} size={14} />
          {student?.status}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className={`flex items-center gap-2 transition-opacity duration-200 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => onAdvanceStage(student)}
            disabled={student?.status === 'Completed'}
          >
            Advance
          </Button>
          <Button
            variant="ghost"
            size="icon"
            iconName="phone_number"
            onClick={() => onEmergencyContact(student)}
            title="Emergency Contact"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="AlertTriangle"
            onClick={() => onIncidentReport(student)}
            title="Report Incident"
          />
        </div>
      </td>
    </tr>
  );
};

export default QueueTableRow;