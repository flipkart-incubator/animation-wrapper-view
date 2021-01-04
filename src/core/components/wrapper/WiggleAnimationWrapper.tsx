

import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { BaseAnimationConfig } from '../../data/BaseAnimation';
import { WiggleAnimationConfig } from '../../data/WiggleAnimation';
import { AnimationWrapperProps } from '../../Types';


interface WiggleAnimationState {
    translateX: Animated.Value;
    wiggleCount: number;
}
export interface WiggleAnimationProps extends AnimationWrapperProps  {
    animationConfig: WiggleAnimationConfig;
}

export class WiggleAnimationWrapper extends BaseAnimationWrapper<WiggleAnimationProps, WiggleAnimationState> {

    private _wiggleAnimation: Animated.CompositeAnimation;
    public constructor(props: WiggleAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);

        const duration = props.animationConfig.animationDuration;
        const wiggleDistance = props.animationConfig.wiggleDistance;

        this._wiggleAnimation = Animated.sequence([
            Animated.timing(this.state.translateX, {
                duration: duration / 2,
                toValue: -wiggleDistance,
                useNativeDriver: false
            }),
            Animated.timing(this.state.translateX, {
                duration: duration,
                toValue: wiggleDistance,
                useNativeDriver: false
            }),
            Animated.timing(this.state.translateX, {
                duration: this.props.animationConfig.animationDuration / 2,
                toValue: 0,
                useNativeDriver: false
            })
        ]);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<WiggleAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: WiggleAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public startAnimation = () => {
        this.animationStarted();
        this._wiggleAnimation.reset();
        this._wiggleAnimation.start(() => { this.animationFinished() });
    }

    public stopAnimation(): void {
        this._wiggleAnimation.stop();
    }

    public resetAnimation(): void {
        this.stopAnimation();
        this.state.translateX.setValue(0);
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const translateX = this.state.translateX;

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

    protected getAnimationStateFromProps(_: WiggleAnimationProps): WiggleAnimationState {
        return {
            translateX: new Animated.Value(0),
            wiggleCount: 0
        };
    }
}
