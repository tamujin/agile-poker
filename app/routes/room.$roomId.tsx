import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { Link } from 'react-router';
import { Room } from '../components/Room';

export function meta() {
  return [
    { title: "Agile Poker - Planning Room" },
    { name: "description", content: "Agile poker planning session" },
  ];
}

export default function RoomPage() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState<string>('');
  
  useEffect(() => {
    // Get the name from URL parameter, default to 'Anonymous'
    const nameFromUrl = searchParams.get('name');
    setUserName(nameFromUrl || 'Anonymous');
  }, [searchParams]);

  if (!roomId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-xl font-bold mb-4">Invalid Room</h1>
          <p className="mb-6">Room ID is missing or invalid.</p>
          <Link
            to="/"
            className="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return <Room roomId={roomId} userName={userName} />;
} 