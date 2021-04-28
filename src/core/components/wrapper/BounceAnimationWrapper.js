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
exports.BounceAnimationWrapper = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var BaseAnimationWrapper_1 = require("./BaseAnimationWrapper");
var BounceAnimationWrapper = /** @class */ (function (_super) {
    __extends(BounceAnimationWrapper, _super);
    function BounceAnimationWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.startAnimation = function () {
            _this.animationStarted();
            _this._bounceAnimation.reset();
            _this._bounceAnimation.start(function () { _this.animationFinished(); });
        };
        _this.stopAnimation = function () {
            _this._bounceAnimation.stop();
        };
        _this.resetAnimation = function () {
            _this.stopAnimation();
            _this.state.translateY.setValue(0);
        };
        _this.finishAnimation = function () {
            _this.stopAnimation();
            // no extra op
        };
        _this.state = _this.getAnimationStateFromProps(props);
        var animationConfig = _this.props.animationConfig;
        var translateY = _this.state.translateY;
        _this._bounceAnimation = react_native_1.Animated.sequence([
            react_native_1.Animated.timing(translateY, {
                duration: animationConfig.animationDuration / 3,
                toValue: -animationConfig.bounceHeight,
                easing: react_native_1.Easing.bezier(0, 0.55, 0.45, 1),
                useNativeDriver: false
            }),
            react_native_1.Animated.timing(translateY, {
                duration: animationConfig.animationDuration / 2,
                toValue: 0,
                easing: react_native_1.Easing.bounce,
                useNativeDriver: false
            })
        ]);
        return _this;
    }
    BounceAnimationWrapper.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, _nextContext) {
        if (nextProps !== this.props) {
            var nextState = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    };
    BounceAnimationWrapper.prototype.renderAnimation = function (content) {
        var translateY = this.state.translateY;
        return (<react_native_1.Animated.View style={{
                justifyContent: 'center',
                alignItems: 'center',
                transform: [
                    { translateY: translateY }
                ]
            }}>
                {content}
            </react_native_1.Animated.View>);
    };
    BounceAnimationWrapper.prototype.getAnimationStateFromProps = function (_) {
        return {
            translateY: new react_native_1.Animated.Value(0)
        };
    };
    return BounceAnimationWrapper;
}(BaseAnimationWrapper_1.BaseAnimationWrapper));
exports.BounceAnimationWrapper = BounceAnimationWrapper;
