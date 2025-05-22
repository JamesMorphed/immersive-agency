
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export type IconVariant = 'magenta' | 'cyan' | 'default';

export interface CustomIconProps extends React.HTMLAttributes<HTMLImageElement> {
  name: string;
  variant?: IconVariant;
  size?: 'sm' | 'md' | 'lg';
  showFallback?: boolean;
}

export const CustomIcon = ({
  name,
  variant = 'default',
  size = 'md',
  className,
  showFallback = true,
  ...props
}: CustomIconProps) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Determine the path based on the variant
  const iconPath = variant === 'default' 
    ? `${name}.svg`
    : `${name}-${variant}.svg`;

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const { data, error: fetchError } = await supabase
          .storage
          .from('icons')
          .getPublicUrl(iconPath);
        
        if (fetchError) {
          throw fetchError;
        }
        
        if (data?.publicUrl) {
          setIconUrl(data.publicUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching icon:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIcon();
  }, [name, variant, iconPath]);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const variantClasses = {
    default: 'filter drop-shadow-md',
    magenta: 'filter drop-shadow-[0_0_8px_rgba(255,55,187,0.5)]',
    cyan: 'filter drop-shadow-[0_0_8px_rgba(0,56,255,0.5)]'
  };

  if (loading) {
    return (
      <div className={cn(
        'animate-pulse bg-gray-700/30 rounded-md',
        sizeClasses[size],
        className
      )} />
    );
  }

  if (error && showFallback) {
    // Render a placeholder or fallback icon
    return (
      <div className={cn(
        'flex items-center justify-center bg-gray-800/50 rounded-md text-gray-400 border border-gray-700',
        sizeClasses[size],
        className
      )}>
        ?
      </div>
    );
  }

  return (
    <img
      src={iconUrl || ''}
      alt={`${name} icon`}
      className={cn(
        'object-contain transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        'hover:scale-105 hover:brightness-110',
        className
      )}
      {...props}
    />
  );
};
