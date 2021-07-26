import { InterpolationDef } from "../data/JsonAnimationConfig";
import { Easing, EasingFunction } from "react-native";

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
        case "sine":
            return Easing.sin;
        case "expo-in":
            return Easing.bezier(0.7, 0, 0.84, 0);;
        case "expo-out":
            return Easing.bezier(0.16, 1, 0.3, 1);
        case "ease-in":
            return Easing.bezier(0.42, 0, 1, 1);
        case "ease-out":
            return Easing.bezier(0, 0, 0.58, 1);
        case "ease-in-out":
            return Easing.bezier(0.42, 0, 0.58, 1);
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
        case "custom-bezier":
            const bezierCurvePoints = interpolation?.params?.bezierCurvePoints;
            if(Array.isArray(bezierCurvePoints) && bezierCurvePoints.length === 4){
                /* Expecting user to pass values in this order would align with the usage */
                const [x1, y1, x2, y2] = bezierCurvePoints;
                return Easing.bezier(x1, y1, x2, y2)
            }
            return Easing.linear;
        default:
            return Easing.linear;
    }
}
