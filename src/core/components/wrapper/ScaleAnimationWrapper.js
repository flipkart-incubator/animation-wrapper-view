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
exports.ScaleAnimationWrapper = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var BaseAnimationWrapper_1 = require("./BaseAnimationWrapper");
var Utils_1 = require("../Utils");
var ScaleAnimationWrapper = /** @class */ (function (_super) {
    __extends(ScaleAnimationWrapper, _super);
    function ScaleAnimationWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.finishAnimation = function () {
            _this.stopAnimation();
            _this.state.scale.setValue(_this.props.animationConfig.toScale);
        };
        _this.state = _this.getAnimationStateFromProps(props);
        _this.isScaled = false;
        var animationConfig = _this.props.animationConfig;
        _this._scaleAnimation = react_native_1.Animated.timing(_this.state.scale, {
            duration: animationConfig.scaleDuration,
            toValue: (_this.isScaled) ? 1 : animationConfig.toScale,
            easing: Utils_1["default"](animationConfig.interpolationDef),
            useNativeDriver: false
        });
        return _this;
    }
    ScaleAnimationWrapper.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, _nextContext) {
        if (nextProps !== this.props) {
            var nextState = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    };
    ScaleAnimationWrapper.prototype.startAnimation = function () {
        var _this = this;
        this.animationStarted();
        this._scaleAnimation.reset();
        this._scaleAnimation.start(function () { _this.animationFinished(); });
    };
    ScaleAnimationWrapper.prototype.stopAnimation = function () {
        this._scaleAnimation.stop();
    };
    ScaleAnimationWrapper.prototype.resetAnimation = function () {
        this.stopAnimation();
        this.state.scale.setValue(1);
    };
    ScaleAnimationWrapper.prototype.renderAnimation = function (content) {
        var scale = this.state.scale;
        return (<react_native_1.Animated.View style={{
                justifyContent: 'center',
                alignItems: 'center',
                transform: [
                    { scale: scale }
                ]
            }}>
                {content}
            </react_native_1.Animated.View>);
    };
    ScaleAnimationWrapper.prototype.getAnimationStateFromProps = function (_) {
        return {
            scale: new react_native_1.Animated.Value(1)
        };
    };
    return ScaleAnimationWrapper;
}(BaseAnimationWrapper_1.BaseAnimationWrapper));
exports.ScaleAnimationWrapper = ScaleAnimationWrapper;
