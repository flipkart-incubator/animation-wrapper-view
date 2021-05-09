function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Animated, Easing } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
export class BounceAnimationWrapper extends BaseAnimationWrapper {
  constructor(props) {
    super(props);

    _defineProperty(this, "_bounceAnimation", void 0);

    _defineProperty(this, "startAnimation", () => {
      this.animationStarted();

      this._bounceAnimation.reset();

      this._bounceAnimation.start(() => {
        this.animationFinished();
      });
    });

    _defineProperty(this, "stopAnimation", () => {
      this._bounceAnimation.stop();
    });

    _defineProperty(this, "resetAnimation", () => {
      this.stopAnimation();
      this.state.translateY.setValue(0);
    });

    _defineProperty(this, "finishAnimation", () => {
      this.stopAnimation(); // no extra op
    });

    this.state = this.getAnimationStateFromProps(props);
    const {
      animationConfig
    } = this.props;
    const {
      translateY
    } = this.state;
    this._bounceAnimation = Animated.sequence([Animated.timing(translateY, {
      duration: animationConfig.animationDuration / 3,
      toValue: -animationConfig.bounceHeight,
      easing: Easing.bezier(0, 0.55, 0.45, 1),
      useNativeDriver: false
    }), Animated.timing(translateY, {
      duration: animationConfig.animationDuration / 2,
      toValue: 0,
      easing: Easing.bounce,
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

  renderAnimation(content) {
    const translateY = this.state.translateY;
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: {
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{
          translateY
        }]
      }
    }, content);
  }

  getAnimationStateFromProps(_) {
    return {
      translateY: new Animated.Value(0)
    };
  }

}
//# sourceMappingURL=BounceAnimationWrapper.js.map