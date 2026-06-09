import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const QueueFilters = ({ 
  filters, 
  onFilterChange, 
  onRefresh, 
  isRefreshing,
  onBulkAction 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Arrived', label: 'Arrived' },
    { value: 'Called', label: 'Called' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' }
  ];

  const gradeOptions = [
    { value: 'all', label: 'All Grades' },
    { value: '1', label: 'Grade 1' },
    { value: '2', label: 'Grade 2' },
    { value: '3', label: 'Grade 3' },
    { value: '4', label: 'Grade 4' },
    { value: '5', label: 'Grade 5' }
  ];

  return (
    <div className="bg-card rounded-lg p-4 border border-border shadow-card mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search by name or vehicle..."
            value={filters?.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e?.target?.value })}
          />

          <Select
            options={statusOptions}
            value={filters?.status || 'all'}
            onChange={(value) => onFilterChange({ ...filters, status: value })}
            placeholder="Filter by status"
          />

          <Select
            options={gradeOptions}
            value={filters?.grade || 'all'}
            onChange={(value) => onFilterChange({ ...filters, grade: value })}
            placeholder="Filter by grade"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            loading={isRefreshing}
            onClick={onRefresh}
          >
            Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => onBulkAction('export')}
          >
            Export
          </Button>
        </div>
      </div>
      {(filters?.search || filters?.status !== 'all' || filters?.grade !== 'all') && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Icon name="Filter" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters?.search && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Search: {filters?.search}
            </span>
          )}
          {filters?.status !== 'all' && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Status: {filters?.status}
            </span>
          )}
          {filters?.grade !== 'all' && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Grade: {filters?.grade}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={() => onFilterChange({ search: '', status: 'all', grade: 'all' })}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default QueueFilters;