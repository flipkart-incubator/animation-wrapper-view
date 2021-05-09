function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationType } from '../../data/Enums';
import getEasingFunction from "../Utils";
export class FadeAnimationWrapper extends BaseAnimationWrapper {
  constructor(props) {
    super(props);

    _defineProperty(this, "_fadeAnimation", void 0);

    _defineProperty(this, "startAnimation", () => {
      this.animationStarted();

      this._fadeAnimation.reset();

      this._fadeAnimation.start(() => {
        this.animationFinished();
      });
    });

    _defineProperty(this, "stopAnimation", () => {
      this._fadeAnimation.stop();
    });

    _defineProperty(this, "resetAnimation", () => {
      this.stopAnimation();
      this.state.opacity.setValue(this._getInitialOpacity(this.props));
    });

    _defineProperty(this, "finishAnimation", () => {
      this.stopAnimation();
      this.state.opacity.setValue(this._getFinalOpacity(this.props));
    });

    this.state = this.getAnimationStateFromProps(props);
    const {
      animationConfig
    } = this.props;
    let duration;
    let toValue;

    if (animationConfig.type === AnimationType.FADE_IN) {
      const fadeInConfig = animationConfig;
      duration = fadeInConfig.animationDuration;
      toValue = 1;
    } else {
      const fadeOutConfig = animationConfig;
      duration = fadeOutConfig.animationDuration;
      toValue = fadeOutConfig.finalOpacity ? fadeOutConfig.finalOpacity : 0;
    }

    this._fadeAnimation = Animated.timing(this.state.opacity, {
      duration: duration,
      toValue: toValue,
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

  renderAnimation(content) {
    const opacity = this.state.opacity;
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: {
        justifyContent: 'center',
        alignItems: 'center',
        opacity
      }
    }, content);
  }

  getAnimationStateFromProps(props) {
    return {
      opacity: new Animated.Value(this._getInitialOpacity(props))
    };
  }

  _getInitialOpacity(props) {
    if (props.animationConfig.type === AnimationType.FADE_IN) {
      const config = props.animationConfig;
      return config.initialOpacity ? config.initialOpacity : 0;
    } else {
      return 1;
    }
  }

  _getFinalOpacity(props) {
    if (props.animationConfig.type === AnimationType.FADE_OUT) {
      const config = props.animationConfig;
      return config.finalOpacity ? config.finalOpacity : 0;
    } else {
      return 1;
    }
  }

}
//# sourceMappingURL=FadeAnimationWrapper.js.map