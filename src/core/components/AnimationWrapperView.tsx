import React, { Component } from 'react';
import { RippleAnimationWrapper } from './wrapper/RippleAnimationWrapper';
import { ScaleAnimationWrapper } from './wrapper/ScaleAnimationWrapper';
import { BounceAnimationWrapper } from './wrapper/BounceAnimationWrapper';

import BaseAnimationConfig from '../data/BaseAnimationConfig';
import { DraggableAnimationWrapper } from './wrapper/DraggableAnimationWrapper';
import { AnimationWrapperProps, WrapperComponent } from "../Types";

import { FadeAnimationWrapper } from './wrapper/FadeAnimationWrapper';
import { SlideAnimationWrapper } from './wrapper/SlideAnimationWrapper';
import { WiggleAnimationWrapper } from './wrapper/WiggleAnimationWrapper';
import { BaseAnimationWrapper } from './wrapper/BaseAnimationWrapper';
import { JsonAnimationWrapper } from './wrapper/JsonAnimationWrapper';
import { AnimationType } from '../data/Enums';

export default class AnimationWrapperView extends React.PureComponent<AnimationWrapperProps> {

    private _component: WrapperComponent;
    private _animatorRef?: BaseAnimationWrapper<AnimationWrapperProps, {}> | null;

    protected constructor(props: AnimationWrapperProps) {
        super(props);
        this._component = AnimationWrapperView._animationWrapperGenerator(props.animationConfig);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: AnimationWrapperProps): void {
        if (this.props.animationConfig !== nextProps.animationConfig) {
            this._animatorRef?.resetAnimation();
            this._component = AnimationWrapperView._animationWrapperGenerator(nextProps.animationConfig);
        }
    }

    /**
     * This function will reset all animated timing functions associated with the current animation
     * and start the animation from it's initial point.
     */
    public startAnimation(): void {
        this._animatorRef?.startAnimation();
    }

    /**
     * This function will stop all the Animated timing functions without resetting their values
     * effectively pausing any applied animation when invoked.
     */
    public stopAnimation(): void {
        this._animatorRef?.stopAnimation();
    }

    /**
     * This function will clear the animation timing functions and will reset the view before
     * any animation transformation were applied to it.
     */
    public resetAnimation(): void {
        this._animatorRef?.resetAnimation();
    }

    public finishAnimation(): void {
        this._animatorRef?.finishAnimation();
    }

    public render(): React.ReactNode | undefined {
        this._assertChildType();
        const { children, onAnimationFinish, onAnimationStart } = this.props;
        const animationConfig = this.props.animationConfig;
        if (this._component && children) {
            return (
                <this._component
                    ref={this._setRef}
                    animationConfig={animationConfig as any}
                    onAnimationFinish={onAnimationFinish}
                    onAnimationStart={onAnimationStart}>
                    {children}
                </this._component>
            );
        }

        return;
    }

    private _setRef = (ref: Component<AnimationWrapperProps, {}, {}>) => {
        this._animatorRef = ref as BaseAnimationWrapper<AnimationWrapperProps, {}>;
    }

    private static _animationWrapperGenerator(animationConfig: BaseAnimationConfig): WrapperComponent {
        switch (animationConfig.type) {
            case AnimationType.BOUNCE:
                return BounceAnimationWrapper;
            case AnimationType.RIPPLE:
                return RippleAnimationWrapper;
            case AnimationType.SCALE:
                return ScaleAnimationWrapper;
            case AnimationType.DRAGGABLE:
                return DraggableAnimationWrapper;
            case AnimationType.FADE_IN:
            case AnimationType.FADE_OUT:
                return FadeAnimationWrapper;
            case AnimationType.SLIDE_IN:
            case AnimationType.SLIDE_OUT:
                return SlideAnimationWrapper;
            case AnimationType.WIGGLE:
                return WiggleAnimationWrapper;
            default:
                return JsonAnimationWrapper;
        }
    }

    private _assertChildType = (): void => {
        if (React.Children.count(this.props.children) !== 1) {
            throw new Error('Only one child can be passed to AnimationWrapperView');
        }
    };
}
