import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';

import { FadeInAnimationConfig, FadeOutAnimationConfig } from '../../data/FadeAnimation';
import { FadeAnimationProps } from '../../Types';
import { AnimationType } from '../../data/Enums';

interface FadeAnimationState {
    opacity: Animated.Value;
}

export class FadeAnimationWrapper extends BaseAnimationWrapper<FadeAnimationProps, FadeAnimationState> {

    private _fadeAnimation;

    public constructor(props: FadeAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);
        const { animationConfig } = this.props;

        let duration: number;
        let toValue: number;

        if (animationConfig.type === AnimationType.FADE_IN) {
            const fadeInConfig = animationConfig as FadeInAnimationConfig;
            duration = fadeInConfig.animationDuration;
            toValue = 1;
        } else {
            const fadeOutConfig = animationConfig as FadeOutAnimationConfig;
            duration = fadeOutConfig.animationDuration;
            toValue = fadeOutConfig.finalOpacity ? fadeOutConfig.finalOpacity : 0;
        }

        this._fadeAnimation = Animated.timing(this.state.opacity, {
            duration: duration,
            toValue: toValue,
            useNativeDriver: false
        });
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<FadeAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: FadeAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public startAnimation = () => {
        this._fadeAnimation.reset();
        this._fadeAnimation.start(() => { this.animationFinished() });
    }

    public pauseAnimation = () => {
        this._fadeAnimation.stop();
    }

    public resetAnimation = () => {
        this.pauseAnimation();
        this.state.opacity.setValue(this._getInitialOpacity(this.props));
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
        return {
            opacity: new Animated.Value(this._getInitialOpacity(props))
        }
    }

    private _getInitialOpacity(props: FadeAnimationProps): number {
        if (props.animationConfig.type === AnimationType.FADE_IN) {
            const config = props.animationConfig as FadeInAnimationConfig;
            return config.initialOpacity ? config.initialOpacity : 0;
        } else {
            return 1;
        }
    }
}
