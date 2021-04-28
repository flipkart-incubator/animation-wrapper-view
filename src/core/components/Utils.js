"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
function getEasingFunction(interpolation) {
    var _a, _b;
    switch (interpolation === null || interpolation === void 0 ? void 0 : interpolation.easing) {
        case "linear":
            return react_native_1.Easing.linear;
        case "quad":
            return react_native_1.Easing.quad;
        case "circle":
            return react_native_1.Easing.circle;
        case "bounce":
            return react_native_1.Easing.bounce;
        case "cubic":
            return react_native_1.Easing.cubic;
        case "sin":
            return react_native_1.Easing.sin;
        case "exp":
            return react_native_1.Easing.exp;
        case "ease":
            return react_native_1.Easing.ease;
        case "elastic":
            var bounciness = (_a = interpolation === null || interpolation === void 0 ? void 0 : interpolation.params) === null || _a === void 0 ? void 0 : _a.bounciness;
            if (bounciness && !isNaN(bounciness)) {
                return react_native_1.Easing.elastic(bounciness);
            }
            return react_native_1.Easing.linear;
        case "back":
            var back = (_b = interpolation === null || interpolation === void 0 ? void 0 : interpolation.params) === null || _b === void 0 ? void 0 : _b.back;
            if (back && !isNaN(back)) {
                return react_native_1.Easing.back(back);
            }
            return react_native_1.Easing.linear;
        default:
            return react_native_1.Easing.linear;
    }
}
exports["default"] = getEasingFunction;
