import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationWrapperProps } from '../../Types';
import { RippleAnimationConfig } from '../../data/RippleAnimationConfig';
import getEasingFunction from "../Utils";

export interface RippleAnimationProps extends AnimationWrapperProps {
    animationConfig: RippleAnimationConfig;
}


export class RippleAnimationWrapper extends BaseAnimationWrapper<RippleAnimationProps> {

    scale: Animated.Value;
    opacity: Animated.Value;

    public constructor(props: RippleAnimationProps) {
        super(props);

        this.scale = new Animated.Value(0);
        this.opacity = new Animated.Value(1);
    }

    public finishAnimation(): void {
        this.stopAnimation();
        // no extra op
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const { scale, opacity } = this;
        const { animationConfig } = this.props;
        const rippleStyle = RippleAnimationWrapper.getRippleStyle(animationConfig.rippleRadius);

        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
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

    protected updateCompositeAnimation(): void {
        const { animationConfig } = this.props;
        const { scale, opacity } = this;

        this._compositeAnimation = Animated.loop(Animated.sequence([
            Animated.delay(animationConfig.rippleIntervalDuration),
            Animated.parallel([
                Animated.timing(scale, {
                    duration: animationConfig.rippleDuration,
                    toValue: 1,
                    easing: getEasingFunction(animationConfig.interpolationDef),
                    useNativeDriver: false
                }),
                Animated.timing(opacity, {
                    duration: animationConfig.rippleDuration,
                    toValue: 0,
                    easing: getEasingFunction(animationConfig.interpolationDef),
                    useNativeDriver: false
                })
            ])
        ]), {
            iterations: animationConfig.rippleCount
        });
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
