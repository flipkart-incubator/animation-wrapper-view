function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Animated, View } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import getEasingFunction from "../Utils";
export class RippleAnimationWrapper extends BaseAnimationWrapper {
  constructor(props) {
    super(props);

    _defineProperty(this, "_rippleAnimation", void 0);

    _defineProperty(this, "finishAnimation", () => {
      this.stopAnimation(); // no extra op
    });

    this.state = this.getAnimationStateFromProps(props);
    const {
      animationConfig
    } = this.props;
    const {
      scale,
      opacity
    } = this.state;
    this._rippleAnimation = Animated.loop(Animated.sequence([Animated.delay(animationConfig.rippleIntervalDuration), Animated.parallel([Animated.timing(scale, {
      duration: animationConfig.rippleDuration,
      toValue: 1,
      easing: getEasingFunction(animationConfig.interpolationDef),
      useNativeDriver: false
    }), Animated.timing(opacity, {
      duration: animationConfig.rippleDuration,
      toValue: 0,
      easing: getEasingFunction(animationConfig.interpolationDef),
      useNativeDriver: false
    })])]), {
      iterations: animationConfig.rippleCount
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

    this._rippleAnimation.reset();

    this._rippleAnimation.start(() => {
      this.animationFinished();
    });
  }

  stopAnimation() {
    this._rippleAnimation.stop();
  }

  resetAnimation() {
    this.stopAnimation();
    this.state.opacity.setValue(1);
    this.state.scale.setValue(0);
  }

  renderAnimation(content) {
    const {
      scale,
      opacity
    } = this.state;
    const {
      animationConfig
    } = this.props;
    const rippleStyle = RippleAnimationWrapper.getRippleStyle(animationConfig.rippleRadius);
    return /*#__PURE__*/React.createElement(View, {
      style: {
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [rippleStyle, {
        backgroundColor: animationConfig.rippleColor,
        width: scale.interpolate({
          inputRange: [0, 1],
          outputRange: [0, animationConfig.rippleRadius * 2]
        }),
        height: scale.interpolate({
          inputRange: [0, 1],
          outputRange: [0, animationConfig.rippleRadius * 2]
        }),
        opacity
      }]
    }), content);
  }

  getAnimationStateFromProps(_) {
    return {
      scale: new Animated.Value(0),
      opacity: new Animated.Value(1)
    };
  }

  static getRippleStyle(contentWidth) {
    return {
      position: 'absolute',
      marginLeft: 0,
      marginTop: 0,
      borderRadius: contentWidth
    };
  }

}
//# sourceMappingURL=RippleAnimationWrapper.js.map