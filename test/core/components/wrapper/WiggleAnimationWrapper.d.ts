import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { WiggleAnimationConfig } from '../../data/WiggleAnimation';
import { AnimationWrapperProps } from '../../Types';
interface WiggleAnimationState {
    translateX: Animated.Value;
    wiggleCount: number;
}
export interface WiggleAnimationProps extends AnimationWrapperProps {
    animationConfig: WiggleAnimationConfig;
}
export declare class WiggleAnimationWrapper extends BaseAnimationWrapper<WiggleAnimationProps, WiggleAnimationState> {
    private _wiggleAnimation;
    constructor(props: WiggleAnimationProps);
    UNSAFE_componentWillReceiveProps(nextProps: WiggleAnimationProps, _nextContext: any): void;
    startAnimation: () => void;
    stopAnimation(): void;
    resetAnimation(): void;
    finishAnimation: () => void;
    protected renderAnimation(content: React.ReactNode): React.ReactNode;
    protected getAnimationStateFromProps(_: WiggleAnimationProps): WiggleAnimationState;
}
export {};
