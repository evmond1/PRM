import React from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };
  
  return (
    <div className={`relative rounded-full overflow-hidden bg-gray-200 ${sizeStyles[size]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(e) => {
          // If image fails to load, show initials
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            const initials = alt
              .split(' ')
              .map(word => word[0])
              .join('')
              .toUpperCase()
              .substring(0, 2);
            
            const initialsElement = document.createElement('div');
            initialsElement.className = 'absolute inset-0 flex items-center justify-center text-gray-600 font-medium';
            initialsElement.textContent = initials;
            parent.appendChild(initialsElement);
          }
        }}
      />
    </div>
  );
};

export default Avatar;
