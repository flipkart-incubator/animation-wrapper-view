"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RippleAnimationWrapper = void 0;

var _reactNative = require("react-native");

var _react = _interopRequireDefault(require("react"));

var _BaseAnimationWrapper = require("./BaseAnimationWrapper");

var _Utils = _interopRequireDefault(require("../Utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RippleAnimationWrapper extends _BaseAnimationWrapper.BaseAnimationWrapper {
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
    this._rippleAnimation = _reactNative.Animated.loop(_reactNative.Animated.sequence([_reactNative.Animated.delay(animationConfig.rippleIntervalDuration), _reactNative.Animated.parallel([_reactNative.Animated.timing(scale, {
      duration: animationConfig.rippleDuration,
      toValue: 1,
      easing: (0, _Utils.default)(animationConfig.interpolationDef),
      useNativeDriver: false
    }), _reactNative.Animated.timing(opacity, {
      duration: animationConfig.rippleDuration,
      toValue: 0,
      easing: (0, _Utils.default)(animationConfig.interpolationDef),
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
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
      scale: new _reactNative.Animated.Value(0),
      opacity: new _reactNative.Animated.Value(1)
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

exports.RippleAnimationWrapper = RippleAnimationWrapper;
//# sourceMappingURL=RippleAnimationWrapper.js.map