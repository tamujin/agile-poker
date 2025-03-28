import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';

export const CreateRoom: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(true);
  const navigate = useNavigate();

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName) {
      alert('Please enter your name');
      return;
    }
    
    // Generate a random room ID for new rooms
    const newRoomId = isCreating 
      ? Math.random().toString(36).substring(2, 8).toUpperCase()
      : roomId;
      
    if (!newRoomId && !isCreating) {
      alert('Please enter a room ID');
      return;
    }
    
    // Navigate to the room (will use URL parameters)
    navigate(`/room/${newRoomId}?name=${encodeURIComponent(userName)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Agile Poker</h1>
          <p className="text-gray-600 mt-2">Plan your sprints with your team</p>
        </div>
        
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-center ${isCreating ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setIsCreating(true)}
          >
            Create Room
          </button>
          <button
            className={`flex-1 py-2 text-center ${!isCreating ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setIsCreating(false)}
          >
            Join Room
          </button>
        </div>
        
        <form onSubmit={handleCreateRoom}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Your Name
            </label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              required
            />
          </div>
          
          {!isCreating && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomid">
                Room ID
              </label>
              <input
                id="roomid"
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter room ID"
                required={!isCreating}
              />
            </div>
          )}
          
          <div className="flex items-center justify-between mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              {isCreating ? 'Create New Room' : 'Join Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 