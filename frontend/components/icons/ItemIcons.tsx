import React from 'react';

export const OnigiriIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <radialGradient id="riceGradient" cx="0.4" cy="0.4" r="0.6">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E8E8E8" />
      </radialGradient>
    </defs>
    {/* Rice Ball with gradient for 3D effect */}
    <path d="M50 15 C 25 20, 20 75, 50 90 C 80 75, 75 20, 50 15 Z" fill="url(#riceGradient)" stroke="#BDBDBD" strokeWidth="1"/>
    {/* Nori Seaweed Wrap */}
    <path d="M35 70 L65 70 L70 88 L30 88 Z" fill="#1B2B34" />
    {/* Subtle texture for rice */}
    <circle cx="48" cy="35" r="2" fill="#E0E0E0" opacity="0.5"/>
    <circle cx="60" cy="45" r="2" fill="#E0E0E0" opacity="0.5"/>
    <circle cx="40" cy="55" r="2" fill="#E0E0E0" opacity="0.5"/>
    <circle cx="55" cy="65" r="2" fill="#E0E0E0" opacity="0.5"/>
    <circle cx="45" cy="70" r="2" fill="#E0E0E0" opacity="0.5"/>
    {/* Shine highlight */}
    <path d="M 55 25 A 20 20 0 0 1 65 40" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.7"/>
  </svg>
);

export const RamenIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Bowl exterior */}
    <path d="M10 45 C 10 85, 90 85, 90 45" fill="#D32F2F" stroke="#B71C1C" strokeWidth="2"/>
    {/* Bowl rim */}
    <ellipse cx="50" cy="45" rx="40" ry="8" fill="#E57373" stroke="#B71C1C" strokeWidth="2"/>
    {/* Bowl interior shadow to show it's empty */}
    <ellipse cx="50" cy="48" rx="36" ry="6" fill="#A12424" />
  </svg>
);


export const HamburgerIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M20 50 A 30 30 0 0 1 80 50" fill="#D2691E"/>
        <rect x="20" y="50" width="60" height="10" fill="#8B4513"/>
        <rect x="20" y="60" width="60" height="8" fill="#006400"/>
        <rect x="20" y="68" width="60" height="12" fill="#D2691E"/>
    </svg>
);

export const CigarIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" transform="rotate(-30)">
        <rect x="20" y="45" width="60" height="10" fill="#FFFFFF" stroke="#000000" strokeWidth="1"/>
        <rect x="80" y="45" width="10" height="10" fill="#FFA500"/>
        <path d="M85 40 Q 90 45 85 50" stroke="#808080" strokeWidth="2" fill="none"/>
        <path d="M87 35 Q 92 40 87 45" stroke="#A9A9A9" strokeWidth="2" fill="none"/>
    </svg>
);

export const CapIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 50 A 30 30 0 0 1 80 50" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
      <path d="M80 50 Q 100 50 90 60 L 40 60 Q 20 50 20 50" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
      <circle cx="50" cy="40" r="8" fill="white" stroke="#B71C1C" strokeWidth="2" />
    </svg>
);

export const SunglassesIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* A more stylish, wayfarer-like design */}
        <g transform="translate(0, 10)">
            {/* Main frame */}
            <path d="M10 40 Q 15 30, 25 30 H 45 L 50 35 L 55 30 H 75 Q 85 30, 90 40 V 60 H 10 Z" fill="#212121" stroke="#000" strokeWidth="1"/>
            {/* Lenses */}
            <rect x="15" y="38" width="30" height="18" rx="3" fill="#424242"/>
            <rect x="55" y="38" width="30" height="18" rx="3" fill="#424242"/>
            {/* Simple highlight/glare on one lens */}
            <path d="M20 42 L 30 42 L 23 53 Z" fill="white" opacity="0.15" />
            {/* The small metal circles on the corners */}
            <circle cx="16" cy="36" r="2" fill="#BDBDBD" />
            <circle cx="84" cy="36" r="2" fill="#BDBDBD" />
        </g>
    </svg>
);