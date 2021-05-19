

import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { WiggleAnimationConfig } from '../../data/WiggleAnimation';
import { AnimationWrapperProps } from '../../Types';

export interface WiggleAnimationProps extends AnimationWrapperProps {
    animationConfig: WiggleAnimationConfig;
}

export class WiggleAnimationWrapper extends BaseAnimationWrapper<WiggleAnimationProps> {
    private translateX: Animated.Value;
    private wiggleCount: number;

    public constructor(props: WiggleAnimationProps) {
        super(props);

        this.translateX = new Animated.Value(0);
        this.wiggleCount = 0;

    }

    public finishAnimation(): void {
        this.stopAnimation();
        // no extra op
    }

    protected updateCompositeAnimation(): void {
        const duration = this.props.animationConfig.animationDuration;
        const wiggleDistance = this.props.animationConfig.wiggleDistance;

        this._compositeAnimation = Animated.sequence([
            Animated.timing(this.translateX, {
                duration: duration / 2,
                toValue: -wiggleDistance,
                useNativeDriver: false
            }),
            Animated.timing(this.translateX, {
                duration: duration,
                toValue: wiggleDistance,
                useNativeDriver: false
            }),
            Animated.timing(this.translateX, {
                duration: this.props.animationConfig.animationDuration / 2,
                toValue: 0,
                useNativeDriver: false
            })
        ]);
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const translateX = this.translateX;

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

}
