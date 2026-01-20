import React from 'react';

interface PetIconProps {
  equippedItems?: {
    head?: string | null;
    eyes?: string | null;
  };
}

// FIX: Removed default `{}` for equippedItems and used optional chaining `?.` for property access.
export const FrogTadpoleIcon: React.FC<PetIconProps> = ({ equippedItems }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g transform="translate(0, -10)">
            <path d="M100 150 Q150 100 190 120 T150 150" fill="#388E3C" />
            <circle cx="100" cy="100" r="55" fill="#66BB6A" />
            <circle cx="100" cy="100" r="45" fill="#81C784" />
            {/* Base Eyes */}
            <ellipse cx="80" cy="95" rx="22" ry="28" fill="white" />
            <ellipse cx="120" cy="95" rx="22" ry="28" fill="white" />
            <circle cx="85" cy="100" r="14" fill="#2E2E2E" />
            <circle cx="125" cy="100" r="14" fill="#2E2E2E" />
            {/* Shine */}
            <circle cx="78" cy="92" r="6" fill="white" />
            <circle cx="118" cy="92" r="6" fill="white" />
             {/* Mouth */}
            <path d="M95 125 C100 130 105 125 95 125" stroke="#2E2E2E" strokeWidth="3" strokeLinecap="round" />
            {/* Blushes */}
            <ellipse cx="60" cy="115" rx="10" ry="6" fill="#FFAB91" />
            <ellipse cx="140" cy="115" rx="10" ry="6" fill="#FFAB91" />
             {/* Accessories */}
            {equippedItems?.head === 'cap' && (
                <g transform="translate(0, -20)">
                    <path d="M70 70 A 30 30 0 0 1 130 70" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
                    <path d="M130 70 Q 150 70 140 80 L 80 80 Q 60 70 70 70" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
                    <circle cx="100" cy="60" r="8" fill="white" stroke="#B71C1C" strokeWidth="2" />
                </g>
            )}
            {equippedItems?.eyes === 'sunglasses' && (
                 <g transform="translate(0, -10)">
                    <path d="M58 92 C 45 130 105 130 97 92 Z" fill="#212121" />
                    <path d="M103 92 C 95 130 155 130 142 92 Z" fill="#212121" />
                    <path d="M97 92 H 103" stroke="#212121" strokeWidth="6" />
                </g>
            )}
        </g>
    </svg>
);

// FIX: Removed default `{}` for equippedItems and used optional chaining `?.` for property access.
export const FrogletNinjaIcon: React.FC<PetIconProps> = ({ equippedItems }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M40 180 C20 140 30 50 100 50 C170 50 180 140 160 180 L140 185 L60 185 Z" fill="#4CAF50" />
        <path d="M40 180 C60 190 140 190 160 180 L140 170 C120 180 80 180 60 170 Z" fill="#A5D6A7" />
        {/* Headband */}
        <path d="M45 80 H 155 V 110 H 45 Z" fill="#37474F" />
        <rect x="85" y="85" width="30" height="20" fill="#B0BEC5" stroke="#78909C" strokeWidth="2" />
        <path d="M92 98 L108 98 L103 91 L100 100 L97 91 Z" fill="#37474F" />
        {/* Eyes */}
        <ellipse cx="70" cy="130" rx="30" ry="35" fill="white" />
        <ellipse cx="130" cy="130" rx="30" ry="35" fill="white" />
        <circle cx="78" cy="135" r="18" fill="#2E2E2E" />
        <circle cx="138" cy="135" r="18" fill="#2E2E2E" />
        <circle cx="70" cy="125" r="7" fill="white" />
        <circle cx="130" cy="125" r="7" fill="white" />
        {/* Mouth */}
        <path d="M95 165 C100 170 105 165 95 165" stroke="#2E2E2E" strokeWidth="4" strokeLinecap="round" />
         {/* Accessories */}
        {equippedItems?.head === 'cap' && (
            <g transform="translate(0, -25)">
                <path d="M70 70 A 30 30 0 0 1 130 70" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
                <path d="M130 70 Q 150 70 140 80 L 80 80 Q 60 70 70 70" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
                <circle cx="100" cy="60" r="8" fill="white" stroke="#B71C1C" strokeWidth="2" />
            </g>
        )}
        {equippedItems?.eyes === 'sunglasses' && (
            <g transform="translate(0, 10)">
                <path d="M42 115 C 30 150 90 150 83 115 Z" fill="#212121" />
                <path d="M117 115 C 110 150 170 150 158 115 Z" fill="#212121" />
                <path d="M83 115 H 117" stroke="#212121" strokeWidth="6" />
            </g>
        )}
    </svg>
);

// FIX: Removed default `{}` for equippedItems and used optional chaining `?.` for property access.
export const GeninFrogIcon: React.FC<PetIconProps> = ({ equippedItems }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M50 180 C30 120 40 40 100 40 C160 40 170 120 150 180 L100 190 Z" fill="#388E3C" />
        <path d="M50 180 C70 195 130 195 150 180 L130 170 C110 180 90 180 70 170 Z" fill="#81C784" />
        {/* Scarf */}
        <path d="M40 90 L160 90 L175 120 L150 110 L140 95 L60 95 L50 110 L25 100 Z" fill="#E65100" />
        <path d="M175 120 L160 140 L150 110" fill="#FF9800" />
        {/* Eyes */}
        <ellipse cx="75" cy="110" rx="20" ry="22" fill="white" stroke="#2E2E2E" strokeWidth="2" />
        <ellipse cx="125" cy="110" rx="20" ry="22" fill="white" stroke="#2E2E2E" strokeWidth="2" />
        <circle cx="80" cy="112" r="10" fill="#2E2E2E" />
        <circle cx="130" cy="112" r="10" fill="#2E2E2E" />
        {/* Eyebrows */}
        <path d="M70 95 L85 102" stroke="#2E2E2E" strokeWidth="5" strokeLinecap="round" />
        <path d="M130 95 L115 102" stroke="#2E2E2E" strokeWidth="5" strokeLinecap="round" />
        {/* Mouth */}
        <path d="M90 140 Q100 135 110 140" stroke="#2E2E2E" strokeWidth="4" strokeLinecap="round" />
        {/* Arms */}
        <path d="M30 150 C 40 140, 50 150, 50 160" stroke="#388E3C" strokeWidth="15" strokeLinecap="round" />
        <path d="M170 150 C 160 140, 150 150, 150 160" stroke="#388E3C" strokeWidth="15" strokeLinecap="round" />
        {/* Accessories */}
        {equippedItems?.head === 'cap' && (
             <g transform="translate(0, -35)">
                <path d="M70 70 A 30 30 0 0 1 130 70" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
                <path d="M130 70 Q 150 70 140 80 L 80 80 Q 60 70 70 70" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
                <circle cx="100" cy="60" r="8" fill="white" stroke="#B71C1C" strokeWidth="2" />
            </g>
        )}
        {equippedItems?.eyes === 'sunglasses' && (
            <g transform="translate(0, 2)">
                <path d="M52 102 C 40 140 100 140 93 102 Z" fill="#212121" />
                <path d="M107 102 C 100 140 160 140 148 102 Z" fill="#212121" />
                <path d="M93 102 H 107" stroke="#212121" strokeWidth="6" />
            </g>
        )}
    </svg>
);

// FIX: Removed default `{}` for equippedItems and used optional chaining `?.` for property access.
export const JouninFrogIcon: React.FC<PetIconProps> = ({ equippedItems }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#4A235A', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#8E44AD', stopOpacity:1}} />
            </linearGradient>
        </defs>
        {/* Body */}
        <path d="M55 190 C30 130 50 30 100 30 C150 30 170 130 145 190 L100 195 Z" fill="#1B5E20" />
        <path d="M55 190 C75 205 125 205 145 190 L125 180 C110 190 90 190 75 180 Z" fill="#4CAF50" />
        {/* Jounin Vest */}
        <path d="M60 70 L140 70 L140 160 L110 155 L100 160 L90 155 L60 160 Z" fill="#2E7D32" rx="5" />
        <path d="M60 80 L140 80" stroke="#558B2F" strokeWidth="15" />
        <path d="M60 110 L140 110" stroke="#558B2F" strokeWidth="15" />
        <path d="M60 140 L140 140" stroke="#558B2F" strokeWidth="15" />
        <path d="M50 80 L150 80 L140 70 L60 70 Z" fill="#FFB74D" />
        {/* Eyes */}
        <ellipse cx="80" cy="95" rx="15" ry="18" fill="white" stroke="#2E2E2E" strokeWidth="1" />
        <ellipse cx="120" cy="95" rx="15" ry="18" fill="white" stroke="#2E2E2E" strokeWidth="1" />
        <circle cx="82" cy="97" r="8" fill="#D32F2F" />
        <circle cx="122" cy="97" r="8" fill="#D32F2F" />
        <path d="M78 97 L86 97" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M118 97 L126 97" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* Mouth */}
        <path d="M95 125 L105 125" stroke="#2E2E2E" strokeWidth="3" strokeLinecap="round" />
        {/* Scroll on back */}
        <g transform="rotate(-15 40 140)">
            <rect x="25" y="100" width="30" height="80" rx="10" fill="#F5F5DC" />
            <rect x="25" y="100" width="30" height="12" fill="#D2B48C" />
            <rect x="25" y="168" width="30" height="12" fill="#D2B48C" />
            <circle cx="40" cy="140" r="10" fill="url(#grad1)" />
            <path d="M35 140 L45 140 L40 135 L40 145 Z" stroke="white" strokeWidth="1.5" />
        </g>
        {/* Accessories */}
        {equippedItems?.head === 'cap' && (
             <g transform="translate(0, -45)">
                <path d="M70 70 A 30 30 0 0 1 130 70" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
                <path d="M130 70 Q 150 70 140 80 L 80 80 Q 60 70 70 70" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
                <circle cx="100" cy="60" r="8" fill="white" stroke="#B71C1C" strokeWidth="2" />
            </g>
        )}
        {equippedItems?.eyes === 'sunglasses' && (
            <g>
                <path d="M62 89 C 50 125 100 125 97 89 Z" fill="#212121" />
                <path d="M103 89 C 100 125 150 125 138 89 Z" fill="#212121" />
                <path d="M97 89 H 103" stroke="#212121" strokeWidth="6" />
            </g>
        )}
    </svg>
);