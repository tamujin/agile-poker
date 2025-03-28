import React from 'react';

export interface UserData {
  id: string;
  name: string;
  vote: string | null;
  isRevealed: boolean;
}

interface UserProps {
  user: UserData;
  isSelf?: boolean;
}

export const User: React.FC<UserProps> = ({ user, isSelf = false }) => {
  const hasVoted = user.vote !== null;
  
  return (
    <div className={`flex items-center p-3 rounded-lg mb-2 ${isSelf ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="ml-3 flex-grow">
        <p className="font-semibold text-gray-800">{user.name} {isSelf && <span className="text-xs text-blue-500">(You)</span>}</p>
      </div>
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
        {hasVoted ? (
          user.isRevealed ? (
            <span className="font-bold text-blue-600">{user.vote}</span>
          ) : (
            <div className="w-5 h-5 bg-green-500 rounded-full"></div>
          )
        ) : (
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        )}
      </div>
    </div>
  );
}; 