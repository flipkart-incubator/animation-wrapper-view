import { Animated, Easing, ToastAndroid, View } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';

import { ScaleAnimationConfig } from '../../data/ScaleAnimationConfig';
import { AnimationWrapperProps } from '../../Types';
import getEasingFunction from "../Utils";

interface ScaleAnimationState {
    scale: Animated.Value;
}

export interface ScaleAnimationProps extends AnimationWrapperProps {
    animationConfig: ScaleAnimationConfig;
}

export class ScaleAnimationWrapper extends BaseAnimationWrapper<ScaleAnimationProps> {
    
    private scale: Animated.Value;

    public constructor(props: ScaleAnimationProps) {
        super(props);

        this.scale = new Animated.Value(props.animationConfig.fromScale ?? 1);
        
    }

    public finishAnimation(): void {
        this.stopAnimation();
        this.scale.setValue(this.props.animationConfig.toScale);
    }

    protected updateCompositeAnimation(): void {
        const { animationConfig } = this.props;
        this.scale.setValue(animationConfig.fromScale ?? 1);
        this._compositeAnimation = Animated.timing(this.scale, {
            duration: animationConfig.animationDuration,
            toValue: animationConfig.toScale,
            easing: getEasingFunction(animationConfig.interpolationDef),
            useNativeDriver: false
        });
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const scale = this.scale;

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
}
