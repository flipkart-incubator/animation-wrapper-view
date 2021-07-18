import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';

import { FadeAnimationConfig } from '../../data/FadeAnimationConfig';
import getEasingFunction from "../Utils";
import { AnimationWrapperProps } from '../../..';

export interface FadeAnimationProps extends AnimationWrapperProps {
    animationConfig: FadeAnimationConfig;
}

export class FadeAnimationWrapper extends BaseAnimationWrapper<FadeAnimationProps> {

    private opacity: Animated.Value;

    public constructor(props: FadeAnimationProps) {
        super(props);
        this.opacity = new Animated.Value(props.animationConfig.initialOpacity);
    }

    public finishAnimation(): void {
        this.stopAnimation();
        this.opacity.setValue(this.props.animationConfig.finalOpacity);
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const opacity = this.opacity;
        return (
            <Animated.View needsOffscreenAlphaCompositing
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity
                }}>
                {content}
            </Animated.View>
        );
    }

    protected updateCompositeAnimation(): void {
        const { animationDuration, initialOpacity, finalOpacity, interpolationDef } = this.props.animationConfig;
        this.opacity.setValue(initialOpacity);
        this._compositeAnimation = Animated.timing(this.opacity, {
            duration: animationDuration,
            toValue: finalOpacity,
            easing: getEasingFunction(interpolationDef),
            useNativeDriver: false
        });
    }
}
