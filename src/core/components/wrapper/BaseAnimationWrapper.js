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
exports.BaseAnimationWrapper = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Enums_1 = require("../../data/Enums");
var BaseAnimationWrapper = /** @class */ (function (_super) {
    __extends(BaseAnimationWrapper, _super);
    function BaseAnimationWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animationFinished = function () {
            if (_this.props.onAnimationFinish) {
                _this.props.onAnimationFinish();
            }
        };
        _this.animationStarted = function () {
            if (_this.props.onAnimationStart) {
                _this.props.onAnimationStart();
            }
        };
        _this._onPress = function (_) {
            var pressParam = _this.props.animationConfig;
            if (pressParam && pressParam.triggerType === Enums_1.AnimationTriggerType.ON_CLICK) {
                _this.startAnimation();
            }
        };
        return _this;
    }
    BaseAnimationWrapper.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props.animationConfig, triggerDelay = _a.triggerDelay, triggerType = _a.triggerType;
        if (triggerType === Enums_1.AnimationTriggerType.ON_LOAD) {
            if (triggerDelay) {
                setTimeout(function () {
                    _this.startAnimation();
                }, triggerDelay);
            }
            else {
                this.startAnimation();
            }
        }
    };
    BaseAnimationWrapper.prototype.render = function () {
        var content = this.props.children;
        if (this.props.animationConfig.type !== Enums_1.AnimationType.DRAGGABLE) {
            return (<react_native_1.TouchableWithoutFeedback onPress={this._onPress}>
                    {this.renderAnimation(content)}
                </react_native_1.TouchableWithoutFeedback>);
        }
        else {
            return (<react_native_1.View>
                    {this.renderAnimation(content)}
                </react_native_1.View>);
        }
    };
    BaseAnimationWrapper.prototype.componentWillUnmount = function () {
        this.stopAnimation();
    };
    return BaseAnimationWrapper;
}(react_1["default"].Component));
exports.BaseAnimationWrapper = BaseAnimationWrapper;
