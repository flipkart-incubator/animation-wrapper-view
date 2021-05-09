function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Animated, Dimensions } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import { AnimationType } from '../../data/Enums';
import getEasingFunction from "../Utils";
export class SlideAnimationWrapper extends BaseAnimationWrapper {
  constructor(props) {
    super(props);

    _defineProperty(this, "_slideAnimation", void 0);

    _defineProperty(this, "_screenWidth", void 0);

    _defineProperty(this, "_screenHeight", void 0);

    _defineProperty(this, "_animationType", void 0);

    _defineProperty(this, "finishAnimation", () => {
      this.stopAnimation();
      this.state.translate.setValue(this._getFinalTranslateValue(this.props));
    });

    this._screenWidth = Math.round(Dimensions.get('window').width);
    this._screenHeight = Math.round(Dimensions.get('window').height);
    this.state = this.getAnimationStateFromProps(props);
    const {
      animationConfig
    } = this.props;
    this._animationType = animationConfig.type;
    const config = animationConfig;

    let fromValue = this._getInitialTranslateValue(this.props);

    let toValue = config.finalOffset;
    let duration = config.animationDuration;
    this.state.translate.setValue(fromValue);
    this._slideAnimation = Animated.timing(this.state.translate, {
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

  startAnimation() {
    this.animationStarted();

    this._slideAnimation.reset();

    this._slideAnimation.start(() => {
      this.animationFinished();
    });
  }

  stopAnimation() {
    this._slideAnimation.stop();
  }

  resetAnimation() {
    this.stopAnimation();
    this.state.translate.setValue(this._getInitialTranslateValue(this.props));
  }

  renderAnimation(content) {
    if (this._animationType === AnimationType.SLIDE_HORIZONTAL) {
      return /*#__PURE__*/React.createElement(Animated.View, {
        style: {
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{
            translateX: this.state.translate
          }]
        }
      }, content);
    } else {
      return /*#__PURE__*/React.createElement(Animated.View, {
        style: {
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{
            translateY: this.state.translate
          }]
        }
      }, content);
    }
  }

  getAnimationStateFromProps(props) {
    return {
      translate: new Animated.Value(this._getInitialTranslateValue(props))
    };
  }

  _getInitialTranslateValue(props) {
    const config = props.animationConfig;

    if (config.initialOffset === undefined || config.initialOffset === 0) {
      if (config.type === AnimationType.SLIDE_VERTICAL) {
        const direction = config.direction;

        if (direction === "top_down") {
          return -this._screenHeight;
        } else {
          return this._screenHeight;
        }
      } else {
        const direction = config.direction;

        if (direction === "ltr") {
          return -this._screenWidth;
        } else {
          return this._screenWidth;
        }
      }
    } else return config.initialOffset;
  }

  _getFinalTranslateValue(props) {
    const config = props.animationConfig;
    return config.finalOffset;
  }

}
//# sourceMappingURL=SlideAnimationWrapper.js.map