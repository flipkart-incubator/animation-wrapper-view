import {InterpolationDef} from "../data/JsonAnimationConfig";
import {Easing, EasingFunction} from "react-native";

export default function getEasingFunction(interpolation?: InterpolationDef): EasingFunction {
    switch (interpolation?.easing) {
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
            const bounciness = interpolation?.params?.bounciness;
            if (bounciness && !isNaN(bounciness)) {
                return Easing.elastic(bounciness);
            }
            return Easing.linear;
        case "back":
            const back = interpolation?.params?.back;
            if (back && !isNaN(back)) {
                return Easing.back(back);
            }
            return Easing.linear;
        default:
            return Easing.linear;
    }
}
