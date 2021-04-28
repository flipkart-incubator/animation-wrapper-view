"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.JsonAnimationWrapper = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var BaseAnimationWrapper_1 = require("./BaseAnimationWrapper");
var Utils_1 = require("../Utils");
var JsonAnimationWrapper = /** @class */ (function (_super) {
    __extends(JsonAnimationWrapper, _super);
    function JsonAnimationWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this._transforms = [];
        _this.startAnimation = function () {
            var _a, _b;
            _this.animationStarted();
            (_a = _this._compositeAnimation) === null || _a === void 0 ? void 0 : _a.reset();
            (_b = _this._compositeAnimation) === null || _b === void 0 ? void 0 : _b.start(function () { _this.animationFinished(); });
        };
        _this.stopAnimation = function () {
            var _a;
            (_a = _this._compositeAnimation) === null || _a === void 0 ? void 0 : _a.stop();
        };
        _this.resetAnimation = function () {
            _this.stopAnimation();
            if (Array.isArray(_this.props.animationConfig.animationConfig)) {
                for (var i = 0; i < _this.props.animationConfig.animationConfig.length; i++) {
                    _this._animation && _this._animation[i] && _this._animation[i].setValue(0);
                }
            }
            else {
                _this._animation && _this._animation[0] && _this._animation[0].setValue(0);
            }
        };
        _this.finishAnimation = function () {
            _this.stopAnimation();
            if (Array.isArray(_this.props.animationConfig.animationConfig)) {
                for (var i = 0; i < _this.props.animationConfig.animationConfig.length; i++) {
                    _this._animation && _this._animation[i] && _this._animation[i].setValue(1);
                }
            }
            else {
                _this._animation && _this._animation[0] && _this._animation[0].setValue(1);
            }
        };
        _this.renderAnimation = function (content) {
            var transformArray = _this._getTransformArray();
            return (<react_native_1.Animated.View style={{ transform: transformArray }}>
                {content}
            </react_native_1.Animated.View>);
        };
        _this._updateAnimatedArray = function (props) {
            if (Array.isArray(props.animationConfig.animationConfig)) {
                if (_this._animation === undefined) {
                    _this._animation = [];
                    for (var i = 0; i < props.animationConfig.animationConfig.length; i++) {
                        var animationObj = new react_native_1.Animated.Value(0);
                        _this._animation.push(animationObj);
                    }
                    return;
                }
                var totalAnimationValues = props.animationConfig.animationConfig.length;
                if (_this._animation.length < totalAnimationValues) {
                    for (var itr = _this._animation.length; itr < totalAnimationValues; itr++) {
                        var animationObj = new react_native_1.Animated.Value(0);
                        _this._animation.push(animationObj);
                    }
                    return;
                }
                else {
                    return;
                }
            }
            else {
                if (_this._animation === undefined) {
                    _this._animation = [];
                    var animationObj = new react_native_1.Animated.Value(0);
                    _this._animation.push(animationObj);
                }
                else {
                    if (_this._animation.length === 0) {
                        var animationObj = new react_native_1.Animated.Value(0);
                        _this._animation.push(animationObj);
                    }
                }
            }
            for (var i = 0; i < _this._animation.length; i++) {
                _this._animation[i].setValue(0);
            }
        };
        _this._updateCompositeAnimation = function (props) {
            var animationSequence = [];
            if (Array.isArray(props.animationConfig.animationConfig)) {
                for (var i = 0; i < props.animationConfig.animationConfig.length; i++) {
                    var animationDef = props.animationConfig.animationConfig[i];
                    if (_this._animation) {
                        animationSequence.push(react_native_1.Animated.timing(_this._animation[i], {
                            toValue: 1,
                            duration: animationDef.duration,
                            easing: Utils_1["default"](animationDef.interpolation),
                            useNativeDriver: false
                        }));
                    }
                }
                _this._compositeAnimation = react_native_1.Animated.sequence(animationSequence);
            }
            else {
                var animationDef = props.animationConfig.animationConfig;
                if (_this._animation) {
                    _this._compositeAnimation = react_native_1.Animated.timing(_this._animation[0], {
                        toValue: 1,
                        duration: animationDef.duration,
                        easing: Utils_1["default"](animationDef.interpolation),
                        useNativeDriver: false
                    });
                }
            }
        };
        _this._updateTransformsArray = function (props) {
            var jsonAnimation = props.animationConfig;
            _this._transforms = [];
            if (Array.isArray(jsonAnimation.animationConfig)) {
                for (var animationIndex = 0; animationIndex < jsonAnimation.animationConfig.length; animationIndex++) {
                    if (_this._transforms[animationIndex] === undefined) {
                        _this._transforms[animationIndex] = [];
                    }
                    var transformations = jsonAnimation.animationConfig[animationIndex].transforms;
                    for (var transformIndex = 0; transformIndex < transformations.length; transformIndex++) {
                        _this._appendTransform(transformations, transformIndex, animationIndex);
                    }
                }
            }
            else {
                var animationDef = jsonAnimation.animationConfig;
                if (_this._transforms[0] === undefined) {
                    _this._transforms[0] = [];
                }
                var transformations = animationDef.transforms;
                for (var transformIndex = 0; transformIndex < transformations.length; transformIndex++) {
                    _this._appendTransform(transformations, transformIndex, 0);
                }
            }
        };
        _this._appendTransform = function (transformations, transformIndex, animationIndex) {
            var transformation = transformations[transformIndex];
            if (_this._animation === undefined || _this._animation[animationIndex] === undefined || _this._transforms[animationIndex] === undefined) {
                return;
            }
            switch (transformation.key) {
                case "translateX":
                    var translateX = _this._animation[animationIndex].interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from, transformation.to]
                    });
                    _this._transforms[animationIndex].push({ translateX: translateX });
                    break;
                case "translateY":
                    var translateY = _this._animation[animationIndex].interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from, transformation.to]
                    });
                    _this._transforms[animationIndex].push({ translateY: translateY });
                    break;
                case "scale":
                    var scale = _this._animation[animationIndex].interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from, transformation.to]
                    });
                    _this._transforms[animationIndex].push({ scale: scale });
                    break;
                case "scaleX":
                    var scaleX = _this._animation[animationIndex].interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from, transformation.to]
                    });
                    _this._transforms[animationIndex].push({ scaleX: scaleX });
                    break;
                case "scaleY":
                    var scaleY = _this._animation[animationIndex].interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from, transformation.to]
                    });
                    _this._transforms[animationIndex].push({ scaleY: scaleY });
                    break;
                case "rotate":
                    var rotate = _this._animation[animationIndex].interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from + "deg", transformation.to + "deg"]
                    });
                    _this._transforms[animationIndex].push({ rotate: rotate });
                    break;
                case "rotateX":
                    var rotateX = _this._animation[animationIndex].interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from + "deg", transformation.to + "deg"]
                    });
                    _this._transforms[animationIndex].push({ rotateX: rotateX });
                    break;
                case "rotateY":
                    var rotateY = _this._animation[animationIndex].interpolate({
                        inputRange: [0, 1],
                        outputRange: [transformation.from + "deg", transformation.to + "deg"]
                    });
                    _this._transforms[animationIndex].push({ rotateY: rotateY });
                    break;
            }
        };
        _this._getTransformArray = function () {
            var transforms = [];
            for (var i = 0; i < _this._transforms.length; i++) {
                transforms = transforms.concat(_this._transforms[i]);
            }
            return transforms;
        };
        _this._updateAnimatedArray(_this.props);
        _this._updateCompositeAnimation(_this.props);
        _this._updateTransformsArray(_this.props);
        return _this;
    }
    JsonAnimationWrapper.prototype.shouldComponentUpdate = function (nextProps, _) {
        if (this.props.animationConfig !== nextProps.animationConfig) {
            this.resetAnimation();
            this._updateAnimatedArray(nextProps);
            this._updateCompositeAnimation(nextProps);
            this._updateTransformsArray(nextProps);
            return true;
        }
        return false;
    };
    JsonAnimationWrapper.prototype.getAnimationStateFromProps = function (_) {
        // unused
        return {};
    };
    return JsonAnimationWrapper;
}(BaseAnimationWrapper_1.BaseAnimationWrapper));
exports.JsonAnimationWrapper = JsonAnimationWrapper;
