import { Animated, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationWrapperProps } from '../../Types';
import { RippleAnimationConfig } from '../../data/RippleAnimationConfig';
interface RippleAnimationState {
    scale: Animated.Value;
    opacity: Animated.Value;
}
export interface RippleAnimationProps extends AnimationWrapperProps {
    animationConfig: RippleAnimationConfig;
}
export declare class RippleAnimationWrapper extends BaseAnimationWrapper<RippleAnimationProps, RippleAnimationState> {
    private _rippleAnimation;
    constructor(props: RippleAnimationProps);
    UNSAFE_componentWillReceiveProps(nextProps: RippleAnimationProps, _nextContext: any): void;
    startAnimation(): void;
    stopAnimation(): void;
    resetAnimation(): void;
    finishAnimation: () => void;
    protected renderAnimation(content: React.ReactNode): React.ReactNode;
    protected getAnimationStateFromProps(_: RippleAnimationProps): RippleAnimationState;
    static getRippleStyle(contentWidth: number): StyleProp<ViewStyle>;
}
export {};
