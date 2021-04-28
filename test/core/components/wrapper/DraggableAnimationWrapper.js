import { Animated, PanResponder } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
export class DraggableAnimationWrapper extends BaseAnimationWrapper {
    constructor(props) {
        super(props);
        this.finishAnimation = () => {
            this.stopAnimation();
            // no extra op
        };
        this.state = {
            pan: new Animated.ValueXY(),
            panResponder: undefined
        };
        this.state = this.getAnimationStateFromProps(props);
    }
    UNSAFE_componentWillReceiveProps(nextProps, _nextContext) {
        if (nextProps !== this.props) {
            const nextState = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }
    renderAnimation(content) {
        return (<Animated.View style={this.state.pan.getLayout()} {...this.state.panResponder.panHandlers}>
                {content}
            </Animated.View>);
    }
    getAnimationStateFromProps(_) {
        const { pan } = this.state;
        return Object.assign(Object.assign({}, this.state), { panResponder: PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (e, gesture) => {
                    Animated.event([
                        null,
                        {
                            dx: pan.x,
                            dy: pan.y,
                        },
                    ])(e, gesture);
                },
                onPanResponderRelease: () => {
                    Animated.spring(pan, // Auto-multiplexed
                    { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Back to zero
                    ).start();
                }
            }) });
    }
    stopAnimation() {
        // this.state.translateY.stopAnimation();
    }
    resetAnimation() {
        this.stopAnimation();
        this.setState(this.getAnimationStateFromProps(this.props));
    }
    startAnimation() {
        // no-op
    }
}
//# sourceMappingURL=DraggableAnimationWrapper.js.map