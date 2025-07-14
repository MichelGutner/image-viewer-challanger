import React from 'react';
import { Button } from '@/components';
import { StyleSheet, Text, View } from 'react-native';
import { getTabConfig } from './helpers';
import { TabOption, TTopButtonsProps } from './types';

export const TopButtons = ({
  onPress,
  remoteCount,
  offlineCount,
  testID,
}: TTopButtonsProps) => {
  const handleTabChange = (tab: TabOption) => {
    onPress?.(tab);
  };

  const tabConfig = getTabConfig(remoteCount, offlineCount);

  return (
    <View style={styles.container}>
      {tabConfig.map(({ tab, icon, count }) => {
        return (
          <View key={tab} style={[styles.tab]}>
            <Button
              testID={testID}
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
    backgroundColor: 'rgba(255,255,255,0)',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#f43f5e',
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
