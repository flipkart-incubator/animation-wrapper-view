import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import getEasingFunction from "../Utils";
export class JsonAnimationWrapper extends BaseAnimationWrapper {
    constructor(props) {
        super(props);
        this._transforms = [];
        this.startAnimation = () => {
            var _a, _b;
            this.animationStarted();
            (_a = this._compositeAnimation) === null || _a === void 0 ? void 0 : _a.reset();
            (_b = this._compositeAnimation) === null || _b === void 0 ? void 0 : _b.start(() => { this.animationFinished(); });
        };
        this.stopAnimation = () => {
            var _a;
            (_a = this._compositeAnimation) === null || _a === void 0 ? void 0 : _a.stop();
        };
        this.resetAnimation = () => {
            this.stopAnimation();
            if (Array.isArray(this.props.animationConfig.animationConfig)) {
                for (let i = 0; i < this.props.animationConfig.animationConfig.length; i++) {
                    this._animation && this._animation[i] && this._animation[i].setValue(0);
                }
            }
            else {
                this._animation && this._animation[0] && this._animation[0].setValue(0);
            }
        };
        this.finishAnimation = () => {
            this.stopAnimation();
            if (Array.isArray(this.props.animationConfig.animationConfig)) {
                for (let i = 0; i < this.props.animationConfig.animationConfig.length; i++) {
                    this._animation && this._animation[i] && this._animation[i].setValue(1);
                }
            }
            else {
                this._animation && this._animation[0] && this._animation[0].setValue(1);
            }
        };
        this.renderAnimation = (content) => {
            const transformArray = this._getTransformArray();
            return (<Animated.View style={{ transform: transformArray }}>
                {content}
            </Animated.View>);
        };
        this._updateAnimatedArray = (props) => {
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
                }
                else {
                    return;
                }
            }
            else {
                if (this._animation === undefined) {
                    this._animation = [];
                    const animationObj = new Animated.Value(0);
                    this._animation.push(animationObj);
                }
                else {
                    if (this._animation.length === 0) {
                        const animationObj = new Animated.Value(0);
                        this._animation.push(animationObj);
                    }
                }
            }
            for (let i = 0; i < this._animation.length; i++) {
                this._animation[i].setValue(0);
            }
        };
        this._updateCompositeAnimation = (props) => {
            const animationSequence = [];
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
            }
            else {
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
        };
        this._updateTransformsArray = (props) => {
            const jsonAnimation = props.animationConfig;
            this._transforms = [];
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
            }
            else {
                const animationDef = jsonAnimation.animationConfig;
                if (this._transforms[0] === undefined) {
                    this._transforms[0] = [];
                }
                const transformations = animationDef.transforms;
                for (let transformIndex = 0; transformIndex < transformations.length; transformIndex++) {
                    this._appendTransform(transformations, transformIndex, 0);
                }
            }
        };
        this._appendTransform = (transformations, transformIndex, animationIndex) => {
            const transformation = transformations[transformIndex];
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
            }
        };
        this._getTransformArray = () => {
            let transforms = [];
            for (let i = 0; i < this._transforms.length; i++) {
                transforms = transforms.concat(this._transforms[i]);
            }
            return transforms;
        };
        this._updateAnimatedArray(this.props);
        this._updateCompositeAnimation(this.props);
        this._updateTransformsArray(this.props);
    }
    shouldComponentUpdate(nextProps, _) {
        if (this.props.animationConfig !== nextProps.animationConfig) {
            this.resetAnimation();
            this._updateAnimatedArray(nextProps);
            this._updateCompositeAnimation(nextProps);
            this._updateTransformsArray(nextProps);
            return true;
        }
        return false;
    }
    getAnimationStateFromProps(_) {
        // unused
        return {};
    }
}
//# sourceMappingURL=JsonAnimationWrapper.js.map