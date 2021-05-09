"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getEasingFunction;

var _reactNative = require("react-native");

function getEasingFunction(interpolation) {
  var _interpolation$params, _interpolation$params2;

  switch (interpolation === null || interpolation === void 0 ? void 0 : interpolation.easing) {
    case "linear":
      return _reactNative.Easing.linear;

    case "quad":
      return _reactNative.Easing.quad;

    case "circle":
      return _reactNative.Easing.circle;

    case "bounce":
      return _reactNative.Easing.bounce;

    case "cubic":
      return _reactNative.Easing.cubic;

    case "sin":
      return _reactNative.Easing.sin;

    case "exp":
      return _reactNative.Easing.exp;

    case "ease":
      return _reactNative.Easing.ease;

    case "elastic":
      const bounciness = interpolation === null || interpolation === void 0 ? void 0 : (_interpolation$params = interpolation.params) === null || _interpolation$params === void 0 ? void 0 : _interpolation$params.bounciness;

      if (bounciness && !isNaN(bounciness)) {
        return _reactNative.Easing.elastic(bounciness);
      }

      return _reactNative.Easing.linear;

    case "back":
      const back = interpolation === null || interpolation === void 0 ? void 0 : (_interpolation$params2 = interpolation.params) === null || _interpolation$params2 === void 0 ? void 0 : _interpolation$params2.back;

      if (back && !isNaN(back)) {
        return _reactNative.Easing.back(back);
      }

      return _reactNative.Easing.linear;

    default:
      return _reactNative.Easing.linear;
  }
}
//# sourceMappingURL=Utils.js.map