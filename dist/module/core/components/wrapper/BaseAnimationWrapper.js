function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { AnimationTriggerType, AnimationType } from '../../data/Enums';
export class BaseAnimationWrapper extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "animationFinished", () => {
      if (this.props.onAnimationFinish) {
        this.props.onAnimationFinish();
      }
    });

    _defineProperty(this, "animationStarted", () => {
      if (this.props.onAnimationStart) {
        this.props.onAnimationStart();
      }
    });

    _defineProperty(this, "_onPress", _ => {
      const pressParam = this.props.animationConfig;

      if (pressParam && pressParam.triggerType === AnimationTriggerType.ON_CLICK) {
        this.startAnimation();
      }
    });
  }

  componentDidMount() {
    const {
      triggerDelay,
      triggerType
    } = this.props.animationConfig;

    if (triggerType === AnimationTriggerType.ON_LOAD) {
      if (triggerDelay) {
        setTimeout(() => {
          this.startAnimation();
        }, triggerDelay);
      } else {
        this.startAnimation();
      }
    }
  }

  render() {
    const content = this.props.children;

    if (this.props.animationConfig.type !== AnimationType.DRAGGABLE) {
      return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
        onPress: this._onPress
      }, this.renderAnimation(content));
    } else {
      return /*#__PURE__*/React.createElement(View, null, this.renderAnimation(content));
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

}
//# sourceMappingURL=BaseAnimationWrapper.js.map