import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import ActionButtonItem from './ActionButtonItem';
import { shadowStyle, alignItemsMap, DEFAULT_ACTIVE_OPACITY } from './shared';
import type { ActionButtonProps } from './types';

const ActionButton = ({
  resetToken = null,
  active: activeProp = false,
  bgColor = 'transparent',
  bgOpacity = 1,
  buttonColor = 'rgba(0,0,0,1)',
  buttonTextStyle = {},
  buttonText = '+',
  spacing = 20,
  outRangeScale = 1,
  autoInactive = true,
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  backdrop = false,
  degrees = 45,
  position = 'right',
  offsetX = 30,
  offsetY = 30,
  size = 56,
  verticalOrientation = 'up',
  backgroundTappable = false,
  activeOpacity = DEFAULT_ACTIVE_OPACITY,
  nativeFeedbackRippleColor = 'rgba(255,255,255,0.75)',
  elevation,
  zIndex,
  hideShadow,
  shadowStyle: shadowStyleProp,
  renderIcon,
  btnOutRange,
  btnOutRangeTxt,
  onLongPress,
  onReset,
  testID,
  accessibilityLabel,
  accessible,
  style,
  children,
}: ActionButtonProps) => {
  const [, setResetToken] = useState(resetToken);
  const [active, setActive] = useState(activeProp);

  // Two Animated.Values: one for transform/opacity (useNativeDriver: true),
  // one for backgroundColor (useNativeDriver: false)
  const animTransform = useRef(new Animated.Value(activeProp ? 1 : 0));
  const animColor = useRef(new Animated.Value(activeProp ? 1 : 0));

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  useEffect(() => {
    if (activeProp) {
      Animated.parallel([
        Animated.spring(animTransform.current, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(animColor.current, {
          toValue: 1,
          useNativeDriver: false,
        }),
      ]).start();
      setActive(true);
      setResetToken(resetToken);
    } else {
      onReset?.();
      Animated.parallel([
        Animated.spring(animTransform.current, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(animColor.current, {
          toValue: 0,
          useNativeDriver: false,
        }),
      ]).start();
      timeout.current = setTimeout(() => {
        setActive(false);
        setResetToken(resetToken);
      }, 250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetToken, activeProp]);

  const getOrientation = () => ({ alignItems: alignItemsMap[position] });

  const getOffsetXY = () => ({ paddingVertical: offsetY });

  const getOverlayStyles = () => [
    styles.overlay,
    {
      elevation,
      zIndex,
      justifyContent:
        verticalOrientation === 'up'
          ? ('flex-end' as const)
          : ('flex-start' as const),
    },
  ];

  const animateButton = (animate = true) => {
    if (active) return reset(animate);

    if (animate) {
      Animated.parallel([
        Animated.spring(animTransform.current, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(animColor.current, {
          toValue: 1,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      animTransform.current.setValue(1);
      animColor.current.setValue(1);
    }

    setActive(true);
  };

  const reset = (animate = true) => {
    onReset?.();

    if (animate) {
      Animated.parallel([
        Animated.spring(animTransform.current, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(animColor.current, {
          toValue: 0,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      animTransform.current.setValue(0);
      animColor.current.setValue(0);
    }

    timeout.current = setTimeout(() => {
      if (mounted.current) setActive(false);
    }, 250);
  };

  const renderButtonIcon = () => {
    if (renderIcon) return renderIcon(active);

    const baseStyle = StyleSheet.flatten(buttonTextStyle) as {
      color?: string;
    };
    const textColor = baseStyle?.color ?? 'rgba(255,255,255,1)';

    return (
      <Animated.Text
        style={[
          styles.btnText,
          buttonTextStyle,
          {
            color: animColor.current.interpolate({
              inputRange: [0, 1],
              outputRange: [textColor, (btnOutRangeTxt as string) ?? textColor],
            }),
          },
        ]}
      >
        {buttonText}
      </Animated.Text>
    );
  };

  const renderMainButton = () => {
    const animatedViewStyle = {
      transform: [
        {
          scale: animTransform.current.interpolate({
            inputRange: [0, 1],
            outputRange: [1, outRangeScale],
          }),
        },
        {
          rotate: animTransform.current.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', `${degrees}deg`],
          }),
        },
      ],
    };

    const wrapperStyle = {
      backgroundColor: animColor.current.interpolate({
        inputRange: [0, 1],
        outputRange: [
          buttonColor as string,
          (btnOutRange as string) ?? (buttonColor as string),
        ],
      }),
      width: size,
      height: size,
      borderRadius: size / 2,
    };

    const buttonStyle = {
      width: size,
      height: size,
      borderRadius: size / 2,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    };

    const parentStyle = {
      marginHorizontal: offsetX,
      zIndex,
      borderRadius: size / 2,
    };

    return (
      <View
        style={[
          parentStyle,
          !hideShadow && shadowStyle,
          !hideShadow && shadowStyleProp,
        ]}
      >
        <Pressable
          testID={testID}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          android_ripple={{
            color: nativeFeedbackRippleColor as string,
            borderless: true,
            radius: size / 2,
            foreground: true,
          }}
          style={({ pressed }) => ({ opacity: pressed ? activeOpacity : 1 })}
          onLongPress={onLongPress}
          onPress={() => {
            onPress();
            if (children) animateButton();
          }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Animated.View style={wrapperStyle}>
            <Animated.View style={[buttonStyle, animatedViewStyle]}>
              {renderButtonIcon()}
            </Animated.View>
          </Animated.View>
        </Pressable>
      </View>
    );
  };

  const renderActions = () => {
    if (!active) return null;

    let actionButtons = !Array.isArray(children) ? [children] : children;
    actionButtons = actionButtons.filter((child) =>
      React.isValidElement(child)
    );

    const actionStyle = {
      flex: 1,
      alignSelf: 'stretch' as const,
      justifyContent:
        verticalOrientation === 'up'
          ? ('flex-end' as const)
          : ('flex-start' as const),
      paddingTop: verticalOrientation === 'down' ? spacing : 0,
      zIndex,
    };

    return (
      <View style={actionStyle} pointerEvents="box-none">
        {actionButtons.map((actionButton, idx) => {
          if (!React.isValidElement(actionButton)) return null;
          const itemProps = actionButton.props as Partial<
            Parameters<typeof ActionButtonItem>[0]
          >;
          const originalOnPress = itemProps.onPress;
          return (
            <ActionButtonItem
              key={idx}
              size={size}
              buttonColor={buttonColor}
              position={position}
              verticalOrientation={verticalOrientation}
              spacing={spacing}
              offsetX={offsetX}
              parentSize={size}
              btnColor={btnOutRange}
              hideShadow={hideShadow}
              activeOpacity={activeOpacity}
              nativeFeedbackRippleColor={nativeFeedbackRippleColor}
              {...itemProps}
              anim={animTransform.current}
              onPress={() => {
                if (autoInactive) {
                  timeout.current = setTimeout(reset, 200);
                }
                originalOnPress?.();
              }}
            />
          );
        })}
      </View>
    );
  };

  const renderTappableBackground = () => (
    <TouchableOpacity
      activeOpacity={1}
      style={getOverlayStyles()}
      onPress={() => reset()}
    />
  );

  return (
    <View pointerEvents="box-none" style={[getOverlayStyles(), style]}>
      <Animated.View
        pointerEvents="none"
        style={[
          getOverlayStyles(),
          {
            backgroundColor: bgColor as string,
            opacity: animColor.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0, bgOpacity],
            }),
          },
        ]}
      >
        {backdrop}
      </Animated.View>
      <View
        pointerEvents="box-none"
        style={[getOverlayStyles(), getOrientation(), getOffsetXY()]}
      >
        {active && !backgroundTappable && renderTappableBackground()}
        {verticalOrientation === 'up' && children && renderActions()}
        {renderMainButton()}
        {verticalOrientation === 'down' && children && renderActions()}
      </View>
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  btnText: {
    marginTop: -4,
    fontSize: 24,
    backgroundColor: 'transparent',
  },
});
