import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationWrapperProps } from '../../Types';
import BaseAnimationConfig from '../../data/BaseAnimationConfig';
interface DraggableAnimationState {
    pan: Animated.ValueXY;
    panResponder: any;
}
export interface DraggableAnimationProps extends AnimationWrapperProps {
    animationConfig: BaseAnimationConfig;
}
export declare class DraggableAnimationWrapper extends BaseAnimationWrapper<DraggableAnimationProps, DraggableAnimationState> {
    constructor(props: DraggableAnimationProps);
    UNSAFE_componentWillReceiveProps(nextProps: DraggableAnimationProps, _nextContext: any): void;
    protected renderAnimation(content: React.ReactNode): React.ReactNode;
    protected getAnimationStateFromProps(_: DraggableAnimationProps): DraggableAnimationState;
    stopAnimation(): void;
    resetAnimation(): void;
    startAnimation(): void;
    finishAnimation: () => void;
}
export {};
