import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'light',
  className = '',
  showTagline = true,
}) => {
  // Dimensions mapping
  const sizeMap = {
    sm: { width: 44, height: 44, textClass: 'text-sm' },
    md: { width: 56, height: 56, textClass: 'text-base' },
    lg: { width: 78, height: 78, textClass: 'text-lg' },
    xl: { width: 110, height: 110, textClass: 'text-xl' }
  };

  const { width, height } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Crisp vector logo icon */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform hover:scale-105"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <img
          src="/logo.svg"
          alt="Moo & More Dairy Farm Logo - It's all about quality"
          className="w-full h-full object-contain filter drop-shadow-sm"
          loading="eager"
        />
      </div>

      {/* Typography side mark for high brand legibility */}
      <div className="flex flex-col leading-tight">
        <span 
          className={`font-serif-heading font-black tracking-wide uppercase transition-colors ${
            variant === 'dark' ? 'text-white' : 'text-[#0F3020]'
          } ${
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-lg'
          }`}
        >
          Moo &amp; More
        </span>
        <span 
          className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${
            variant === 'dark' ? 'text-emerald-300' : 'text-[#15803D]'
          }`}
        >
          Dairy Farm
        </span>
        {showTagline && (
          <span 
            className={`font-script text-xs sm:text-sm leading-none italic font-semibold ${
              variant === 'dark' ? 'text-amber-200' : 'text-[#16A34A]'
            }`}
          >
            It's all about quality
          </span>
        )}
      </div>
    </div>
  );
};
