import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import getEasingFunction from "../Utils";
export class ScaleAnimationWrapper extends BaseAnimationWrapper {
    constructor(props) {
        super(props);
        this.finishAnimation = () => {
            this.stopAnimation();
            this.state.scale.setValue(this.props.animationConfig.toScale);
        };
        this.state = this.getAnimationStateFromProps(props);
        this.isScaled = false;
        const { animationConfig } = this.props;
        this._scaleAnimation = Animated.timing(this.state.scale, {
            duration: animationConfig.scaleDuration,
            toValue: (this.isScaled) ? 1 : animationConfig.toScale,
            easing: getEasingFunction(animationConfig.interpolationDef),
            useNativeDriver: false
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps, _nextContext) {
        if (nextProps !== this.props) {
            const nextState = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }
    startAnimation() {
        this.animationStarted();
        this._scaleAnimation.reset();
        this._scaleAnimation.start(() => { this.animationFinished(); });
    }
    stopAnimation() {
        this._scaleAnimation.stop();
    }
    resetAnimation() {
        this.stopAnimation();
        this.state.scale.setValue(1);
    }
    renderAnimation(content) {
        const scale = this.state.scale;
        return (<Animated.View style={{
                justifyContent: 'center',
                alignItems: 'center',
                transform: [
                    { scale }
                ]
            }}>
                {content}
            </Animated.View>);
    }
    getAnimationStateFromProps(_) {
        return {
            scale: new Animated.Value(1)
        };
    }
}
//# sourceMappingURL=ScaleAnimationWrapper.js.map