"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseAnimationWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _Enums = require("../../data/Enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BaseAnimationWrapper extends _react.default.Component {
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

      if (pressParam && pressParam.triggerType === _Enums.AnimationTriggerType.ON_CLICK) {
        this.startAnimation();
      }
    });
  }

  componentDidMount() {
    const {
      triggerDelay,
      triggerType
    } = this.props.animationConfig;

    if (triggerType === _Enums.AnimationTriggerType.ON_LOAD) {
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

    if (this.props.animationConfig.type !== _Enums.AnimationType.DRAGGABLE) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
        onPress: this._onPress
      }, this.renderAnimation(content));
    } else {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, this.renderAnimation(content));
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

}

exports.BaseAnimationWrapper = BaseAnimationWrapper;
//# sourceMappingURL=BaseAnimationWrapper.js.map