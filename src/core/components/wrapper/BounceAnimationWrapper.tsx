import { Animated, Easing } from 'react-native';
import React from 'react';
import {  BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationWrapperProps } from '../../Types';
import BounceAnimationConfig from '../../data/BounceAnimationConfig';

export interface BounceAnimationProps extends AnimationWrapperProps {
    animationConfig: BounceAnimationConfig;
}

export class BounceAnimationWrapper extends BaseAnimationWrapper<BounceAnimationProps> {

    private _translateY: Animated.Value;

    public constructor(props: BounceAnimationProps) {
        super(props);
        this._translateY = new Animated.Value(0);
    }

    public finishAnimation() {
        this.stopAnimation();
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const translateY = this._translateY;

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

    protected updateCompositeAnimation(): void {
        const { animationConfig } = this.props;

        this._compositeAnimation = Animated.sequence([
            Animated.timing(this._translateY, {
                duration: animationConfig.animationDuration / 3,
                toValue: -animationConfig.bounceHeight,
                easing: Easing.bezier(0, 0.55, 0.45, 1),
                useNativeDriver: false
            }),
            Animated.timing(this._translateY, {
                duration: animationConfig.animationDuration / 2,
                toValue: 0,
                easing: Easing.bounce,
                useNativeDriver: false
            })
        ]);
    }
}
