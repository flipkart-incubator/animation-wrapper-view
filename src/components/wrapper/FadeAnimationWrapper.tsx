import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';

import { FadeAnimationProps } from '../../utils/Interfaces';
import { AnimationType } from '../../models/AnimationType';
import { FadeInAnimation, FadeOutAnimation } from '../../models/FadeAnimation';

interface FadeAnimationState {
    opacity: Animated.Value;
}


export class FadeAnimationWrapper extends BaseAnimationWrapper<FadeAnimationProps, FadeAnimationState> {
    public constructor(props: FadeAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<FadeAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: FadeAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public triggerAnimation(): void {
        const { animationConfig } = this.props;
        if (animationConfig.type === AnimationType.FADE_IN) {
            const fadeInConfig = animationConfig as FadeInAnimation;
            Animated.timing(this.state.opacity, {
                duration: fadeInConfig.animationDuration,
                toValue: 1,
                useNativeDriver: false
            }).start(() => {
                this.animationEnded();
            });
        } else {
            const fadeOutConfig = animationConfig as FadeOutAnimation;
            Animated.timing(this.state.opacity, {
                duration: fadeOutConfig.animationDuration,
                toValue: fadeOutConfig.finalOpacity ? fadeOutConfig.finalOpacity : 0,
                useNativeDriver: false
            }).start(() => {
                this.animationEnded();
            });
        }
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const opacity = this.state.opacity;

        return (
            <Animated.View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity
                }}>
                {content}
            </Animated.View>
        );
    }

    protected getAnimationStateFromProps(props: FadeAnimationProps): FadeAnimationState {
        if (props.animationConfig.type === AnimationType.FADE_IN) {
            const config = props.animationConfig as FadeInAnimation;
            return {
                opacity: new Animated.Value(config.initialOpacity ? config.initialOpacity : 0)
            };
        } else {
            return {
                opacity: new Animated.Value(1)
            };
        }

    }
}
