import type { ReactElement, ReactNode } from 'react';
import type {
  ViewStyle,
  TextStyle,
  StyleProp,
  ColorValue,
  Animated,
} from 'react-native';

export type Position = 'left' | 'center' | 'right';
export type VerticalOrientation = 'up' | 'down';

export interface ActionButtonProps {
  resetToken?: unknown;
  active?: boolean;
  position?: Position;
  elevation?: number;
  zIndex?: number;
  hideShadow?: boolean;
  shadowStyle?: StyleProp<ViewStyle>;
  renderIcon?: (active: boolean) => ReactElement;
  bgColor?: ColorValue;
  bgOpacity?: number;
  buttonColor?: ColorValue;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonText?: string;
  offsetX?: number;
  offsetY?: number;
  spacing?: number;
  size?: number;
  autoInactive?: boolean;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
  onReset?: () => void;
  backdrop?: boolean | ReactElement;
  degrees?: number;
  verticalOrientation?: VerticalOrientation;
  backgroundTappable?: boolean;
  activeOpacity?: number;
  outRangeScale?: number;
  btnOutRange?: ColorValue;
  btnOutRangeTxt?: ColorValue;
  nativeFeedbackRippleColor?: ColorValue;
  testID?: string;
  accessibilityLabel?: string;
  accessible?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export interface ActionButtonItemProps {
  active?: boolean;
  size?: number;
  title?: string | ReactElement;
  onPress: () => void;
  buttonColor?: ColorValue;
  textContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  spaceBetween?: number;
  numberOfLines?: number;
  activeOpacity?: number;
  hideShadow?: boolean;
  hideLabelShadow?: boolean;
  shadowStyle?: StyleProp<ViewStyle>;
  nativeFeedbackRippleColor?: ColorValue;
  testID?: string;
  accessibilityLabel?: string;
  children?: ReactNode;
  // Internal props passed via parent spread
  anim?: Animated.Value;
  parentSize?: number;
  position?: Position;
  verticalOrientation?: VerticalOrientation;
  offsetX?: number;
  btnColor?: ColorValue;
  spacing?: number;
}
