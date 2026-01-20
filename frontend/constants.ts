
import { Mission, MissionAction, MissionType, ShopItem, ItemType, Achievement } from './types';
import { OnigiriIcon, RamenIcon, HamburgerIcon, CigarIcon, CapIcon, SunglassesIcon } from './components/icons/ItemIcons';
import { MedalIcon, OtakuMedalIcon } from './components/icons/AchievementIcons';

export const XP_PER_LEVEL = 100;
export const PET_EVOLUTIONS = {
  1: { level: 0, name: 'Yulius VVS' },
  2: { level: 10, name: 'Froglet Ninja' },
  3: { level: 20, name: 'Genin Frog' },
  4: { level: 30, name: 'Jounin Frog' },
};

export const XP_REWARDS = {
  WATCH_EPISODE: 10,
  ADD_ANIME: 5,
  RATE_ANIME: 5,
  COMPLETE_MISSION: 50,
};

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'daily-1',
    description: 'mission.daily1.desc',
    type: MissionType.Daily,
    action: MissionAction.WATCH_EPISODE,
    goal: 1,
    progress: 0,
    xpReward: 25,
    pesetaReward: 50,
    completed: false,
  },
  {
    id: 'daily-2',
    description: 'mission.daily2.desc',
    type: MissionType.Daily,
    action: MissionAction.ADD_TO_PENDING,
    goal: 1,
    progress: 0,
    xpReward: 20,
    pesetaReward: 30,
    completed: false,
  },
   {
    id: 'monthly-1',
    description: 'mission.monthly1.desc',
    type: MissionType.Monthly,
    action: MissionAction.WATCH_EPISODE,
    goal: 20,
    progress: 0,
    xpReward: 150,
    pesetaReward: 300,
    completed: false,
  },
  {
    id: 'monthly-2',
    description: 'mission.monthly2.desc',
    type: MissionType.Monthly,
    action: MissionAction.RATE_ANIME,
    goal: 5,
    progress: 0,
    xpReward: 100,
    pesetaReward: 200,
    completed: false,
  },
];

export const SHOP_ITEMS: ShopItem[] = [
    { id: 'onigiri', name: 'shop.item.onigiri', price: 25, type: ItemType.Food, happinessGain: 10, icon: OnigiriIcon },
    { id: 'ramen', name: 'shop.item.ramen', price: 60, type: ItemType.Food, happinessGain: 25, icon: RamenIcon },
    { id: 'hamburger', name: 'shop.item.hamburger', price: 80, type: ItemType.Food, happinessGain: 35, icon: HamburgerIcon },
    { id: 'cigar', name: 'shop.item.cigar', price: 150, type: ItemType.Cosmetic, icon: CigarIcon },
    { id: 'cap', name: 'shop.item.cap', price: 200, type: ItemType.Cosmetic, slot: 'head', icon: CapIcon },
    { id: 'sunglasses', name: 'shop.item.sunglasses', price: 250, type: ItemType.Cosmetic, slot: 'eyes', icon: SunglassesIcon },
];

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'otaku_5',
        title: 'achievement.otaku5.title',
        description: 'achievement.otaku5.desc',
        icon: OtakuMedalIcon
    },
    {
        id: 'pet_level_10',
        title: 'achievement.pet10.title',
        description: 'achievement.pet10.desc',
        icon: MedalIcon
    },
    {
        id: 'pet_level_20',
        title: 'achievement.pet20.title',
        description: 'achievement.pet20.desc',
        icon: MedalIcon
    },
    {
        id: 'pet_level_30',
        title: 'achievement.pet30.title',
        description: 'achievement.pet30.desc',
        icon: MedalIcon
    },
    {
        id: 'anime_10',
        title: 'achievement.anime10.title',
        description: 'achievement.anime10.desc',
        icon: MedalIcon
    },
    {
        id: 'anime_50',
        title: 'achievement.anime50.title',
        description: 'achievement.anime50.desc',
        icon: MedalIcon
    },
    {
        id: 'anime_100',
        title: 'achievement.anime100.title',
        description: 'achievement.anime100.desc',
        icon: MedalIcon
    },
    {
        id: 'friends_10',
        title: 'achievement.friends10.title',
        description: 'achievement.friends10.desc',
        icon: MedalIcon
    },
    {
        id: 'shop_40',
        title: 'achievement.shop40.title',
        description: 'achievement.shop40.desc',
        icon: MedalIcon
    }
];