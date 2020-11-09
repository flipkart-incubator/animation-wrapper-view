

import { Animated, Easing, ToastAndroid, View } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { BounceAnimationProps } from "../Interfaces";

interface BounceAnimationState {
    translateY: Animated.Value;
}


export class BounceAnimationWrapper extends BaseAnimationWrapper<BounceAnimationProps, BounceAnimationState> {
    public constructor(props: BounceAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<BounceAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: BounceAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    protected triggerAnimation = () => {
        const { animationConfig } = this.props;
        const { translateY } = this.state;

        Animated.timing(translateY, {
            duration: animationConfig.animationDuration / 3,
            toValue: -animationConfig.bounceHeight,
            easing: Easing.bezier(0, 0.55, 0.45, 1),
            useNativeDriver: false
        }).start(() => {
            Animated.timing(translateY, {
                duration: animationConfig.animationDuration / 2,
                toValue: 0,
                easing: Easing.bounce,
                useNativeDriver: false
            }).start();
        });
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const translateY = this.state.translateY;

        return (
            <Animated.View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        { translateY }
                    ]
                }}>
                {content}
            </Animated.View>
        );
    }

    protected getAnimationStateFromProps(_: BounceAnimationProps): BounceAnimationState {
        return {
            translateY: new Animated.Value(0)
        };
    }
}
