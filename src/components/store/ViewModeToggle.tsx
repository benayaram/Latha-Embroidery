import React from 'react';

interface ViewModeToggleProps {
  mode: 'categorical' | 'normal';
  onModeChange: (mode: 'categorical' | 'normal') => void;
}

export function ViewModeToggle({ mode, onModeChange }: ViewModeToggleProps) {
  return (
    <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
      <button
        onClick={() => onModeChange('categorical')}
        className={`px-4 py-2 rounded-md transition-colors ${
          mode === 'categorical'
            ? 'bg-indigo-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Categorical
      </button>
      <button
        onClick={() => onModeChange('normal')}
        className={`px-4 py-2 rounded-md transition-colors ${
          mode === 'normal'
            ? 'bg-indigo-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Normal
      </button>
    </div>
  );
}