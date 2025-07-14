export type TabOption = 'remote' | 'offline';

export type TTopButtonsProps = {
  onPress: (tab: TabOption) => void;
  remoteCount?: number;
  offlineCount?: number;
};

export type TTabConfig = {
  tab: TabOption;
  icon: string;
  count: number;
};
