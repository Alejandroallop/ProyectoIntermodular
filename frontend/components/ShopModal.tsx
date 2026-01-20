
import React from 'react';
import { ShopItem, ItemType } from '../types';

interface ShopModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBuy: (item: ShopItem) => void;
    items: ShopItem[];
    userPesetas: number;
    t: (key: string) => string;
}

const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose, onBuy, items, userPesetas, t }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-primary rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-accent flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-highlight">{t('shop.title')}</h2>
                    <span className="font-bold text-lg text-yellow-400">₧ {userPesetas}</span>
                </div>
                <div className="p-4 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map(item => (
                        <div key={item.id} className="bg-secondary p-3 rounded-md flex flex-col items-center gap-2 text-center">
                            <div className="w-16 h-16 p-2 bg-primary rounded-full">
                                <item.icon />
                            </div>
                            <h3 className="font-bold text-sm h-10 flex items-center">{t(item.name)}</h3>
                            <p className="text-yellow-400 font-bold">₧ {item.price}</p>
                            <button 
                                onClick={() => onBuy(item)} 
                                disabled={userPesetas < item.price}
                                className="bg-highlight text-white px-3 py-1 rounded-md text-sm hover:opacity-90 w-full disabled:bg-gray-500 disabled:cursor-not-allowed"
                            >
                                {t('shop.buy')}
                            </button>
                        </div>
                    ))}
                </div>
                 <div className="p-2 border-t border-accent text-right">
                    <button onClick={onClose} className="bg-accent px-4 py-2 rounded-md text-white font-bold hover:opacity-90">{t('close')}</button>
                </div>
            </div>
        </div>
    );
};

export default ShopModal;