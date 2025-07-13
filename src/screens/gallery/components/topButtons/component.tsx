import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button } from '@/components';

type TabOption = 'remote' | 'offline';

export type TTopButtonsProps = {
  onPress: (tab: TabOption) => void;
  remoteCount?: number;
  offlineCount?: number;
};

export const TopButtons: React.FC<TTopButtonsProps> = ({
  onPress,
  remoteCount = 0,
  offlineCount = 0,
}) => {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<TabOption>('remote');

  const handleTabChange = useCallback(
    (tab: TabOption) => {
      setSelectedTab(tab);
      onPress?.(tab);
    },
    [onPress],
  );

  const tabConfig: {
    tab: TabOption;
    icon: string;
    count: number;
  }[] = [
    { tab: 'remote', icon: 'layers', count: remoteCount },
    { tab: 'offline', icon: 'download-cloud', count: offlineCount },
  ];

  return (
    <View style={styles.container}>
      {tabConfig.map(({ tab, icon, count }) => {
        const isActive = selectedTab === tab;
        const backgroundColor = isActive
          ? 'rgba(255,255,255,0.06)'
          : 'transparent';

        return (
          <View key={tab} style={[styles.tab, { backgroundColor }]}>
            <Button
              containerStyle={{ flex: 1 }}
              style={styles.button}
              iconName={icon as any}
              onPress={() => handleTabChange(tab)}
            />
            {count > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {count > 999 ? '999+' : count}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    flexDirection: 'row',
    gap: 8,
    borderRadius: 12,
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  tab: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    backgroundColor: 'transparent',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#f43f5e', // rosa-escuro (pode trocar pelo tema)
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
