function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Animated, PanResponder } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
export class DraggableAnimationWrapper extends BaseAnimationWrapper {
  constructor(props) {
    super(props);

    _defineProperty(this, "finishAnimation", () => {
      this.stopAnimation(); // no extra op
    });

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
    return /*#__PURE__*/React.createElement(Animated.View, _extends({
      style: this.state.pan.getLayout()
    }, this.state.panResponder.panHandlers), content);
  }

  getAnimationStateFromProps(_) {
    const {
      pan
    } = this.state;
    return { ...this.state,
      panResponder: PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
          Animated.event([null, {
            dx: pan.x,
            dy: pan.y
          }])(e, gesture);
        },
        onPanResponderRelease: () => {
          Animated.spring(pan, // Auto-multiplexed
          {
            toValue: {
              x: 0,
              y: 0
            },
            useNativeDriver: false
          } // Back to zero
          ).start();
        }
      })
    };
  }

  stopAnimation() {// this.state.translateY.stopAnimation();
  }

  resetAnimation() {
    this.stopAnimation();
    this.setState(this.getAnimationStateFromProps(this.props));
  }

  startAnimation() {// no-op
  }

}
//# sourceMappingURL=DraggableAnimationWrapper.js.map