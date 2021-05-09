"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableAnimationWrapper = void 0;

var _reactNative = require("react-native");

var _react = _interopRequireDefault(require("react"));

var _BaseAnimationWrapper = require("./BaseAnimationWrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DraggableAnimationWrapper extends _BaseAnimationWrapper.BaseAnimationWrapper {
  constructor(props) {
    super(props);

    _defineProperty(this, "finishAnimation", () => {
      this.stopAnimation(); // no extra op
    });

    this.state = {
      pan: new _reactNative.Animated.ValueXY(),
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, _extends({
      style: this.state.pan.getLayout()
    }, this.state.panResponder.panHandlers), content);
  }

  getAnimationStateFromProps(_) {
    const {
      pan
    } = this.state;
    return { ...this.state,
      panResponder: _reactNative.PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
          _reactNative.Animated.event([null, {
            dx: pan.x,
            dy: pan.y
          }])(e, gesture);
        },
        onPanResponderRelease: () => {
          _reactNative.Animated.spring(pan, // Auto-multiplexed
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

exports.DraggableAnimationWrapper = DraggableAnimationWrapper;
//# sourceMappingURL=DraggableAnimationWrapper.js.map