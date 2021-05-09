import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationWrapperProps } from '../../Types';
import BounceAnimationConfig from '../../data/BounceAnimationConfig';
interface BounceAnimationState {
    translateY: Animated.Value;
}
export interface BounceAnimationProps extends AnimationWrapperProps {
    animationConfig: BounceAnimationConfig;
}
export declare class BounceAnimationWrapper extends BaseAnimationWrapper<BounceAnimationProps, BounceAnimationState> {
    private _bounceAnimation;
    constructor(props: BounceAnimationProps);
    UNSAFE_componentWillReceiveProps(nextProps: BounceAnimationProps, _nextContext: any): void;
    startAnimation: () => void;
    stopAnimation: () => void;
    resetAnimation: () => void;
    finishAnimation: () => void;
    protected renderAnimation(content: React.ReactNode): React.ReactNode;
    protected getAnimationStateFromProps(_: BounceAnimationProps): BounceAnimationState;
}
export {};
