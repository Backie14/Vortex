// pages/index.tsx
'use client'
// pages/index.tsx
import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Loader from '../components/Loader';

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchGifs = async (searchQuery: string) => {
    try {
      setLoading(true);
      const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
      const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${apiKey}&limit=20`;
      const response = await axios.get(apiUrl);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() !== '') {
      searchGifs(query);
    }
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {loading && <Loader />}
      <h1 className="text-4xl font-bold mb-4">GIF Search App</h1>
      <div className="flex items-center justify-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Search GIFs..."
          className="p-2 border border-gray-300 rounded-l focus:outline-none focus:ring focus:border-blue-300 text-black"
        />
        <button
          onClick={() => setQuery(query)}
          className="bg-blue-500 border border-gray-300 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((gif) => (
          <div key={gif.id} className="flex flex-col items-center">
            <Image
              src={gif.images.fixed_height.url}
              alt={gif.title}
              // width={200}
              // height={200}
              className="rounded w-[200px] h-[200px]"
            />
            <p className="mt-2">{gif.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
