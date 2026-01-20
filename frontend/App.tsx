
import React, { useState, useEffect, useCallback } from 'react';
import { Anime, AnimeLists, AnimeStatus, Mission, MissionAction, MissionType, Pet as PetType, UserProfile, Friend, InventoryItem, ShopItem, ItemType } from './types';
import { XP_REWARDS, INITIAL_MISSIONS, SHOP_ITEMS, ACHIEVEMENTS } from './constants';
import { getNews } from './services/geminiService';
import { FrogTadpoleIcon, FrogletNinjaIcon, GeninFrogIcon, JouninFrogIcon } from './components/icons/PetIcons';
import Pet from './components/Pet';
import AnimeCard from './components/AnimeCard';
import SearchModal from './components/SearchModal';
import ShopModal from './components/ShopModal';
import FriendProfileModal from './components/FriendProfileModal';
import ReadOnlyStarRating from './components/ReadOnlyStarRating';
import WardrobeModal from './components/WardrobeModal';
import { LoginScreen } from './components/LoginScreen';

const initialFriends: Friend[] = [
    {
        id: 'mario-123',
        name: 'Mario',
        avatar: `https://i.pravatar.cc/150?u=mario`,
        pet: { level: 15, xp: 1550, happiness: 80, equippedItems: {} },
        unlockedAchievements: ['otaku_5'],
        animeLists: {
            [AnimeStatus.Pending]: [
                { id: 5114, title: "Fullmetal Alchemist: Brotherhood", synopsis: "Two brothers search for the Philosopher's Stone.", coverUrl: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg", totalEpisodes: 64, watchedEpisodes: 0, status: AnimeStatus.Pending, rating: null },
            ],
            [AnimeStatus.InProgress]: [
                { id: 21, title: "One Piece", synopsis: "The journey of Monkey D. Luffy to become the Pirate King.", coverUrl: "https://cdn.myanimelist.net/images/anime/6/73245.jpg", totalEpisodes: 1111, watchedEpisodes: 850, status: AnimeStatus.InProgress, rating: 5 },
            ],
            [AnimeStatus.Finished]: [
                 { id: 16498, title: "Shingeki no Kyojin", synopsis: "Humanity fights for survival against giant man-eating titans.", coverUrl: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", totalEpisodes: 75, watchedEpisodes: 75, status: AnimeStatus.Finished, rating: 4 },
            ],
        }
    }
];

const translations = {
  es: {
    // Login
    'login.welcome': 'Tu rincón para seguir animes y criar a tu mascota ninja.',
    'login.placeholder': 'Escribe tu nombre de usuario',
    'login.button': 'Entrar',
    'menu.logout': 'Salir',
    // Menu
    'menu.lists': 'Mis Listas',
    'menu.missions': 'Misiones',
    'menu.news': 'Noticias',
    'menu.friends': 'Amigos',
    'menu.yuliusgochi': 'Yuliusgochi',
    'menu.wardrobe': 'Armario',
    'menu.profile': 'Perfil',
    // Anime Status
    'status.Pending': 'Pendientes',
    'status.InProgress': 'En curso',
    'status.Finished': 'Finalizados',
    // General
    'add': 'Añadir',
    'search': 'Buscar',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'close': 'Cerrar',
    'back': 'Volver',
    'loading': 'Cargando...',
    // Profile
    'profile.title': 'Perfil',
    'profile.edit': 'Editar Perfil',
    'profile.stats': 'Estadísticas de Listas',
    'profile.emptyList': 'No hay animes en esta lista.',
    'profile.changeTheme': 'Cambiar Tema',
    'profile.changeLanguage': 'Cambiar Idioma',
    'profile.achievements': 'Logros',
    'achievement.unlocked': '¡Logro Desbloqueado!',
    'achievement.otaku5.title': 'Vaya otaku estás hecho',
    'achievement.otaku5.desc': 'Has completado 5 animes',
    'achievement.pet10.title': 'Entrenador Novato',
    'achievement.pet10.desc': 'Has subido de nivel a tu yuliusmon, nivel 10',
    'achievement.pet20.title': 'Entrenador Experto',
    'achievement.pet20.desc': 'Has subido de nivel a tu yuliusmon, nivel 20',
    'achievement.pet30.title': 'Maestro Yulius',
    'achievement.pet30.desc': 'Has subido de nivel a tu yuliusmon, nivel 30',
    'achievement.anime10.title': 'Aficionado al Anime',
    'achievement.anime10.desc': 'Has finalizado 10 animes',
    'achievement.anime50.title': 'Experto en Anime',
    'achievement.anime50.desc': 'Has finalizado 50 animes',
    'achievement.anime100.title': 'Leyenda del Anime',
    'achievement.anime100.desc': 'Has finalizado 100 animes',
    'achievement.friends10.title': 'El alma de la fiesta',
    'achievement.friends10.desc': 'Has añadido 10 amigos',
    'achievement.shop40.title': 'Comprador Compulsivo',
    'achievement.shop40.desc': 'Has comprado 40 artículos en la tienda',
    // Friends
    'friends.title': 'Amigos',
    'friends.addPlaceholder': 'Nombre del amigo',
    'friends.empty': 'No tienes amigos todavía. ¡Añade uno!',
    // Missions
    'missions.title': 'Misiones',
    'missions.daily': 'Diarias',
    'missions.monthly': 'Mensuales',
    'missions.reward': 'Recompensa',
    'mission.daily1.desc': 'Ver 1 capítulo de cualquier anime',
    'mission.daily2.desc': 'Añadir 1 anime a tu lista de pendientes',
    'mission.monthly1.desc': 'Ver 20 capítulos de anime este mes',
    'mission.monthly2.desc': 'Calificar 5 animes diferentes',
    'mission.type.Daily': 'Diaria',
    'mission.type.Monthly': 'Mensual',
    // News
    'news.title': 'Próximos Estrenos',
    'news.source': 'Fuente',
    'news.back': '← Volver a las noticias',
    // Yuliusgochi
    'yuliusgochi.care': 'Cuidado de Yulius',
    'yuliusgochi.happiness': 'Felicidad',
    'yuliusgochi.inventory': 'Inventario',
    'yuliusgochi.emptyInventory': 'Vacío',
    'yuliusgochi.goToShop': 'Tienda',
    'yuliusgochi.message1': 'soy yulius el mejor',
    'yuliusgochi.message2': '¡a comer ramen!',
    // Shop
    'shop.title': 'Tienda de Yulius',
    'shop.buy': 'Comprar',
    'shop.noPesetas': '¡No tienes suficientes pesetas!',
    'shop.item.onigiri': 'Onigiri',
    'shop.item.ramen': 'Ramen',
    'shop.item.hamburger': 'Hamburguesa',
    'shop.item.cigar': 'Cigarro',
    'shop.item.cap': 'Gorra',
    'shop.item.sunglasses': 'Gafas de Sol',
    // Wardrobe
    'wardrobe.title': 'Armario de Yulius',
    'wardrobe.myClothes': 'Mi Ropa',
    'wardrobe.shop': 'Tienda de Ropa',
    'wardrobe.equip': 'Equipar',
    'wardrobe.unequip': 'Quitar',
    'wardrobe.owned': 'Comprado',
    'wardrobe.empty': 'No tienes ropa. ¡Compra algo!',
    // Anime Card
    'animeCard.episodes': 'Episodios',
    'animeCard.avgRating': 'Avg: {0} ★',
    'animeCard.noRating': 'Sin calificar',
    'animeCard.empty': 'No hay animes en esta lista.',
    'animeCard.add': 'Añadir un Anime',
    // Search Modal
    'searchModal.title': 'Buscar Anime',
    'searchModal.placeholder': 'Ej: Shingeki no Kyojin',
    'searchModal.searching': 'Buscando...',
    'searchModal.noResults': 'No se encontraron resultados. Intenta con otra búsqueda.',
    'searchModal.error': 'Ocurrió un error al buscar. Por favor, inténtalo de nuevo.',
    // Pet
    'pet.message.periodic': 'soy yulius',
    'pet.message.click1': 'grrr yu yu yuliuuuus',
    'pet.message.click2': '¡nin nin!',
    // Friend Profile Modal
    'friendProfile.level': 'Nivel',
    'friendProfile.episodes': 'Episodios:',
    'friendProfile.rating': 'Calificación:',
  },
  en: {
    // Login
    'login.welcome': 'Your corner to track anime and raise your ninja pet.',
    'login.placeholder': 'Enter your username',
    'login.button': 'Login',
    'menu.logout': 'Exit',
    // Menu
    'menu.lists': 'My Lists',
    'menu.missions': 'Missions',
    'menu.news': 'News',
    'menu.friends': 'Friends',
    'menu.yuliusgochi': 'Yuliusgochi',
    'menu.wardrobe': 'Wardrobe',
    'menu.profile': 'Profile',
    // Anime Status
    'status.Pending': 'Pending',
    'status.InProgress': 'In Progress',
    'status.Finished': 'Finished',
    // General
    'add': 'Add',
    'search': 'Search',
    'save': 'Save',
    'cancel': 'Cancel',
    'close': 'Close',
    'back': 'Back',
    'loading': 'Loading...',
    // Profile
    'profile.title': 'Profile',
    'profile.edit': 'Edit Profile',
    'profile.stats': 'List Statistics',
    'profile.emptyList': 'There are no anime in this list.',
    'profile.changeTheme': 'Change Theme',
    'profile.changeLanguage': 'Change Language',
    'profile.achievements': 'Achievements',
    'achievement.unlocked': 'Achievement Unlocked!',
    'achievement.otaku5.title': 'What an Otaku you are',
    'achievement.otaku5.desc': 'You have completed 5 animes',
    'achievement.pet10.title': 'Novice Trainer',
    'achievement.pet10.desc': 'Leveled up Yuliusmon to level 10',
    'achievement.pet20.title': 'Expert Trainer',
    'achievement.pet20.desc': 'Leveled up Yuliusmon to level 20',
    'achievement.pet30.title': 'Master Yulius',
    'achievement.pet30.desc': 'Leveled up Yuliusmon to level 30',
    'achievement.anime10.title': 'Anime Amateur',
    'achievement.anime10.desc': 'Finished 10 animes',
    'achievement.anime50.title': 'Anime Expert',
    'achievement.anime50.desc': 'Finished 50 animes',
    'achievement.anime100.title': 'Anime Legend',
    'achievement.anime100.desc': 'Finished 100 animes',
    'achievement.friends10.title': 'Soul of the Party',
    'achievement.friends10.desc': 'Added 10 friends',
    'achievement.shop40.title': 'Shopaholic',
    'achievement.shop40.desc': 'Bought 40 items in the shop',
    // Friends
    'friends.title': 'Friends',
    'friends.addPlaceholder': "Friend's name",
    'friends.empty': "You don't have any friends yet. Add one!",
    // Missions
    'missions.title': 'Missions',
    'missions.daily': 'Daily',
    'missions.monthly': 'Monthly',
    'missions.reward': 'Reward',
    'mission.daily1.desc': 'Watch 1 episode of any anime',
    'mission.daily2.desc': 'Add 1 anime to your pending list',
    'mission.monthly1.desc': 'Watch 20 anime episodes this month',
    'mission.monthly2.desc': 'Rate 5 different animes',
    'mission.type.Daily': 'Daily',
    'mission.type.Monthly': 'Monthly',
    // News
    'news.title': 'Upcoming Releases',
    'news.source': 'Source',
    'news.back': '← Back to news',
    // Yuliusgochi
    'yuliusgochi.care': 'Yulius Care',
    'yuliusgochi.happiness': 'Happiness',
    'yuliusgochi.inventory': 'Inventory',
    'yuliusgochi.emptyInventory': 'Empty',
    'yuliusgochi.goToShop': 'Shop',
    
    // Shop
    'shop.title': 'Yulius Shop',
    'shop.buy': 'Buy',
    'shop.noPesetas': 'You do not have enough pesetas!',
    'shop.item.onigiri': 'Onigiri',
    'shop.item.ramen': 'Ramen',
    'shop.item.hamburger': 'Hamburger',
    'shop.item.cigar': 'Cigar',
    'shop.item.cap': 'Cap',
    'shop.item.sunglasses': 'Sunglasses',
    // Wardrobe
    'wardrobe.title': "Yulius's Wardrobe",
    'wardrobe.myClothes': 'My Clothes',
    'wardrobe.shop': 'Clothing Shop',
    'wardrobe.equip': 'Equip',
    'wardrobe.unequip': 'Unequip',
    'wardrobe.owned': 'Owned',
    'wardrobe.empty': "You don't own any clothes. Buy some!",
    // Anime Card
    'animeCard.episodes': 'Episodes',
    'animeCard.avgRating': 'Avg: {0} ★',
    'animeCard.noRating': 'Not rated',
    'animeCard.empty': 'There are no anime in this list.',
    'animeCard.add': 'Add an Anime',
    // Search Modal
    'searchModal.title': 'Search Anime',
    'searchModal.placeholder': 'e.g., Attack on Titan',
    'searchModal.searching': 'Searching...',
    'searchModal.noResults': 'No results found. Try another search.',
    'searchModal.error': 'An error occurred while searching. Please try again.',
     // Pet
    'pet.message.periodic': "i'm yulius",
    'pet.message.click1': 'grrr yu yu yuliuuuus',
   
    // Friend Profile Modal
    'friendProfile.level': 'Level',
    'friendProfile.episodes': 'Episodes:',
    'friendProfile.rating': 'Rating:',
  }
};

const App: React.FC = () => {
    // Hardcoded user to remove login system
    const [user, setUser] = useState<string | null>(null);
    
    // State is now loaded and saved based on the logged-in user
    const [animeLists, setAnimeLists] = useState<AnimeLists>({ [AnimeStatus.Pending]: [], [AnimeStatus.InProgress]: [], [AnimeStatus.Finished]: [] });
    const [profile, setProfile] = useState<UserProfile>({ 
        name: user || '', 
        avatar: null, 
        pesetas: 500, 
        unlockedAchievements: [],
        stats: { itemsBought: 0 } 
    });
    const [pet, setPet] = useState<PetType>({ level: 1, xp: 0, happiness: 100, equippedItems: {} });
    const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [friends, setFriends] = useState<Friend[]>(initialFriends);
    const [theme, setTheme] = useState<'orange' | 'pink'>('orange');
    const [language, setLanguage] = useState<'es' | 'en'>('es');
    
    // Load user data on component mount or user change
    useEffect(() => {
        const loadUserData = () => {
            const storedProfileString = localStorage.getItem(`userProfile_${user}`);
            if (storedProfileString) {
                // Existing user
                const storedProfile = JSON.parse(storedProfileString);
                // Migration checks
                if (!storedProfile.unlockedAchievements) {
                    storedProfile.unlockedAchievements = [];
                }
                if (!storedProfile.stats) {
                    storedProfile.stats = { itemsBought: 0 };
                }
                setProfile(storedProfile);
                setAnimeLists(JSON.parse(localStorage.getItem(`animeLists_${user}`)!) || { [AnimeStatus.Pending]: [], [AnimeStatus.InProgress]: [], [AnimeStatus.Finished]: [] });
                setPet(JSON.parse(localStorage.getItem(`petState_${user}`)!) || { level: 1, xp: 0, happiness: 100, equippedItems: {} });
                setMissions(JSON.parse(localStorage.getItem(`missions_${user}`)!) || INITIAL_MISSIONS);
                setInventory(JSON.parse(localStorage.getItem(`userInventory_${user}`)!) || []);
                setFriends(JSON.parse(localStorage.getItem(`friends_${user}`)!) || initialFriends);
                setTheme(JSON.parse(localStorage.getItem(`appTheme_${user}`)!) || 'orange');
                setLanguage(JSON.parse(localStorage.getItem(`language_${user}`)!) || 'es');
            } else {
                // New user: set initial state with defaults
                const newProfile = { 
                    name: user || '', 
                    avatar: null, 
                    pesetas: 500, 
                    unlockedAchievements: [],
                    stats: { itemsBought: 0 }
                };
                const newPet = { level: 1, xp: 0, happiness: 100, equippedItems: {} };
                const newAnimeLists = { [AnimeStatus.Pending]: [], [AnimeStatus.InProgress]: [], [AnimeStatus.Finished]: [] };
                setProfile(newProfile);
                setPet(newPet);
                setAnimeLists(newAnimeLists);
                setMissions(INITIAL_MISSIONS);
                setInventory([]);
                setFriends(initialFriends);
                setTheme('orange');
                setLanguage('es');
            }
        };
        loadUserData();
    }, [user]);

    // Save data whenever it changes
    useEffect(() => { localStorage.setItem(`animeLists_${user}`, JSON.stringify(animeLists)); }, [animeLists, user]);
    useEffect(() => { localStorage.setItem(`userProfile_${user}`, JSON.stringify(profile)); }, [profile, user]);
    useEffect(() => { localStorage.setItem(`petState_${user}`, JSON.stringify(pet)); }, [pet, user]);
    useEffect(() => { localStorage.setItem(`missions_${user}`, JSON.stringify(missions)); }, [missions, user]);
    useEffect(() => { localStorage.setItem(`userInventory_${user}`, JSON.stringify(inventory)); }, [inventory, user]);
    useEffect(() => { localStorage.setItem(`friends_${user}`, JSON.stringify(friends)); }, [friends, user]);
    useEffect(() => { localStorage.setItem(`appTheme_${user}`, JSON.stringify(theme)); }, [theme, user]);
    useEffect(() => { localStorage.setItem(`language_${user}`, JSON.stringify(language)); }, [language, user]);

    // UI and other logic state
    const [news, setNews] = useState<{ headline: string, summary: string, source: string, url: string }[]>([]);
    const [activeTab, setActiveTab] = useState<AnimeStatus>(AnimeStatus.InProgress);
    const [activeMenu, setActiveMenu] = useState('lists');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
    const [isProfileEditing, setIsProfileEditing] = useState(false);
    const [tempProfileName, setTempProfileName] = useState(profile.name);
    const [newFriendName, setNewFriendName] = useState('');
    const [yuliusgochiMessage, setYuliusgochiMessage] = useState<string | null>(null);
    const [showSmoke, setShowSmoke] = useState(false);
    const [selectedNews, setSelectedNews] = useState<{ headline: string, summary: string, source: string, url: string } | null>(null);
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
    const [profileListStatus, setProfileListStatus] = useState<AnimeStatus | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [showAchievements, setShowAchievements] = useState(false);

    const t = useCallback((key: string, ...args: (string | number)[]) => {
       let translation =
  (translations[language] as Record<string, string>)[key] ?? key;

        if (args.length > 0) {
            args.forEach((arg, index) => {
                translation = translation.replace(`{${index}}`, String(arg));
            });
        }
        return translation;
    }, [language]);

    // Achievement Check Logic
  useEffect(() => {
    const newUnlocked: string[] = [];
    const finishedCount = animeLists[AnimeStatus.Finished].length;
    const currentUnlocked = profile.unlockedAchievements;

    // Otaku 5
    if (finishedCount >= 5 && !currentUnlocked.includes('otaku_5')) newUnlocked.push('otaku_5');
    
    // Anime Milestones
    if (finishedCount >= 10 && !currentUnlocked.includes('anime_10')) newUnlocked.push('anime_10');
    if (finishedCount >= 50 && !currentUnlocked.includes('anime_50')) newUnlocked.push('anime_50');
    if (finishedCount >= 100 && !currentUnlocked.includes('anime_100')) newUnlocked.push('anime_100');

    // Pet Levels
    if (pet.level >= 10 && !currentUnlocked.includes('pet_level_10')) newUnlocked.push('pet_level_10');
    if (pet.level >= 20 && !currentUnlocked.includes('pet_level_20')) newUnlocked.push('pet_level_20');
    if (pet.level >= 30 && !currentUnlocked.includes('pet_level_30')) newUnlocked.push('pet_level_30');

    // Friends
    if (friends.length >= 10 && !currentUnlocked.includes('friends_10')) newUnlocked.push('friends_10');

    // Shop Items
    if (profile.stats && profile.stats.itemsBought >= 40 && !currentUnlocked.includes('shop_40')) {
        newUnlocked.push('shop_40');
    }

    // If there are new achievements, update profile
    if (newUnlocked.length > 0) {
        setProfile(prev => ({
            ...prev,
            unlockedAchievements: [...prev.unlockedAchievements, ...newUnlocked]
        }));

        // Example: first achievement ID
        const firstId = newUnlocked[0];
        // Aquí va tu código de notificación si tienes
    }

}, [animeLists, profile, pet, friends]);

            
            // Show notification
          

    useEffect(() => { setTempProfileName(profile.name) }, [profile.name]);

    // Theme application logic
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'pink') {
            root.style.setProperty('--color-accent', '#F472B6');
            root.style.setProperty('--color-highlight', '#F9A8D4');
        } else { 
            root.style.setProperty('--color-accent', '#E65100');
            root.style.setProperty('--color-highlight', '#FF9800');
        }
    }, [theme]);

    // Pet Happiness logic
    useEffect(() => {
        const happinessInterval = setInterval(() => {
            setPet(p => ({...p, happiness: Math.max(0, p.happiness - 1)}));
        }, 30000);
        return () => clearInterval(happinessInterval);
    }, [setPet]);
    
    // Yuliusgochi random message logic
    useEffect(() => {
        if (activeMenu === 'yuliusgochi') {
            const messages = [t('yuliusgochi.message1'), t('yuliusgochi.message2')];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            setYuliusgochiMessage(randomMessage);
            const timer = setTimeout(() => setYuliusgochiMessage(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [activeMenu, t]);

    useEffect(() => {
        if (activeMenu !== 'profile') {
            setShowAchievements(false);
            setProfileListStatus(null);
        }
    }, [activeMenu]);

    const handleUseItem = (itemId: string) => {
        const itemInInventory = inventory.find(i => i.itemId === itemId);
        if (!itemInInventory || itemInInventory.quantity <= 0) return;

        const shopItem = SHOP_ITEMS.find(i => i.id === itemId);
        if (!shopItem) return;

        if (shopItem.type === ItemType.Food) {
            setPet(p => ({...p, happiness: Math.min(100, p.happiness + (shopItem.happinessGain || 0))}));
        } else if (shopItem.id === 'cigar') {
            setPet(p => ({ ...p, happiness: 100 }));
            setShowSmoke(true);
            setTimeout(() => setShowSmoke(false), 2000);
        }

        setInventory(prevInv => {
            const newInv = prevInv.map(item =>
                item.itemId === itemId ? { ...item, quantity: item.quantity - 1 } : item
            );
            return newInv.filter(item => item.quantity > 0);
        });
    };
    
    const handleBuyItem = (item: ShopItem) => {
        if (profile.pesetas < item.price) {
            alert(t('shop.noPesetas'));
            return;
        }
        
        const isCosmetic = item.type === ItemType.Cosmetic;
        const alreadyOwned = inventory.some(invItem => invItem.itemId === item.id);
        if (isCosmetic && alreadyOwned) return;

        setProfile(p => ({ 
            ...p, 
            pesetas: p.pesetas - item.price,
            stats: { ...p.stats, itemsBought: (p.stats?.itemsBought || 0) + 1 }
        }));

        setInventory(prevInv => {
            const existingItemIndex = prevInv.findIndex(i => i.itemId === item.id);
            if (existingItemIndex > -1) {
                const newInv = [...prevInv];
                newInv[existingItemIndex].quantity += 1;
                return newInv;
            } else {
                return [...prevInv, { itemId: item.id, quantity: 1 }];
            }
        });
    };

    const handleEquipItem = (itemId: string) => {
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        if (!item || !item.slot) return;
    
        setPet(prevPet => {
            const newEquippedItems = { ...prevPet.equippedItems };
            if (newEquippedItems[item.slot!] === itemId) {
                newEquippedItems[item.slot!] = null;
            } else {
                newEquippedItems[item.slot!] = itemId;
            }
            return { ...prevPet, equippedItems: newEquippedItems };
        });
    };

    const addXp = useCallback((amount: number) => {
        setPet(prevPet => {
            const newXp = prevPet.xp + amount;
            const newLevel = Math.floor(newXp / 100) + 1;
            return { ...prevPet, xp: newXp, level: newLevel };
        });
    }, [setPet]);

    const updateMissionProgress = useCallback((action: MissionAction, amount: number = 1) => {
        const updatedMissions = missions.map(m => {
            if (m.action === action && !m.completed) {
                const newProgress = m.progress + amount;
                if (newProgress >= m.goal) {
                    addXp(m.xpReward);
                    setProfile(p => ({ ...p, pesetas: p.pesetas + m.pesetaReward }));
                    return { ...m, progress: m.goal, completed: true };
                }
                return { ...m, progress: newProgress };
            }
            return m;
        });
        setMissions(updatedMissions);
    }, [missions, addXp, setMissions, setProfile]);


    const handleAddAnime = (anime: Omit<Anime, 'rating'>, status: AnimeStatus) => {
        const newAnime: Anime = { ...anime, status, rating: null };
        setAnimeLists(prev => ({
            ...prev,
            [status]: [...prev[status], newAnime]
        }));
        if (status === AnimeStatus.Pending) {
            updateMissionProgress(MissionAction.ADD_TO_PENDING);
        }
        addXp(XP_REWARDS.ADD_ANIME);
    };

    const handleEpisodeChange = (animeId: number, newCount: number) => {
        let animeToUpdate: Anime | undefined;
        const updatedLists = { ...animeLists };

        for (const key in updatedLists) {
            const status = key as AnimeStatus;
            const animeIndex = updatedLists[status].findIndex(a => a.id === animeId);
            if (animeIndex !== -1) {
                animeToUpdate = { ...updatedLists[status][animeIndex] };
                
                const oldWatchedCount = animeToUpdate.watchedEpisodes;
                animeToUpdate.watchedEpisodes = newCount;
                
                if (newCount > oldWatchedCount) {
                    // Removed direct XP gain
                    updateMissionProgress(MissionAction.WATCH_EPISODE, (newCount - oldWatchedCount));
                }

                const newStatus = 
                    newCount === animeToUpdate.totalEpisodes ? AnimeStatus.Finished :
                    newCount > 0 ? AnimeStatus.InProgress :
                    AnimeStatus.Pending;

                if (animeToUpdate.status !== newStatus) {
                    updatedLists[status].splice(animeIndex, 1);
                    animeToUpdate.status = newStatus;
                    updatedLists[newStatus].push(animeToUpdate);
                } else {
                    updatedLists[status][animeIndex] = animeToUpdate;
                }
                break;
            }
        }
        setAnimeLists(updatedLists);
    };

    const handleRateAnime = (animeId: number, rating: number) => {
        const updatedLists = { ...animeLists };
         for (const key in updatedLists) {
            const status = key as AnimeStatus;
            const animeIndex = updatedLists[status].findIndex(a => a.id === animeId);
            if(animeIndex !== -1) {
                updatedLists[status][animeIndex].rating = rating;
                updateMissionProgress(MissionAction.RATE_ANIME);
                addXp(XP_REWARDS.RATE_ANIME);
                break;
            }
        }
        setAnimeLists(updatedLists);
    };
    
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfile(p => ({ ...p, avatar: event.target?.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleProfileSave = () => {
        setProfile(p => ({ ...p, name: tempProfileName }));
        setIsProfileEditing(false);
    };

    const handleAddFriend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newFriendName.trim()) {
            const newFriend: Friend = {
                id: new Date().toISOString(),
                name: newFriendName.trim(),
                avatar: `https://i.pravatar.cc/150?u=${newFriendName.trim()}`,
                pet: { level: 1, xp: 0, happiness: 100, equippedItems: {} },
                unlockedAchievements: [],
                animeLists: {
                    [AnimeStatus.Pending]: [],
                    [AnimeStatus.InProgress]: [],
                    [AnimeStatus.Finished]: [],
                }
            };
            setFriends(prev => [...prev, newFriend]);
            setNewFriendName('');
        }
    };

    const handleRemoveFriend = (friendId: string) => {
        setFriends(prev => prev.filter(f => f.id !== friendId));
    };

    const handleThemeChange = () => {
        setTheme(currentTheme => (currentTheme === 'orange' ? 'pink' : 'orange'));
    };

    useEffect(() => {
        if(activeMenu === 'news'){
            getNews(language).then(setNews);
        }
    }, [activeMenu, language]);

    const ProfileAnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
        const progress = anime.totalEpisodes > 0 ? (anime.watchedEpisodes / anime.totalEpisodes) * 100 : 0;
        return (
            <div className="bg-secondary/70 p-2 rounded-lg flex items-center gap-3">
                <img src={anime.coverUrl} alt={anime.title} className="w-12 h-16 object-cover rounded-md flex-shrink-0" />
                <div className="flex-grow overflow-hidden">
                    <p className="font-bold text-sm truncate">{anime.title}</p>
                    <div className="w-full bg-accent rounded-full h-1.5 my-1">
                        <div className="bg-highlight h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                     <div className="flex items-center gap-2">
                        <ReadOnlyStarRating rating={anime.rating} />
                    </div>
                </div>
            </div>
        );
    };

     const renderPetWithEquipment = () => {
        const petLevel = Math.floor(pet.level / 10) * 10;
        switch(petLevel) {
            case 0: return <FrogTadpoleIcon equippedItems={pet.equippedItems} />;
            case 10: return <FrogletNinjaIcon equippedItems={pet.equippedItems} />;
            case 20: return <GeninFrogIcon equippedItems={pet.equippedItems} />;
            case 30: return <JouninFrogIcon equippedItems={pet.equippedItems} />;
            default: return <FrogTadpoleIcon equippedItems={pet.equippedItems} />;
        }
    };
    
    const renderContent = () => {
        switch(activeMenu) {
            case 'yuliusgochi':
                const yuliusAnimationClass = () => {
                    if (pet.happiness > 75) return 'animate-happy-bounce';
                    if (pet.happiness <= 20) return 'animate-sad-tremble';
                    if (pet.happiness <= 50) return 'animate-annoyed-shake';
                    return 'animate-idle';
                };

                return (
                    <div 
                        className="relative w-full h-full overflow-hidden bg-cover bg-center"
                        style={{ backgroundImage: "url('https://www.wallpaperflare.com/static/132/905/222/anime-scenery-torii-cherry-blossom-wallpaper.jpg')" }}
                    >
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-0 left-[10%] w-4 h-4 bg-pink-300 rounded-full animate-petal-fall-1" style={{ filter: 'blur(1px)' }}></div>
                            <div className="absolute top-0 left-[30%] w-3 h-3 bg-pink-200 rounded-full animate-petal-fall-2" style={{ animationDelay: '5s' }}></div>
                            <div className="absolute top-0 left-[50%] w-4 h-4 bg-pink-300 rounded-b-full rounded-t-lg rotate-45 animate-petal-fall-3" style={{ animationDelay: '2s' }}></div>
                            <div className="absolute top-0 left-[70%] w-3 h-3 bg-pink-200 rounded-full animate-petal-fall-1" style={{ animationDelay: '8s' }}></div>
                            <div className="absolute top-0 left-[90%] w-4 h-4 bg-pink-300 rounded-b-full rounded-t-lg -rotate-45 animate-petal-fall-2" style={{ animationDelay: '12s' }}></div>
                            <div className="absolute top-0 left-[20%] w-3 h-3 bg-pink-200 rounded-full animate-petal-fall-3" style={{ animationDelay: '7s', filter: 'blur(1px)' }}></div>
                            <div className="absolute top-0 left-[60%] w-4 h-4 bg-pink-300 rounded-full animate-petal-fall-1" style={{ animationDelay: '3s' }}></div>
                        </div>
                        
                        <div className="relative z-10 w-full h-full p-4">
                            <div className="absolute top-4 left-4">
                                <div className="bg-secondary/80 backdrop-blur-sm p-4 rounded-lg shadow-lg w-64 text-center space-y-3">
                                    <h3 className="text-xl font-bold text-highlight">{t('yuliusgochi.care')}</h3>
                                    <div>
                                    <div className="flex items-center justify-between text-sm px-1">
                                        <span>❤️ {t('yuliusgochi.happiness')}</span>
                                        <span>{pet.happiness}%</span>
                                    </div>
                                    <div className="w-full bg-red-900 rounded-full h-4 mt-1">
                                        <div className="bg-red-500 h-4 rounded-full transition-all duration-500" style={{ width: `${pet.happiness}%` }}></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            
                             <div className="absolute top-4 right-4">
                                <div className="w-64 p-4 bg-secondary/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col">
                                    <h4 className="text-lg font-bold mb-3 text-center">{t('yuliusgochi.inventory')}</h4>
                                    <div className="space-y-2 mb-3 max-h-48 overflow-y-auto pr-2">
                                        {inventory.length > 0 ? (
                                            inventory.map(invItem => {
                                                const shopItem = SHOP_ITEMS.find(i => i.id === invItem.itemId);
                                                if (!shopItem || (shopItem.type === ItemType.Cosmetic && shopItem.slot)) return null;
                                                return (
                                                    <div key={invItem.itemId} onClick={() => handleUseItem(invItem.itemId)} className="flex items-center text-left cursor-pointer p-2 rounded-md hover:bg-accent/50 transition-colors">
                                                        <div className="w-10 h-10 p-1 bg-primary rounded-full mr-3 flex-shrink-0"><shopItem.icon /></div>
                                                        <div className="flex-grow">
                                                            <span className="text-sm">{t(shopItem.name)}</span>
                                                        </div>
                                                        <span className="text-xs font-bold bg-highlight rounded-full px-2 py-0.5">x{invItem.quantity}</span>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <p className="text-text-secondary text-sm text-center py-4">{t('yuliusgochi.emptyInventory')}</p>
                                        )}
                                    </div>
                                    <div className="mt-auto flex gap-2">
                                        <button onClick={() => setIsShopOpen(true)} className="flex-1 bg-yellow-600 text-white font-bold py-2 px-3 rounded-md hover:opacity-90 text-sm">
                                            {t('yuliusgochi.goToShop')}
                                        </button>
                                        <button onClick={() => setIsWardrobeOpen(true)} className="flex-1 bg-purple-600 text-white font-bold py-2 px-3 rounded-md hover:opacity-90 text-sm">
                                            {t('menu.wardrobe')}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                {yuliusgochiMessage && (
                                    <div className="absolute -top-10 mb-2 w-max bg-white text-black text-sm px-3 py-1 rounded-full shadow-lg animate-fade-in">
                                      {yuliusgochiMessage}
                                      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
                                    </div>
                                )}
                                <div className={`relative w-48 h-48 md:w-64 md:h-64 ${yuliusAnimationClass()}`}>
                                    {renderPetWithEquipment()}
                                    {pet.happiness <= 20 && (
                                      <>
                                        <span className="absolute top-1/2 left-[35%] text-3xl text-blue-400 animate-drip pointer-events-none">💧</span>
                                        <span className="absolute top-1/2 left-[60%] text-3xl text-blue-400 animate-drip pointer-events-none" style={{animationDelay: '0.7s'}}>💧</span>
                                      </>
                                    )}
                                    {showSmoke && (
                                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                          <span className="text-4xl animate-smoke">💨</span>
                                      </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'news':
                if (selectedNews) {
                    return (
                        <div className="p-4 md:p-8 animate-fade-in">
                            <button onClick={() => setSelectedNews(null)} className="mb-4 bg-accent hover:bg-highlight text-white font-bold py-2 px-4 rounded-md transition-colors">
                                {t('news.back')}
                            </button>
                            <div className="bg-secondary p-6 rounded-lg">
                                <h2 className="text-2xl font-bold text-highlight mb-2">{selectedNews.headline}</h2>
                                <p className="text-sm text-text-secondary mb-4">{t('news.source')}: {selectedNews.source}</p>
                                <p className="text-text-main whitespace-pre-wrap">{selectedNews.summary}</p>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="space-y-4 p-4 animate-fade-in">
                        <h2 className="text-2xl font-bold text-highlight mb-4">{t('news.title')}</h2>
                        {news.length > 0 ? news.map((item, index) => (
                            <div key={index} className="bg-secondary p-4 rounded-lg">
                                <h3 onClick={() => setSelectedNews(item)} className="cursor-pointer font-bold text-lg hover:text-highlight transition-colors">{item.headline}</h3>
                                <p className="text-sm text-text-secondary mt-1">{t('news.source')}: {item.source}</p>
                                <p className="text-text-main mt-2 line-clamp-3">{item.summary}</p>
                            </div>
                        )) : <p>{t('loading')}</p>}
                    </div>
                );
            case 'missions':
                return (
                    <div className="space-y-4 p-4 animate-fade-in">
                        <h2 className="text-2xl font-bold text-highlight mb-4">{t('missions.title')}</h2>
                        <h3 className="font-bold text-lg text-text-main">{t('missions.daily')}</h3>
                        {missions.filter(m => m.type === MissionType.Daily).map(m => (
                            <MissionItem key={m.id} mission={m} t={t} />
                        ))}
                        <h3 className="font-bold text-lg text-text-main mt-6">{t('missions.monthly')}</h3>
                        {missions.filter(m => m.type === MissionType.Monthly).map(m => (
                            <MissionItem key={m.id} mission={m} t={t} />
                        ))}
                    </div>
                );
            case 'friends':
                return (
                    <div className="p-4 md:p-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-highlight mb-6">{t('friends.title')}</h2>
                        <form onSubmit={handleAddFriend} className="flex gap-2 mb-8">
                            <input
                                type="text"
                                value={newFriendName}
                                onChange={(e) => setNewFriendName(e.target.value)}
                                placeholder={t('friends.addPlaceholder')}
                                className="w-full bg-secondary p-2 rounded-md border border-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                            />
                            <button type="submit" className="bg-highlight px-4 py-2 rounded-md text-white font-bold hover:opacity-90 disabled:opacity-50">
                                {t('add')}
                            </button>
                        </form>
                        <div className="space-y-3">
                            {friends.length > 0 ? friends.map(friend => (
                                <div key={friend.id} className="bg-secondary p-3 rounded-md flex items-center justify-between gap-4">
                                    <div onClick={() => setSelectedFriend(friend)} className="flex items-center gap-4 cursor-pointer flex-grow">
                                        <img src={friend.avatar} alt={friend.name} className="w-12 h-12 object-cover rounded-full" />
                                        <span className="font-bold">{friend.name}</span>
                                    </div>
                                    <button onClick={() => handleRemoveFriend(friend.id)} className="text-red-500 hover:text-red-400 font-bold text-2xl leading-none">
                                        &times;
                                    </button>
                                </div>
                            )) : <p className="text-center text-text-secondary">{t('friends.empty')}</p>}
                        </div>
                    </div>
                );
            case 'profile':
                 const handleStatClick = (status: AnimeStatus) => {
                    setProfileListStatus(prev => prev === status ? null : status);
                };

                if (showAchievements) {
                    return (
                        <div className="p-4 md:p-8 flex flex-col items-center animate-fade-in">
                            <div className="w-full max-w-lg">
                                <button onClick={() => setShowAchievements(false)} className="mb-6 bg-secondary hover:bg-accent text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center gap-2">
                                    <span>←</span> {t('back')}
                                </button>
                                <h2 className="text-2xl font-bold text-highlight mb-6 text-center">{t('profile.achievements')}</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {ACHIEVEMENTS.map(ach => {
                                        const isUnlocked = profile.unlockedAchievements.includes(ach.id);
                                        return (
                                            <div key={ach.id} className={`bg-secondary p-4 rounded-lg flex items-center gap-4 transition-all duration-300 ${isUnlocked ? 'border border-highlight shadow-lg shadow-highlight/20' : 'opacity-50 grayscale hover:grayscale-0 hover:opacity-75'}`}>
                                                <div className="w-12 h-12 flex-shrink-0">
                                                    <ach.icon />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg">{t(ach.title)}</h4>
                                                    <p className="text-sm text-text-secondary">{t(ach.description)}</p>
                                                    {!isUnlocked && <p className="text-xs text-accent mt-1">Locked</p>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                }

                return (
                     <div className="p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <h2 className="text-2xl font-bold text-highlight mb-6">{t('profile.title')}</h2>
                        <div className="relative mb-4">
                            <img src={profile.avatar || `https://i.pravatar.cc/150?u=${profile.name}`} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-highlight" />
                             {isProfileEditing && (
                                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-secondary p-2 rounded-full cursor-pointer hover:bg-accent">
                                    ✏️
                                    <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                                </label>
                            )}
                        </div>
                        {isProfileEditing ? (
                            <div className="flex flex-col items-center gap-4">
                               <input type="text" value={tempProfileName} onChange={e => setTempProfileName(e.target.value)} className="bg-secondary p-2 rounded-md border border-accent text-center text-xl" />
                                <button onClick={() => setLanguage(lang => lang === 'es' ? 'en' : 'es')} className="bg-secondary px-4 py-2 rounded-md text-white">
                                    {t('profile.changeLanguage')} ({language.toUpperCase()})
                                </button>
                               <div className="flex gap-2">
                                <button onClick={handleProfileSave} className="bg-highlight px-4 py-2 rounded-md text-white font-bold">{t('save')}</button>
                                <button onClick={() => { setIsProfileEditing(false); setTempProfileName(profile.name); }} className="bg-accent px-4 py-2 rounded-md text-white">{t('cancel')}</button>
                               </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h3 className="text-2xl font-bold">{profile.name}</h3>
                                <button onClick={() => setIsProfileEditing(true)} className="mt-2 text-sm text-highlight hover:underline">{t('profile.edit')}</button>
                            </div>
                        )}

                        <div className="mt-8 w-full max-w-lg">
                            <h3 className="text-xl font-bold text-highlight mb-4 text-center">{t('profile.stats')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <button onClick={() => handleStatClick(AnimeStatus.Pending)} className="bg-secondary p-4 rounded-lg hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-highlight">
                                    <p className="text-3xl font-bold text-text-main">{animeLists[AnimeStatus.Pending].length}</p>
                                    <p className="text-sm text-text-secondary">{t(`status.${AnimeStatus.Pending}`)}</p>
                                </button>
                               <button onClick={() => handleStatClick(AnimeStatus.InProgress)} className="bg-secondary p-4 rounded-lg hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-highlight">
                                    <p className="text-3xl font-bold text-text-main">{animeLists[AnimeStatus.InProgress].length}</p>
                                    <p className="text-sm text-text-secondary">{t(`status.${AnimeStatus.InProgress}`)}</p>
                                </button>
                                <button onClick={() => handleStatClick(AnimeStatus.Finished)} className="bg-secondary p-4 rounded-lg hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-highlight">
                                    <p className="text-3xl font-bold text-text-main">{animeLists[AnimeStatus.Finished].length}</p>
                                    <p className="text-sm text-text-secondary">{t(`status.${AnimeStatus.Finished}`)}</p>
                                </button>
                            </div>
                        </div>

                        {profileListStatus && (
                            <div className="mt-8 w-full max-w-lg animate-fade-in">
                                <h3 className="text-xl font-bold text-highlight mb-4 text-center">{t(`status.${profileListStatus}`)}</h3>
                                <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                                    {animeLists[profileListStatus].length > 0 ? (
                                        animeLists[profileListStatus].map(anime => (
                                            <ProfileAnimeCard key={anime.id} anime={anime} />
                                        ))
                                    ) : (
                                        <p className="text-center text-text-secondary py-4">{t('profile.emptyList')}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Achievements Button */}
                        <div className="mt-8 w-full max-w-lg animate-fade-in">
                            <button onClick={() => setShowAchievements(true)} className="w-full bg-secondary p-4 rounded-lg border border-accent hover:border-highlight hover:bg-accent/10 transition-all duration-300 flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                     <span className="text-2xl group-hover:scale-110 transition-transform">🏆</span>
                                     <span className="font-bold text-lg">{t('profile.achievements')}</span>
                                </div>
                                <span className="text-text-secondary group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>

                        <div className="mt-8">
                            <button onClick={handleThemeChange} className="bg-highlight px-6 py-2 rounded-md text-white font-bold transition-transform hover:scale-105">
                                {t('profile.changeTheme')}
                            </button>
                        </div>
                    </div>
                );
            default: // lists
                 return (
                    <>
                        <div className="border-b border-accent flex justify-center items-center sticky top-0 bg-primary z-10">
                            <div className="flex overflow-x-auto">
                                {(Object.keys(animeLists) as (keyof typeof AnimeStatus)[]).map(statusKey => (
                                    <button
                                        key={statusKey}
                                        onClick={() => setActiveTab(AnimeStatus[statusKey])}
                                        className={`py-3 px-6 font-semibold transition-colors flex-shrink-0 ${activeTab === AnimeStatus[statusKey] ? 'text-highlight border-b-2 border-highlight' : 'text-text-secondary hover:text-text-main'}`}
                                    >
                                        {t(`status.${AnimeStatus[statusKey]}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 space-y-4 pb-24">
                            {animeLists[activeTab].length > 0 ? (
                                animeLists[activeTab].map(anime => (
                                    <AnimeCard key={anime.id} anime={anime} onEpisodeChange={handleEpisodeChange} onRate={handleRateAnime} t={t} />
                                ))
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-text-secondary text-lg">{t('animeCard.empty')}</p>
                                </div>
                            )}
                        </div>
                    </>
                );
        }
    };
    
    const menuItems = [
        { id: 'lists', label: 'menu.lists', icon: '📚' },
        { id: 'missions', label: 'menu.missions', icon: '🎯' },
        { id: 'news', label: 'menu.news', icon: '📰' },
        { id: 'friends', label: 'menu.friends', icon: '🧑‍🤝‍🧑' },
        { id: 'yuliusgochi', label: 'menu.yuliusgochi', icon: '🏠'},
        { id: 'profile', label: 'menu.profile', icon: '👤' },
    ];

    if (!user) {
        return <LoginScreen onLoginSuccess={(userData) => setUser(userData.username)} />;
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {notification && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg font-bold animate-happy-bounce flex items-center gap-2">
                    <span>🏆</span>
                    {notification}
                </div>
            )}
            {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} onAddAnime={handleAddAnime} t={t} language={language} />}
            <ShopModal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} onBuy={handleBuyItem} items={SHOP_ITEMS.filter(i => i.type === ItemType.Food || i.id === 'cigar')} userPesetas={profile.pesetas} t={t} />
            {selectedFriend && <FriendProfileModal friend={selectedFriend} onClose={() => setSelectedFriend(null)} t={t} />}
            <WardrobeModal 
                isOpen={isWardrobeOpen}
                onClose={() => setIsWardrobeOpen(false)}
                pet={pet}
                inventory={inventory}
                userPesetas={profile.pesetas}
                onEquip={handleEquipItem}
                onBuy={handleBuyItem}
                t={t}
            />
            
            <aside className="bg-secondary w-full md:w-64 flex-shrink-0">
                <div className="p-4 text-center border-b border-accent">
                    <h1 className="text-2xl font-bold text-highlight">Anime Den</h1>
                    <div className="mt-4">
                        <img src={profile.avatar || `https://i.pravatar.cc/150?u=${profile.name}`} alt="Avatar" className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-highlight" />
                        <p className="mt-2 font-bold text-text-main">{profile.name}</p>
                        <p className="text-sm text-yellow-400">₧ {profile.pesetas}</p>
                    </div>
                </div>
                <nav className="p-2">
                    <ul>
                        {menuItems.map(item => (
                             <li key={item.id}>
                                <button onClick={() => setActiveMenu(item.id)} className={`w-full text-left flex items-center gap-3 p-3 rounded-md text-lg transition-colors ${activeMenu === item.id ? 'bg-accent text-white' : 'hover:bg-accent/50'}`}>
                                    <span>{item.icon}</span>
                                    <span>{t(item.label)}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            
            <div className="flex-grow relative">
                <main className="w-full h-full bg-primary overflow-auto">
                   {renderContent()}
                </main>
                {activeMenu === 'lists' && (
                     <button
                        onClick={() => setIsSearchOpen(true)}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-highlight text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:scale-105 transition-transform duration-200"
                        aria-label={t('animeCard.add')}
                        title={t('animeCard.add')}
                    >
                        <span className="mb-1">+</span>
                    </button>
                )}
            </div>
            
            {activeMenu !== 'yuliusgochi' && <Pet pet={pet} t={t} />}
        </div>
    );
};

interface MissionItemProps {
    mission: Mission;
    t: (key: string, ...args: (string | number)[]) => string;
}

const MissionItem: React.FC<MissionItemProps> = ({ mission, t }) => {
    const progress = mission.goal > 0 ? (mission.progress / mission.goal) * 100 : 0;
    return (
        <div className={`bg-secondary p-4 rounded-lg ${mission.completed ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold">{t(mission.description)}</p>
                    <p className="text-xs text-text-secondary">{t('missions.reward')}: {mission.xpReward} XP & {mission.pesetaReward} ₧</p>
                </div>
                {mission.completed && <span className="text-green-400 font-bold">✓</span>}
            </div>
            <div className="w-full bg-accent rounded-full h-2.5 mt-2">
                <div className="bg-highlight h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-right text-sm mt-1">{mission.progress} / {mission.goal}</p>
        </div>
    );
}

export default App;
