import { Animated, Dimensions } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';

import { SlideAnimationProps } from '../../utils/Interfaces';
import { AnimationType } from '../../models/AnimationType';
import { FadeInAnimation, FadeOutAnimation } from '../../models/FadeAnimation';
import { SlideInAnimation, SlideOutAnimation } from '../../models/SlideAnimation';

interface SlideAnimationState {
    translateX: Animated.Value;
}


export class SlideAnimationWrapper extends BaseAnimationWrapper<SlideAnimationProps, SlideAnimationState> {
    private _screenWidth: number;
    public constructor(props: SlideAnimationProps) {
        super(props);
        
        this._screenWidth = Math.round(Dimensions.get('window').width);
        this.state = this.getAnimationStateFromProps(props);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<SlideAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: SlideAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public triggerAnimation(): void {
        const { animationConfig } = this.props;
        if (animationConfig.type === AnimationType.SLIDE_IN) {
            const slideInConfig = animationConfig as SlideInAnimation;
            Animated.timing(this.state.translateX, {
                duration: slideInConfig.animationDuration,
                toValue: 1,
                useNativeDriver: false
            }).start();
        } else {
            const slideOutConfig = animationConfig as SlideOutAnimation;
            Animated.timing(this.state.translateX, {
                duration: slideOutConfig.animationDuration,
                toValue: slideOutConfig.finalOffset ? slideOutConfig.finalOffset : this._screenWidth,
                useNativeDriver: false
            }).start();
        }
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

    protected getAnimationStateFromProps(props: SlideAnimationProps): SlideAnimationState {
        if (props.animationConfig.type === AnimationType.SLIDE_IN) {
            const config = props.animationConfig as SlideInAnimation;
            return {
                translateX: new Animated.Value(config.initialOffset ? config.initialOffset : -this._screenWidth)
            };
        } else {
            return {
                translateX: new Animated.Value(0)
            };
        }

    }
}
