import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
export class WiggleAnimationWrapper extends BaseAnimationWrapper {
    constructor(props) {
        super(props);
        this.startAnimation = () => {
            this.animationStarted();
            this._wiggleAnimation.reset();
            this._wiggleAnimation.start(() => { this.animationFinished(); });
        };
        this.finishAnimation = () => {
            this.stopAnimation();
            // no extra op
        };
        this.state = this.getAnimationStateFromProps(props);
        const duration = props.animationConfig.animationDuration;
        const wiggleDistance = props.animationConfig.wiggleDistance;
        this._wiggleAnimation = Animated.sequence([
            Animated.timing(this.state.translateX, {
                duration: duration / 2,
                toValue: -wiggleDistance,
                useNativeDriver: false
            }),
            Animated.timing(this.state.translateX, {
                duration: duration,
                toValue: wiggleDistance,
                useNativeDriver: false
            }),
            Animated.timing(this.state.translateX, {
                duration: this.props.animationConfig.animationDuration / 2,
                toValue: 0,
                useNativeDriver: false
            })
        ]);
    }
    UNSAFE_componentWillReceiveProps(nextProps, _nextContext) {
        if (nextProps !== this.props) {
            const nextState = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }
    stopAnimation() {
        this._wiggleAnimation.stop();
    }
    resetAnimation() {
        this.stopAnimation();
        this.state.translateX.setValue(0);
    }
    renderAnimation(content) {
        const translateX = this.state.translateX;
        return (<Animated.View style={{
                justifyContent: 'center',
                alignItems: 'center',
                transform: [
                    { translateX }
                ]
            }}>
                {content}
            </Animated.View>);
    }
    getAnimationStateFromProps(_) {
        return {
            translateX: new Animated.Value(0),
            wiggleCount: 0
        };
    }
}
//# sourceMappingURL=WiggleAnimationWrapper.js.map