import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  Dimensions,
} from 'react-native';
import type { ViewStyle } from 'react-native';
import {
  shadowStyle,
  alignItemsMap,
  DEFAULT_ACTIVE_OPACITY,
  isAndroid,
  BOX_SHADOW_SUPPORTED,
  SHADOW_ELEVATION,
} from './shared';

// On old Android (API < 28), boxShadow is not supported — elevation is used instead.
// elevation is not affected by opacity, so we animate it manually.
const usesElevation = isAndroid && !BOX_SHADOW_SUPPORTED;
import type { ActionButtonItemProps } from './types';

const { width: WIDTH } = Dimensions.get('window');
const SHADOW_SPACE = 10;
const TEXT_HEIGHT = 22;

export default function ActionButtonItem({
  active = true,
  size = 40,
  position = 'right',
  verticalOrientation = 'up',
  hideShadow = false,
  hideLabelShadow,
  spacing = 20,
  offsetX = 30,
  parentSize = 56,
  spaceBetween = 15,
  numberOfLines = 1,
  activeOpacity = DEFAULT_ACTIVE_OPACITY,
  nativeFeedbackRippleColor = 'rgba(255,255,255,0.75)',
  anim: animProp,
  buttonColor,
  btnColor,
  shadowStyle: shadowStyleProp,
  title,
  textContainerStyle,
  textStyle,
  testID,
  accessibilityLabel,
  onPress,
  children,
}: ActionButtonItemProps) {
  const defaultAnim = useRef(new Animated.Value(1));
  const anim = animProp ?? defaultAnim.current;
  // Start at 0: item mounts at the beginning of open animation (anim ≈ 0)
  const elevationAnim = useRef(new Animated.Value(0)).current;
  const elevationVisible = useRef(false);

  // Resolve elevation for old Android: prefer value from shadowStyleProp, fallback to default
  const flatShadow = shadowStyleProp
    ? StyleSheet.flatten(shadowStyleProp as ViewStyle)
    : null;
  const effectiveElevation =
    (flatShadow?.elevation as number | undefined) ?? SHADOW_ELEVATION;

  useEffect(() => {
    if (!usesElevation) return;
    elevationVisible.current = false;
    elevationAnim.setValue(0);
    const id = anim.addListener(({ value }) => {
      if (value >= 0.8) {
        elevationVisible.current = true;
        elevationAnim.setValue(effectiveElevation);
      } else {
        elevationVisible.current = false;
        elevationAnim.setValue(0);
      }
    });
    return () => anim.removeListener(id);
  }, [anim, elevationAnim, effectiveElevation]);

  if (!active) return null;

  const animatedViewStyle = {
    marginBottom: -SHADOW_SPACE,
    alignItems: alignItemsMap[position],
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [verticalOrientation === 'down' ? -40 : 40, 0],
        }),
      },
    ],
  };

  const buttonStyle: Record<string, unknown> = {
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: buttonColor ?? btnColor,
  };

  const wrapperMargin =
    position !== 'center'
      ? {
          [`margin${position === 'right' ? 'Right' : 'Left'}`]:
            (parentSize - size) / 2,
        }
      : {};

  const parentStyleObj = {
    paddingHorizontal: offsetX,
    height: size + SHADOW_SPACE + spacing,
  };

  const renderTitle = () => {
    if (!title) return null;

    const offsetTop = Math.max(size / 2 - TEXT_HEIGHT / 2, 0);
    const positionStyles: Record<string, unknown> = { top: offsetTop };
    const effectiveHideShadow =
      hideLabelShadow !== undefined ? hideLabelShadow : hideShadow;

    if (position !== 'center') {
      positionStyles[position] =
        offsetX + (parentSize - size) / 2 + size + spaceBetween;
    } else {
      positionStyles.right = WIDTH / 2 + size / 2 + spaceBetween;
    }

    const titleNode = React.isValidElement(title) ? (
      title
    ) : (
      <Text
        allowFontScaling={false}
        style={[styles.text, textStyle]}
        numberOfLines={numberOfLines}
      >
        {title}
      </Text>
    );

    return (
      <Animated.View
        style={[
          styles.textContainer,
          positionStyles,
          !effectiveHideShadow && {
            ...shadowStyle,
            ...(usesElevation ? { elevation: elevationAnim } : {}),
          },
          textContainerStyle,
        ]}
      >
        <Pressable
          style={{ flex: 1 }}
          android_ripple={{
            color: nativeFeedbackRippleColor as string,
            borderless: false,
            foreground: true,
          }}
          onPress={onPress}
        >
          {titleNode}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[animatedViewStyle, parentStyleObj]}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          ...wrapperMargin,
        }}
      >
        <Pressable
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          android_ripple={{
            color: nativeFeedbackRippleColor as string,
            borderless: true,
            radius: size / 2,
            foreground: true,
          }}
          style={({ pressed }) => ({ opacity: pressed ? activeOpacity : 1 })}
          onPress={onPress}
        >
          <Animated.View
            style={[
              buttonStyle as object,
              !hideShadow && {
                ...shadowStyle,
                ...(shadowStyleProp as object),
                ...(usesElevation ? { elevation: elevationAnim } : {}),
              },
            ]}
          >
            {children}
          </Animated.View>
        </Pressable>
      </View>
      {renderTitle()}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    paddingVertical: isAndroid ? 2 : 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    backgroundColor: 'white',
    height: TEXT_HEIGHT,
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: '#444',
  },
});
