import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';

import { FadeAnimationConfig } from '../../data/FadeAnimationConfig';
import getEasingFunction from "../Utils";
import { AnimationWrapperProps } from '../../..';

interface FadeAnimationState {
    opacity: Animated.Value;
}

export interface FadeAnimationProps extends AnimationWrapperProps {
    animationConfig: FadeAnimationConfig;
}

export class FadeAnimationWrapper extends BaseAnimationWrapper<FadeAnimationProps, FadeAnimationState> {

    private _fadeAnimation: Animated.CompositeAnimation;

    public constructor(props: FadeAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);
        const { animationDuration, initialOpacity, finalOpacity, interpolationDef } = this.props.animationConfig;

        this.state.opacity.setValue
        this._fadeAnimation = Animated.timing(this.state.opacity, {
            duration: animationDuration,
            toValue: finalOpacity,
            easing: getEasingFunction(interpolationDef),
            useNativeDriver: false
        });
    }

    public UNSAFE_componentWillReceiveProps(nextProps: FadeAnimationProps, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: FadeAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public startAnimation = () => {
        this.animationStarted();
        this._fadeAnimation.reset();
        this._fadeAnimation.start(() => { this.animationFinished() });
    }

    public stopAnimation = () => {
        this._fadeAnimation.stop();
    }

    public resetAnimation = () => {
        this.stopAnimation();
        this.state.opacity.setValue(this.props.animationConfig.initialOpacity);
    }


    public finishAnimation = () => {
        this.stopAnimation();
        this.state.opacity.setValue(this.props.animationConfig.finalOpacity);
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const opacity = this.state.opacity;

        return (
            <Animated.View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity
                }}>
                {content}
            </Animated.View>
        );
    }

    protected getAnimationStateFromProps(props: FadeAnimationProps): FadeAnimationState {
        return {
            opacity: new Animated.Value(props.animationConfig.initialOpacity)
        }
    }


}
