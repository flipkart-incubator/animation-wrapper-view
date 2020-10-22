import { Animated, View } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import AnimationUtils from '../utils/AnimationUtils';
import {RippleAnimationProps} from "../Interfaces";

interface RippleAnimationState {
    scale: Animated.Value;
    opacity: Animated.Value;
    rippleCount: number;
}


export class RippleAnimationWrapper extends BaseAnimationWrapper<RippleAnimationProps, RippleAnimationState> {
    public constructor(props: RippleAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<RippleAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: RippleAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    protected triggerAnimation(): void {
        const { animationConfig } = this.props;
        const { scale, opacity, rippleCount } = this.state;

        scale.setValue(0);
        opacity.setValue(1);
        this.setState({ rippleCount: rippleCount + 1 });
        Animated.sequence([
            Animated.delay(animationConfig.rippleIntervalDuration),
            Animated.parallel([
                Animated.timing(scale, {
                    duration: animationConfig.rippleDuration,
                    toValue: 1,
                    useNativeDriver: false
                }),
                Animated.timing(opacity, {
                    duration: animationConfig.rippleDuration,
                    toValue: 0,
                    useNativeDriver: false
                })
            ])
        ]).start(() => {
            if (this.state.rippleCount < animationConfig.rippleCount) {
                this.triggerAnimation();
            } else {
                this.setState({ rippleCount: 0 });
            }
        });
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const { scale, opacity } = this.state;
        const { animationConfig, animationDimen } = this.props;
        const rippleStyle = AnimationUtils.getRippleStyle(animationDimen.width);

        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Animated.View
                    style={[
                        rippleStyle,
                        {
                            backgroundColor: animationConfig.rippleColor,
                            width: scale.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, animationDimen.width]
                            }),
                            height: scale.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, animationDimen.height]
                            }),
                            opacity
                        }
                    ]}
                />
                {content}
            </View>
        );
    }

    protected getAnimationStateFromProps(_: RippleAnimationProps): RippleAnimationState {
        return {
            scale: new Animated.Value(0),
            opacity: new Animated.Value(1),
            rippleCount: 0
        };
    }
}
