import React, { useState } from 'react';
import { UserRound } from 'lucide-react';

interface PersonAvatarProps {
  src?: string;
  name: string;
  className?: string;
  iconClassName?: string;
  containerClassName?: string;
}

/**
 * Avatar used for team members and testimonials.
 * Shows an icon-only placeholder (no human faces) unless a real photo is provided.
 */
export const PersonAvatar: React.FC<PersonAvatarProps> = ({
  src,
  name,
  className = 'w-12 h-12',
  iconClassName = 'w-6 h-6',
  containerClassName = '',
}) => {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className={`${className} rounded-full object-cover ${containerClassName}`}
      />
    );
  }

  return (
    <div
      className={`${className} rounded-full bg-emerald-100 border border-emerald-600/30 flex items-center justify-center shrink-0 ${containerClassName}`}
      title={name}
    >
      <UserRound className={`${iconClassName} text-emerald-700/70`} />
    </div>
  );
};
