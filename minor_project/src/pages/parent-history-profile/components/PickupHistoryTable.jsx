import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PickupHistoryTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const itemsPerPage = 10;

  const pickupHistory = [
    {
      id: 1,
      studentName: "Emma Johnson",
      vehicle_number: "ABC-1234",
      timestamp: new Date("2025-11-23T15:30:00"),
      guardianName: "Rishank",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 2,
      studentName: "Liam Martinez",
      vehicle_number: "XYZ-5678",
      timestamp: new Date("2025-11-23T15:25:00"),
      guardianName: "Carlos Martinez",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 3,
      studentName: "Olivia Chen",
      vehicle_number: "DEF-9012",
      timestamp: new Date("2025-11-22T15:35:00"),
      guardianName: "Wei Chen",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 4,
      studentName: "Noah Williams",
      vehicle_number: "GHI-3456",
      timestamp: new Date("2025-11-22T15:20:00"),
      guardianName: "Michael Williams",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 5,
      studentName: "Ava Brown",
      vehicle_number: "JKL-7890",
      timestamp: new Date("2025-11-21T15:40:00"),
      guardianName: "Jennifer Brown",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 6,
      studentName: "Ethan Davis",
      vehicle_number: "MNO-2345",
      timestamp: new Date("2025-11-21T15:28:00"),
      guardianName: "Robert Davis",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 7,
      studentName: "Sophia Garcia",
      vehicle_number: "PQR-6789",
      timestamp: new Date("2025-11-20T15:32:00"),
      guardianName: "Maria Garcia",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 8,
      studentName: "Mason Rodriguez",
      vehicle_number: "STU-0123",
      timestamp: new Date("2025-11-20T15:45:00"),
      guardianName: "Diego Rodriguez",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 9,
      studentName: "Isabella Wilson",
      vehicle_number: "VWX-4567",
      timestamp: new Date("2025-11-19T15:22:00"),
      guardianName: "Amanda Wilson",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 10,
      studentName: "Lucas Anderson",
      vehicle_number: "YZA-8901",
      timestamp: new Date("2025-11-19T15:38:00"),
      guardianName: "James Anderson",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 11,
      studentName: "Mia Taylor",
      vehicle_number: "BCD-2345",
      timestamp: new Date("2025-11-18T15:27:00"),
      guardianName: "Emily Taylor",
      status: "completed",
      statusColor: "success"
    },
    {
      id: 12,
      studentName: "Alexander Thomas",
      vehicle_number: "EFG-6789",
      timestamp: new Date("2025-11-18T15:33:00"),
      guardianName: "David Thomas",
      status: "completed",
      statusColor: "success"
    }
  ];

  const filteredAndSortedData = useMemo(() => {
    let filtered = pickupHistory?.filter(item => {
      const matchesSearch = 
        item?.studentName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.vehicle_number?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.guardianName?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      let matchesDateRange = true;
      if (dateRange?.start && dateRange?.end) {
        const itemDate = new Date(item.timestamp)?.setHours(0, 0, 0, 0);
        const startDate = new Date(dateRange.start)?.setHours(0, 0, 0, 0);
        const endDate = new Date(dateRange.end)?.setHours(0, 0, 0, 0);
        matchesDateRange = itemDate >= startDate && itemDate <= endDate;
      }

      return matchesSearch && matchesDateRange;
    });

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'timestamp') {
          aValue = new Date(aValue)?.getTime();
          bValue = new Date(bValue)?.getTime();
        } else {
          aValue = aValue?.toString()?.toLowerCase();
          bValue = bValue?.toString()?.toLowerCase();
        }

        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [pickupHistory, searchTerm, sortConfig, dateRange]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleExport = () => {
    const csvContent = [
      ['Student Name', 'Vehicle Number', 'Pickup Time', 'Guardian Name', 'Status'],
      ...filteredAndSortedData?.map(item => [
        item?.studentName,
        item?.vehicle_number,
        new Date(item.timestamp)?.toLocaleString(),
        item?.guardianName,
        item?.status
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pickup-history-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Pickup History</h2>
            <p className="text-sm text-muted-foreground mt-1">
              View and track all past pickup records
            </p>
          </div>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={handleExport}
          >
            Export CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="md:col-span-1">
            <Input
              type="search"
              placeholder="Search by name or vehicle..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e?.target?.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div>
            <Input
              type="date"
              label="Start Date"
              value={dateRange?.start}
              onChange={(e) => {
                setDateRange(prev => ({ ...prev, start: e?.target?.value }));
                setCurrentPage(1);
              }}
            />
          </div>
          <div>
            <Input
              type="date"
              label="End Date"
              value={dateRange?.end}
              onChange={(e) => {
                setDateRange(prev => ({ ...prev, end: e?.target?.value }));
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {[
                { key: 'studentName', label: 'Student Name' },
                { key: 'vehicle_number', label: 'Vehicle Number' },
                { key: 'timestamp', label: 'Pickup Time' },
                { key: 'guardianName', label: 'Guardian Name' },
                { key: 'status', label: 'Status' }
              ]?.map(column => (
                <th
                  key={column?.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort(column?.key)}
                >
                  <div className="flex items-center gap-2">
                    {column?.label}
                    <div className="flex flex-col">
                      <Icon
                        name="ChevronUp"
                        size={12}
                        color={sortConfig?.key === column?.key && sortConfig?.direction === 'asc' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                      />
                      <Icon
                        name="ChevronDown"
                        size={12}
                        color={sortConfig?.key === column?.key && sortConfig?.direction === 'desc' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                      />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData?.length > 0 ? (
              paginatedData?.map((item) => (
                <tr key={item?.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {item?.studentName}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-data">
                    {item?.vehicle_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatTimestamp(item?.timestamp)}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {item?.guardianName}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-${item?.statusColor}/10 text-${item?.statusColor}`}>
                      <Icon name="CheckCircle2" size={14} />
                      {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Icon name="Search" size={48} color="var(--color-muted-foreground)" />
                    <p className="text-muted-foreground">No pickup records found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden divide-y divide-border">
        {paginatedData?.length > 0 ? (
          paginatedData?.map((item) => (
            <div key={item?.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{item?.studentName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Guardian: {item?.guardianName}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-${item?.statusColor}/10 text-${item?.statusColor}`}>
                  <Icon name="CheckCircle2" size={12} />
                  {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Vehicle Number</p>
                  <p className="font-medium text-foreground font-data">{item?.vehicle_number}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Pickup Time</p>
                  <p className="font-medium text-foreground">{formatTimestamp(item?.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
            <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
            <p className="text-muted-foreground">No pickup records found</p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="p-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData?.length)} of {filteredAndSortedData?.length} records
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              iconPosition="right"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupHistoryTable;