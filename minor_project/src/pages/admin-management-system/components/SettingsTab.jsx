import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsTab = () => {
  const [pickupThreshold, setPickupThreshold] = useState('10');
  const [autoAnnounce, setAutoAnnounce] = useState(true);
  const [duplicateAlert, setDuplicateAlert] = useState(true);
  const [parentNotifications, setParentNotifications] = useState(true);
  const [ttsVoice, setTtsVoice] = useState('female');
  const [ttsSpeed, setTtsSpeed] = useState('normal');

  const thresholdOptions = [
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '20', label: '20 minutes' }
  ];

  const voiceOptions = [
    { value: 'female', label: 'Female Voice' },
    { value: 'male', label: 'Male Voice' }
  ];

  const speedOptions = [
    { value: 'slow', label: 'Slow' },
    { value: 'normal', label: 'Normal' },
    { value: 'fast', label: 'Fast' }
  ];

  const rolePermissions = [
    {
      role: 'Administrator',
      permissions: {
        manageStudents: true,
        manageQueue: true,
        viewLogs: true,
        systemSettings: true,
        userManagement: true
      }
    },
    {
      role: 'Staff',
      permissions: {
        manageStudents: true,
        manageQueue: true,
        viewLogs: true,
        systemSettings: false,
        userManagement: false
      }
    },
    {
      role: 'Parent',
      permissions: {
        manageStudents: false,
        manageQueue: false,
        viewLogs: false,
        systemSettings: false,
        userManagement: false
      }
    }
  ];

  const handleTestTTS = () => {
    const utterance = new SpeechSynthesisUtterance('Vehicle number ABC-1234 has arrived. Emma Johnson, please proceed to pickup area.');
    utterance.rate = ttsSpeed === 'slow' ? 0.8 : ttsSpeed === 'fast' ? 1.2 : 1.0;
    window.speechSynthesis?.speak(utterance);
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully');
  };

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Settings" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Pickup Configuration</h3>
            <p className="text-sm text-muted-foreground">Configure pickup timing and behavior</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Pickup Threshold"
              description="Time before scheduled pickup to trigger notifications"
              options={thresholdOptions}
              value={pickupThreshold}
              onChange={setPickupThreshold}
            />
            <div className="space-y-4">
              <Checkbox
                label="Auto-announce vehicle arrivals"
                description="Automatically trigger TTS when vehicle matches"
                checked={autoAnnounce}
                onChange={(e) => setAutoAnnounce(e?.target?.checked)}
              />
              <Checkbox
                label="Duplicate vehicle alerts"
                description="Alert staff when duplicate vehicle numbers detected"
                checked={duplicateAlert}
                onChange={(e) => setDuplicateAlert(e?.target?.checked)}
              />
              <Checkbox
                label="Parent notifications"
                description="Send notifications to parents on pickup events"
                checked={parentNotifications}
                onChange={(e) => setParentNotifications(e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon name="Volume2" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">TTS Voice Settings</h3>
            <p className="text-sm text-muted-foreground">Configure text-to-speech announcements</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Voice Type"
              description="Select announcement voice"
              options={voiceOptions}
              value={ttsVoice}
              onChange={setTtsVoice}
            />
            <Select
              label="Speech Speed"
              description="Adjust announcement speed"
              options={speedOptions}
              value={ttsSpeed}
              onChange={setTtsSpeed}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" iconName="Play" onClick={handleTestTTS}>
              Test Voice
            </Button>
            <span className="text-sm text-muted-foreground">
              Preview: "Vehicle number ABC-1234 has arrived..."
            </span>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="Shield" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Role Permissions</h3>
            <p className="text-sm text-muted-foreground">Manage access control for different user roles</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Students</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Queue</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Logs</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Settings</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Users</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rolePermissions?.map((role) => (
                <tr key={role?.role} className="hover:bg-muted/50">
                  <td className="px-4 py-4 font-medium text-foreground">{role?.role}</td>
                  <td className="px-4 py-4 text-center">
                    <Checkbox checked={role?.permissions?.manageStudents} onChange={() => {}} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Checkbox checked={role?.permissions?.manageQueue} onChange={() => {}} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Checkbox checked={role?.permissions?.viewLogs} onChange={() => {}} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Checkbox checked={role?.permissions?.systemSettings} onChange={() => {}} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Checkbox checked={role?.permissions?.userManagement} onChange={() => {}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
            <Icon name="Database" size={20} color="var(--color-error)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">System Maintenance</h3>
            <p className="text-sm text-muted-foreground">Database and system maintenance operations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" iconName="Download">
            Backup Database
          </Button>
          <Button variant="outline" iconName="RefreshCw">
            Clear Cache
          </Button>
          <Button variant="outline" iconName="Archive">
            Archive Old Logs
          </Button>
          <Button variant="destructive" iconName="Trash2">
            Reset System
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline">
          Cancel
        </Button>
        <Button variant="default" iconName="Save" onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;