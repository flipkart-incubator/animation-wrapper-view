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

    private _animationComponentClass: WrapperComponent | undefined;
    private _animationComponentRef?: BaseAnimationWrapper<AnimationWrapperProps> | null;

    public constructor(props: AnimationWrapperProps) {
        super(props);
        this._animationComponentClass = this._animationWrapperGenerator(props.animationConfig);
    }

    public shouldComponentUpdate(nextProps: Readonly<AnimationWrapperProps>, _: any): boolean {
        const shouldUpdate = nextProps.animationConfig !== this.props.animationConfig;
        if (shouldUpdate) {
            this._animationComponentRef?.resetAnimation();
            this._animationComponentClass = this._animationWrapperGenerator(nextProps.animationConfig);
        }
        return shouldUpdate;
    }

    public render(): React.ReactNode | undefined {
        this._assertChildType();
        const { animationConfig, children, onAnimationFinish, onAnimationStart } = this.props;
        if (this._animationComponentClass && children) {
            return (
                <this._animationComponentClass
                    ref={this._setRef}
                    animationConfig={animationConfig as any}
                    onAnimationFinish={onAnimationFinish}
                    onAnimationStart={onAnimationStart}>
                    {children}
                </this._animationComponentClass>
            );
        }
        return children;
    }

    /**
     * This function will reset all animated timing functions associated with the current animation
     * and start the animation from it's initial point.
     */
    public startAnimation(): void {
        this._animationComponentRef?.startAnimation();
    }

    /**
     * This function will stop all the Animated timing functions without resetting their values
     * effectively pausing any applied animation when invoked.
     */
    public stopAnimation(): void {
        this._animationComponentRef?.stopAnimation();
    }

    /**
     * This function will clear the animation timing functions and will reset the view before
     * any animation transformation were applied to it.
     */
    public resetAnimation(): void {
        this._animationComponentRef?.resetAnimation();
    }

    /**
     * This function will apply the final value to the composite animation, rendering the view
     * after all the transformations have been applied.
     */
    public finishAnimation(): void {
        this._animationComponentRef?.finishAnimation();
    }

    private _setRef(ref: Component<AnimationWrapperProps>): void {
        this._animationComponentRef = ref as BaseAnimationWrapper<AnimationWrapperProps>;
    }

    /**
     * @param animationConfig BaseAnimationConfig object which will be used to determine the Component Class
     * @returns type WrapperComponent, a defined type for all extensions of BaseAnimationWrapper
     */
    private _animationWrapperGenerator(animationConfig?: BaseAnimationConfig): WrapperComponent | undefined {
        switch (animationConfig?.type) {
            case AnimationType.BOUNCE:
                return BounceAnimationWrapper;
            case AnimationType.RIPPLE:
                return RippleAnimationWrapper;
            case AnimationType.SCALE:
                return ScaleAnimationWrapper;
            case AnimationType.DRAGGABLE:
                return DraggableAnimationWrapper;
            case AnimationType.FADE:
                return FadeAnimationWrapper;
            case AnimationType.SLIDE_VERTICAL:
            case AnimationType.SLIDE_HORIZONTAL:
                return SlideAnimationWrapper;
            case AnimationType.WIGGLE:
                return WiggleAnimationWrapper;
            case AnimationType.JSON:
                return JsonAnimationWrapper;
        }
        return undefined;
    }

    /**
     * This function will assert the number of children ReactNodes passed to the AnimationWrapperView.
     */
    private _assertChildType(): void {
        if (React.Children.count(this.props.children) !== 1) {
            throw new Error('Only one child can be passed to AnimationWrapperView');
        }
    };
}
