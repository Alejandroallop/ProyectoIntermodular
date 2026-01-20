
import React, { useState } from 'react';
import { Pet as PetType, InventoryItem, ShopItem, ItemType } from '../types';
import { SHOP_ITEMS } from '../constants';
import { FrogTadpoleIcon, FrogletNinjaIcon, GeninFrogIcon, JouninFrogIcon } from './icons/PetIcons';

interface WardrobeModalProps {
    isOpen: boolean;
    onClose: () => void;
    pet: PetType;
    inventory: InventoryItem[];
    userPesetas: number;
    onEquip: (itemId: string) => void;
    onBuy: (item: ShopItem) => void;
    t: (key: string, ...args: (string | number)[]) => string;
}

const WardrobeModal: React.FC<WardrobeModalProps> = ({ isOpen, onClose, pet, inventory, userPesetas, onEquip, onBuy, t }) => {
    const [wardrobeTab, setWardrobeTab] = useState<'clothes' | 'shop'>('clothes');

    if (!isOpen) return null;

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
    
    const ownedCosmetics = inventory.map(inv => SHOP_ITEMS.find(shop => shop.id === inv.itemId && shop.type === ItemType.Cosmetic && shop.slot)).filter(Boolean) as ShopItem[];
    const shopCosmetics = SHOP_ITEMS.filter(item => item.type === ItemType.Cosmetic && item.slot);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-primary rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-accent flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-highlight">{t('wardrobe.title')}</h2>
                    <button onClick={onClose} className="bg-accent px-4 py-2 rounded-md text-white font-bold hover:opacity-90">{t('close')}</button>
                </div>
                
                <div className="p-4 md:p-6 flex-grow overflow-y-auto">
                    <div className="flex justify-center mb-4">
                        <div className="w-40 h-40 md:w-48 md:h-48">
                            {renderPetWithEquipment()}
                        </div>
                    </div>

                    <div className="bg-secondary/50 p-2 rounded-lg max-w-3xl mx-auto">
                        <div className="flex border-b border-accent mb-4">
                            <button onClick={() => setWardrobeTab('clothes')} className={`flex-1 py-2 text-center font-bold ${wardrobeTab === 'clothes' ? 'text-highlight border-b-2 border-highlight' : 'text-text-secondary'}`}>{t('wardrobe.myClothes')}</button>
                            <button onClick={() => setWardrobeTab('shop')} className={`flex-1 py-2 text-center font-bold ${wardrobeTab === 'shop' ? 'text-highlight border-b-2 border-highlight' : 'text-text-secondary'}`}>{t('wardrobe.shop')}</button>
                        </div>
                        
                        {wardrobeTab === 'clothes' && (
                            <div>
                                {ownedCosmetics.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {ownedCosmetics.map(item => {
                                            const isEquipped = item.slot && pet.equippedItems[item.slot] === item.id;
                                            return (
                                                <div key={item.id} className="bg-primary p-3 rounded-md flex flex-col items-center gap-2 text-center">
                                                    <div className="w-16 h-16 p-2 bg-secondary rounded-full"><item.icon /></div>
                                                    <h3 className="font-bold text-sm h-10 flex items-center">{t(item.name)}</h3>
                                                    <button onClick={() => onEquip(item.id)} className={`w-full py-1 rounded-md text-sm font-bold ${isEquipped ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                                                        {isEquipped ? t('wardrobe.unequip') : t('wardrobe.equip')}
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : <p className="text-center text-text-secondary py-8">{t('wardrobe.empty')}</p>}
                            </div>
                        )}

                        {wardrobeTab === 'shop' && (
                             <div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {shopCosmetics.map(item => {
                                         const isOwned = inventory.some(i => i.itemId === item.id);
                                         return (
                                            <div key={item.id} className="bg-primary p-3 rounded-md flex flex-col items-center gap-2 text-center">
                                                <div className="w-16 h-16 p-2 bg-secondary rounded-full"><item.icon /></div>
                                                <h3 className="font-bold text-sm h-10 flex items-center">{t(item.name)}</h3>
                                                {isOwned ? (
                                                    <p className="text-green-400 font-bold py-1">{t('wardrobe.owned')}</p>
                                                ) : (
                                                    <button onClick={() => onBuy(item)} disabled={userPesetas < item.price} className="bg-highlight text-white px-3 py-1 rounded-md text-sm hover:opacity-90 w-full disabled:bg-gray-500 disabled:cursor-not-allowed">
                                                        ₧ {item.price}
                                                    </button>
                                                )}
                                            </div>
                                         )
                                    })}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WardrobeModal;
