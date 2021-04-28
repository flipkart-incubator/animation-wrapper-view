import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { JsonAnimationConfig } from '../../data/JsonAnimationConfig';
import { AnimationWrapperProps } from '../../Types';
interface JsonAnimationState {
}
export interface JsonAnimationProps extends AnimationWrapperProps {
    animationConfig: JsonAnimationConfig;
}
export declare class JsonAnimationWrapper extends BaseAnimationWrapper<JsonAnimationProps, JsonAnimationState> {
    private _animation;
    private _transforms;
    private _compositeAnimation;
    constructor(props: JsonAnimationProps);
    shouldComponentUpdate(nextProps: JsonAnimationProps, _: JsonAnimationState): boolean;
    startAnimation: () => void;
    stopAnimation: () => void;
    resetAnimation: () => void;
    finishAnimation: () => void;
    protected renderAnimation: (content: React.ReactNode) => React.ReactNode;
    protected getAnimationStateFromProps(_: JsonAnimationProps): JsonAnimationState;
    private _updateAnimatedArray;
    private _updateCompositeAnimation;
    private _updateTransformsArray;
    private _appendTransform;
    private _getTransformArray;
}
export {};
