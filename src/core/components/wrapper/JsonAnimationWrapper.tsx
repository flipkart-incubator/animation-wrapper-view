import { Animated, TransformsStyle, ViewStyle } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { JsonAnimationConfig, TransformDef } from '../../data/JsonAnimationConfig';
import { AnimationWrapperProps } from '../../Types';
import getEasingFunction from "../Utils";


export interface JsonAnimationProps extends AnimationWrapperProps {
    animationConfig: JsonAnimationConfig
}
export class JsonAnimationWrapper extends BaseAnimationWrapper<JsonAnimationProps> {
    private _animation: Animated.Value[] | undefined;
    private _transforms: any[][] = [];
    private _viewStyles: Record<string, any> = {};

    public constructor(props: JsonAnimationProps) {
        super(props);
        this.updateCompositeAnimation();
    }
   
    public resetAnimation ():void {
        this.stopAnimation();
        if (Array.isArray(this.props.animationConfig.animationConfig)) {
            for (let i = 0; i < this.props.animationConfig.animationConfig.length; i++) {
                this._animation && this._animation[i] && this._animation[i].setValue(0);
            }
        } else {
            this._animation && this._animation[0] && this._animation[0].setValue(0);
        }
    }

    public finishAnimation(): void {
        this.stopAnimation();
        if (Array.isArray(this.props.animationConfig.animationConfig)) {
            for (let i = 0; i < this.props.animationConfig.animationConfig.length; i++) {
                this._animation && this._animation[i] && this._animation[i].setValue(1);
            }
        } else {
            this._animation && this._animation[0] && this._animation[0].setValue(1);
        }
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const transformArray = this._getTransformArray();
        const animations: ViewStyle[] = this._getViewStyleAnimationArray();
        return (
            <Animated.View style={[{ transform: transformArray }, animations]}>
                {content}
            </Animated.View>
        );
    }

    protected getAnimationStateFromProps(_: JsonAnimationProps): {} {
        // unused
        return {};
    }

    protected updateCompositeAnimation(): void {
        this._updateAnimatedArray(this.props);
        this._updateCompositeAnimation(this.props);
        this._updateTransformsArray(this.props);
    }

    private _updateAnimatedArray(props: JsonAnimationProps): void {
        if (Array.isArray(props.animationConfig.animationConfig)) {
            if (this._animation === undefined) {
                this._animation = [];
                for (let i = 0; i < props.animationConfig.animationConfig.length; i++) {
                    const animationObj = new Animated.Value(0);
                    this._animation.push(animationObj);
                }
                return;
            }
            const totalAnimationValues = props.animationConfig.animationConfig.length;
            if (this._animation.length < totalAnimationValues) {
                for (let itr = this._animation.length; itr < totalAnimationValues; itr++) {
                    const animationObj = new Animated.Value(0);
                    this._animation.push(animationObj);
                }
                return;
            } else {
                return;
            }
        } else {
            if (this._animation === undefined) {
                this._animation = [];
                const animationObj = new Animated.Value(0);
                this._animation.push(animationObj);
            } else {
                if (this._animation.length === 0) {
                    const animationObj = new Animated.Value(0);
                    this._animation.push(animationObj);
                }
            }
        }
        for (let i = 0; i < this._animation.length; i++) {
            this._animation[i].setValue(0);
        }
    }

    private _updateCompositeAnimation(props: JsonAnimationProps): void {
        const animationSequence: Animated.CompositeAnimation[] = [];
        if (Array.isArray(props.animationConfig.animationConfig)) {
            for (let i = 0; i < props.animationConfig.animationConfig.length; i++) {
                const animationDef = props.animationConfig.animationConfig[i];
                if (this._animation) {
                    animationSequence.push(Animated.timing(this._animation[i], {
                        toValue: 1,
                        duration: animationDef.duration,
                        easing: getEasingFunction(animationDef.interpolation),
                        useNativeDriver: false
                    }));
                }
            }
            this._compositeAnimation = Animated.sequence(animationSequence);
        } else {
            const animationDef = props.animationConfig.animationConfig;
            if (this._animation) {
                this._compositeAnimation = Animated.timing(this._animation[0], {
                    toValue: 1,
                    duration: animationDef.duration,
                    easing: getEasingFunction(animationDef.interpolation),
                    useNativeDriver: false
                });
            }
        }
    }

    private _updateTransformsArray(props: JsonAnimationProps): void {
        const jsonAnimation = props.animationConfig as JsonAnimationConfig;
        this._transforms = [];
        this._viewStyles = {};

        if (Array.isArray(jsonAnimation.animationConfig)) {
            for (let animationIndex = 0; animationIndex < jsonAnimation.animationConfig.length; animationIndex++) {
                if (this._transforms[animationIndex] === undefined) {
                    this._transforms[animationIndex] = [];
                }
                const transformations = jsonAnimation.animationConfig[animationIndex].transforms;
                for (let transformIndex = 0; transformIndex < transformations.length; transformIndex++) {
                    this._appendTransform(transformations, transformIndex, animationIndex);
                }
            }
        } else {
            const animationDef = jsonAnimation.animationConfig;
            if (this._transforms[0] === undefined) {
                this._transforms[0] = [];
            }
            const transformations = animationDef.transforms;
            for (let transformIndex = 0; transformIndex < transformations.length; transformIndex++) {
                this._appendTransform(transformations, transformIndex, 0);
            }
        }
    }

    private _appendTransform(transformations: TransformDef[], transformIndex: number, animationIndex: number): void {
        const transformation: TransformDef = transformations[transformIndex];
        if (this._animation === undefined || this._animation[animationIndex] === undefined || this._transforms[animationIndex] === undefined) {

            return;
        }
        switch (transformation.key) {
            case "translateX":
                const translateX = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.from, transformation.to]
                });
                this._transforms[animationIndex].push({ translateX });
                break;
            case "translateY":
                const translateY = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.from, transformation.to]
                });
                this._transforms[animationIndex].push({ translateY });
                break;
            case "scale":
                const scale = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.from, transformation.to]
                });
                this._transforms[animationIndex].push({ scale });
                break;
            case "scaleX":
                const scaleX = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.from, transformation.to]
                });
                this._transforms[animationIndex].push({ scaleX });
                break;
            case "scaleY":
                const scaleY = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.from, transformation.to]
                });
                this._transforms[animationIndex].push({ scaleY });
                break;
            case "rotate":
                const rotate = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                });
                this._transforms[animationIndex].push({ rotate });
                break;
            case "rotateX":
                const rotateX = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                });
                this._transforms[animationIndex].push({ rotateX });
                break;
            case "rotateY":
                const rotateY = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                });
                this._transforms[animationIndex].push({ rotateY });
                break;
            case "rotateZ":
                const rotateZ = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                });
                this._transforms[animationIndex].push({ rotateZ });
                break;

            case "skewX":
                const skewX = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                });
                this._transforms[animationIndex].push({ skewX });
                break;
            case "skewY":
                const skewY = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                });
                this._transforms[animationIndex].push({ skewY });
                break;
            case "opacity":
                const opacity = this._animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.from, transformation.to]
                });
                this._viewStyles = { ...this._viewStyles, opacity: opacity };
                break;

        }
    }

    private _getTransformArray(): any[] {
        let transforms: any[] = [];
        for (let i = 0; i < this._transforms.length; i++) {
            transforms = transforms.concat(this._transforms[i]);
        }
        return transforms;
    }

    private _getViewStyleAnimationArray(): ViewStyle[] {
        let animations: ViewStyle[] = [];
        for (let [key, value] of Object.entries(this._viewStyles)) {
            if (key === 'opacity') {
                animations.push({ opacity: value });
            }
        }
        return animations;
    }
}
