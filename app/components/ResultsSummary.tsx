import React from 'react';
import type { UserData } from './User';

interface ResultsSummaryProps {
  users: UserData[];
  isRevealed: boolean;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ users, isRevealed }) => {
  if (!isRevealed) {
    return null;
  }

  const votesCount: Record<string, number> = {};
  const totalVotes = users.filter(user => user.vote !== null).length;
  
  users.forEach(user => {
    if (user.vote) {
      votesCount[user.vote] = (votesCount[user.vote] || 0) + 1;
    }
  });

  const voteEntries = Object.entries(votesCount).sort((a, b) => b[1] - a[1]);
  
  // Calculate average excluding non-numeric values
  const numericVotes = users
    .map(u => u.vote)
    .filter((vote): vote is string => vote !== null)
    .map(v => {
      const parsed = parseFloat(v);
      return isNaN(parsed) ? null : parsed;
    })
    .filter((v): v is number => v !== null);
  
  const average = numericVotes.length > 0
    ? (numericVotes.reduce((sum, v) => sum + v, 0) / numericVotes.length).toFixed(1)
    : 'N/A';

  return (
    <div className="bg-white rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Results</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Average</h3>
          <p className="text-2xl font-bold">{average}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Votes</h3>
          <p className="text-2xl font-bold">{totalVotes} / {users.length}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Distribution</h3>
        <div className="space-y-2">
          {voteEntries.map(([value, count]) => (
            <div key={value} className="flex items-center">
              <div className="w-8 text-center font-bold">{value}</div>
              <div className="flex-grow mx-2">
                <div 
                  className="bg-blue-500 h-5 rounded-sm"
                  style={{ width: `${(count / totalVotes) * 100}%` }}
                ></div>
              </div>
              <div className="w-8 text-right text-sm">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 