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
exports.WiggleAnimationWrapper = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var BaseAnimationWrapper_1 = require("./BaseAnimationWrapper");
var WiggleAnimationWrapper = /** @class */ (function (_super) {
    __extends(WiggleAnimationWrapper, _super);
    function WiggleAnimationWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.startAnimation = function () {
            _this.animationStarted();
            _this._wiggleAnimation.reset();
            _this._wiggleAnimation.start(function () { _this.animationFinished(); });
        };
        _this.finishAnimation = function () {
            _this.stopAnimation();
            // no extra op
        };
        _this.state = _this.getAnimationStateFromProps(props);
        var duration = props.animationConfig.animationDuration;
        var wiggleDistance = props.animationConfig.wiggleDistance;
        _this._wiggleAnimation = react_native_1.Animated.sequence([
            react_native_1.Animated.timing(_this.state.translateX, {
                duration: duration / 2,
                toValue: -wiggleDistance,
                useNativeDriver: false
            }),
            react_native_1.Animated.timing(_this.state.translateX, {
                duration: duration,
                toValue: wiggleDistance,
                useNativeDriver: false
            }),
            react_native_1.Animated.timing(_this.state.translateX, {
                duration: _this.props.animationConfig.animationDuration / 2,
                toValue: 0,
                useNativeDriver: false
            })
        ]);
        return _this;
    }
    WiggleAnimationWrapper.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, _nextContext) {
        if (nextProps !== this.props) {
            var nextState = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    };
    WiggleAnimationWrapper.prototype.stopAnimation = function () {
        this._wiggleAnimation.stop();
    };
    WiggleAnimationWrapper.prototype.resetAnimation = function () {
        this.stopAnimation();
        this.state.translateX.setValue(0);
    };
    WiggleAnimationWrapper.prototype.renderAnimation = function (content) {
        var translateX = this.state.translateX;
        return (<react_native_1.Animated.View style={{
                justifyContent: 'center',
                alignItems: 'center',
                transform: [
                    { translateX: translateX }
                ]
            }}>
                {content}
            </react_native_1.Animated.View>);
    };
    WiggleAnimationWrapper.prototype.getAnimationStateFromProps = function (_) {
        return {
            translateX: new react_native_1.Animated.Value(0),
            wiggleCount: 0
        };
    };
    return WiggleAnimationWrapper;
}(BaseAnimationWrapper_1.BaseAnimationWrapper));
exports.WiggleAnimationWrapper = WiggleAnimationWrapper;
