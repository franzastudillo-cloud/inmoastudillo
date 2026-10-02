import React, { useState } from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'white';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', onClick }) => {
  const [imgError, setImgError] = useState(false);

  // Authentic Google CDN hosted logo from user's Stitch session
  const logoUrl = 'https://lh3.googleusercontent.com/aida/AEtjO1UwkKjeU-9uQotw280yHY0mQz4_TtTfYPqeN2F5RIicLFZ2wTs2e2SZmStVwxP6URqCDt0YFjhJJKL_swliRvaOoVQaYT9RnsK7XLliCX3aSRriHh4dGSHlsNOKPjA2eh2I9AYBGwiU97LxdXNkajcCzXoOzAaMgSh4l3-IvE5UWCl51U6Uyhrn5yp5a8-QhTtjhbiBR2oEoNB25a3l3YygUmRUyR8U2qc6eKFh91vUu5I2Lx9gc9E7n_qaEDXuamPUF1sc3_Mn6Q';
  const isotipoUrl = 'https://lh3.googleusercontent.com/aida/AEtjO1XrSkUV8G9rji2EcZ4Jwu8usaFueb78sP1FqDV6vJzjm9DCjqWttDW3sWZVgxgpfB5umGjFa2BM9MxhCLHatky85pZEJyEQ9FZr0YLTd5BSN83RxJ9br-4KY8I_TH7IpG_0wBcyEe8BNUzXqHaao5ido1mawgRAheU9C4yTxc7kgYggMYjYz3XM3yhAWSpyOusrC56ZEpFciaUc976oNoB4UTaU21U-jxhz2rmXAyaFYcTVkFdYR2ehh4rz';

  if (variant === 'icon') {
    return (
      <div 
        onClick={onClick} 
        className={`inline-flex items-center justify-center cursor-pointer ${className}`}
      >
        {!imgError ? (
          <img 
            src={isotipoUrl} 
            alt="Inmo Astudillo Isotipo" 
            className="w-10 h-10 object-contain rounded-lg"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-[#004215] flex items-center justify-center text-white font-bold text-lg shadow-sm border border-[#70b83c]/30">
            <span className="text-[#aef3b0]">A</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={onClick} 
      className={`inline-flex items-center gap-3 cursor-pointer group ${className}`}
    >
      {!imgError ? (
        <img 
          src={logoUrl} 
          alt="Inmo Astudillo" 
          className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex items-center gap-3">
          {/* Architectural SVG Emblem */}
          <div className="w-10 h-10 rounded-xl bg-[#004215] flex items-center justify-center p-1.5 shadow-sm">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              {/* House roof */}
              <polygon points="50,15 90,55 80,55 50,25 20,55 10,55" fill="#aef3b0" />
              {/* Chimney */}
              <rect x="70" y="24" width="8" height="18" fill="#aef3b0" />
              {/* Window 4 panes */}
              <rect x="42" y="45" width="6" height="6" fill="#ffffff" />
              <rect x="52" y="45" width="6" height="6" fill="#ffffff" />
              <rect x="42" y="55" width="6" height="6" fill="#ffffff" />
              <rect x="52" y="55" width="6" height="6" fill="#ffffff" />
              {/* Leaf curve */}
              <path d="M 25 55 Q 40 25 60 20 Q 55 45 35 55 Z" fill="#70b83c" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold tracking-tight text-lg leading-tight ${variant === 'white' ? 'text-white' : 'text-[#004215]'}`}>
              INMO ASTUDILLO
            </span>
            <span className={`text-[9px] font-semibold tracking-wider uppercase ${variant === 'white' ? 'text-[#8ed191]' : 'text-[#326b00]'}`}>
              Donde los sueños se hacen realidad
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
