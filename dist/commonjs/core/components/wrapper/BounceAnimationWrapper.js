"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BounceAnimationWrapper = void 0;

var _reactNative = require("react-native");

var _react = _interopRequireDefault(require("react"));

var _BaseAnimationWrapper = require("./BaseAnimationWrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BounceAnimationWrapper extends _BaseAnimationWrapper.BaseAnimationWrapper {
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
    this._bounceAnimation = _reactNative.Animated.sequence([_reactNative.Animated.timing(translateY, {
      duration: animationConfig.animationDuration / 3,
      toValue: -animationConfig.bounceHeight,
      easing: _reactNative.Easing.bezier(0, 0.55, 0.45, 1),
      useNativeDriver: false
    }), _reactNative.Animated.timing(translateY, {
      duration: animationConfig.animationDuration / 2,
      toValue: 0,
      easing: _reactNative.Easing.bounce,
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
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
      translateY: new _reactNative.Animated.Value(0)
    };
  }

}

exports.BounceAnimationWrapper = BounceAnimationWrapper;
//# sourceMappingURL=BounceAnimationWrapper.js.map