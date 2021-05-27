import { Animated, Dimensions, TransformsStyle } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import {
    SlideAnimationConfig,
    SlideHorizontalAnimationConfig,
    SlideHorizontalDirection,
    SlideVerticalAnimationConfig,
    SlideVerticalDirection
} from '../../data/SlideAnimationConfig';
import { AnimationType } from '../../data/Enums';
import { SlideAnimationProps } from '../../Types';
import getEasingFunction from "../Utils";

export interface SlideHorizontalAnimationProps extends SlideAnimationProps {
    animationConfig: SlideHorizontalAnimationConfig;
}

export interface SlideVerticalAnimationProps extends SlideAnimationProps {
    animationConfig: SlideVerticalAnimationConfig;
}

export class SlideAnimationWrapper extends BaseAnimationWrapper<SlideAnimationProps> {

    private translate: Animated.Value;

    private _screenWidth: number;
    private _screenHeight: number;
    private _animationType?: AnimationType;

    public constructor(props: SlideAnimationProps) {
        super(props);
        this._screenWidth = Math.round(Dimensions.get('window').width);
        this._screenHeight = Math.round(Dimensions.get('window').height);
        this.translate = new Animated.Value(this._getInitialTranslateValue(props));
    }

    public finishAnimation(): void {
        this.stopAnimation();
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        if (this.props.animationConfig.type === AnimationType.SLIDE_HORIZONTAL) {
            return (
                <Animated.View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        { translateX: this.translate }
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
                        { translateY: this.translate }
                    ]
                }}>
                    {content}
                </Animated.View>
            );
        }

    }

    protected updateCompositeAnimation() {
        const { animationConfig } = this.props;
        this._animationType = animationConfig.type;

        const config = animationConfig as SlideAnimationConfig;
        let fromValue: number = this._getInitialTranslateValue(this.props);
        let toValue: number = config.finalOffset;
        let duration: number = config.animationDuration;
        this.translate.setValue(fromValue);
        this._compositeAnimation = Animated.timing(this.translate, {
            duration: duration,
            toValue: toValue,
            easing: getEasingFunction(animationConfig.interpolationDef),
            useNativeDriver: false
        });
    }

    private _getInitialTranslateValue(props: SlideAnimationProps): number {
        const config = props.animationConfig as SlideAnimationConfig;
        if (config.initialOffset === undefined) {
            if (config.type === AnimationType.SLIDE_VERTICAL) {
                const direction: SlideVerticalDirection | undefined = (config as SlideVerticalAnimationConfig).direction;
                if (direction === "up_down") {
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
