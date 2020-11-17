import {Animated, Easing, ToastAndroid, View} from 'react-native';
import React from 'react';
import {BaseAnimationWrapper} from './BaseAnimationWrapper';

import {ScaleAnimation} from '../models/ScaleAnimation';
import {ScaleAnimationProps} from "../Interfaces";

interface ScaleAnimationState {
    scale: Animated.Value;
}


export class ScaleAnimationWrapper extends BaseAnimationWrapper<ScaleAnimationProps, ScaleAnimationState> {
    private isScaled: boolean;

    public constructor(props: ScaleAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);
        this.isScaled = false;
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<ScaleAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: ScaleAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public triggerAnimation(): void {
        const {animationConfig} = this.props;
        Animated.timing(this.state.scale, {
            duration: animationConfig.scaleDuration,
            toValue: (this.isScaled) ? 1 : animationConfig.toScale,
            easing: animationConfig.easing ? animationConfig.easing : Easing.linear,
            useNativeDriver: false
        }).start(() => {
            this.isScaled = !this.isScaled;
            this.animationEnded();
        });

    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const scale = this.state.scale;

        return (
            <Animated.View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        {scale}
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
