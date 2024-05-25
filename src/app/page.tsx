'use client';

import { useState } from 'react';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [address, setAddress] = useState('');
  const [points, setPoints] = useState(0);
  const [eventName, setEventName] = useState('');

  const handleDistribute = async () => {
    const data = {
      address,
      eventName,
      points,
    };
    try {
      const response = await fetch('/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      if (response.ok) {
        alert('Points distributed successfully');
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-gray-50 text-3xl font-bold text-center mb-8">Distribute Points</h1>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="rounded-md border border-gray-300 py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="rounded-md border border-gray-300 py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-md border border-gray-300 py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Points"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          className="rounded-md border border-gray-300 py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 disabled:opacity-50"
        disabled={!apiKey || !address || points <= 0 || !eventName}
        onClick={handleDistribute}
      >
        Distribute
      </button>
    </div>
  );
}
