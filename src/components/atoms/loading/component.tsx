import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { LoadingSkeletonProps } from './types';

export const LoadingSkeleton = ({
  type = 'gallery',
  rows = 4,
  columns = 4,
  testID,
}: LoadingSkeletonProps) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const size = width / columns - 8;

  if (type === 'gallery') {
    return (
      <View style={styles.container} testID={testID}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Animated.View
                key={colIndex}
                style={[
                  styles.skeletonItem,
                  {
                    width: size,
                    height: size,
                    backgroundColor: colors.card,
                  },
                  animatedStyle,
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    );
  }

  if (type === 'image') {
    return (
      <Animated.View
        testID={testID}
        style={[
          styles.skeletonImage,
          {
            backgroundColor: colors.card,
          },
          animatedStyle,
        ]}
      />
    );
  }

  if (type === 'text') {
    return (
      <View style={styles.textContainer} testID={testID}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.skeletonText,
              {
                backgroundColor: colors.card,
                width: `${80 - index * 20}%`,
              },
              animatedStyle,
            ]}
          />
        ))}
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  skeletonItem: {
    borderRadius: 6,
    marginHorizontal: 1,
  },
  skeletonImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  textContainer: {
    gap: 8,
  },
  skeletonText: {
    height: 16,
    borderRadius: 4,
  },
});
