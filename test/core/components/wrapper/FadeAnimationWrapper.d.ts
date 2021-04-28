import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { FadeInAnimationConfig, FadeOutAnimationConfig } from '../../data/FadeAnimationConfig';
import { FadeAnimationProps } from '../../Types';
interface FadeAnimationState {
    opacity: Animated.Value;
}
export interface FadeInAnimationProps extends FadeAnimationProps {
    animationConfig: FadeInAnimationConfig;
}
export interface FadeOutAnimationProps extends FadeAnimationProps {
    animationConfig: FadeOutAnimationConfig;
}
export declare class FadeAnimationWrapper extends BaseAnimationWrapper<FadeAnimationProps, FadeAnimationState> {
    private _fadeAnimation;
    constructor(props: FadeAnimationProps);
    UNSAFE_componentWillReceiveProps(nextProps: FadeAnimationProps, _nextContext: any): void;
    startAnimation: () => void;
    stopAnimation: () => void;
    resetAnimation: () => void;
    finishAnimation: () => void;
    protected renderAnimation(content: React.ReactNode): React.ReactNode;
    protected getAnimationStateFromProps(props: FadeAnimationProps): FadeAnimationState;
    private _getInitialOpacity;
    private _getFinalOpacity;
}
export {};
