import React from 'react';

export const MedalIcon: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFD700', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#FFA000', stopOpacity: 1}} />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        {/* Ribbon */}
        <path d="M35 10 L50 35 L65 10 V 0 H 35 V 10 Z" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1"/>
        <path d="M35 0 L42 12 L50 0" fill="#B71C1C" opacity="0.3"/>
        <path d="M65 0 L58 12 L50 0" fill="#B71C1C" opacity="0.3"/>
        
        {/* Medal Body */}
        <circle cx="50" cy="55" r="22" fill="url(#goldGradient)" stroke="#E65100" strokeWidth="2" filter="url(#glow)"/>
        <circle cx="50" cy="55" r="18" fill="none" stroke="#FFF8E1" strokeWidth="1" opacity="0.5"/>
        
        {/* Star */}
        <path d="M50 45 L53 53 L62 53 L55 59 L57 67 L50 62 L43 67 L45 59 L38 53 L47 53 Z" fill="#FFF8E1" stroke="#F57F17" strokeWidth="0.5" />
        
        {/* Shine */}
        <ellipse cx="42" cy="45" rx="3" ry="5" fill="white" opacity="0.6" transform="rotate(-45 42 45)" />
    </svg>
);

export const OtakuMedalIcon: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
            <linearGradient id="goldGradientOtaku" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFD700', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#FFA000', stopOpacity: 1}} />
            </linearGradient>
            <radialGradient id="spiralGradient" cx="0.5" cy="0.5" r="0.5">
                 <stop offset="0%" style={{stopColor: '#FFFFFF', stopOpacity: 1}} />
                 <stop offset="100%" style={{stopColor: '#E0E0E0', stopOpacity: 1}} />
            </radialGradient>
        </defs>
        
        {/* Ribbon - Blue/White stripes for distinct look */}
        <path d="M35 10 L50 35 L65 10 V 0 H 35 V 10 Z" fill="#1976D2" stroke="#0D47A1" strokeWidth="1"/>
        <path d="M48 0 L52 35 L52 0" fill="#FFFFFF" opacity="0.3"/>
        
        {/* Medal Body */}
        <circle cx="50" cy="55" r="24" fill="url(#goldGradientOtaku)" stroke="#E65100" strokeWidth="2"/>
        
        {/* Anime Glasses Symbol (Swirls) */}
        <g transform="translate(0, 5)">
            {/* Left Lens */}
            <circle cx="40" cy="50" r="9" fill="url(#spiralGradient)" stroke="#212121" strokeWidth="1.5"/>
            <path d="M40 50 m-6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0" fill="none" stroke="#212121" strokeWidth="0.5" opacity="0.5"/>
            <path d="M40 50 m-3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0" fill="none" stroke="#212121" strokeWidth="0.5" opacity="0.5"/>
            
            {/* Right Lens */}
            <circle cx="60" cy="50" r="9" fill="url(#spiralGradient)" stroke="#212121" strokeWidth="1.5"/>
            <path d="M60 50 m-6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0" fill="none" stroke="#212121" strokeWidth="0.5" opacity="0.5"/>
            <path d="M60 50 m-3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0" fill="none" stroke="#212121" strokeWidth="0.5" opacity="0.5"/>

            {/* Bridge */}
            <path d="M49 50 H 51" stroke="#212121" strokeWidth="1.5"/>
        </g>
        
        {/* Sparkles */}
        <path d="M50 35 L52 40 L57 40 L53 44 L55 49 L50 46 L45 49 L47 44 L43 40 L48 40 Z" fill="#FFF" stroke="#FFD700" strokeWidth="0.5" />
    </svg>
);