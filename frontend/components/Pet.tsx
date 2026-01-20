import React, { useState, useEffect } from 'react';
import { Pet as PetType } from '../types';
import { PET_EVOLUTIONS, XP_PER_LEVEL } from '../constants';
import { FrogTadpoleIcon, FrogletNinjaIcon, GeninFrogIcon, JouninFrogIcon } from './icons/PetIcons';

interface PetProps {
  pet: PetType;
  t: (key: string) => string;
}

const Pet: React.FC<PetProps> = ({ pet, t }) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const periodicMessageInterval = setInterval(() => {
      setMessage(t('pet.message.periodic'));
      setTimeout(() => setMessage(null), 4000); // Message disappears after 4 seconds
    }, 15000); // Every 15 seconds

    return () => clearInterval(periodicMessageInterval);
  }, [t]);

  const handleClick = () => {
    const messages = [t('pet.message.click1'), t('pet.message.click2')];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setTimeout(() => setMessage(null), 4000); // Message disappears after 4 seconds
  };
  
  const getPetAnimationClass = (happiness: number): string => {
    if (happiness > 75) return 'animate-happy-bounce';
    if (happiness <= 20) return 'animate-sad-tremble';
    if (happiness <= 50) return 'animate-annoyed-shake';
    return 'animate-float';
  };

  const currentEvolution =
    (pet.level >= PET_EVOLUTIONS[4].level && PET_EVOLUTIONS[4]) ||
    (pet.level >= PET_EVOLUTIONS[3].level && PET_EVOLUTIONS[3]) ||
    (pet.level >= PET_EVOLUTIONS[2].level && PET_EVOLUTIONS[2]) ||
    PET_EVOLUTIONS[1];
  
  const xpForNextLevel = pet.level * XP_PER_LEVEL + XP_PER_LEVEL;
  const xpProgress = (pet.xp / xpForNextLevel) * 100;
  const happinessProgress = pet.happiness;

  const renderPetIcon = () => {
    switch(currentEvolution.level) {
      case 0: return <FrogTadpoleIcon equippedItems={pet.equippedItems} />;
      case 10: return <FrogletNinjaIcon equippedItems={pet.equippedItems} />;
      case 20: return <GeninFrogIcon equippedItems={pet.equippedItems} />;
      case 30: return <JouninFrogIcon equippedItems={pet.equippedItems} />;
      default: return <FrogTadpoleIcon equippedItems={pet.equippedItems} />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center animate-fade-in">
      {message && (
        <div className="absolute -top-10 mb-2 w-max bg-white text-black text-sm px-3 py-1 rounded-full shadow-lg animate-fade-in">
          {message}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
        </div>
      )}
      <div 
        onClick={handleClick}
        className={`relative w-32 h-32 md:w-40 md:h-40 text-highlight cursor-pointer transform hover:scale-110 transition-transform duration-300 ${getPetAnimationClass(pet.happiness)}`}>
        {renderPetIcon()}
        {pet.happiness <= 20 && (
          <>
            <span className="absolute top-1/2 left-[35%] text-xl text-blue-400 animate-drip pointer-events-none">💧</span>
            <span className="absolute top-1/2 left-[60%] text-xl text-blue-400 animate-drip pointer-events-none" style={{animationDelay: '0.7s'}}>💧</span>
          </>
        )}
      </div>
      <div className="bg-secondary/80 backdrop-blur-sm p-2 rounded-lg shadow-lg mt-2 w-48 text-center space-y-2">
        <p className="text-sm font-bold">yulius vvs - Lvl {pet.level}</p>
        <div>
           <div className="flex items-center justify-between text-xs px-1">
             <span>XP</span>
             <span>{pet.xp} / {xpForNextLevel}</span>
           </div>
           <div className="w-full bg-accent rounded-full h-2.5">
             <div className="bg-highlight h-2.5 rounded-full" style={{ width: `${xpProgress}%` }}></div>
           </div>
        </div>
        <div>
           <div className="flex items-center justify-between text-xs px-1">
            <span>❤️ {t('yuliusgochi.happiness')}</span>
            <span>{pet.happiness}%</span>
           </div>
           <div className="w-full bg-red-900 rounded-full h-2.5">
             <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${happinessProgress}%` }}></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Pet;