'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';
import { User } from 'lucide-react';

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
        '3xl': 'h-24 w-24 text-3xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
  name?: string;
  className?: string;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  src,
  alt,
  name,
  size,
  className,
  showOnlineStatus,
  isOnline,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const showImage = src && !imageError;
  const showInitials = !showImage && name;
  const showIcon = !showImage && !name;

  return (
    <div className={cn(avatarVariants({ size, className }), 'relative')}>
      {showImage && (
        <Image
          src={src}
          alt={alt || name || 'Avatar'}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      )}
      {showInitials && (
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {getInitials(name)}
        </span>
      )}
      {showIcon && (
        <User className="h-1/2 w-1/2 text-gray-400 dark:text-gray-500" />
      )}
      {showOnlineStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900',
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          )}
        />
      )}
    </div>
  );
}
