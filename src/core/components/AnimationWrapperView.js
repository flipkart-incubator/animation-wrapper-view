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
var react_1 = require("react");
var RippleAnimationWrapper_1 = require("./wrapper/RippleAnimationWrapper");
var ScaleAnimationWrapper_1 = require("./wrapper/ScaleAnimationWrapper");
var BounceAnimationWrapper_1 = require("./wrapper/BounceAnimationWrapper");
var DraggableAnimationWrapper_1 = require("./wrapper/DraggableAnimationWrapper");
var FadeAnimationWrapper_1 = require("./wrapper/FadeAnimationWrapper");
var SlideAnimationWrapper_1 = require("./wrapper/SlideAnimationWrapper");
var WiggleAnimationWrapper_1 = require("./wrapper/WiggleAnimationWrapper");
var JsonAnimationWrapper_1 = require("./wrapper/JsonAnimationWrapper");
var Enums_1 = require("../data/Enums");
var AnimationWrapperView = /** @class */ (function (_super) {
    __extends(AnimationWrapperView, _super);
    function AnimationWrapperView(props) {
        var _this = _super.call(this, props) || this;
        _this._setRef = function (ref) {
            _this._animatorRef = ref;
        };
        _this._assertChildType = function () {
            if (react_1["default"].Children.count(_this.props.children) !== 1) {
                throw new Error('Only one child can be passed to AnimationWrapperView');
            }
        };
        _this._component = AnimationWrapperView._animationWrapperGenerator(props.animationConfig);
        return _this;
    }
    AnimationWrapperView.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var _a;
        if (this.props.animationConfig !== nextProps.animationConfig) {
            (_a = this._animatorRef) === null || _a === void 0 ? void 0 : _a.resetAnimation();
            this._component = AnimationWrapperView._animationWrapperGenerator(nextProps.animationConfig);
        }
    };
    /**
     * This function will reset all animated timing functions associated with the current animation
     * and start the animation from it's initial point.
     */
    AnimationWrapperView.prototype.startAnimation = function () {
        var _a;
        (_a = this._animatorRef) === null || _a === void 0 ? void 0 : _a.startAnimation();
    };
    /**
     * This function will stop all the Animated timing functions without resetting their values
     * effectively pausing any applied animation when invoked.
     */
    AnimationWrapperView.prototype.stopAnimation = function () {
        var _a;
        (_a = this._animatorRef) === null || _a === void 0 ? void 0 : _a.stopAnimation();
    };
    /**
     * This function will clear the animation timing functions and will reset the view before
     * any animation transformation were applied to it.
     */
    AnimationWrapperView.prototype.resetAnimation = function () {
        var _a;
        (_a = this._animatorRef) === null || _a === void 0 ? void 0 : _a.resetAnimation();
    };
    AnimationWrapperView.prototype.finishAnimation = function () {
        var _a;
        (_a = this._animatorRef) === null || _a === void 0 ? void 0 : _a.finishAnimation();
    };
    AnimationWrapperView.prototype.render = function () {
        this._assertChildType();
        var _a = this.props, children = _a.children, onAnimationFinish = _a.onAnimationFinish, onAnimationStart = _a.onAnimationStart;
        var animationConfig = this.props.animationConfig;
        if (this._component && children) {
            return (<this._component ref={this._setRef} animationConfig={animationConfig} onAnimationFinish={onAnimationFinish} onAnimationStart={onAnimationStart}>
                    {children}
                </this._component>);
        }
        return;
    };
    AnimationWrapperView._animationWrapperGenerator = function (animationConfig) {
        switch (animationConfig.type) {
            case Enums_1.AnimationType.BOUNCE:
                return BounceAnimationWrapper_1.BounceAnimationWrapper;
            case Enums_1.AnimationType.RIPPLE:
                return RippleAnimationWrapper_1.RippleAnimationWrapper;
            case Enums_1.AnimationType.SCALE:
                return ScaleAnimationWrapper_1.ScaleAnimationWrapper;
            case Enums_1.AnimationType.DRAGGABLE:
                return DraggableAnimationWrapper_1.DraggableAnimationWrapper;
            case Enums_1.AnimationType.FADE_IN:
            case Enums_1.AnimationType.FADE_OUT:
                return FadeAnimationWrapper_1.FadeAnimationWrapper;
            case Enums_1.AnimationType.SLIDE_VERTICAL:
            case Enums_1.AnimationType.SLIDE_HORIZONTAL:
                return SlideAnimationWrapper_1.SlideAnimationWrapper;
            case Enums_1.AnimationType.WIGGLE:
                return WiggleAnimationWrapper_1.WiggleAnimationWrapper;
            default:
                return JsonAnimationWrapper_1.JsonAnimationWrapper;
        }
    };
    return AnimationWrapperView;
}(react_1["default"].PureComponent));
exports["default"] = AnimationWrapperView;
