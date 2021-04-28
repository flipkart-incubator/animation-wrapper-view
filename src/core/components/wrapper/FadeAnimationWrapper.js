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
exports.FadeAnimationWrapper = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var BaseAnimationWrapper_1 = require("./BaseAnimationWrapper");
var Enums_1 = require("../../data/Enums");
var Utils_1 = require("../Utils");
var FadeAnimationWrapper = /** @class */ (function (_super) {
    __extends(FadeAnimationWrapper, _super);
    function FadeAnimationWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.startAnimation = function () {
            _this.animationStarted();
            _this._fadeAnimation.reset();
            _this._fadeAnimation.start(function () { _this.animationFinished(); });
        };
        _this.stopAnimation = function () {
            _this._fadeAnimation.stop();
        };
        _this.resetAnimation = function () {
            _this.stopAnimation();
            _this.state.opacity.setValue(_this._getInitialOpacity(_this.props));
        };
        _this.finishAnimation = function () {
            _this.stopAnimation();
            _this.state.opacity.setValue(_this._getFinalOpacity(_this.props));
        };
        _this.state = _this.getAnimationStateFromProps(props);
        var animationConfig = _this.props.animationConfig;
        var duration;
        var toValue;
        if (animationConfig.type === Enums_1.AnimationType.FADE_IN) {
            var fadeInConfig = animationConfig;
            duration = fadeInConfig.animationDuration;
            toValue = 1;
        }
        else {
            var fadeOutConfig = animationConfig;
            duration = fadeOutConfig.animationDuration;
            toValue = fadeOutConfig.finalOpacity ? fadeOutConfig.finalOpacity : 0;
        }
        _this._fadeAnimation = react_native_1.Animated.timing(_this.state.opacity, {
            duration: duration,
            toValue: toValue,
            easing: Utils_1["default"](animationConfig.interpolationDef),
            useNativeDriver: false
        });
        return _this;
    }
    FadeAnimationWrapper.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, _nextContext) {
        if (nextProps !== this.props) {
            var nextState = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    };
    FadeAnimationWrapper.prototype.renderAnimation = function (content) {
        var opacity = this.state.opacity;
        return (<react_native_1.Animated.View style={{
                justifyContent: 'center',
                alignItems: 'center',
                opacity: opacity
            }}>
                {content}
            </react_native_1.Animated.View>);
    };
    FadeAnimationWrapper.prototype.getAnimationStateFromProps = function (props) {
        return {
            opacity: new react_native_1.Animated.Value(this._getInitialOpacity(props))
        };
    };
    FadeAnimationWrapper.prototype._getInitialOpacity = function (props) {
        if (props.animationConfig.type === Enums_1.AnimationType.FADE_IN) {
            var config = props.animationConfig;
            return config.initialOpacity ? config.initialOpacity : 0;
        }
        else {
            return 1;
        }
    };
    FadeAnimationWrapper.prototype._getFinalOpacity = function (props) {
        if (props.animationConfig.type === Enums_1.AnimationType.FADE_OUT) {
            var config = props.animationConfig;
            return config.finalOpacity ? config.finalOpacity : 0;
        }
        else {
            return 1;
        }
    };
    return FadeAnimationWrapper;
}(BaseAnimationWrapper_1.BaseAnimationWrapper));
exports.FadeAnimationWrapper = FadeAnimationWrapper;
