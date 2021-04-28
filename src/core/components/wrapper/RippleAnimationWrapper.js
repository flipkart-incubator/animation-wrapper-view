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
exports.RippleAnimationWrapper = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var BaseAnimationWrapper_1 = require("./BaseAnimationWrapper");
var Utils_1 = require("../Utils");
var RippleAnimationWrapper = /** @class */ (function (_super) {
    __extends(RippleAnimationWrapper, _super);
    function RippleAnimationWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.finishAnimation = function () {
            _this.stopAnimation();
            // no extra op
        };
        _this.state = _this.getAnimationStateFromProps(props);
        var animationConfig = _this.props.animationConfig;
        var _a = _this.state, scale = _a.scale, opacity = _a.opacity;
        _this._rippleAnimation = react_native_1.Animated.loop(react_native_1.Animated.sequence([
            react_native_1.Animated.delay(animationConfig.rippleIntervalDuration),
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(scale, {
                    duration: animationConfig.rippleDuration,
                    toValue: 1,
                    easing: Utils_1["default"](animationConfig.interpolationDef),
                    useNativeDriver: false
                }),
                react_native_1.Animated.timing(opacity, {
                    duration: animationConfig.rippleDuration,
                    toValue: 0,
                    easing: Utils_1["default"](animationConfig.interpolationDef),
                    useNativeDriver: false
                })
            ])
        ]), {
            iterations: animationConfig.rippleCount
        });
        return _this;
    }
    RippleAnimationWrapper.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, _nextContext) {
        if (nextProps !== this.props) {
            var nextState = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    };
    RippleAnimationWrapper.prototype.startAnimation = function () {
        var _this = this;
        this.animationStarted();
        this._rippleAnimation.reset();
        this._rippleAnimation.start(function () { _this.animationFinished(); });
    };
    RippleAnimationWrapper.prototype.stopAnimation = function () {
        this._rippleAnimation.stop();
    };
    RippleAnimationWrapper.prototype.resetAnimation = function () {
        this.stopAnimation();
        this.state.opacity.setValue(1);
        this.state.scale.setValue(0);
    };
    RippleAnimationWrapper.prototype.renderAnimation = function (content) {
        var _a = this.state, scale = _a.scale, opacity = _a.opacity;
        var animationConfig = this.props.animationConfig;
        var rippleStyle = RippleAnimationWrapper.getRippleStyle(animationConfig.rippleRadius);
        return (<react_native_1.View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <react_native_1.Animated.View style={[
                rippleStyle,
                {
                    backgroundColor: animationConfig.rippleColor,
                    width: scale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, animationConfig.rippleRadius * 2]
                    }),
                    height: scale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, animationConfig.rippleRadius * 2]
                    }),
                    opacity: opacity
                }
            ]}/>
                {content}
            </react_native_1.View>);
    };
    RippleAnimationWrapper.prototype.getAnimationStateFromProps = function (_) {
        return {
            scale: new react_native_1.Animated.Value(0),
            opacity: new react_native_1.Animated.Value(1)
        };
    };
    RippleAnimationWrapper.getRippleStyle = function (contentWidth) {
        return {
            position: 'absolute',
            marginLeft: 0,
            marginTop: 0,
            borderRadius: contentWidth
        };
    };
    return RippleAnimationWrapper;
}(BaseAnimationWrapper_1.BaseAnimationWrapper));
exports.RippleAnimationWrapper = RippleAnimationWrapper;
