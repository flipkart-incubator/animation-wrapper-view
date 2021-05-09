"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonAnimationWrapper = void 0;

var _reactNative = require("react-native");

var _react = _interopRequireDefault(require("react"));

var _BaseAnimationWrapper = require("./BaseAnimationWrapper");

var _Utils = _interopRequireDefault(require("../Utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsonAnimationWrapper extends _BaseAnimationWrapper.BaseAnimationWrapper {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "_animation", void 0);

    _defineProperty(this, "_transforms", []);

    _defineProperty(this, "_compositeAnimation", void 0);

    _defineProperty(this, "startAnimation", () => {
      var _this$_compositeAnima, _this$_compositeAnima2;

      this.animationStarted();
      (_this$_compositeAnima = this._compositeAnimation) === null || _this$_compositeAnima === void 0 ? void 0 : _this$_compositeAnima.reset();
      (_this$_compositeAnima2 = this._compositeAnimation) === null || _this$_compositeAnima2 === void 0 ? void 0 : _this$_compositeAnima2.start(() => {
        this.animationFinished();
      });
    });

    _defineProperty(this, "stopAnimation", () => {
      var _this$_compositeAnima3;

      (_this$_compositeAnima3 = this._compositeAnimation) === null || _this$_compositeAnima3 === void 0 ? void 0 : _this$_compositeAnima3.stop();
    });

    _defineProperty(this, "resetAnimation", () => {
      this.stopAnimation();

      if (Array.isArray(this.props.animationConfig.animationConfig)) {
        for (let i = 0; i < this.props.animationConfig.animationConfig.length; i++) {
          this._animation && this._animation[i] && this._animation[i].setValue(0);
        }
      } else {
        this._animation && this._animation[0] && this._animation[0].setValue(0);
      }
    });

    _defineProperty(this, "finishAnimation", () => {
      this.stopAnimation();

      if (Array.isArray(this.props.animationConfig.animationConfig)) {
        for (let i = 0; i < this.props.animationConfig.animationConfig.length; i++) {
          this._animation && this._animation[i] && this._animation[i].setValue(1);
        }
      } else {
        this._animation && this._animation[0] && this._animation[0].setValue(1);
      }
    });

    _defineProperty(this, "renderAnimation", content => {
      const transformArray = this._getTransformArray();

      return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        style: {
          transform: transformArray
        }
      }, content);
    });

    _defineProperty(this, "_updateAnimatedArray", props => {
      if (Array.isArray(props.animationConfig.animationConfig)) {
        if (this._animation === undefined) {
          this._animation = [];

          for (let i = 0; i < props.animationConfig.animationConfig.length; i++) {
            const animationObj = new _reactNative.Animated.Value(0);

            this._animation.push(animationObj);
          }

          return;
        }

        const totalAnimationValues = props.animationConfig.animationConfig.length;

        if (this._animation.length < totalAnimationValues) {
          for (let itr = this._animation.length; itr < totalAnimationValues; itr++) {
            const animationObj = new _reactNative.Animated.Value(0);

            this._animation.push(animationObj);
          }

          return;
        } else {
          return;
        }
      } else {
        if (this._animation === undefined) {
          this._animation = [];
          const animationObj = new _reactNative.Animated.Value(0);

          this._animation.push(animationObj);
        } else {
          if (this._animation.length === 0) {
            const animationObj = new _reactNative.Animated.Value(0);

            this._animation.push(animationObj);
          }
        }
      }

      for (let i = 0; i < this._animation.length; i++) {
        this._animation[i].setValue(0);
      }
    });

    _defineProperty(this, "_updateCompositeAnimation", props => {
      const animationSequence = [];

      if (Array.isArray(props.animationConfig.animationConfig)) {
        for (let i = 0; i < props.animationConfig.animationConfig.length; i++) {
          const animationDef = props.animationConfig.animationConfig[i];

          if (this._animation) {
            animationSequence.push(_reactNative.Animated.timing(this._animation[i], {
              toValue: 1,
              duration: animationDef.duration,
              easing: (0, _Utils.default)(animationDef.interpolation),
              useNativeDriver: false
            }));
          }
        }

        this._compositeAnimation = _reactNative.Animated.sequence(animationSequence);
      } else {
        const animationDef = props.animationConfig.animationConfig;

        if (this._animation) {
          this._compositeAnimation = _reactNative.Animated.timing(this._animation[0], {
            toValue: 1,
            duration: animationDef.duration,
            easing: (0, _Utils.default)(animationDef.interpolation),
            useNativeDriver: false
          });
        }
      }
    });

    _defineProperty(this, "_updateTransformsArray", props => {
      const jsonAnimation = props.animationConfig;
      this._transforms = [];

      if (Array.isArray(jsonAnimation.animationConfig)) {
        for (let animationIndex = 0; animationIndex < jsonAnimation.animationConfig.length; animationIndex++) {
          if (this._transforms[animationIndex] === undefined) {
            this._transforms[animationIndex] = [];
          }

          const transformations = jsonAnimation.animationConfig[animationIndex].transforms;

          for (let transformIndex = 0; transformIndex < transformations.length; transformIndex++) {
            this._appendTransform(transformations, transformIndex, animationIndex);
          }
        }
      } else {
        const animationDef = jsonAnimation.animationConfig;

        if (this._transforms[0] === undefined) {
          this._transforms[0] = [];
        }

        const transformations = animationDef.transforms;

        for (let transformIndex = 0; transformIndex < transformations.length; transformIndex++) {
          this._appendTransform(transformations, transformIndex, 0);
        }
      }
    });

    _defineProperty(this, "_appendTransform", (transformations, transformIndex, animationIndex) => {
      const transformation = transformations[transformIndex];

      if (this._animation === undefined || this._animation[animationIndex] === undefined || this._transforms[animationIndex] === undefined) {
        return;
      }

      switch (transformation.key) {
        case "translateX":
          const translateX = this._animation[animationIndex].interpolate({
            inputRange: [0, 1],
            outputRange: [transformation.from, transformation.to]
          });

          this._transforms[animationIndex].push({
            translateX
          });

          break;

        case "translateY":
          const translateY = this._animation[animationIndex].interpolate({
            inputRange: [0, 1],
            outputRange: [transformation.from, transformation.to]
          });

          this._transforms[animationIndex].push({
            translateY
          });

          break;

        case "scale":
          const scale = this._animation[animationIndex].interpolate({
            inputRange: [0, 1],
            outputRange: [transformation.from, transformation.to]
          });

          this._transforms[animationIndex].push({
            scale
          });

          break;

        case "scaleX":
          const scaleX = this._animation[animationIndex].interpolate({
            inputRange: [0, 1],
            outputRange: [transformation.from, transformation.to]
          });

          this._transforms[animationIndex].push({
            scaleX
          });

          break;

        case "scaleY":
          const scaleY = this._animation[animationIndex].interpolate({
            inputRange: [0, 1],
            outputRange: [transformation.from, transformation.to]
          });

          this._transforms[animationIndex].push({
            scaleY
          });

          break;

        case "rotate":
          const rotate = this._animation[animationIndex].interpolate({
            inputRange: [0, 1],
            outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
          });

          this._transforms[animationIndex].push({
            rotate
          });

          break;

        case "rotateX":
          const rotateX = this._animation[animationIndex].interpolate({
            inputRange: [0, 1],
            outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
          });

          this._transforms[animationIndex].push({
            rotateX
          });

          break;

        case "rotateY":
          const rotateY = this._animation[animationIndex].interpolate({
            inputRange: [0, 1],
            outputRange: [`${transformation.from}deg`, `${transformation.to}deg`]
          });

          this._transforms[animationIndex].push({
            rotateY
          });

          break;
      }
    });

    _defineProperty(this, "_getTransformArray", () => {
      let transforms = [];

      for (let i = 0; i < this._transforms.length; i++) {
        transforms = transforms.concat(this._transforms[i]);
      }

      return transforms;
    });

    this._updateAnimatedArray(this.props);

    this._updateCompositeAnimation(this.props);

    this._updateTransformsArray(this.props);
  }

  shouldComponentUpdate(nextProps, _) {
    if (this.props.animationConfig !== nextProps.animationConfig) {
      this.resetAnimation();

      this._updateAnimatedArray(nextProps);

      this._updateCompositeAnimation(nextProps);

      this._updateTransformsArray(nextProps);

      return true;
    }

    return false;
  }

  getAnimationStateFromProps(_) {
    // unused
    return {};
  }

}

exports.JsonAnimationWrapper = JsonAnimationWrapper;
//# sourceMappingURL=JsonAnimationWrapper.js.map