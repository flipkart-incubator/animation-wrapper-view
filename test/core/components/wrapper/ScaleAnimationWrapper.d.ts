import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { ScaleAnimationConfig } from '../../data/ScaleAnimationConfig';
import { AnimationWrapperProps } from '../../Types';
interface ScaleAnimationState {
    scale: Animated.Value;
}
export interface ScaleAnimationProps extends AnimationWrapperProps {
    animationConfig: ScaleAnimationConfig;
}
export declare class ScaleAnimationWrapper extends BaseAnimationWrapper<ScaleAnimationProps, ScaleAnimationState> {
    private isScaled;
    private _scaleAnimation;
    constructor(props: ScaleAnimationProps);
    UNSAFE_componentWillReceiveProps(nextProps: ScaleAnimationProps, _nextContext: any): void;
    startAnimation(): void;
    stopAnimation(): void;
    resetAnimation(): void;
    finishAnimation: () => void;
    protected renderAnimation(content: React.ReactNode): React.ReactNode;
    protected getAnimationStateFromProps(_: ScaleAnimationProps): ScaleAnimationState;
}
export {};
