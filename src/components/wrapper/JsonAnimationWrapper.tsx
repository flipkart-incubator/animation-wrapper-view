import { Animated, Easing, EasingFunction } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationProps } from "../../utils/Interfaces";
import { InterpolationDef, JsonAnimation } from '../../models/JsonAnimation';

interface JsonAnimationState {
    animation: Animated.Value[]
}

export interface JsonAnimationProps extends AnimationProps {
    animationConfig: JsonAnimation
}

export class JsonAnimationWrapper extends BaseAnimationWrapper<JsonAnimationProps, JsonAnimationState> {


    private animation: Animated.Value[]

    private transformAnimation: any[][] = [];
    private _compositeAnimation: Animated.CompositeAnimation;

    public constructor(props: JsonAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);     
        this._compositeAnimation = this.getCompositeAnimation(this.props);
        this._updateFromProps(this.props);

    }

    public componentDidMount() {
        this._compositeAnimation = this.getCompositeAnimation(this.props);
        this._updateFromProps(this.props);

        super.componentDidMount();
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<JsonAnimationProps>, _nextContext: any): void {
        if (this.props !== nextProps) {
            const nextState: JsonAnimationState | null = this.getAnimationStateFromProps(nextProps);
            this.setState(nextState);
            this._compositeAnimation = this.getCompositeAnimation(nextProps);
            this._updateFromProps(nextProps);
        }
    }

    public startAnimation(): void {
        this._compositeAnimation?.reset();
        this._compositeAnimation?.start(() => { this.animationFinished() });
    }

    public pauseAnimation(): void {
        this._compositeAnimation?.stop();
    }

    public resetAnimation(): void {
        this.pauseAnimation();
        if (Array.isArray(this.props.animationConfig.animationConfig)) {
            for (let i = 0; i < this.props.animationConfig.animationConfig.length; i++) {
                this.state.animation[i] && this.state.animation[i].setValue(0);
            }
        } else {
            this.state.animation[0] && this.state.animation[0].setValue(0);
        }
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        const transformArray = this._getTransformArray();
        return (
            <Animated.View style={{ transform: transformArray }}>
                {content}
            </Animated.View>
        );
    }

    protected getAnimationStateFromProps(props: JsonAnimationProps): JsonAnimationState {
        const jsonAnimationState: JsonAnimationState = {
            animation: []
        };

        if (Array.isArray(props.animationConfig.animationConfig)) {
            for (let i = 0; i < props.animationConfig.animationConfig.length; i++) {
                const animationObj = new Animated.Value(0);
                jsonAnimationState.animation.push(animationObj);
            }
            return jsonAnimationState;
        } else {
            return {
                animation: [new Animated.Value(0)]
            }
        }
    }


    private getCompositeAnimation(props: JsonAnimationProps): Animated.CompositeAnimation {

        const animationSequence: Animated.CompositeAnimation[] = [];
        if (Array.isArray(props.animationConfig.animationConfig)) {
            for (let i = 0; i < props.animationConfig.animationConfig.length; i++) {
                const animationDescription = props.animationConfig.animationConfig[i];
                animationSequence.push(Animated.timing(this.state.animation[i], {
                    toValue: 1,
                    duration: animationDescription.d,
                    easing: this._getEasingFunction(animationDescription.i),
                    useNativeDriver: false
                }));
            }
            return Animated.sequence(animationSequence);
        } else {
            const animationDef = props.animationConfig.animationConfig;
            return Animated.timing(this.state.animation[0], {
                toValue: 1,
                duration: animationDef.d,
                easing: this._getEasingFunction(animationDef.i),
                useNativeDriver: false
            });
        }
    }

    private _updateFromProps(props: JsonAnimationProps) {
        const jsonAnimation = props.animationConfig as JsonAnimation;
        this.transformAnimation = [];

        if (Array.isArray(jsonAnimation.animationConfig)) {
            for (let animationIndex = 0; animationIndex < jsonAnimation.animationConfig.length; animationIndex++) {
                if (this.transformAnimation[animationIndex] === undefined) {
                    this.transformAnimation[animationIndex] = [];
                }
                const transformations = jsonAnimation.animationConfig[animationIndex].tr;
                for (let transformIndex = 0; transformIndex < transformations.length; transformIndex++) {
                    this._appendTransform(transformations, transformIndex, animationIndex);
                }
            }
        } else {
            const animationDef = jsonAnimation.animationConfig;
            if (this.transformAnimation[0] === undefined) {
                this.transformAnimation[0] = [];
            }
            const transformations = animationDef.tr;
            for (let transformIndex = 0; transformIndex < transformations.length; transformIndex++) {
                this._appendTransform(transformations, transformIndex, 0);
            }
        }
    }

    private _appendTransform(transformations: any, transformIndex: number, animationIndex: number) {
        console.log('swapnil', 'append animationIndex:', animationIndex, ' transformIndex: ', transformIndex);
        const transformation = transformations[transformIndex];
        switch (transformation.key) {
            case "translateX":
                const translateX = this.state.animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.f, transformation.t]
                });
                this.transformAnimation[animationIndex].push({ translateX });
                break;
            case "translateY":
                const translateY = this.state.animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.f, transformation.t]
                });
                this.transformAnimation[animationIndex].push({ translateY });
                break;
            case "scale":
                const scale = this.state.animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.f, transformation.t]
                });
                this.transformAnimation[animationIndex].push({ scale });
                break;
            case "scaleX":
                const scaleX = this.state.animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.f, transformation.t]
                });
                this.transformAnimation[animationIndex].push({ scaleX });
                break;
            case "scaleY":
                const scaleY = this.state.animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [transformation.f, transformation.t]
                });
                this.transformAnimation[animationIndex].push({ scaleY });
                break;
            case "rotate":
                const rotate = this.state.animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${transformation.f}deg`, `${transformation.t}deg`]
                });
                this.transformAnimation[animationIndex].push({ rotate });
                break;
            case "rotateX":
                const rotateX = this.state.animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${transformation.f}deg`, `${transformation.t}deg`]
                });
                this.transformAnimation[animationIndex].push({ rotateX });
                break;
            case "rotateY":
                const rotateY = this.state.animation[animationIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${transformation.f}deg`, `${transformation.t}deg`]
                });
                this.transformAnimation[animationIndex].push({ rotateY });
                break;

        }
    }

    private _getTransformArray(): any[] {

        let transforms: any[] = [];
        for (let i = 0; i < this.transformAnimation.length; i++) {
            transforms = transforms.concat(this.transformAnimation[i]);
        }
        return transforms;
    }

    private _getEasingFunction(interpolation?: InterpolationDef): EasingFunction {
        switch (interpolation?.e) {
            case "linear":
                return Easing.linear;
            case "quad":
                return Easing.quad;
            case "circle":
                return Easing.circle;
            case "elastic":
                const bounciness = interpolation?.p?.bounciness;
                if (bounciness && !isNaN(bounciness)) {
                    return Easing.elastic(bounciness);
                }
            case "bounce":
                return Easing.bounce;
            case "back":
                const back = interpolation?.p?.back;
                if (back && !isNaN(back)) {
                    return Easing.back(back);
                }
            default:
                return Easing.linear;
        }
    }
}
