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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.DraggableAnimationWrapper = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var BaseAnimationWrapper_1 = require("./BaseAnimationWrapper");
var DraggableAnimationWrapper = /** @class */ (function (_super) {
    __extends(DraggableAnimationWrapper, _super);
    function DraggableAnimationWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.finishAnimation = function () {
            _this.stopAnimation();
            // no extra op
        };
        _this.state = {
            pan: new react_native_1.Animated.ValueXY(),
            panResponder: undefined
        };
        _this.state = _this.getAnimationStateFromProps(props);
        return _this;
    }
    DraggableAnimationWrapper.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, _nextContext) {
        if (nextProps !== this.props) {
            var nextState = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    };
    DraggableAnimationWrapper.prototype.renderAnimation = function (content) {
        return (<react_native_1.Animated.View style={this.state.pan.getLayout()} {...this.state.panResponder.panHandlers}>
                {content}
            </react_native_1.Animated.View>);
    };
    DraggableAnimationWrapper.prototype.getAnimationStateFromProps = function (_) {
        var pan = this.state.pan;
        return __assign(__assign({}, this.state), { panResponder: react_native_1.PanResponder.create({
                onStartShouldSetPanResponder: function () { return true; },
                onPanResponderMove: function (e, gesture) {
                    react_native_1.Animated.event([
                        null,
                        {
                            dx: pan.x,
                            dy: pan.y
                        },
                    ])(e, gesture);
                },
                onPanResponderRelease: function () {
                    react_native_1.Animated.spring(pan, // Auto-multiplexed
                    { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Back to zero
                    ).start();
                }
            }) });
    };
    DraggableAnimationWrapper.prototype.stopAnimation = function () {
        // this.state.translateY.stopAnimation();
    };
    DraggableAnimationWrapper.prototype.resetAnimation = function () {
        this.stopAnimation();
        this.setState(this.getAnimationStateFromProps(this.props));
    };
    DraggableAnimationWrapper.prototype.startAnimation = function () {
        // no-op
    };
    return DraggableAnimationWrapper;
}(BaseAnimationWrapper_1.BaseAnimationWrapper));
exports.DraggableAnimationWrapper = DraggableAnimationWrapper;
