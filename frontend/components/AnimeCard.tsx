
import React from 'react';
import { Anime } from '../types';
import StarRating from './StarRating';

interface AnimeCardProps {
  anime: Anime;
  onEpisodeChange: (animeId: number, newCount: number) => void;
  onRate: (animeId: number, rating: number) => void;
  t: (key: string, ...args: (string | number)[]) => string;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onEpisodeChange, onRate, t }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEpisode = parseInt(e.target.value, 10);
    if (!isNaN(newEpisode)) {
      onEpisodeChange(anime.id, newEpisode);
    }
  };

  const avgRating = anime.rating ? t('animeCard.avgRating', anime.rating.toFixed(1)) : t('animeCard.noRating');

  return (
    <div className="bg-secondary rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row gap-4 p-4 animate-fade-in">
      <img src={anime.coverUrl} alt={anime.title} className="w-full md:w-32 h-48 object-cover rounded-md" />
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-text-main">{anime.title}</h3>
          <p className="text-sm text-text-secondary mt-1 line-clamp-3">{anime.synopsis}</p>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
            <span>{t('animeCard.episodes')}</span>
            <span className="font-bold text-highlight">{anime.watchedEpisodes} / {anime.totalEpisodes}</span>
          </div>
          
          <input
            type="range"
            min="0"
            max={anime.totalEpisodes || 100} // Fallback if 0 to allow sliding, though functional value depends on totalEpisodes
            value={anime.watchedEpisodes}
            onChange={handleSliderChange}
            className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer accent-highlight"
            disabled={anime.totalEpisodes === 0}
          />
          
          <div className="flex items-center justify-end mt-2">
            <div className="flex flex-col items-end">
                <StarRating rating={anime.rating} onRating={(r) => onRate(anime.id, r)} />
                <span className="text-xs text-text-secondary mt-1">{avgRating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
