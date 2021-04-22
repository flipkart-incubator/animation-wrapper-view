import {Animated, Dimensions, TransformsStyle} from 'react-native';
import React from 'react';
import {BaseAnimationWrapper} from './BaseAnimationWrapper';
import {
    SlideAnimationConfig,
    SlideHorizontalAnimationConfig,
    SlideHorizontalDirection,
    SlideVerticalAnimationConfig,
    SlideVerticalDirection
} from '../../data/SlideAnimationConfig';
import {AnimationType} from '../../data/Enums';
import {SlideAnimationProps} from '../../Types';

interface SlideAnimationState {
    translate: Animated.Value;
}

export interface SlideHorizontalAnimationProps extends SlideAnimationProps {
    animationConfig: SlideHorizontalAnimationConfig;
}

export interface SlideVerticalAnimationProps extends SlideAnimationProps {
    animationConfig: SlideVerticalAnimationConfig;
}

export class SlideAnimationWrapper extends BaseAnimationWrapper<SlideAnimationProps, SlideAnimationState> {

    private _slideAnimation: Animated.CompositeAnimation;

    private _screenWidth: number;
    private _screenHeight: number;
    private _animationType: AnimationType;

    public constructor(props: SlideAnimationProps) {
        super(props);

        this._screenWidth = Math.round(Dimensions.get('window').width);
        this._screenHeight = Math.round(Dimensions.get('window').height);
        this.state = this.getAnimationStateFromProps(props);

        const {animationConfig} = this.props;
        this._animationType = animationConfig.type;

        const config = animationConfig as SlideAnimationConfig;
        let fromValue: number = this._getInitialTranslateValue(this.props);
        let toValue: number = config.finalOffset;
        let duration: number = config.animationDuration;

        this.state.translate.setValue(fromValue);
        this._slideAnimation = Animated.timing(this.state.translate, {
            duration: duration,
            toValue: toValue,
            useNativeDriver: false
        });
    }

    public UNSAFE_componentWillReceiveProps(nextProps: SlideAnimationProps, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: SlideAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }

    public startAnimation(): void {
        this.animationStarted();
        this._slideAnimation.reset();
        this._slideAnimation.start(() => {
            this.animationFinished()
        });
    }

    public stopAnimation(): void {
        this._slideAnimation.stop();
    }

    public resetAnimation(): void {
        this.stopAnimation();
        this.state.translate.setValue(this._getInitialTranslateValue(this.props));
    }

    public finishAnimation = () => {
        this.stopAnimation();
        this.state.translate.setValue(this._getFinalTranslateValue(this.props));
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        if (this._animationType === AnimationType.SLIDE_HORIZONTAL) {
            return (
                <Animated.View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        {translateX: this.state.translate}
                    ]
                }}>
                    {content}
                </Animated.View>
            );
        } else {
            return (
                <Animated.View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        {translateY: this.state.translate}
                    ]
                }}>
                    {content}
                </Animated.View>
            );
        }

    }

    protected getAnimationStateFromProps(props: SlideAnimationProps): SlideAnimationState {
        return {
            translate: new Animated.Value(this._getInitialTranslateValue(props))
        }
    }

    private _getInitialTranslateValue(props: SlideAnimationProps): number {
        const config = props.animationConfig as SlideAnimationConfig;
        if (config.initialOffset === undefined || config.initialOffset === 0) {
            if (config.type === AnimationType.SLIDE_VERTICAL) {
                const direction: SlideVerticalDirection | undefined = (config as SlideVerticalAnimationConfig).direction;
                if (direction === "top_down") {
                    return -this._screenHeight;
                } else {
                    return this._screenHeight;
                }
            } else {
                const direction: SlideHorizontalDirection | undefined = (config as SlideHorizontalAnimationConfig).direction;
                if (direction === "ltr") {
                    return -this._screenWidth;
                } else {
                    return this._screenWidth;
                }
            }
        } else return config.initialOffset;
    }

    private _getFinalTranslateValue(props: SlideAnimationProps): number {
        const config = props.animationConfig as SlideAnimationConfig;
        return config.finalOffset;
    }
}
