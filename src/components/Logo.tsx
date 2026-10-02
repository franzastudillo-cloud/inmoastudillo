import React from 'react';

interface LogoProps {
  variant?: 'full' | 'stacked' | 'icon' | 'white';
  className?: string;
  onClick?: () => void;
}

/**
 * Authentic InmoAstudillo Emblem Mark:
 * Green letter "A" with faceted green legs, central house with 4-pane window,
 * organic wave ribbon and fresh leaf rising at top right.
 */
export const InmoAstudilloEmblem: React.FC<{ className?: string; isWhite?: boolean }> = ({ 
  className = 'w-11 h-11', 
  isWhite = false 
}) => {
  return (
    <svg 
      viewBox="0 0 300 280" 
      className={`shrink-0 ${className}`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Isotipo InmoAstudillo"
    >
      <defs>
        <linearGradient id="embLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isWhite ? '#a3e635' : '#438650'} />
          <stop offset="100%" stopColor={isWhite ? '#65a30d' : '#2c6838'} />
        </linearGradient>
        <linearGradient id="embRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isWhite ? '#84cc16' : '#235c33'} />
          <stop offset="100%" stopColor={isWhite ? '#4d7c0f' : '#144021'} />
        </linearGradient>
        <linearGradient id="embLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isWhite ? '#bef264' : '#529443'} />
          <stop offset="100%" stopColor={isWhite ? '#ecfccb' : '#73b255'} />
        </linearGradient>
      </defs>
      
      {/* Right leg of A (Darker emerald green) */}
      <path 
        d="M 150 15 L 235 210 L 195 210 L 172 155 L 150 105 Z" 
        fill="url(#embRightGrad)" 
      />
      
      {/* Left leg of A (Lighter faceted forest green) */}
      <path 
        d="M 150 15 L 65 210 L 105 210 L 128 155 L 150 105 Z" 
        fill="url(#embLeftGrad)" 
      />
      
      {/* Bottom Feet bases */}
      <polygon points="235,210 180,210 190,188 235,210" fill={isWhite ? '#4d7c0f' : '#144021'} />
      <polygon points="65,210 120,210 110,188 65,210" fill={isWhite ? '#65a30d' : '#2c6838'} />

      {/* Central House Roof in apex */}
      <path d="M 150 92 L 170 120 L 130 120 Z" fill={isWhite ? '#4d7c0f' : '#144021'} />
      <path d="M 150 92 L 130 120 L 137 120 L 150 102 L 163 120 L 170 120 Z" fill={isWhite ? '#65a30d' : '#2c6838'} />

      {/* 4-Pane Window */}
      <rect x="139" y="126" width="9" height="9" rx="1.5" fill={isWhite ? '#ffffff' : '#144021'} />
      <rect x="152" y="126" width="9" height="9" rx="1.5" fill={isWhite ? '#ffffff' : '#144021'} />
      <rect x="139" y="139" width="9" height="9" rx="1.5" fill={isWhite ? '#ffffff' : '#144021'} />
      <rect x="152" y="139" width="9" height="9" rx="1.5" fill={isWhite ? '#ffffff' : '#144021'} />

      {/* Organic swoosh wave crossing A */}
      <path 
        d="M 75 210 C 105 185 132 170 160 168 C 190 166 212 152 230 118 C 218 136 195 150 162 152 C 135 154 105 170 75 210 Z" 
        fill={isWhite ? '#365314' : '#144021'} 
      />
      <path 
        d="M 95 204 C 122 180 148 168 174 165 C 202 162 218 138 230 114 C 222 132 200 148 170 149 C 144 151 118 166 95 204 Z" 
        fill={isWhite ? '#4d7c0f' : '#2c6838'} 
        opacity="0.9" 
      />

      {/* Fresh Green Leaf at top right */}
      <path 
        d="M 220 126 C 218 98 228 64 250 48 C 252 70 244 100 220 126 Z" 
        fill="url(#embLeafGrad)" 
      />
      {/* Central vein */}
      <path 
        d="M 221 124 Q 235 94 250 49" 
        stroke="#ffffff" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.85" 
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', onClick }) => {
  // If only the icon/isotipo is requested
  if (variant === 'icon') {
    return (
      <div 
        onClick={onClick} 
        className={`inline-flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${className}`}
        title="InmoAstudillo"
      >
        <InmoAstudilloEmblem className="w-10 h-10" />
      </div>
    );
  }

  // Stacked official vertical version (matching the exact user image graphic 1:1)
  if (variant === 'stacked') {
    return (
      <div 
        onClick={onClick} 
        className={`inline-flex flex-col items-center text-center cursor-pointer group ${className}`}
      >
        <InmoAstudilloEmblem className="w-20 h-20 group-hover:scale-105 transition-transform" />
        <div className="flex flex-col items-center mt-1">
          <span className="text-2xl font-black tracking-wider text-[#1b4d2e] leading-none">
            INMO
          </span>
          <span className="text-2xl font-black tracking-wider text-[#0f172a] leading-none mt-1">
            ASTUDILLO
          </span>
          <span className="text-[10px] font-bold text-[#0f172a] uppercase tracking-wider mt-1.5 leading-tight">
            “DONDE LOS SUEÑOS SE HACEN REALIDAD”
          </span>
        </div>
      </div>
    );
  }

  // Full Horizontal version: Ideal for Header Navbar and Footer
  const isWhite = variant === 'white';

  return (
    <div 
      onClick={onClick} 
      className={`inline-flex items-center gap-3.5 cursor-pointer group select-none ${className}`}
      title="InmoAstudillo - Donde los sueños se hacen realidad"
    >
      {/* Official Emblem Mark */}
      <InmoAstudilloEmblem 
        className="w-11 h-11 transition-transform duration-300 group-hover:scale-105 drop-shadow-xs" 
        isWhite={isWhite}
      />

      {/* Brand Typography & Slogan */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`text-xl font-black tracking-tight ${isWhite ? 'text-white' : 'text-[#1b4d2e]'}`}>
            INMO
          </span>
          <span className={`text-xl font-black tracking-tight ${isWhite ? 'text-white' : 'text-[#0f172a]'}`}>
            ASTUDILLO
          </span>
        </div>
        <span className={`text-[9px] font-bold tracking-wider uppercase mt-1 leading-tight ${
          isWhite ? 'text-emerald-200' : 'text-slate-800'
        }`}>
          “Donde los sueños se hacen realidad”
        </span>
      </div>
    </div>
  );
};
