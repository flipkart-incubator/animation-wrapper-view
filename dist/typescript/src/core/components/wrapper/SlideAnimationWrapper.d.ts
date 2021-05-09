import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { SlideHorizontalAnimationConfig, SlideVerticalAnimationConfig } from '../../data/SlideAnimationConfig';
import { SlideAnimationProps } from '../../Types';
interface SlideAnimationState {
    translate: Animated.Value;
}
export interface SlideHorizontalAnimationProps extends SlideAnimationProps {
    animationConfig: SlideHorizontalAnimationConfig;
}
export interface SlideVerticalAnimationProps extends SlideAnimationProps {
    animationConfig: SlideVerticalAnimationConfig;
}
export declare class SlideAnimationWrapper extends BaseAnimationWrapper<SlideAnimationProps, SlideAnimationState> {
    private _slideAnimation;
    private _screenWidth;
    private _screenHeight;
    private _animationType;
    constructor(props: SlideAnimationProps);
    UNSAFE_componentWillReceiveProps(nextProps: SlideAnimationProps, _nextContext: any): void;
    startAnimation(): void;
    stopAnimation(): void;
    resetAnimation(): void;
    finishAnimation: () => void;
    protected renderAnimation(content: React.ReactNode): React.ReactNode;
    protected getAnimationStateFromProps(props: SlideAnimationProps): SlideAnimationState;
    private _getInitialTranslateValue;
    private _getFinalTranslateValue;
}
export {};
