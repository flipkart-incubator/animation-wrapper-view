import { Animated, View } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationProps } from "../../utils/Interfaces";
import { JsonAnimation, TimingFunction } from '../../models/JsonAnimation';

interface JsonAnimationState {
    animation: Animated.Value
}

export interface JsonAnimationProps extends AnimationProps {
    animationConfig: JsonAnimation
}

export class JsonAnimationWrapper extends BaseAnimationWrapper<JsonAnimationProps, JsonAnimationState> {

    private transformAnimation: any[] = [];
    
    private _compositeAnimation: Animated.CompositeAnimation;
    

    public constructor(props: JsonAnimationProps) {
        super(props);
        this.state = this.getAnimationStateFromProps(props);
        this.updateFromProps(props);
        
        this._compositeAnimation = this.getCompositeAnimation(props.animationConfig.animation.timing);
    }

    private getCompositeAnimation(timing: TimingFunction): Animated.CompositeAnimation{
        // TODO (Swapnil) :: add interpolation implementation
        return Animated.timing(this.state.animation, {
            toValue: 1,
            duration: timing.duration,
            useNativeDriver: false
        });
    }

    private updateFromProps(props: JsonAnimationProps) {
        const jsonAnimation = props.animationConfig as JsonAnimation;
        const transformations = jsonAnimation.animation.transformations;

        for (let i = 0; i < transformations.length; i++) {
            const transformation = transformations[i];
            switch (transformation.key) {
                case "TRANSLATE_X":
                    const translateX = this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from, transformation.to]
                    });
                    this.transformAnimation.push({ translateX });
                    break;
                case "TRANSLATE_Y":
                    const translateY = this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from, transformation.to]
                    });
                    this.transformAnimation.push({ translateY });
                    break;
                case "SCALE":
                    const scale = this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from, transformation.to]
                    });
                    this.transformAnimation.push({ scale });
                    break;
                case "SCALE_X":
                    const scaleX = this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from, transformation.to]
                    });
                    this.transformAnimation.push({ scaleX });
                    break;
                case "SCALE_Y":
                    const scaleY = this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from, transformation.to]
                    });
                    this.transformAnimation.push({ scaleY });
                    break;
                case "ROTATE":
                    const rotate = this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                    });
                    this.transformAnimation.push({ rotate });
                    break;
                case "ROTATE_X":
                    const rotateX = this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                    });
                    this.transformAnimation.push({ rotateX });
                    break;
                case "ROTATE_Y":
                    const rotateY = this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
                    });
                    this.transformAnimation.push({ rotateY });
                    break;
                
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
        this.state.animation.setValue(0);
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        return (
            <Animated.View style={{transform: this.transformAnimation}}>
                {content}
            </Animated.View>
        );
    }

    protected getAnimationStateFromProps(_: JsonAnimationProps): JsonAnimationState {
        return {
            animation: new Animated.Value(0)
        };
    }
}
