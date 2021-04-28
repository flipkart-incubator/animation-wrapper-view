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
exports.SlideAnimationWrapper = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var BaseAnimationWrapper_1 = require("./BaseAnimationWrapper");
var Enums_1 = require("../../data/Enums");
var Utils_1 = require("../Utils");
var SlideAnimationWrapper = /** @class */ (function (_super) {
    __extends(SlideAnimationWrapper, _super);
    function SlideAnimationWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.finishAnimation = function () {
            _this.stopAnimation();
            _this.state.translate.setValue(_this._getFinalTranslateValue(_this.props));
        };
        _this._screenWidth = Math.round(react_native_1.Dimensions.get('window').width);
        _this._screenHeight = Math.round(react_native_1.Dimensions.get('window').height);
        _this.state = _this.getAnimationStateFromProps(props);
        var animationConfig = _this.props.animationConfig;
        _this._animationType = animationConfig.type;
        var config = animationConfig;
        var fromValue = _this._getInitialTranslateValue(_this.props);
        var toValue = config.finalOffset;
        var duration = config.animationDuration;
        _this.state.translate.setValue(fromValue);
        _this._slideAnimation = react_native_1.Animated.timing(_this.state.translate, {
            duration: duration,
            toValue: toValue,
            easing: Utils_1["default"](animationConfig.interpolationDef),
            useNativeDriver: false
        });
        return _this;
    }
    SlideAnimationWrapper.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, _nextContext) {
        if (nextProps !== this.props) {
            var nextState = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    };
    SlideAnimationWrapper.prototype.startAnimation = function () {
        var _this = this;
        this.animationStarted();
        this._slideAnimation.reset();
        this._slideAnimation.start(function () {
            _this.animationFinished();
        });
    };
    SlideAnimationWrapper.prototype.stopAnimation = function () {
        this._slideAnimation.stop();
    };
    SlideAnimationWrapper.prototype.resetAnimation = function () {
        this.stopAnimation();
        this.state.translate.setValue(this._getInitialTranslateValue(this.props));
    };
    SlideAnimationWrapper.prototype.renderAnimation = function (content) {
        if (this._animationType === Enums_1.AnimationType.SLIDE_HORIZONTAL) {
            return (<react_native_1.Animated.View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        { translateX: this.state.translate }
                    ]
                }}>
                    {content}
                </react_native_1.Animated.View>);
        }
        else {
            return (<react_native_1.Animated.View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        { translateY: this.state.translate }
                    ]
                }}>
                    {content}
                </react_native_1.Animated.View>);
        }
    };
    SlideAnimationWrapper.prototype.getAnimationStateFromProps = function (props) {
        return {
            translate: new react_native_1.Animated.Value(this._getInitialTranslateValue(props))
        };
    };
    SlideAnimationWrapper.prototype._getInitialTranslateValue = function (props) {
        var config = props.animationConfig;
        if (config.initialOffset === undefined || config.initialOffset === 0) {
            if (config.type === Enums_1.AnimationType.SLIDE_VERTICAL) {
                var direction = config.direction;
                if (direction === "top_down") {
                    return -this._screenHeight;
                }
                else {
                    return this._screenHeight;
                }
            }
            else {
                var direction = config.direction;
                if (direction === "ltr") {
                    return -this._screenWidth;
                }
                else {
                    return this._screenWidth;
                }
            }
        }
        else
            return config.initialOffset;
    };
    SlideAnimationWrapper.prototype._getFinalTranslateValue = function (props) {
        var config = props.animationConfig;
        return config.finalOffset;
    };
    return SlideAnimationWrapper;
}(BaseAnimationWrapper_1.BaseAnimationWrapper));
exports.SlideAnimationWrapper = SlideAnimationWrapper;
