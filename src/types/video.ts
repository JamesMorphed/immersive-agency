
export interface BrightCoveConfig {
  accountId: string;
  playerId: string;
  videoId: string;
}

export interface VideoConfig {
  type: 'youtube' | 'brightcove' | 'iframe';
  url?: string;
  brightcove?: BrightCoveConfig;
}

export interface VideoPlayerProps {
  config: VideoConfig;
  className?: string;
}
