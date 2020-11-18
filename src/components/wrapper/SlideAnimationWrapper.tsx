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

    private _slideAnimation: Animated.CompositeAnimation;

    private _screenWidth: number;
    public constructor(props: SlideAnimationProps) {
        super(props);
        
        this._screenWidth = Math.round(Dimensions.get('window').width);
        this.state = this.getAnimationStateFromProps(props);


        const { animationConfig } = this.props;
        let toValue: number;
        let duration: number;
        if (animationConfig.type === AnimationType.SLIDE_IN) {
            const slideInConfig = animationConfig as SlideInAnimation;
            toValue = 1;
            duration = slideInConfig.animationDuration;
            
        } else {
            const slideOutConfig = animationConfig as SlideOutAnimation;
            duration = slideOutConfig.animationDuration;
            toValue = slideOutConfig.finalOffset ? slideOutConfig.finalOffset : this._screenWidth;
           
        }
        this._slideAnimation = Animated.timing(this.state.translateX, {
            duration: duration,
            toValue: toValue,
            useNativeDriver: false
        });
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<SlideAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: SlideAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public startAnimation(): void {
        this._slideAnimation.reset();
        this._slideAnimation.start(() => { this.animationFinished() });
    }

    public pauseAnimation(): void {
        this._slideAnimation.stop();
    }

    public resetAnimation(): void {
        this.pauseAnimation();
        this.state.translateX.setValue(this._getInitialTranslateValue(this.props));
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
        return {
            translateX: new Animated.Value(this._getInitialTranslateValue(props))
        }
    }

    private _getInitialTranslateValue(props: SlideAnimationProps): number {
        if (props.animationConfig.type === AnimationType.SLIDE_IN) {
            const config = props.animationConfig as SlideInAnimation;
            return config.initialOffset ? config.initialOffset : -this._screenWidth;
        } else {
            return 0;
        }
    }
}
