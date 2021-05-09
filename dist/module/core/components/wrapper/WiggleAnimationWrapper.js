function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
export class WiggleAnimationWrapper extends BaseAnimationWrapper {
  constructor(props) {
    super(props);

    _defineProperty(this, "_wiggleAnimation", void 0);

    _defineProperty(this, "startAnimation", () => {
      this.animationStarted();

      this._wiggleAnimation.reset();

      this._wiggleAnimation.start(() => {
        this.animationFinished();
      });
    });

    _defineProperty(this, "finishAnimation", () => {
      this.stopAnimation(); // no extra op
    });

    this.state = this.getAnimationStateFromProps(props);
    const duration = props.animationConfig.animationDuration;
    const wiggleDistance = props.animationConfig.wiggleDistance;
    this._wiggleAnimation = Animated.sequence([Animated.timing(this.state.translateX, {
      duration: duration / 2,
      toValue: -wiggleDistance,
      useNativeDriver: false
    }), Animated.timing(this.state.translateX, {
      duration: duration,
      toValue: wiggleDistance,
      useNativeDriver: false
    }), Animated.timing(this.state.translateX, {
      duration: this.props.animationConfig.animationDuration / 2,
      toValue: 0,
      useNativeDriver: false
    })]);
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
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: {
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{
          translateX
        }]
      }
    }, content);
  }

  getAnimationStateFromProps(_) {
    return {
      translateX: new Animated.Value(0),
      wiggleCount: 0
    };
  }

}
//# sourceMappingURL=WiggleAnimationWrapper.js.map