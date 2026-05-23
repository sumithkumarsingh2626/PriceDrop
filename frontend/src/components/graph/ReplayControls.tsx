import { Play, Pause, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/button';

interface ReplayControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
}

export function ReplayControls({ isPlaying, onPlayPause, onReset }: ReplayControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        onClick={onPlayPause}
        leftIcon={isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        className="rounded-full px-4"
      >
        {isPlaying ? 'Pause Replay' : 'Play Replay'}
      </Button>
      <Button
        variant="outline"
        onClick={onReset}
        leftIcon={<RotateCcw className="h-4 w-4" />}
        className="rounded-full p-3 w-10 h-10 flex items-center justify-center"
        aria-label="Reset Replay"
      />
    </div>
  );
}
