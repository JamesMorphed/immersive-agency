
import { VideoConfig, BrightCoveConfig } from '@/types/video';

export const parseVideoConfig = (input: string | VideoConfig): VideoConfig => {
  // If it's already a VideoConfig object, return it
  if (typeof input === 'object' && input.type) {
    return input;
  }

  // If it's a string URL, determine the type
  const url = input as string;
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return {
      type: 'youtube',
      url: url
    };
  }

  // Default to iframe for other URLs
  return {
    type: 'iframe',
    url: url
  };
};

export const createBrightCoveConfig = (
  accountId: string,
  playerId: string,
  videoId: string
): VideoConfig => {
  return {
    type: 'brightcove',
    brightcove: {
      accountId,
      playerId,
      videoId
    }
  };
};
