"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _RippleAnimationWrapper = require("./wrapper/RippleAnimationWrapper");

var _ScaleAnimationWrapper = require("./wrapper/ScaleAnimationWrapper");

var _BounceAnimationWrapper = require("./wrapper/BounceAnimationWrapper");

var _DraggableAnimationWrapper = require("./wrapper/DraggableAnimationWrapper");

var _FadeAnimationWrapper = require("./wrapper/FadeAnimationWrapper");

var _SlideAnimationWrapper = require("./wrapper/SlideAnimationWrapper");

var _WiggleAnimationWrapper = require("./wrapper/WiggleAnimationWrapper");

var _JsonAnimationWrapper = require("./wrapper/JsonAnimationWrapper");

var _Enums = require("../data/Enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AnimationWrapperView extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_component", void 0);

    _defineProperty(this, "_animatorRef", void 0);

    _defineProperty(this, "_setRef", ref => {
      this._animatorRef = ref;
    });

    _defineProperty(this, "_assertChildType", () => {
      if (_react.default.Children.count(this.props.children) !== 1) {
        throw new Error('Only one child can be passed to AnimationWrapperView');
      }
    });

    this._component = AnimationWrapperView._animationWrapperGenerator(props.animationConfig);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.animationConfig !== nextProps.animationConfig) {
      var _this$_animatorRef;

      (_this$_animatorRef = this._animatorRef) === null || _this$_animatorRef === void 0 ? void 0 : _this$_animatorRef.resetAnimation();
      this._component = AnimationWrapperView._animationWrapperGenerator(nextProps.animationConfig);
    }
  }
  /**
   * This function will reset all animated timing functions associated with the current animation
   * and start the animation from it's initial point.
   */


  startAnimation() {
    var _this$_animatorRef2;

    (_this$_animatorRef2 = this._animatorRef) === null || _this$_animatorRef2 === void 0 ? void 0 : _this$_animatorRef2.startAnimation();
  }
  /**
   * This function will stop all the Animated timing functions without resetting their values
   * effectively pausing any applied animation when invoked.
   */


  stopAnimation() {
    var _this$_animatorRef3;

    (_this$_animatorRef3 = this._animatorRef) === null || _this$_animatorRef3 === void 0 ? void 0 : _this$_animatorRef3.stopAnimation();
  }
  /**
   * This function will clear the animation timing functions and will reset the view before
   * any animation transformation were applied to it.
   */


  resetAnimation() {
    var _this$_animatorRef4;

    (_this$_animatorRef4 = this._animatorRef) === null || _this$_animatorRef4 === void 0 ? void 0 : _this$_animatorRef4.resetAnimation();
  }

  finishAnimation() {
    var _this$_animatorRef5;

    (_this$_animatorRef5 = this._animatorRef) === null || _this$_animatorRef5 === void 0 ? void 0 : _this$_animatorRef5.finishAnimation();
  }

  render() {
    this._assertChildType();

    const {
      children,
      onAnimationFinish,
      onAnimationStart
    } = this.props;
    const animationConfig = this.props.animationConfig;

    if (this._component && children) {
      return /*#__PURE__*/_react.default.createElement(this._component, {
        ref: this._setRef,
        animationConfig: animationConfig,
        onAnimationFinish: onAnimationFinish,
        onAnimationStart: onAnimationStart
      }, children);
    }

    return;
  }

  static _animationWrapperGenerator(animationConfig) {
    switch (animationConfig.type) {
      case _Enums.AnimationType.BOUNCE:
        return _BounceAnimationWrapper.BounceAnimationWrapper;

      case _Enums.AnimationType.RIPPLE:
        return _RippleAnimationWrapper.RippleAnimationWrapper;

      case _Enums.AnimationType.SCALE:
        return _ScaleAnimationWrapper.ScaleAnimationWrapper;

      case _Enums.AnimationType.DRAGGABLE:
        return _DraggableAnimationWrapper.DraggableAnimationWrapper;

      case _Enums.AnimationType.FADE_IN:
      case _Enums.AnimationType.FADE_OUT:
        return _FadeAnimationWrapper.FadeAnimationWrapper;

      case _Enums.AnimationType.SLIDE_VERTICAL:
      case _Enums.AnimationType.SLIDE_HORIZONTAL:
        return _SlideAnimationWrapper.SlideAnimationWrapper;

      case _Enums.AnimationType.WIGGLE:
        return _WiggleAnimationWrapper.WiggleAnimationWrapper;

      default:
        return _JsonAnimationWrapper.JsonAnimationWrapper;
    }
  }

}

exports.default = AnimationWrapperView;
//# sourceMappingURL=AnimationWrapperView.js.map