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
    card: '#FFFFFF',
    primary: 'rgba(223,223,230, 0.8)',
    notification: 'rgb(0,114,249)',
  },
};

export const DarkTheme: Theme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    text: '#ECEDEE',
    background: '#151718',
    card: '#1F2933',
    primary: 'rgba(223,223,230, 0.0000001)',
    notification: 'rgb(0,114,249)',
  },
};
