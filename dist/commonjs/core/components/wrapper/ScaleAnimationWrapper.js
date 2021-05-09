"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaleAnimationWrapper = void 0;

var _reactNative = require("react-native");

var _react = _interopRequireDefault(require("react"));

var _BaseAnimationWrapper = require("./BaseAnimationWrapper");

var _Utils = _interopRequireDefault(require("../Utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ScaleAnimationWrapper extends _BaseAnimationWrapper.BaseAnimationWrapper {
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
    this._scaleAnimation = _reactNative.Animated.timing(this.state.scale, {
      duration: animationConfig.scaleDuration,
      toValue: this.isScaled ? 1 : animationConfig.toScale,
      easing: (0, _Utils.default)(animationConfig.interpolationDef),
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
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
      scale: new _reactNative.Animated.Value(1)
    };
  }

}

exports.ScaleAnimationWrapper = ScaleAnimationWrapper;
//# sourceMappingURL=ScaleAnimationWrapper.js.map