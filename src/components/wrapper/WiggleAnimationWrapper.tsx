

import { Animated, Easing, ToastAndroid } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { WiggleAnimationProps } from "../../utils/Interfaces";

interface WiggleAnimationState {
    translateX: Animated.Value;
    wiggleCount: number;
}


export class WiggleAnimationWrapper extends BaseAnimationWrapper<WiggleAnimationProps, WiggleAnimationState> {
    public constructor(props: WiggleAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<WiggleAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: WiggleAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public triggerAnimation = () => {
        const { animationConfig } = this.props;
        this.moveLeft(animationConfig.animationDuration, animationConfig.wiggleDistance);
    }

    private moveLeft = (duration: number, wiggleDistance: number) => {

        Animated.timing(this.state.translateX, {
            duration: duration / 2,
            toValue: -wiggleDistance,
            // easing: Easing.bezier(0, 0.55, 0.45, 1),
            useNativeDriver: false
        }).start(() => {
            Animated.timing(this.state.translateX, {
                duration: duration,
                toValue: wiggleDistance,
                // easing: Easing.bounce,
                useNativeDriver: false
            }).start(() => {
                this.centerPos();
            });
        });
    }


    private centerPos = () => {
        Animated.timing(this.state.translateX, {
            duration: this.props.animationConfig.animationDuration / 2,
            toValue: 0,
            useNativeDriver: false
        }).start(() => {
            this.animationEnded();
        });
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const translateX = this.state.translateX;

        return (
            <Animated.View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        { translateX }
                    ]
                }}>
                {content}
            </Animated.View>
        );
    }

    protected getAnimationStateFromProps(_: WiggleAnimationProps): WiggleAnimationState {
        return {
            translateX: new Animated.Value(0),
            wiggleCount: 0
        };
    }
}
