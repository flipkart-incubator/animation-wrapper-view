import { Animated, Easing, ToastAndroid, View } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';

import { ScaleAnimation } from '../../models/ScaleAnimation';
import { ScaleAnimationProps } from "../../utils/Interfaces";

interface ScaleAnimationState {
    scale: Animated.Value;
}

export class ScaleAnimationWrapper extends BaseAnimationWrapper<ScaleAnimationProps, ScaleAnimationState> {
    private isScaled: boolean;
    private _scaleAnimation: Animated.CompositeAnimation;

    public constructor(props: ScaleAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);
        this.isScaled = false;
        const { animationConfig } = this.props;
        this._scaleAnimation = Animated.timing(this.state.scale, {
            duration: animationConfig.scaleDuration,
            toValue: (this.isScaled) ? 1 : animationConfig.toScale,
            easing: animationConfig.easing ? animationConfig.easing : Easing.linear,
            useNativeDriver: false
        });
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<ScaleAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: ScaleAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public startAnimation(): void {
        this._scaleAnimation.reset();
        this._scaleAnimation.start(() => { this.animationFinished() });
    }

    public stopAnimation(): void {
        this._scaleAnimation.stop();
    }

    public resetAnimation(): void {
        this.stopAnimation();
        this.state.scale.setValue(1);
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const scale = this.state.scale;

        return (
            <Animated.View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        { scale }
                    ]
                }}>
                {content}
            </Animated.View>
        );
    }

    protected getAnimationStateFromProps(_: ScaleAnimationProps): ScaleAnimationState {
        return {
            scale: new Animated.Value(1)
        };
    }
}
