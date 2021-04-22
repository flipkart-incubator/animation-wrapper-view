import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationWrapperProps } from '../../Types';
import { RippleAnimationConfig } from '../../data/RippleAnimationConfig';

interface RippleAnimationState {
    scale: Animated.Value;
    opacity: Animated.Value;
}

export interface RippleAnimationProps extends AnimationWrapperProps {
    animationConfig: RippleAnimationConfig;
}


export class RippleAnimationWrapper extends BaseAnimationWrapper<RippleAnimationProps, RippleAnimationState> {

    private _rippleAnimation: Animated.CompositeAnimation;

    public constructor(props: RippleAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);

        const { animationConfig } = this.props;
        const { scale, opacity } = this.state;

        this._rippleAnimation = Animated.loop(Animated.sequence([
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
        ]), {
            iterations: animationConfig.rippleCount
        });
    }

    public UNSAFE_componentWillReceiveProps(nextProps: RippleAnimationProps, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: RippleAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public startAnimation(): void {
        this.animationStarted();
        this._rippleAnimation.reset();
        this._rippleAnimation.start(() => { this.animationFinished() });
    }

    public stopAnimation(): void {
        this._rippleAnimation.stop();
    }

    public resetAnimation(): void {
        this.stopAnimation();
        this.state.opacity.setValue(1);
        this.state.scale.setValue(0);
    }
    public finishAnimation = () => {
        this.stopAnimation();
        // no extra op
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const { scale, opacity } = this.state;
        const { animationConfig } = this.props;
        const rippleStyle = RippleAnimationWrapper.getRippleStyle(animationConfig.rippleRadius);

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
                                outputRange: [0, animationConfig.rippleRadius * 2]
                            }),
                            height: scale.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, animationConfig.rippleRadius * 2]
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
            opacity: new Animated.Value(1)
        };
    }

    public static getRippleStyle(contentWidth: number): StyleProp<ViewStyle> {
        return {
            position: 'absolute',
            marginLeft: 0,
            marginTop: 0,
            borderRadius: contentWidth
        };
    }
}
