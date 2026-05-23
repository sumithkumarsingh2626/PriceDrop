import { ChangeEvent } from 'react';

interface TimelineSliderProps {
  currentIndex: number;
  maxIndex: number;
  onChange: (index: number) => void;
}

export function TimelineSlider({ currentIndex, maxIndex, onChange }: TimelineSliderProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="w-full flex items-center gap-4">
      <span className="text-xs text-emerald-100/40">Start</span>
      <input
        type="range"
        min={0}
        max={maxIndex > 0 ? maxIndex : 0}
        value={currentIndex}
        onChange={handleChange}
        className="flex-1 h-2 bg-emerald-950/40 rounded-lg appearance-none cursor-pointer accent-emerald-400"
      />
      <span className="text-xs text-emerald-100/40">End</span>
    </div>
  );
}
