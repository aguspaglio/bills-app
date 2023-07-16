declare module 'react-native-swipeable' {
    import React from 'react';
    import { ViewStyle, GestureResponderEvent } from 'react-native';
  
    export interface SwipeableProps {
      children?: React.ReactNode;
      rightButtons?: React.ReactNode[];
      leftButtons?: React.ReactNode[];
      onRightButtonsOpenRelease?: (event: GestureResponderEvent) => void;
      onRightButtonsCloseRelease?: (event: GestureResponderEvent) => void;
      onLeftButtonsOpenRelease?: (event: GestureResponderEvent) => void;
      onLeftButtonsCloseRelease?: (event: GestureResponderEvent) => void;
      swipeReleaseAnimationConfig?: object;
      swipeReleaseAnimationFn?: (
        velocity: number,
        dimensions: { width: number; height: number }
      ) => object;
      swipeReleaseAnimationCallbackDuration?: number;
      swipeReleaseAnimationFriction?: number;
      swipeReleaseAnimationTension?: number;
      swipeReleaseAnimationUseNativeDriver?: boolean;
      swipeReleaseAnimationDamping?: number;
      swipeReleaseAnimationStiffness?: number;
      style?: ViewStyle;
      overshootFriction?: number;
      overshootLeft?: boolean;
      overshootRight?: boolean;
      overshootLeftThreshold?: number;
      overshootRightThreshold?: number;
      onSwipeStart?: () => void;
      onSwipeRelease?: () => void;
    }
  
    const Swipeable: React.ComponentClass<SwipeableProps>;
  
    export default Swipeable;
  }
  