import React from 'react';

interface CardProps {
  value: string;
  selected: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ value, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-28 rounded-lg text-xl font-bold m-2 transition-all ${
        selected
          ? 'bg-blue-500 text-white scale-110 shadow-lg'
          : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-blue-300'
      }`}
    >
      {value}
    </button>
  );
}; 