import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedSidebar from '../../components/navigation/RoleBasedSidebar';
import QueueStatsCard from './components/QueueStatsCard';
import QueueTableRow from './components/QueueTableRow';
import TTSControlPanel from './components/TTSControlPanel';
import AdvanceStageModal from './components/AdvanceStageModal';
import EmergencyContactModal from './components/EmergencyContactModal';
import IncidentReportModal from './components/IncidentReportModal';
import QueueFilters from './components/QueueFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BACKEND_QUEUE_URL = 'http://localhost:5000/api/queue'; // <- ensure this matches your server

const AdminDashboardQueue = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Live queue from backend
  const [queueData, setQueueData] = useState([]);
  const [filteredQueue, setFilteredQueue] = useState([]);

  const [filters, setFilters] = useState({ search: '', status: 'all', grade: 'all' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [ttsVolume, setTtsVolume] = useState(80);

  // Keep track of already announced / seen queue ids
  const seenIdsRef = useRef(new Set());

  // Stats derived from queueData
  const stats = {
    queueLength: queueData?.filter(item => item?.status !== 'Completed')?.length || 0,
    avgWaitTime: '—',
    completedToday: queueData?.filter(item => item?.status === 'Completed')?.length || 0,
    activePickups: queueData?.filter(item => item?.status === 'In Progress')?.length || 0
  };

  // TTS announce helper
  const speakAnnouncement = useCallback((message) => {
    if ('speechSynthesis' in window && ttsVolume > 0) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.volume = ttsVolume / 100;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [ttsVolume]);

  // Fetch queue from backend and update queueData + announce new arrivals
  useEffect(() => {
    let mounted = true;

    const fetchQueueAndUpdate = async () => {
      try {
        const res = await fetch(BACKEND_QUEUE_URL);
        if (!res.ok) {
          console.warn('Failed to fetch queue:', res.statusText);
          return;
        }
        const rows = await res.json();

        if (!Array.isArray(rows)) {
          console.warn('Unexpected /api/queue response (not array):', rows);
          return;
        }

        if (!mounted) return;

        // Determine new entries (not seen before)
        const newEntries = rows.filter(r => {
          // ensure r.id exists — if not, build a synthetic id using vehicle+student
          const id = r.id ?? `${r.vehicle_number}::${r.studentName}`;
          return !seenIdsRef.current.has(String(id));
        });

        // Announce new entries (stagger slightly)
        newEntries.forEach((entry, idx) => {
          const id = entry.id ?? `${entry.vehicle_number}::${entry.studentName}`;
          // mark immediately so we don't double-announce on quick polls
          seenIdsRef.current.add(String(id));

          const msg = `Vehicle ${entry.vehicle_number} has arrived. Student ${entry.studentName}, please proceed to the pickup zone.`;
          setTimeout(() => speakAnnouncement(msg), idx * 700);
        });

        // Update seen set with all rows' ids (keep stable)
        const currentIds = new Set(rows.map(r => String(r.id ?? `${r.vehicle_number}::${r.studentName}`)));
        seenIdsRef.current = currentIds;

        // Normalize arrivalTime to Date objects (optional)
        const normalized = rows.map(r => ({
          ...r,
          arrivalTime: r.arrivalTime ? new Date(r.arrivalTime) : null
        }));

        setQueueData(normalized);
        setFilteredQueue(normalized);
      } catch (err) {
        console.error('Error fetching queue:', err);
      }
    };

    // Immediately fetch once, then poll every 5 seconds
    fetchQueueAndUpdate();
    const interval = setInterval(fetchQueueAndUpdate, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [speakAnnouncement]);

  // Filter logic for search/status/grade
  useEffect(() => {
    let filtered = [...queueData];

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        (item?.studentName || '').toLowerCase().includes(searchLower) ||
        (item?.vehicle_number || '').toLowerCase().includes(searchLower) ||
        (item?.guardianName || '').toLowerCase().includes(searchLower)
      );
    }

    if (filters?.status && filters.status !== 'all') {
      filtered = filtered.filter(item => item?.status === filters.status);
    }

    if (filters?.grade && filters.grade !== 'all') {
      filtered = filtered.filter(item => item?.grade === filters.grade);
    }

    setFilteredQueue(filtered);
  }, [filters, queueData]);

  // action handlers
  const handleAdvanceStage = (student) => {
    setSelectedStudent(student);
    setModalType('advance');
  };

  const handleEmergencyContact = (student) => {
    setSelectedStudent(student);
    setModalType('emergency');
  };

  const handleIncidentReport = (student) => {
    setSelectedStudent(student);
    setModalType('incident');
  };

  const confirmAdvanceStage = (student, newStatus) => {
    setQueueData(prev => prev.map(item => item.id === student.id ? { ...item, status: newStatus } : item));
    setModalType(null);
    setSelectedStudent(null);
    speakAnnouncement(`${student.studentName} status updated to ${newStatus}.`);
  };

  const submitIncidentReport = (report) => {
    console.log('Incident Report Submitted:', report);
    setModalType(null);
    setSelectedStudent(null);
  };

  // Manual refresh (re-fetch once)
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(BACKEND_QUEUE_URL);
      if (res.ok) {
        const rows = await res.json();
        const normalized = rows.map(r => ({ ...r, arrivalTime: r.arrivalTime ? new Date(r.arrivalTime) : null }));
        setQueueData(normalized);
        setFilteredQueue(normalized);
        // update seenIds so refresh doesn't re-announce old items
        const currentIds = new Set(rows.map(r => String(r.id ?? `${r.vehicle_number}::${r.studentName}`)));
        seenIdsRef.current = currentIds;
      }
    } catch (err) {
      console.error('Manual refresh error:', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  };

  return (
    <>
      <Helmet>
        <title>Live Pickup Queue - Smart Pickup</title>
        <meta name="description" content="Real-time school pickup queue management with automated vehicle matching and TTS announcements" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <RoleBasedSidebar
          userRole="admin"
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className={`main-content ${isSidebarCollapsed ? 'with-collapsed-sidebar' : 'with-sidebar'}`}>
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-semibold text-foreground">Live Pickup Queue</h1>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-success/10 text-success border border-success/20">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                    Live
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground">Real-time monitoring and management of school pickup operations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <QueueStatsCard icon="Users" label="Current Queue" value={stats.queueLength} trend="down" trendValue="-2 from peak" color="primary" />
              <QueueStatsCard icon="Clock" label="Avg Wait Time" value={stats.avgWaitTime} trend="down" trendValue="-15% today" color="success" />
              <QueueStatsCard icon="CheckCircle" label="Completed Today" value={stats.completedToday} trend="up" trendValue="+12 since morning" color="accent" />
              <QueueStatsCard icon="Loader" label="Active Pickups" value={stats.activePickups} trend="neutral" trendValue="" color="warning" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <TTSControlPanel onVolumeChange={setTtsVolume} onTestAnnouncement={speakAnnouncement} />
              </div>

              <div className="bg-card rounded-lg p-6 border border-border shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon name="Activity" size={20} color="var(--color-accent)" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Quick Actions</h3>
                    <p className="text-sm text-muted-foreground">Bulk operations</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" fullWidth iconName="Volume2" iconPosition="left" onClick={() => {
                    queueData?.filter(q => q.status === 'Arrived')?.forEach((entry, idx) => {
                      setTimeout(() => speakAnnouncement(`Vehicle number ${entry.vehicle_number} has arrived. Student ${entry.studentName}, please proceed to pickup zone.`), idx * 700);
                    });
                  }}>
                    Announce All Arrived
                  </Button>

                  <Button variant="outline" fullWidth iconName="CheckCircle" iconPosition="left" onClick={() => {
                    setQueueData(prev => prev.map(item => item.status === 'In Progress' ? { ...item, status: 'Completed' } : item));
                  }}>
                    Complete All In Progress
                  </Button>

                  <Button variant="outline" fullWidth iconName="AlertCircle" iconPosition="left" onClick={() => {
                    alert('Delayed pickups view (not implemented)');
                  }}>
                    View Delayed Pickups
                  </Button>
                </div>
              </div>
            </div>

            <QueueFilters filters={filters} onFilterChange={setFilters} onRefresh={handleRefresh} isRefreshing={isRefreshing} onBulkAction={(action) => console.log('Bulk action:', action)} />

            <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">
                        <div className="flex items-center gap-2"><Icon name="User" size={16} />Student</div>
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">
                        <div className="flex items-center gap-2"><Icon name="Car" size={16} />Vehicle</div>
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">
                        <div className="flex items-center gap-2"><Icon name="Users" size={16} />Guardian</div>
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">
                        <div className="flex items-center gap-2"><Icon name="Clock" size={16} />Arrival</div>
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">
                        <div className="flex items-center gap-2"><Icon name="Activity" size={16} />Status</div>
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQueue?.length > 0 ? (
                      filteredQueue.map(student => (
                        <QueueTableRow
                          key={student.id}
                          student={student}
                          onAdvanceStage={handleAdvanceStage}
                          onEmergencyContact={handleEmergencyContact}
                          onIncidentReport={handleIncidentReport}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                              <Icon name="Inbox" size={32} color="var(--color-muted-foreground)" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-1">No students in queue</p>
                              <p className="text-sm text-muted-foreground">
                                {filters?.search || filters?.status !== 'all' || filters?.grade !== 'all'
                                  ? 'Try adjusting your filters' : 'Queue is empty - waiting for vehicle detections'}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
              <p>Showing {filteredQueue?.length} of {queueData?.length} students</p>
              <p>Auto-refresh enabled • Polls every 5 seconds</p>
            </div>
          </div>
        </main>

        {modalType === 'advance' && selectedStudent && (
          <AdvanceStageModal student={selectedStudent} onConfirm={confirmAdvanceStage} onCancel={() => setModalType(null)} />
        )}

        {modalType === 'emergency' && selectedStudent && (
          <EmergencyContactModal student={selectedStudent} onClose={() => setModalType(null)} />
        )}

        {modalType === 'incident' && selectedStudent && (
          <IncidentReportModal student={selectedStudent} onSubmit={submitIncidentReport} onCancel={() => setModalType(null)} />
        )}
      </div>
    </>
  );
};

export default AdminDashboardQueue;
