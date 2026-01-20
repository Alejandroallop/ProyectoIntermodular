
import React from 'react';

export enum AnimeStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Finished = 'Finished',
}

export enum MissionType {
  Daily = 'Daily',
  Monthly = 'Monthly',
}

export enum MissionAction {
  WATCH_EPISODE = 'WATCH_EPISODE',
  ADD_TO_PENDING = 'ADD_TO_PENDING',
  RATE_ANIME = 'RATE_ANIME',
}

export enum ItemType {
  Food = 'Food',
  Cosmetic = 'Cosmetic',
}

export interface Anime {
  id: number;
  title: string;
  synopsis: string;
  coverUrl: string;
  totalEpisodes: number;
  watchedEpisodes: number;
  status: AnimeStatus;
  rating: number | null;
}

export interface UserProfile {
  name: string;
  avatar: string | null;
  pesetas: number;
  unlockedAchievements: string[];
  stats: {
    itemsBought: number;
  };
}

export interface Pet {
  level: number;
  xp: number;
  happiness: number;
  equippedItems: {
    head?: string | null;
    eyes?: string | null;
  };
}

export interface Mission {
  id: string;
  description: string;
  type: MissionType;
  action: MissionAction;
  goal: number;
  progress: number;
  xpReward: number;
  pesetaReward: number;
  completed: boolean;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  pet: Pet;
  animeLists: AnimeLists;
  unlockedAchievements: string[];
}

export interface ShopItem {
    id: string;
    name: string;
    price: number;
    type: ItemType;
    happinessGain?: number;
    slot?: 'head' | 'eyes';
    icon: React.FC;
}

export interface InventoryItem {
    itemId: string;
    quantity: number;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.FC;
}

export type AnimeLists = {
  [key in AnimeStatus]: Anime[];
};
