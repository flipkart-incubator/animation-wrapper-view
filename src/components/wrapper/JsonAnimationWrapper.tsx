import { Animated, Easing, EasingFunction } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationProps } from "../../utils/Interfaces";
import { InterpolationFunction, JsonAnimation } from '../../models/JsonAnimation';

interface JsonAnimationState {
    animation: Animated.Value[]
}

export interface JsonAnimationProps extends AnimationProps {
    animationConfig: JsonAnimation
}

export class JsonAnimationWrapper extends BaseAnimationWrapper<JsonAnimationProps, JsonAnimationState> {

    private transformAnimation: any[][] = [];
    private _compositeAnimation: Animated.CompositeAnimation;

    public constructor(props: JsonAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);
        this._compositeAnimation = this.getCompositeAnimation();

        this.updateFromProps(this.props);
    }

    private getCompositeAnimation(): Animated.CompositeAnimation {
        if (this.props.animationConfig.animation.length === 1) {
            const animationDescription = this.props.animationConfig.animation[0];

            return Animated.timing(this.state.animation[0], {
                toValue: 1,
                duration: animationDescription.duration,
                easing: this.getEasingFunction(animationDescription.interpolation),
                useNativeDriver: false
            });
        } else {
            const animationSequence: Animated.CompositeAnimation[] = [];
            for (let i = 0; i < this.props.animationConfig.animation.length; i++) {
                const animationDescription = this.props.animationConfig.animation[i];
                animationSequence.push(Animated.timing(this.state.animation[i], {
                    toValue: 1,
                    duration: animationDescription.duration,
                    easing: this.getEasingFunction(animationDescription.interpolation),
                    useNativeDriver: false
                }));
            }
            return Animated.sequence(animationSequence);
        }
    }

    private updateFromProps(props: JsonAnimationProps) {
        const jsonAnimation = props.animationConfig as JsonAnimation;

        for (let animationIndex = 0; animationIndex < jsonAnimation.animation.length; animationIndex++) {
            if (this.transformAnimation[animationIndex] === undefined) {
                this.transformAnimation[animationIndex] = [];
            }
            const transformations = jsonAnimation.animation[animationIndex].transformations;
            for (let transformIndex = 0; transformIndex < transformations.length; transformIndex++) {
                const transformation = transformations[transformIndex];
                switch (transformation.key) {
                    case "TRANSLATE_X":
                        const translateX = this.state.animation[animationIndex].interpolate({
                            inputRange: [0, 1],
                            outputRange: [transformation.from, transformation.to]
                        });
                        this.transformAnimation[animationIndex].push({ translateX });
                        break;
                    case "TRANSLATE_Y":
                        const translateY = this.state.animation[animationIndex].interpolate({
                            inputRange: [0, 1],
                            outputRange: [transformation.from, transformation.to]
                        });
                        this.transformAnimation[animationIndex].push({ translateY });
                        break;
                    case "SCALE":
                        const scale = this.state.animation[animationIndex].interpolate({
                            inputRange: [0, 1],
                            outputRange: [transformation.from, transformation.to]
                        });
                        this.transformAnimation[animationIndex].push({ scale });
                        break;
                    case "SCALE_X":
                        const scaleX = this.state.animation[animationIndex].interpolate({
                            inputRange: [0, 1],
                            outputRange: [transformation.from, transformation.to]
                        });
                        this.transformAnimation[animationIndex].push({ scaleX });
                        break;
                    case "SCALE_Y":
                        const scaleY = this.state.animation[animationIndex].interpolate({
                            inputRange: [0, 1],
                            outputRange: [transformation.from, transformation.to]
                        });
                        this.transformAnimation[animationIndex].push({ scaleY });
                        break;
                    case "ROTATE":
                        const rotate = this.state.animation[animationIndex].interpolate({
                            inputRange: [0, 1],
                            outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                        });
                        this.transformAnimation[animationIndex].push({ rotate });
                        break;
                    case "ROTATE_X":
                        const rotateX = this.state.animation[animationIndex].interpolate({
                            inputRange: [0, 1],
                            outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                        });
                        this.transformAnimation[animationIndex].push({ rotateX });
                        break;
                    case "ROTATE_Y":
                        const rotateY = this.state.animation[animationIndex].interpolate({
                            inputRange: [0, 1],
                            outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                        });
                        this.transformAnimation[animationIndex].push({ rotateY });
                        break;

                }
            }
        }
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<JsonAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: JsonAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);

                this.updateFromProps(nextProps);
            }
        }
    }

    public startAnimation(): void {
        this._compositeAnimation.reset();
        this._compositeAnimation.start(() => { this.animationFinished() });
    }

    public pauseAnimation(): void {
        this._compositeAnimation.stop();
    }

    public resetAnimation(): void {
        this.pauseAnimation();
        for (let i = 0; i < this.props.animationConfig.animation.length; i++) {
            this.state.animation[i].setValue(0);
        }
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const transformArray = this.transformAnimation[0].concat(this.transformAnimation[1]);
        return (
            <Animated.View style={{ transform: transformArray }}>
                {content}
            </Animated.View>
        );
    }

    private getEasingFunction(interpolation?: InterpolationFunction): EasingFunction {
        switch (interpolation?.easing) {
            case "linear":
                return Easing.linear;
            case "quad":
                return Easing.quad;
            case "circle":
                return Easing.circle;
            case "elastic":
                const bounciness = interpolation?.params?.bounciness;
                if (bounciness && !isNaN(bounciness)) {
                    return Easing.elastic(bounciness);
                }
            case "bounce":
                return Easing.bounce;
            case "back":
                const back = interpolation?.params?.back;
                if (back && !isNaN(back)) {
                    return Easing.back(back);
                }
            default:
                return Easing.linear;
        }
    }

    protected getAnimationStateFromProps(props: JsonAnimationProps): JsonAnimationState {
        const jsonAnimationState: JsonAnimationState = {
            animation: []
        };
        for (let i = 0; i < props.animationConfig.animation.length; i++) {
            const animationObj = new Animated.Value(0);
            jsonAnimationState.animation.push(animationObj);
        }
        return jsonAnimationState;
    }
}
