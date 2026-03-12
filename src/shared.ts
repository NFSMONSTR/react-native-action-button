import { Platform } from 'react-native';
import type { ViewStyle } from 'react-native';

export const DEFAULT_ACTIVE_OPACITY = 0.85;

export const SHADOW_ELEVATION = 3;

// boxShadow is supported on Android API 28+ (Android 9+)
export const BOX_SHADOW_SUPPORTED =
  Platform.OS !== 'android' || (Platform.Version as number) >= 28;

export const shadowStyle: ViewStyle = BOX_SHADOW_SUPPORTED
  ? { boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)' }
  : { elevation: SHADOW_ELEVATION };

export const alignItemsMap = {
  center: 'center' as const,
  left: 'flex-start' as const,
  right: 'flex-end' as const,
};

export const isAndroid = Platform.OS === 'android';
