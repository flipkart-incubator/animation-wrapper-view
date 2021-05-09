import { Easing } from "react-native";
export default function getEasingFunction(interpolation) {
  var _interpolation$params, _interpolation$params2;

  switch (interpolation === null || interpolation === void 0 ? void 0 : interpolation.easing) {
    case "linear":
      return Easing.linear;

    case "quad":
      return Easing.quad;

    case "circle":
      return Easing.circle;

    case "bounce":
      return Easing.bounce;

    case "cubic":
      return Easing.cubic;

    case "sin":
      return Easing.sin;

    case "exp":
      return Easing.exp;

    case "ease":
      return Easing.ease;

    case "elastic":
      const bounciness = interpolation === null || interpolation === void 0 ? void 0 : (_interpolation$params = interpolation.params) === null || _interpolation$params === void 0 ? void 0 : _interpolation$params.bounciness;

      if (bounciness && !isNaN(bounciness)) {
        return Easing.elastic(bounciness);
      }

      return Easing.linear;

    case "back":
      const back = interpolation === null || interpolation === void 0 ? void 0 : (_interpolation$params2 = interpolation.params) === null || _interpolation$params2 === void 0 ? void 0 : _interpolation$params2.back;

      if (back && !isNaN(back)) {
        return Easing.back(back);
      }

      return Easing.linear;

    default:
      return Easing.linear;
  }
}
//# sourceMappingURL=Utils.js.map