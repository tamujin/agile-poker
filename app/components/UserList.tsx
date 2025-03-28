import React from 'react';
import { User } from './User';
import type { UserData } from './User';

interface UserListProps {
  users: UserData[];
  currentUserId: string;
}

export const UserList: React.FC<UserListProps> = ({ users, currentUserId }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Participants ({users.length})</h2>
      <div>
        {users.map((user) => (
          <User key={user.id} user={user} isSelf={user.id === currentUserId} />
        ))}
      </div>
    </div>
  );
}; 