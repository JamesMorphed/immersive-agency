
import React from 'react';
import { VideoPlayerProps } from '@/types/video';
import BrightCovePlayer from './BrightCovePlayer';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ config, className = "" }) => {
  if (config.type === 'brightcove' && config.brightcove) {
    return (
      <BrightCovePlayer
        accountId={config.brightcove.accountId}
        playerId={config.brightcove.playerId}
        videoId={config.brightcove.videoId}
        className={className}
      />
    );
  }

  if (config.type === 'youtube' || config.type === 'iframe') {
    return (
      <iframe
        src={config.url}
        className={`w-full h-full ${className}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video Player"
      />
    );
  }

  return (
    <div className={`w-full h-full bg-gray-900 flex items-center justify-center ${className}`}>
      <p className="text-white">Unsupported video type</p>
    </div>
  );
};

export default VideoPlayer;
