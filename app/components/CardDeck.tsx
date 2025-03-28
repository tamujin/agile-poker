import React, { useState } from 'react';
import { Card } from './Card';

interface CardDeckProps {
  cards: string[];
  onSelect: (value: string) => void;
}

export const CardDeck: React.FC<CardDeckProps> = ({ cards, onSelect }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (value: string) => {
    setSelectedCard(value);
    onSelect(value);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card) => (
        <Card
          key={card}
          value={card}
          selected={selectedCard === card}
          onClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
}; 