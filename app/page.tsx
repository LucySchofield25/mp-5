'use client';

import { useState } from 'react';

export default function Home() {
  const [alias, setAlias] = useState('');
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alias, url }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'An error occurred');
    } else {
      setShortUrl(`${window.location.origin}/${alias}`);
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold mb-4 text-indigo-800">Custom URL Shortener</h1>
        <p className="text-lg text-indigo-600 mb-6">
          Create a custom url alias for long urls.
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <div className="mb-4">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your full URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-black"
                required
            />
          </div>
          <div className="mb-4">
            <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Enter your custom alias"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-black"
                required
            />
          </div>
          <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
            <div className="mt-6 w-full max-w-md">
              <label className="block mb-2 text-green-700 font-medium">Your shortened URL:</label>
              <input
                  type="text"
                  readOnly
                  value={shortUrl}
                  className="w-full px-4 py-2 border border-green-500 rounded-md text-black bg-white"
                  onClick={(e) => e.currentTarget.select()} // Makes copying easier
              />
            </div>
        )}
        {error && <p className="mt-6 text-red-600">{error}</p>}
      </div>
  );
}
