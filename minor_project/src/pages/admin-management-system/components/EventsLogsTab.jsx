import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EventLogsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const eventLogs = [
    {
      id: 1,
      timestamp: "11/23/2025 03:45 PM",
      eventType: "Pickup Completed",
      severity: "info",
      studentName: "Emma Johnson",
      vehicle_number: "ABC-1234",
      guardianName: "Rishank",
      details: "Student successfully picked up from queue position 3",
      performedBy: "System"
    },
    {
      id: 2,
      timestamp: "11/23/2025 03:42 PM",
      eventType: "Vehicle Matched",
      severity: "success",
      studentName: "Liam Martinez",
      vehicle_number: "XYZ-5678",
      guardianName: "Carlos Martinez",
      details: "Vehicle number matched, TTS announcement triggered",
      performedBy: "System"
    },
    {
      id: 3,
      timestamp: "11/23/2025 03:38 PM",
      eventType: "Queue Entry",
      severity: "info",
      studentName: "Olivia Chen",
      vehicle_number: "DEF-9012",
      guardianName: "Wei Chen",
      details: "Student added to pickup queue",
      performedBy: "Admin Staff"
    },
    {
      id: 4,
      timestamp: "11/23/2025 03:35 PM",
      eventType: "System Alert",
      severity: "warning",
      studentName: "Noah Williams",
      vehicle_number: "GHI-3456",
      guardianName: "Michael Williams",
      details: "Duplicate vehicle number detected in queue",
      performedBy: "System"
    },
    {
      id: 5,
      timestamp: "11/23/2025 03:30 PM",
      eventType: "User Login",
      severity: "info",
      studentName: "-",
      vehicle_number: "-",
      guardianName: "Admin User",
      details: "Administrator logged into system",
      performedBy: "Admin User"
    },
    {
      id: 6,
      timestamp: "11/23/2025 03:25 PM",
      eventType: "Settings Changed",
      severity: "warning",
      studentName: "-",
      vehicle_number: "-",
      guardianName: "Admin User",
      details: "Pickup threshold updated from 5 to 10 minutes",
      performedBy: "Admin User"
    },
    {
      id: 7,
      timestamp: "11/23/2025 03:20 PM",
      eventType: "Pickup Cancelled",
      severity: "error",
      studentName: "Sophia Patel",
      vehicle_number: "JKL-7890",
      guardianName: "Priya Patel",
      details: "Pickup cancelled by parent via mobile app",
      performedBy: "Parent User"
    },
    {
      id: 8,
      timestamp: "11/23/2025 03:15 PM",
      eventType: "Vehicle Updated",
      severity: "info",
      studentName: "Emma Johnson",
      vehicle_number: "ABC-1234",
      guardianName: "Rishank",
      details: "Vehicle number updated from ABC-1233 to ABC-1234",
      performedBy: "Admin Staff"
    }
  ];

  const eventTypeOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'pickup', label: 'Pickup Events' },
    { value: 'vehicle', label: 'Vehicle Events' },
    { value: 'system', label: 'System Events' },
    { value: 'user', label: 'User Actions' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const filteredLogs = eventLogs?.filter(log => {
    const matchesSearch = log?.studentName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         log?.vehicle_number?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         log?.details?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesSearch;
  });

  const handleExportLogs = () => {
    alert('Event logs exported successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search logs by student, vehicle, or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={eventTypeOptions}
            value={eventTypeFilter}
            onChange={setEventTypeFilter}
            className="w-40"
          />
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            className="w-40"
          />
          <Button variant="outline" iconName="Download" onClick={handleExportLogs}>
            Export Logs
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {filteredLogs?.map((log) => (
          <div
            key={log?.id}
            className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center ${getSeverityColor(log?.severity)}`}>
                <Icon name={getSeverityIcon(log?.severity)} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{log?.eventType}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{log?.details}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{log?.timestamp}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {log?.studentName !== '-' && (
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-muted-foreground">{log?.studentName}</span>
                    </div>
                  )}
                  {log?.vehicle_number !== '-' && (
                    <div className="flex items-center gap-2">
                      <Icon name="Car" size={14} color="var(--color-muted-foreground)" />
                      <span className="font-mono text-muted-foreground">{log?.vehicle_number}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Icon name="UserCheck" size={14} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground">{log?.performedBy}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filteredLogs?.length} of {eventLogs?.length} events</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventLogsTab;