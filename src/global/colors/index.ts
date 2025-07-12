import {
  DefaultTheme,
  DarkTheme as NavDarkTheme,
  Theme,
} from '@react-navigation/native';

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#11181C',
    background: '#ebf2f4',
  },
};

export const DarkTheme: Theme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    text: '#ECEDEE',
    background: '#151718',
  },
};
