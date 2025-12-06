import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    textSecondary: '#666666',
    textTertiary: '#999999',
    background: '#FFFFFF',
    backgroundSecondary: '#FAFAFA',
    primary: '#69C94F',
    primaryDark: '#0A5C27',
    buttonPrimary: '#69C94F',
    buttonSecondary: '#000000',
    border: '#E0E0E0',
    icon: '#69C94F',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    textTertiary: '#666666',
    background: '#000000',
    backgroundSecondary: '#1A1A1A',
    primary: '#69C94F',
    primaryDark: '#0A5C27',
    buttonPrimary: '#69C94F',
    buttonSecondary: '#FFFFFF',
    border: '#333333',
    icon: '#69C94F',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
