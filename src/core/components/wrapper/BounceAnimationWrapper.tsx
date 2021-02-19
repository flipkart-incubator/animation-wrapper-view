import { Animated, Easing } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationWrapperProps } from '../../Types';
import BounceAnimationConfig from '../../data/BounceAnimationConfig';

interface BounceAnimationState {
    translateY: Animated.Value;
}

export interface BounceAnimationProps extends AnimationWrapperProps {
    animationConfig: BounceAnimationConfig;
}

export class BounceAnimationWrapper extends BaseAnimationWrapper<BounceAnimationProps, BounceAnimationState> {
    private _bounceAnimation: Animated.CompositeAnimation;

    public constructor(props: BounceAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);

        const { animationConfig } = this.props;
        const { translateY } = this.state;

        this._bounceAnimation = Animated.sequence([
            Animated.timing(translateY, {
                duration: animationConfig.animationDuration / 3,
                toValue: -animationConfig.bounceHeight,
                easing: Easing.bezier(0, 0.55, 0.45, 1),
                useNativeDriver: false
            }),
            Animated.timing(translateY, {
                duration: animationConfig.animationDuration / 2,
                toValue: 0,
                easing: Easing.bounce,
                useNativeDriver: false
            })
        ]);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: BounceAnimationProps, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: BounceAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public startAnimation = () => {
        this.animationStarted();
        this._bounceAnimation.reset();
        this._bounceAnimation.start(() => { this.animationFinished() });
    }

    public stopAnimation = () => {
        this._bounceAnimation.stop();
    }

    public resetAnimation = () => {
        this.stopAnimation();
        this.state.translateY.setValue(0);
    }

    public finishAnimation = () => {
        this.stopAnimation();
        // no extra op
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const translateY = this.state.translateY;

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

    protected getAnimationStateFromProps(_: BounceAnimationProps): BounceAnimationState {
        return {
            translateY: new Animated.Value(0)
        };
    }
}
