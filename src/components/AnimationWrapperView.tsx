import React, { Component } from 'react';
import { RippleAnimationWrapper } from './wrapper/RippleAnimationWrapper';
import { ScaleAnimationWrapper } from './wrapper/ScaleAnimationWrapper';
import { BounceAnimationWrapper } from './wrapper/BounceAnimationWrapper';
import { AnimationType } from '../models/AnimationType';
import { BaseAnimation } from '../models/BaseAnimation';
import { DraggableAnimationWrapper } from './wrapper/DraggableAnimationWrapper';
import { WrapperComponent } from "../utils/Types";
import { AnimationProps } from "../utils/Interfaces";
import { FadeAnimationWrapper } from './wrapper/FadeAnimationWrapper';
import { SlideAnimationWrapper } from './wrapper/SlideAnimationWrapper';
import { WiggleAnimationWrapper } from './wrapper/WiggleAnimationWrapper';
import { BaseAnimationWrapper } from './wrapper/BaseAnimationWrapper';

export abstract class AnimationWrapperView extends React.PureComponent<AnimationProps> {
    private _component: WrapperComponent;
    private _animatorRef?: BaseAnimationWrapper<AnimationProps, {}> | null;

    protected constructor(props: AnimationProps) {
        super(props);
        this._component = AnimationWrapperView._animationWrapperGenerator(props.animationConfig);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: AnimationProps): void {
        if (this.props.animationConfig !== nextProps.animationConfig) {
            this._component = AnimationWrapperView._animationWrapperGenerator(nextProps.animationConfig);
        }
    }

    public startAnimation() {
        this._animatorRef?.startAnimation();
    }

    public stopAnimation() {
        this._animatorRef?.stopAnimation();
    }

    public resetAnimation() {
        this._animatorRef?.resetAnimation();
    }

    public render(): React.ReactNode | undefined {
        this._assertChildType();
        const { children, onAnimationFinish } = this.props;
        const animationConfig = this.props.animationConfig;
        if (this._component && children) {
            return (
                <this._component
                    ref={this._setRef}
                    animationConfig={animationConfig as any}
                    onAnimationFinish={onAnimationFinish}>
                    {children}
                </this._component>
            );
        }

        return;
    }

    private _setRef = (ref: Component<AnimationProps, {}, {}>) => {
        this._animatorRef = ref as BaseAnimationWrapper<AnimationProps, {}>;
    }

    private static _animationWrapperGenerator(animationConfig: BaseAnimation): WrapperComponent {
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
        }
    }

    private _assertChildType = (): void => {
        if (React.Children.count(this.props.children) !== 1) {
            throw new Error('Only one child can be passed to AnimationWrapperView');
        }
    };
}
