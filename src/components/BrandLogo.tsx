import React from 'react';

// Brand logo served from the live CMS (Cloudinary, same as the old website).
export const BRAND_LOGO_URL =
  'https://res.cloudinary.com/dpls4kcqa/image/upload/v1738835942/logo-removebg-preview_uyvdpa.png';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
  badge?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'light',
  className = '',
  showTagline = true,
  badge = false,
}) => {
  // Dimensions mapping
  const sizeMap = {
    sm: { width: 44, height: 44, textClass: 'text-sm' },
    md: { width: 56, height: 56, textClass: 'text-base' },
    lg: { width: 78, height: 78, textClass: 'text-lg' },
    xl: { width: 110, height: 110, textClass: 'text-xl' }
  };

  const { width, height } = sizeMap[size];
  const isDarkText = variant === 'dark' && !badge;

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Crisp vector logo icon with high-contrast background when on dark themes */}
      <div 
        className={`relative shrink-0 flex items-center justify-center transition-transform hover:scale-105 ${
          variant === 'dark' || badge
            ? 'bg-white p-1.5 rounded-xl shadow-xs'
            : ''
        }`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <img
          src={BRAND_LOGO_URL}
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== window.location.origin + '/logo.svg') {
              img.src = '/logo.svg';
            }
          }}
          alt="Moo & More Dairy Farm Logo - It's all about quality"
          className="w-full h-full object-contain filter drop-shadow-xs"
          loading="eager"
        />
      </div>

      {/* Typography side mark for high brand legibility */}
      <div className="flex flex-col leading-tight">
        <span 
          className={`font-serif-heading font-black tracking-wide uppercase transition-colors ${
            isDarkText ? 'text-white' : 'text-[#0F3020]'
          } ${
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-lg'
          }`}
        >
          Moo &amp; More
        </span>
        <span 
          className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${
            isDarkText ? 'text-emerald-300' : 'text-[#15803D]'
          }`}
        >
          Dairy Farm
        </span>
        {showTagline && (
          <span 
            className={`font-script text-xs sm:text-sm leading-none italic font-semibold ${
              isDarkText ? 'text-amber-200' : 'text-[#16A34A]'
            }`}
          >
            It's all about quality
          </span>
        )}
      </div>
    </div>
  );

  if (badge) {
    return (
      <div className="inline-flex items-center p-2.5 px-3.5 sm:px-4 bg-white rounded-2xl shadow-lg border border-white/20 transition-transform hover:scale-[1.01]">
        {content}
      </div>
    );
  }

  return content;
};
