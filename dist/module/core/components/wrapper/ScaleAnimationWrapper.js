function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Animated } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import getEasingFunction from "../Utils";
export class ScaleAnimationWrapper extends BaseAnimationWrapper {
  constructor(props) {
    super(props);

    _defineProperty(this, "isScaled", void 0);

    _defineProperty(this, "_scaleAnimation", void 0);

    _defineProperty(this, "finishAnimation", () => {
      this.stopAnimation();
      this.state.scale.setValue(this.props.animationConfig.toScale);
    });

    this.state = this.getAnimationStateFromProps(props);
    this.isScaled = false;
    const {
      animationConfig
    } = this.props;
    this._scaleAnimation = Animated.timing(this.state.scale, {
      duration: animationConfig.scaleDuration,
      toValue: this.isScaled ? 1 : animationConfig.toScale,
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

    this._scaleAnimation.start(() => {
      this.animationFinished();
    });
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
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: {
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{
          scale
        }]
      }
    }, content);
  }

  getAnimationStateFromProps(_) {
    return {
      scale: new Animated.Value(1)
    };
  }

}
//# sourceMappingURL=ScaleAnimationWrapper.js.map