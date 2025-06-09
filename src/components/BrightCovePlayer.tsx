
import React, { useEffect, useRef } from 'react';
import { BrightCoveConfig } from '@/types/video';

interface BrightCovePlayerProps extends BrightCoveConfig {
  className?: string;
}

const BrightCovePlayer: React.FC<BrightCovePlayerProps> = ({
  accountId,
  playerId,
  videoId,
  className = ""
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Create unique player ID for this instance
    const uniquePlayerId = `brightcove-player-${Date.now()}`;
    
    if (playerRef.current) {
      playerRef.current.id = uniquePlayerId;
    }

    // Load BrightCove script if not already loaded
    const loadBrightCoveScript = () => {
      return new Promise<void>((resolve) => {
        if (window.bc && window.bc.VideoPlayer) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://players.brightcove.net/${accountId}/${playerId}_default/index.min.js`;
        script.onload = () => resolve();
        script.onerror = () => {
          console.error('Failed to load BrightCove player script');
          resolve();
        };
        document.head.appendChild(script);
      });
    };

    const initializePlayer = async () => {
      try {
        await loadBrightCoveScript();
        
        if (window.bc && window.bc.VideoPlayer && playerRef.current) {
          // Remove any existing player
          if (playerInstanceRef.current) {
            try {
              playerInstanceRef.current.dispose();
            } catch (e) {
              console.warn('Error disposing previous player:', e);
            }
          }

          // Create new player instance
          playerInstanceRef.current = window.bc.VideoPlayer.create({
            techOrder: ['html5'],
            playsinline: true,
            fluid: true,
            responsive: true
          });

          // Mount player to the container
          playerInstanceRef.current.ready(() => {
            if (playerRef.current) {
              playerRef.current.appendChild(playerInstanceRef.current.el());
              
              // Load the video
              playerInstanceRef.current.catalog.load(videoId);
            }
          });
        }
      } catch (error) {
        console.error('Error initializing BrightCove player:', error);
      }
    };

    initializePlayer();

    // Cleanup function
    return () => {
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.dispose();
        } catch (e) {
          console.warn('Error disposing player on cleanup:', e);
        }
        playerInstanceRef.current = null;
      }
    };
  }, [accountId, playerId, videoId]);

  return (
    <div 
      ref={playerRef}
      className={`w-full h-full bg-gray-900 ${className}`}
      style={{ minHeight: '200px' }}
    />
  );
};

// Extend window interface for BrightCove
declare global {
  interface Window {
    bc?: {
      VideoPlayer: {
        create: (options: any) => any;
      };
    };
  }
}

export default BrightCovePlayer;
