import React, { useState } from 'react';
import { searchAnime } from '../services/geminiService';
import { Anime, AnimeStatus } from '../types';

interface SearchResult extends Omit<Anime, 'watchedEpisodes' | 'status' | 'rating'> {}

interface SearchModalProps {
  onClose: () => void;
  onAddAnime: (anime: Omit<Anime, 'rating'>, status: AnimeStatus) => void;
  t: (key: string) => string;
  language: 'es' | 'en';
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, onAddAnime, t, language }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const animeResults = await searchAnime(query, language);
      if(animeResults && animeResults.length > 0) {
        setResults(animeResults);
      } else {
        setError(t('searchModal.noResults'));
      }
    } catch (err) {
      setError(t('searchModal.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = (anime: SearchResult) => {
    const newAnime = { ...anime, watchedEpisodes: 0, status: AnimeStatus.Pending };
    onAddAnime(newAnime, AnimeStatus.Pending);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-primary rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-accent">
          <h2 className="text-xl font-bold">{t('searchModal.title')}</h2>
        </div>
        <div className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchModal.placeholder')}
              className="w-full bg-secondary p-2 rounded-md border border-accent focus:outline-none focus:ring-2 focus:ring-highlight"
              autoFocus
            />
            <button type="submit" disabled={isLoading} className="bg-highlight px-4 py-2 rounded-md text-white font-bold hover:opacity-90 disabled:opacity-50">
              {isLoading ? '...' : t('search')}
            </button>
          </form>
        </div>
        <div className="p-4 overflow-y-auto flex-grow">
          {error && <p className="text-center text-highlight">{error}</p>}
          {isLoading && <div className="text-center">{t('searchModal.searching')}</div>}
          <div className="space-y-4">
            {results.map((anime) => (
              <div key={anime.id} className="bg-secondary p-3 rounded-md flex items-center gap-4">
                <img src={anime.coverUrl} alt={anime.title} className="w-16 h-24 object-cover rounded" />
                <div className="flex-grow">
                  <h3 className="font-bold">{anime.title}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{anime.synopsis}</p>
                </div>
                <button onClick={() => handleAdd(anime)} className="bg-highlight text-white px-3 py-1 rounded-md text-sm hover:opacity-90 whitespace-nowrap">
                  {t('add')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;