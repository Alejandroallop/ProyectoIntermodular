import React, { useState } from 'react';
import { Friend, AnimeStatus, Anime } from '../types';
import { PET_EVOLUTIONS, ACHIEVEMENTS } from '../constants';
import { FrogTadpoleIcon, FrogletNinjaIcon, GeninFrogIcon, JouninFrogIcon } from './icons/PetIcons';
import ReadOnlyStarRating from './ReadOnlyStarRating';

interface FriendProfileModalProps {
  friend: Friend;
  onClose: () => void;
  t: (key: string, ...args: (string | number)[]) => string;
}

const ReadOnlyAnimeCard: React.FC<{anime: Anime, t: (key: string) => string}> = ({ anime, t }) => {
    const progress = anime.totalEpisodes > 0 ? (anime.watchedEpisodes / anime.totalEpisodes) * 100 : 0;

    return (
        <div className="bg-primary/50 rounded-lg overflow-hidden flex gap-4 p-3">
            <img src={anime.coverUrl} alt={anime.title} className="w-20 h-28 object-cover rounded-md flex-shrink-0" />
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-text-main text-md">{anime.title}</h4>
                    <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                            <span>{t('friendProfile.episodes')}</span>
                            <span>{anime.watchedEpisodes} / {anime.totalEpisodes}</span>
                        </div>
                        <div className="w-full bg-accent rounded-full h-2 my-1">
                            <div className="bg-highlight h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary">{t('friendProfile.rating')}</span>
                    <ReadOnlyStarRating rating={anime.rating} />
                </div>
            </div>
        </div>
    );
}

const FriendProfileModal: React.FC<FriendProfileModalProps> = ({ friend, onClose, t }) => {
    const [activeTab, setActiveTab] = useState<AnimeStatus>(AnimeStatus.InProgress);

    const currentEvolution =
    (friend.pet.level >= PET_EVOLUTIONS[4].level && PET_EVOLUTIONS[4]) ||
    (friend.pet.level >= PET_EVOLUTIONS[3].level && PET_EVOLUTIONS[3]) ||
    (friend.pet.level >= PET_EVOLUTIONS[2].level && PET_EVOLUTIONS[2]) ||
    PET_EVOLUTIONS[1];

    const renderPetIcon = () => {
        switch(currentEvolution.level) {
          case 0: return <FrogTadpoleIcon />;
          case 10: return <FrogletNinjaIcon />;
          case 20: return <GeninFrogIcon />;
          case 30: return <JouninFrogIcon />;
          default: return <FrogTadpoleIcon />;
        }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-primary rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b border-accent flex items-center gap-4 bg-secondary/50 rounded-t-lg">
           <img src={friend.avatar} alt={friend.name} className="w-20 h-20 rounded-full border-4 border-highlight" />
           <div className="flex-grow">
               <h2 className="text-2xl font-bold text-highlight">{friend.name}</h2>
           </div>
           <div className="flex items-center gap-3 bg-primary p-2 rounded-lg">
                <div className="w-12 h-12">
                    {renderPetIcon()}
                </div>
                <div>
                    <p className="font-bold text-sm">{currentEvolution.name}</p>
                    <p className="text-xs text-text-secondary">{t('friendProfile.level')} {friend.pet.level}</p>
                </div>
           </div>
        </div>
        
        {/* Content */}
        <div className="flex-grow flex flex-col overflow-hidden">
            <div className="border-b border-accent flex-shrink-0">
                {(Object.keys(friend.animeLists) as (keyof typeof AnimeStatus)[]).map(statusKey => (
                    <button
                        key={statusKey}
                        onClick={() => setActiveTab(AnimeStatus[statusKey])}
                        className={`py-3 px-6 font-semibold transition-colors ${activeTab === AnimeStatus[statusKey] ? 'text-highlight border-b-2 border-highlight' : 'text-text-secondary hover:text-text-main'}`}
                    >
                        {t(`status.${AnimeStatus[statusKey]}`)} ({friend.animeLists[AnimeStatus[statusKey]].length})
                    </button>
                ))}
            </div>
            <div className="p-4 space-y-4 overflow-y-auto">
                {friend.animeLists[activeTab].length > 0 ? (
                    friend.animeLists[activeTab].map(anime => (
                        <ReadOnlyAnimeCard key={anime.id} anime={anime} t={t} />
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-text-secondary">{t('animeCard.empty')}</p>
                    </div>
                )}
                
                {/* Achievements Section */}
                <div className="pt-6 border-t border-accent/20">
                     <h3 className="text-lg font-bold text-highlight mb-3 flex items-center gap-2">
                        <span>🏆</span> {t('profile.achievements')}
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ACHIEVEMENTS.map(ach => {
                             const isUnlocked = friend.unlockedAchievements?.includes(ach.id);
                             return (
                                <div key={ach.id} className={`bg-primary/40 p-3 rounded-lg flex items-center gap-3 border ${isUnlocked ? 'border-highlight/50 shadow-[0_0_10px_rgba(255,152,0,0.1)]' : 'border-transparent opacity-50 grayscale'}`}>
                                    <div className="w-10 h-10 flex-shrink-0">
                                        <ach.icon />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-sm text-text-main truncate" title={t(ach.title)}>{t(ach.title)}</h4>
                                        <p className="text-xs text-text-secondary line-clamp-1" title={t(ach.description)}>{t(ach.description)}</p>
                                    </div>
                                </div>
                             )
                        })}
                     </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default FriendProfileModal;