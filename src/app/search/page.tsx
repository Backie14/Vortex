// pages/index.tsx
'use client'
// pages/index.tsx
// pages/index.tsx
import { useState } from 'react';
import Image from 'next/image';
import SearchBox from '../components/SearchBox';

interface Gif {
  id: string;
  title: string;
  images: {
    original: {
      url: string;
      width: string;
      height: string;
    };
  };
}

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Gif[]>([]);

  const searchGifs = async (query: string) => {
    // Replace 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65' with your GIPHY API key
    const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=20`;

    try {
      const response = await fetch(apiUrl , {next: {revalidate : 10}});
      const data = await response.json();

      setSearchResults(data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">GIF Search App</h1>
      <SearchBox onSearch={searchGifs} />
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {searchResults.map((gif) => (
          <Image 
            key={gif.id}
            src={gif.images.original.url}
            alt={gif.title}
            className="rounded content-stretch"
            loading="lazy"
            height={200}
            width = {200}
            objectFit='contain'
            layout='fixed'
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
