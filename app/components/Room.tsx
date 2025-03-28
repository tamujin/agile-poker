import React, { useState, useEffect } from 'react';
import { CardDeck } from './CardDeck';
import { UserList } from './UserList';
import { ResultsSummary } from './ResultsSummary';
import type { UserData } from './User';

interface RoomProps {
  roomId: string;
  userName: string;
}

export const Room: React.FC<RoomProps> = ({ roomId, userName }) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [storyTitle, setStoryTitle] = useState('New User Story');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  // Card values - can be customized
  const cardValues = ['0', '½', '1', '2', '3', '5', '8', '13', '21', '?', '☕'];

  // Mock initialization - in a real app, this would connect to a backend
  useEffect(() => {
    // Simulate joining a room
    const userId = `user-${Date.now()}`;
    setCurrentUserId(userId);
    
    // Add current user to the list
    setUsers([
      { id: userId, name: userName, vote: null, isRevealed: false },
      // Mock other users
      { id: 'user1', name: 'John', vote: '3', isRevealed },
      { id: 'user2', name: 'Alice', vote: '5', isRevealed },
      { id: 'user3', name: 'Bob', vote: null, isRevealed },
    ]);
  }, [userName]);

  const handleCardSelect = (value: string) => {
    setUsers(users.map(user => 
      user.id === currentUserId 
        ? { ...user, vote: value } 
        : user
    ));
  };

  const handleReveal = () => {
    setIsRevealed(true);
    setUsers(users.map(user => ({ ...user, isRevealed: true })));
  };

  const handleReset = () => {
    setIsRevealed(false);
    setUsers(users.map(user => ({ ...user, vote: null, isRevealed: false })));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryTitle(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            {isEditingTitle ? (
              <input
                type="text"
                value={storyTitle}
                onChange={handleTitleChange}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                className="text-xl font-bold border-b-2 border-blue-500 focus:outline-none w-full"
                autoFocus
              />
            ) : (
              <h1 
                className="text-xl font-bold cursor-pointer hover:text-blue-600" 
                onClick={() => setIsEditingTitle(true)}
              >
                {storyTitle}
              </h1>
            )}
            <p className="text-sm text-gray-500">Room ID: {roomId}</p>
          </div>
          <div>
            {isRevealed ? (
              <button 
                onClick={handleReset} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Reset Votes
              </button>
            ) : (
              <button 
                onClick={handleReveal} 
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Reveal Cards
              </button>
            )}
          </div>
        </div>
      </div>

      {isRevealed && <ResultsSummary users={users} isRevealed={isRevealed} />}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Select Your Card</h2>
            <CardDeck cards={cardValues} onSelect={handleCardSelect} />
          </div>
        </div>
        <div className="md:w-1/3">
          <UserList users={users} currentUserId={currentUserId} />
        </div>
      </div>
    </div>
  );
}; 