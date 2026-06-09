import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TTSControlPanel = ({ onVolumeChange, onTestAnnouncement }) => {
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [lastAnnouncement, setLastAnnouncement] = useState(null);

  useEffect(() => {
    if (onVolumeChange) {
      onVolumeChange(isMuted ? 0 : volume);
    }
  }, [volume, isMuted, onVolumeChange]);

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e?.target?.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleTestAnnouncement = () => {
    const testMessage = "Vehicle number ABC-1234 has arrived. Student Ram, please proceed to pickup zone.";
    setLastAnnouncement(new Date()?.toLocaleTimeString());
    if (onTestAnnouncement) {
      onTestAnnouncement(testMessage);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Volume2" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">TTS Announcements</h3>
            <p className="text-sm text-muted-foreground">Automated voice notifications</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isEnabled ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
            <span className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-success' : 'bg-error'} animate-pulse`}></span>
            {isEnabled ? 'Active' : 'Disabled'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant={isMuted ? 'outline' : 'ghost'}
            size="icon"
            iconName={isMuted ? 'VolumeX' : volume > 50 ? 'Volume2' : 'Volume1'}
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Volume</label>
              <span className="text-sm text-muted-foreground">{isMuted ? 0 : volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              disabled={!isEnabled}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Icon name="Radio" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">
              {lastAnnouncement ? `Last: ${lastAnnouncement}` : 'No recent announcements'}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={handleTestAnnouncement}
            disabled={!isEnabled}
          >
            Test
          </Button>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={18} color="var(--color-primary)" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium mb-1">Auto-Announcement Active</p>
              <p className="text-xs text-muted-foreground">
                System will automatically announce when registered vehicles arrive in the pickup zone. Announcements include vehicle number, student name, and pickup instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTSControlPanel;