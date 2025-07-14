import { TabOption, TTabConfig } from './types';

export const getTabConfig = (
  remoteCount: number = 0,
  offlineCount: number = 0,
): TTabConfig[] => [
  { tab: 'remote', icon: 'layers', count: remoteCount },
  { tab: 'offline', icon: 'download-cloud', count: offlineCount },
];
